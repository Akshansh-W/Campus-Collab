package com.CampusColab.Controller;

import com.CampusColab.DTO.DTO;
import com.CampusColab.ExceptionHandler.AppException;
import com.CampusColab.Model.Project;
import com.CampusColab.Model.Student;
import com.CampusColab.Service.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/project")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class ProjectController {

    private final ProjectService projectService;
    private final StudentService studentService;
    private final ProjectMemberService memberService;
    private final ProjectTaskService taskService;


    public ProjectController(ProjectService projectService, StudentService studentService,
                             ProjectMemberService memberService,ProjectTaskService taskService){
        this.projectService = projectService;
        this.studentService = studentService;
        this.memberService = memberService;
        this.taskService = taskService;


    }

    // Get starting 10 projects in database at first, then next 10 in another call
    @GetMapping("/getProjects")
    public ResponseEntity<?> getProjects(@RequestParam int page, @RequestParam int size) {
        try {
            Page<Project> projects = projectService.findAllProjects(page,size);
            Page<DTO.ProjectResponse> response = projects.map(DTO.ProjectResponse::fromEntity);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new DTO.ApiResponse("Failed to fetch Projects"));
        }
    }

    // Get all projects uploaded by a roll Number
    @PostMapping("/getProject")
    ResponseEntity<?> getProject(@RequestBody Long rollNumber){
        try {
            Student student = studentService.findStudent(rollNumber);
            if (student == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body( new DTO.ApiResponse("Roll number can't be empty"));
            }
            List<Project> projects = projectService.findProjects(student);
            return ResponseEntity.status(HttpStatus.OK).body(projects);
        }catch(Exception e){
            e.printStackTrace();
            throw new AppException(HttpStatus.INTERNAL_SERVER_ERROR,"Failed to load data");
            //return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    @Transactional
    @PostMapping("/deleteProject")
    ResponseEntity<?> deleteProject(@RequestBody Integer projectId){
        if(projectId == null){
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new DTO.ApiResponse("ProjectId is empty"));
        }
        try{
            memberService.deleteMember(projectId);
            taskService.deleteTask(projectId);
            projectService.deleteProject(projectId);
            return ResponseEntity.status(HttpStatus.OK).body(new DTO.ApiResponse("Project is deleted"));
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/findProject/{projectId}")
    public ResponseEntity<?> findProject(@PathVariable Integer projectId) {
        try {
            Project project = projectService.findProject(projectId);
            if (project != null) {
                DTO.ProjectResponse response = DTO.ProjectResponse.fromEntity(project);
                return ResponseEntity.status(HttpStatus.OK).body(response);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new DTO.ApiResponse("Project not found"));
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new DTO.ApiResponse("Failed to fetch project"));
        }
    }

    @PostMapping("/uploadProject")
    public ResponseEntity<?> uploadProject(@RequestBody DTO.ProjectRequest projectRequest){
        if(projectRequest == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new DTO.ApiResponse("project can't be null"));
        }
        try{
            Project savedProject = projectService.saveProject(projectRequest);
            return ResponseEntity.status(HttpStatus.OK).body(savedProject);
    }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new DTO.ApiResponse("Error occur while uploading project"));
        }
    }

    @PostMapping("/submitRatings")
    @Transactional
    public ResponseEntity<?> submitRatings(@RequestBody DTO.RatingSubmissionRequest request) {
        if (request == null || request.projectId() <= 0 || request.studentRollNumber() <= 0) {
            return ResponseEntity.badRequest().body(new DTO.ApiResponse("Project and student are required"));
        }
        DTO.ApiResponse response = projectService.saveProjectRatings( request);
        if(response.message().equals("Submitted")){
            return ResponseEntity.status(HttpStatus.OK).body(new DTO.ApiResponse("Ratings submitted successfully"));
        }else{
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PatchMapping("/completeProject")
    @Transactional
    ResponseEntity<?> markProjectComplete(@RequestParam int projectId){
        try {
            DTO.ApiResponse response = projectService.markProjectComplete(projectId);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

}

