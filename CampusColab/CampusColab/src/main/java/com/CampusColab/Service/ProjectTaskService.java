package com.CampusColab.Service;

import com.CampusColab.DTO.DTO;
import com.CampusColab.ExceptionHandler.AppException;
import com.CampusColab.Model.Project;
import com.CampusColab.Model.ProjectMember;
import com.CampusColab.Model.ProjectTask;
import com.CampusColab.Model.Student;
import com.CampusColab.Repository.ProjectTaskRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


import java.time.LocalDateTime;
import java.util.List;

@Service
public class ProjectTaskService {
    private final ProjectTaskRepository taskRepository;
    private final StudentService studentService;
    private final ProjectService projectService;
    private final ProjectMemberService memberService;

    ProjectTaskService(
            ProjectTaskRepository taskRepository,
            StudentService studentService,
            ProjectService projectService,
            ProjectMemberService memberService
    ){
        this.taskRepository = taskRepository;
        this.studentService = studentService;
        this.projectService = projectService;
        this.memberService = memberService;
    }

    public ResponseEntity<?> assignTask(DTO.TaskRequest request){

        Student student = studentService.findStudent(request.rollNumber());
        Project project = projectService.findProject(request.projectId());
        if (student == null || project == null) {
            throw new AppException(HttpStatus.NOT_FOUND,"Project or student not found");
        }
        if (isCompleted(project)) {
            return completedProjectResponse();
        }
        boolean isMember = memberService.findMember(project.getProjectId()).stream()
                .map(ProjectMember::getStudent)
                .anyMatch(member -> member.getRollNumber() == student.getRollNumber());

        if (!isMember) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new DTO.ApiResponse("Tasks can only be assigned to project members"));
        }

        ProjectTask task = new ProjectTask();
        task.setAssignedTo(student);
        task.setDescription(request.description());
        task.setDueDate(request.dueDate());
        task.setPriority(request.priority());
        task.setProject(project);
        task.setStatus("ASSIGNED");
        task.setTittle(request.title());

        return ResponseEntity.status(HttpStatus.CREATED).body(DTO.TaskResponse.fromEntity(taskRepository.save(task)));

    }

    public int getCompletedTasks(int projectId){
        try{
            List< DTO.TaskResponse> response = taskRepository.findByProject_ProjectId(projectId).stream()
                    .filter(task -> "COMPLETED".equalsIgnoreCase(task.getStatus()))
                    .map(DTO.TaskResponse::fromEntity)
                    .toList();
            return response.size();
        } catch (Exception e) {

            throw new RuntimeException(e);
        }
    }

    public List<ProjectTask> findTaskAssignToRollNumber(long rollNumber){
        return taskRepository.findByAssignedTo_RollNumber(rollNumber);
    }

    public List<ProjectTask> findTaskOnProject(int projectId){
        return taskRepository.findByProject_ProjectId(projectId);
    }



    public void deleteTask(int projectId){
        try {
            taskRepository.deleteByProject_ProjectId(projectId);
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    public void deleteTask(ProjectTask task){
        try {
            taskRepository.delete(task);
        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }
    public void submitTask(ProjectTask task, DTO.SubmissionRequest request){
        if (isCompleted(task.getProject())) {
            completedProjectResponse();
            return;
        }
        if (!"IN_PROGRESS".equals(task.getStatus())) {
            invalidTransition(task.getStatus(), "SUBMITTED");
            return;
        }
        if (request == null || ((request.report() == null || request.report().isBlank())
                && (request.workLink() == null || request.workLink().isBlank()))) {
            ResponseEntity.badRequest().body(new DTO.ApiResponse("Add a report or work link before submitting"));
            return;
        }

        task.setReport(request.report());
        task.setWorkLink(request.workLink());
        task.setSubmittedAt(LocalDateTime.now());
        task.setStatus("SUBMITTED");
    }

    public ProjectTask findTask(int taskId){
        return taskRepository.findById(taskId).orElse(null);
    }
    public ProjectTask saveTask(ProjectTask task){
        taskRepository.save(task);
        return task;
    }

    public ResponseEntity<DTO.ApiResponse> completedProjectResponse() {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(new DTO.ApiResponse("Task operations are unavailable after project completion"));
    }

    private ResponseEntity<DTO.ApiResponse> invalidTransition(String currentStatus, String targetStatus) {
        return ResponseEntity.status(HttpStatus.CONFLICT)
                .body(new DTO.ApiResponse(
                        "Cannot move a task from " + currentStatus + " to " + targetStatus));
    }

    public ResponseEntity<?> changeStatus(int taskId, String expectedStatus, String targetStatus) {
        ProjectTask task = taskRepository.findById(taskId).orElse(null);
        if (task == null) {
            return ResponseEntity.notFound().build();
        }
        if (isCompleted(task.getProject())) {
            return completedProjectResponse();
        }
        if (!expectedStatus.equals(task.getStatus())) {
            return invalidTransition(task.getStatus(), targetStatus);
        }
        task.setStatus(targetStatus);
        return ResponseEntity.ok(DTO.TaskResponse.fromEntity(taskRepository.save(task)));
    }

    public boolean isCompleted(Project project) {
        return "COMPLETED".equalsIgnoreCase(project.getStatus());
    }


}
