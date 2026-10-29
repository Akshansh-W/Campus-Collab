package com.CampusColab.Controller;

import com.CampusColab.DTO.DTO;
import com.CampusColab.ExceptionHandler.AppException;
import com.CampusColab.Model.ProjectTask;
import com.CampusColab.Service.ProjectTaskService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/task")
@CrossOrigin(origins = "http://localhost:5173")
public class ProjectTaskController {

    private static final Logger log = LoggerFactory.getLogger(ProjectTaskController.class);

    private final ProjectTaskService taskService;

    ProjectTaskController(
            ProjectTaskService taskService
    ) {
        this.taskService = taskService;

    }

    @PostMapping("/assignTask")
    ResponseEntity<?> assignTaskToStudent(@RequestBody DTO.TaskRequest request) {
        if (request == null) {
            throw new AppException(HttpStatus.BAD_REQUEST, "Task details are required");
        }
        ResponseEntity<?> response = taskService.assignTask(request);
        log.info("Task assigned to a project member for project id={}", request.projectId());
        return response;
    }

    @PostMapping("/deleteTask")
    ResponseEntity<?> deleteTask(@RequestParam int taskId) {
        ProjectTask task = taskService.findTask(taskId);
        if (task == null) {
            throw new AppException(HttpStatus.NOT_FOUND, "Task not found");
        }
        if (taskService.isCompleted(task.getProject())) {
            throw new AppException(
                    HttpStatus.CONFLICT, "Task operations are unavailable after project completion");
        }
        taskService.deleteTask(task);
        log.info("Deleted task id={}", taskId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/getStudentTasks")
    public ResponseEntity<?> getStudentTasks(@RequestParam long rollNumber) {
        List<DTO.TaskResponse> response = taskService.findTaskAssignToRollNumber(rollNumber).stream()
                .map(DTO.TaskResponse::fromEntity)
                .toList();
        log.info("Fetched {} tasks for a student", response.size());
        return ResponseEntity.ok(response);
    }

    @GetMapping("/getAllTasks")
    public ResponseEntity<?> getAllTaskOnAProject(@RequestParam int projectId) {
        List<DTO.TaskResponse> response = taskService.findTaskOnProject(projectId).stream()
                .map(DTO.TaskResponse::fromEntity)
                .toList();
        log.info("Fetched {} tasks for project id={}", response.size(), projectId);
        return ResponseEntity.ok(response);
    }

    @PatchMapping("/start/{taskId}")
    public ResponseEntity<?> startTask(@PathVariable int taskId) {
        ResponseEntity<?> response = taskService.changeStatus(taskId, "ASSIGNED", "IN_PROGRESS");
        if (response.getStatusCode().is2xxSuccessful()) {
            log.info("Started task id={}", taskId);
        }
        return response;
    }

    @PatchMapping("/submit/{taskId}")
    public ResponseEntity<?> submitTask(@PathVariable int taskId, @RequestBody DTO.SubmissionRequest request) {
        ProjectTask task = taskService.findTask(taskId);
        if (task == null) {
            throw new AppException(HttpStatus.NOT_FOUND, "Task not found");
        }
        taskService.submitTask(task,request);
        ResponseEntity<?> response =
                ResponseEntity.ok(DTO.TaskResponse.fromEntity(taskService.saveTask(task)));
        log.info("Submitted task work taskId={}", taskId);
        return response;
    }

    @PatchMapping("/requestChanges/{taskId}")
    public ResponseEntity<?> requestChanges(@PathVariable int taskId) {
        ResponseEntity<?> response = taskService.changeStatus(taskId, "SUBMITTED", "IN_PROGRESS");
        if (response.getStatusCode().is2xxSuccessful()) {
            log.info("Requested task changes taskId={}", taskId);
        }
        return response;
    }

    @PatchMapping("/complete/{taskId}")
    public ResponseEntity<?> completeTask(@PathVariable int taskId) {
        ResponseEntity<?> response = taskService.changeStatus(taskId, "SUBMITTED", "COMPLETED");
        if (response.getStatusCode().is2xxSuccessful()) {
            log.info("Completed task id={}", taskId);
        }
        return response;
    }

    @PatchMapping("/updateStatus/{taskId}")
    public ResponseEntity<?> updateStatus(@PathVariable int taskId, @RequestBody DTO.StatusRequest request) {
        if (request == null || request.status() == null) {
            throw new AppException(HttpStatus.BAD_REQUEST, "A task status is required");
        }
        ResponseEntity<?> response = switch (request.status()) {
            case "IN_PROGRESS" -> taskService.changeStatus(taskId, "ASSIGNED", "IN_PROGRESS");
            case "COMPLETED" -> taskService.changeStatus(taskId, "SUBMITTED", "COMPLETED");
            default -> throw new AppException(
                    HttpStatus.BAD_REQUEST, "Use the submit endpoint to submit work");
        };
        log.info("Updated task status taskId={} status={}", taskId, request.status());
        return response;
    }



}