package com.CampusColab.DTO;

import com.CampusColab.Controller.ProjectController;
import com.CampusColab.Model.Project;
import com.CampusColab.Model.ProjectTask;
import com.CampusColab.Model.Student;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;

public class DTO {

    public record OtpRequest(String email, String otp) {}
    public record Stats(int noOfProjects , int completedProjects, int collaborators, float rating){}
    public record SendProfileData(Student student, Stats stats, int activeProject){}
    public record LoginRequest(String email, String password) {}
    public record LoginResponse(String token) {}
    public record ApiResponse(String message) {}
    public record ProjectOfMonthResponse(
            ProjectResponse project,
            String reason
    ) {}

    public record GenerateRequest(String projectName, String techStack, String requirements) {}
    public record GeneratedResponse(String response) {}
    public record NotificationResponse(
            int notificationId,
            String title,
            String message,
            String type,
            LocalDateTime createdAt
    ) {}
    public record ProjectResponse(
            int id,
            String projectName,
            String overview,
            String requirements,
            List<String> techStack,
            String status,
            String adminName
    ) {
        public static ProjectResponse fromEntity(Project project) {
            return new ProjectResponse(
                    project.getProjectId(),
                    project.getProjectName(),
                    project.getOverview(),
                    project.getRequirements(),
                    project.getTechStack() == null
                            ? List.of()
                            : Arrays.stream(project.getTechStack().split(","))
                            .map(String::trim)
                            .toList(),
                    project.getStatus(),
                    project.getAdmin() != null ? project.getAdmin().getStudentName() : "Unassigned"
            );
        }
    }
    public record ProjectRequest(String projectName, String overview, String technicalTags, String requirements, Long rollNumber, String appliedRole){}
    public record RatingSubmissionRequest(int projectId, long studentRollNumber, int rating, String comment) {}
    public record JoinRequest(String projectId, Long rollNumber, String appliedRole, String message){}
    public record memberResponse( int memberId,long rollNumber, String studentName, String email, String role, String appliedRole, int currentYear, String department, float rating, int completedProjects){}
    public record ResponseWithToken(String token,Student student){}
    public record TaskResponse(
            int taskId,
            String tittle,
            String description,
            String status,
            String priority,
            LocalDate dueDate,
            int projectId,
            String projectName,
            long studentRollNumber,
            String studentName,
            String report,
            String workLink,
            LocalDateTime submittedAt
    ) {
        public static TaskResponse fromEntity(ProjectTask task) {
            return new TaskResponse(
                    task.getTaskId(),
                    task.getTittle(),
                    task.getDescription(),
                    task.getStatus(),
                    task.getPriority(),
                    task.getDueDate(),
                    task.getProject().getProjectId(),
                    task.getProject().getProjectName(),
                    task.getAssignedTo().getRollNumber(),
                    task.getAssignedTo().getStudentName(),
                    task.getReport(),
                    task.getWorkLink(),
                    task.getSubmittedAt()
            );
        }
    }

    public record TaskRequest(long rollNumber, int projectId, String title, String description, String status, String priority, LocalDate dueDate) {}
    public record StatusRequest(String status) {}
    public record SubmissionRequest(String report, String workLink) {}
    public record JoinRequestResponse(Integer requestId, String name, Float rating, String appliedRole, Integer projectsDone, String quote) {}



}
