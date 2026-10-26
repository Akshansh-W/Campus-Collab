package com.CampusColab.Service;

import com.CampusColab.DTO.DTO;
import com.CampusColab.ExceptionHandler.AppException;
import com.CampusColab.Model.Project;
import com.CampusColab.Model.ProjectMember;
import com.CampusColab.Model.Student;
import com.CampusColab.Repository.ProjectRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;


@Service
public class ProjectService {
    private final ProjectRepository projectRepository;
    private final StudentService studentService;
    private final ProjectMemberService memberService;
    private final NotificationService notificationService;

    ProjectService(
            ProjectRepository projectRepository,
            StudentService studentService,
            ProjectMemberService memberService,
            NotificationService notificationService
    ){
        this.projectRepository = projectRepository;
        this.studentService = studentService;
        this.memberService = memberService;
        this.notificationService = notificationService;
    }

    public Page<Project> findAllProjects(int page, int size){
        return projectRepository.findAll(
                PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "projectId"))
        );
    }

    public List<Project> findProjects(Student student){
        return projectRepository.findByAdmin(student);
    }

    public Project findProject(int projectId){
        try {
            return projectRepository.findByProjectId(projectId);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public void deleteProject(int projectId){
        try {
            projectRepository.deleteById(projectId);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public Project saveProject(DTO.ProjectRequest projectRequest){
        try {
            Student student = studentService
                    .findStudent(projectRequest.rollNumber());

            if (student == null) {
                throw new AppException(HttpStatus.NOT_FOUND,"Student Not Found");
            }

            Project project = new Project();

            project.setProjectName(projectRequest.projectName());
            project.setOverview(projectRequest.overview());
            project.setTechStack(projectRequest.technicalTags());
            project.setRequirements(projectRequest.requirements());
            project.setStatus("ACTIVE");
            project.setCreated_at(LocalDate.now());
            project.setAdmin(student);

            Project savedProject = projectRepository.save(project);

            ProjectMember adminMember = new ProjectMember();

            adminMember.setProject(savedProject);
            adminMember.setRole("ADMIN");
            adminMember.setStudent(student);
            adminMember.setAppliedRole(projectRequest.appliedRole());

            memberService.saveMember(adminMember);

            return savedProject;
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public void saveProject(Project project){
        try{
            projectRepository.save(project);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    public DTO.ApiResponse saveProjectRatings(DTO.RatingSubmissionRequest request){
        Project project = findProject(request.projectId());
        if (project == null) {
            throw new AppException(HttpStatus.NOT_FOUND,"Project not found");
        }
        if ("COMPLETED".equalsIgnoreCase(project.getStatus())) {
            throw new AppException(HttpStatus.INTERNAL_SERVER_ERROR,"Project is not Completed");
        }

        Student student = studentService.findStudent(request.studentRollNumber());
        if (student == null) {
            throw new AppException(HttpStatus.NOT_FOUND,"Student not found");
        }

        boolean isMember = memberService.findMember(request.projectId()).stream()
                .anyMatch(member -> member.getStudent().getRollNumber() == request.studentRollNumber());
        if (!isMember) {
            throw new AppException(HttpStatus.INTERNAL_SERVER_ERROR,"Student is not a project member");
        }
        if (project.hasRatingFrom(request.studentRollNumber())) {
            throw new AppException(HttpStatus.CONFLICT,"Rating has already been submitted for this student");
        }

        int completedProjects = student.getCompletedProjects();
        float updatedRating =
                Math.round(
                        (((student.getRating() * completedProjects) + request.rating())
                                / (completedProjects + 1)) * 10
                ) / 10.0f;
        student.setRating(updatedRating);
        project.markRatingSubmitted(request.studentRollNumber());

        studentService.saveStudent(student);
        saveProject(project);
        notificationService.sendRatingNotification(project, student, request.rating(), request.comment());
        return new DTO.ApiResponse("Submitted");
    }

    public DTO.ApiResponse markProjectComplete(int projectId){
        Project project = findProject(projectId);
        if (project == null) {
            throw new AppException(HttpStatus.NOT_FOUND,"Project not found");
        }
        if ("COMPLETED".equalsIgnoreCase(project.getStatus())) {
            throw new AppException(HttpStatus.CONFLICT,"Project is already completed");
        }

        project.setStatus("COMPLETED");
        saveProject(project);

        List<ProjectMember> members = memberService.findMember(projectId);
        for (ProjectMember member : members) {
            Student student = member.getStudent();
            if ("ADMIN".equalsIgnoreCase(member.getRole())) {
                student.setRating(student.getRating() + 1.5f);
            }

            student.incrementCompletedProjects();
            student.incrementCollaborators(members.size());
            studentService.saveStudent(student);
            notificationService.sendCompletionNotification(project, student);
        }
        return new DTO.ApiResponse("Project Completed");
    }

}
