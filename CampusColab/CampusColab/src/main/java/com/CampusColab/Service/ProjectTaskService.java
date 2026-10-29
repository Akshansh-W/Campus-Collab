package com.CampusColab.Service;

import com.CampusColab.DTO.DTO;
import com.CampusColab.ExceptionHandler.AppException;
import com.CampusColab.Model.Project;
import com.CampusColab.Model.ProjectMember;
import com.CampusColab.Model.ProjectTask;
import com.CampusColab.Model.Student;
import com.CampusColab.Repository.ProjectTaskRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;


import java.time.LocalDateTime;
import java.util.List;

@Service
public class ProjectTaskService {
    private static final Logger log = LoggerFactory.getLogger(ProjectTaskService.class);

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
            throw new AppException(HttpStatus.CONFLICT, "Task operations are unavailable after project completion");
        }
        boolean isMember = memberService.findMember(project.getProjectId()).stream()
                .map(ProjectMember::getStudent)
                .anyMatch(member -> member.getRollNumber() == student.getRollNumber());

        if (!isMember) {
            throw new AppException(HttpStatus.BAD_REQUEST, "Tasks can only be assigned to project members");
        }

        ProjectTask task = new ProjectTask();
        task.setAssignedTo(student);
        task.setDescription(request.description());
        task.setDueDate(request.dueDate());
        task.setPriority(request.priority());
        task.setProject(project);
        task.setStatus("ASSIGNED");
        task.setTittle(request.title());

        ProjectTask savedTask = taskRepository.save(task);
        log.info("Assigned task taskId={} projectId={}", savedTask.getTaskId(), project.getProjectId());
        return ResponseEntity.status(HttpStatus.CREATED).body(DTO.TaskResponse.fromEntity(savedTask));

    }

    public int getCompletedTasks(int projectId){
        List<DTO.TaskResponse> response = taskRepository.findByProject_ProjectId(projectId).stream()
                .filter(task -> "COMPLETED".equalsIgnoreCase(task.getStatus()))
                .map(DTO.TaskResponse::fromEntity)
                .toList();
        log.debug("Loaded {} completed tasks for projectId={}", response.size(), projectId);
        return response.size();
    }

    public List<ProjectTask> findTaskAssignToRollNumber(long rollNumber){
        List<ProjectTask> tasks = taskRepository.findByAssignedTo_RollNumber(rollNumber);
        log.debug("Loaded {} tasks assigned to a student", tasks.size());
        return tasks;
    }

    public List<ProjectTask> findTaskOnProject(int projectId){
        List<ProjectTask> tasks = taskRepository.findByProject_ProjectId(projectId);
        log.debug("Loaded {} tasks for projectId={}", tasks.size(), projectId);
        return tasks;
    }



    public void deleteTask(int projectId){
        taskRepository.deleteByProject_ProjectId(projectId);
        log.info("Deleted tasks for projectId={}", projectId);
    }

    public void deleteTask(ProjectTask task){
        taskRepository.delete(task);
        log.info("Deleted task taskId={}", task.getTaskId());
    }
    public void submitTask(ProjectTask task, DTO.SubmissionRequest request){
        if (isCompleted(task.getProject())) {
            throw new AppException(HttpStatus.CONFLICT, "Task operations are unavailable after project completion");
        }
        if (!"IN_PROGRESS".equals(task.getStatus())) {
            throw invalidTransition(task.getStatus(), "SUBMITTED");
        }
        if (request == null || ((request.report() == null || request.report().isBlank())
                && (request.workLink() == null || request.workLink().isBlank()))) {
            throw new AppException(HttpStatus.BAD_REQUEST, "Add a report or work link before submitting");
        }

        task.setReport(request.report());
        task.setWorkLink(request.workLink());
        task.setSubmittedAt(LocalDateTime.now());
        task.setStatus("SUBMITTED");
        log.info("Submitted task taskId={}", task.getTaskId());
    }

    public ProjectTask findTask(int taskId){
        return taskRepository.findById(taskId).orElse(null);
    }
    public ProjectTask saveTask(ProjectTask task){
        taskRepository.save(task);
        log.debug("Saved task taskId={}", task.getTaskId());
        return task;
    }

    private AppException invalidTransition(String currentStatus, String targetStatus) {
        return new AppException(HttpStatus.CONFLICT,
                "Cannot move a task from " + currentStatus + " to " + targetStatus);
    }

    public ResponseEntity<?> changeStatus(int taskId, String expectedStatus, String targetStatus) {
        ProjectTask task = taskRepository.findById(taskId).orElse(null);
        if (task == null) {
            throw new AppException(HttpStatus.NOT_FOUND, "Task not found");
        }
        if (isCompleted(task.getProject())) {
            throw new AppException(HttpStatus.CONFLICT, "Task operations are unavailable after project completion");
        }
        if (!expectedStatus.equals(task.getStatus())) {
            throw invalidTransition(task.getStatus(), targetStatus);
        }
        task.setStatus(targetStatus);
        ProjectTask updatedTask = taskRepository.save(task);
        log.info("Updated task status taskId={} status={}", taskId, targetStatus);
        return ResponseEntity.ok(DTO.TaskResponse.fromEntity(updatedTask));
    }

    public boolean isCompleted(Project project) {
        return "COMPLETED".equalsIgnoreCase(project.getStatus());
    }


}
