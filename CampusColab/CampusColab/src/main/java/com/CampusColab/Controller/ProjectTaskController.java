package com.CampusColab.Controller;

import com.CampusColab.DTO.DTO;
import com.CampusColab.Model.ProjectTask;
import com.CampusColab.Service.ProjectTaskService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/task")
@CrossOrigin(origins = "http://localhost:5173")
public class ProjectTaskController {

    private final ProjectTaskService taskService;

    ProjectTaskController(
            ProjectTaskService taskService
    ) {
        this.taskService = taskService;

    }

    @PostMapping("/assignTask")
    ResponseEntity<?> assignTaskToStudent(@RequestBody DTO.TaskRequest request) {
        if (request == null) {
            return ResponseEntity.badRequest().body(new DTO.ApiResponse("Task details are required"));
        }
        try{
            return taskService.assignTask(request);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @PostMapping("/deleteTask")
    ResponseEntity<?> deleteTask(@RequestParam int taskId) {
        ProjectTask task = taskService.findTask(taskId);
        if (task == null) {
            return ResponseEntity.notFound().build();
        }
        if (taskService.isCompleted(task.getProject())) {
            return taskService.completedProjectResponse();
        }
        taskService.deleteTask(task);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/getStudentTasks")
    public ResponseEntity<?> getStudentTasks(@RequestParam long rollNumber) {
        try {
            List<DTO.TaskResponse> response = taskService.findTaskAssignToRollNumber(rollNumber).stream()
                    .map(DTO.TaskResponse::fromEntity)
                    .toList();
            return ResponseEntity.ok(response);
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().body(new DTO.ApiResponse("Unable to load student tasks"));
        }
    }

    @GetMapping("/getAllTasks")
    public ResponseEntity<?> getAllTaskOnAProject(@RequestParam int projectId) {
        try {
            List<DTO.TaskResponse> response = taskService.findTaskOnProject(projectId).stream()
                    .map(DTO.TaskResponse::fromEntity)
                    .toList();
            return ResponseEntity.ok(response);
        } catch (Exception exception) {
            return ResponseEntity.internalServerError().body(new DTO.ApiResponse("Unable to load project tasks"));
        }
    }

    @PatchMapping("/start/{taskId}")
    public ResponseEntity<?> startTask(@PathVariable int taskId) {
        return taskService.changeStatus(taskId, "ASSIGNED", "IN_PROGRESS");
    }

    @PatchMapping("/submit/{taskId}")
    public ResponseEntity<?> submitTask(@PathVariable int taskId, @RequestBody DTO.SubmissionRequest request) {
        ProjectTask task = taskService.findTask(taskId);
        if (task == null) {
            return ResponseEntity.notFound().build();
        }
        taskService.submitTask(task,request);
        return ResponseEntity.ok(DTO.TaskResponse.fromEntity(taskService.saveTask(task)));
    }

    @PatchMapping("/requestChanges/{taskId}")
    public ResponseEntity<?> requestChanges(@PathVariable int taskId) {
        return taskService.changeStatus(taskId, "SUBMITTED", "IN_PROGRESS");
    }

    @PatchMapping("/complete/{taskId}")
    public ResponseEntity<?> completeTask(@PathVariable int taskId) {
        return taskService.changeStatus(taskId, "SUBMITTED", "COMPLETED");
    }

    @PatchMapping("/updateStatus/{taskId}")
    public ResponseEntity<?> updateStatus(@PathVariable int taskId, @RequestBody DTO.StatusRequest request) {
        if (request == null || request.status() == null) {
            return ResponseEntity.badRequest().body(new DTO.ApiResponse("A task status is required"));
        }
        return switch (request.status()) {
            case "IN_PROGRESS" -> taskService.changeStatus(taskId, "ASSIGNED", "IN_PROGRESS");
            case "COMPLETED" -> taskService.changeStatus(taskId, "SUBMITTED", "COMPLETED");
            default -> ResponseEntity.badRequest().body(new DTO.ApiResponse("Use the submit endpoint to submit work"));
        };
    }



}