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
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/project")
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class ProjectController {

    private static final Logger log = LoggerFactory.getLogger(ProjectController.class);

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
        Page<Project> projects = projectService.findAllProjects(page,size);
        Page<DTO.ProjectResponse> response = projects.map(DTO.ProjectResponse::fromEntity);
        log.info("Fetched projects page={} size={} resultCount={}", page, size, projects.getNumberOfElements());
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    // Get all projects uploaded by a roll Number
    @PostMapping("/getProject")
    ResponseEntity<?> getProject(@RequestBody Long rollNumber){
        Student student = studentService.findStudent(rollNumber);
        if (student == null) {
            throw new AppException(HttpStatus.NOT_FOUND, "Student not found");
        }
        List<Project> projects = projectService.findProjects(student);
        log.info("Fetched {} projects for a student", projects.size());
        return ResponseEntity.status(HttpStatus.OK).body(projects);
    }

    @Transactional
    @PostMapping("/deleteProject")
    ResponseEntity<?> deleteProject(@RequestBody Integer projectId){
        if(projectId == null){
            throw new AppException(HttpStatus.BAD_REQUEST, "ProjectId is required");
        }
        memberService.deleteMember(projectId);
        taskService.deleteTask(projectId);
        projectService.deleteProject(projectId);
        log.info("Deleted project id={}", projectId);
        return ResponseEntity.status(HttpStatus.OK).body(new DTO.ApiResponse("Project is deleted"));
    }

    @GetMapping("/findProject/{projectId}")
    public ResponseEntity<?> findProject(@PathVariable Integer projectId) {
        Project project = projectService.findProject(projectId);
        if (project == null) {
            throw new AppException(HttpStatus.NOT_FOUND, "Project not found");
        }
        log.info("Fetched project id={}", projectId);
        DTO.ProjectResponse response = DTO.ProjectResponse.fromEntity(project);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/uploadProject")
    public ResponseEntity<?> uploadProject(@RequestBody DTO.ProjectRequest projectRequest){
        if(projectRequest == null){
            throw new AppException(HttpStatus.BAD_REQUEST, "Project details are required");
        }
        Project savedProject = projectService.saveProject(projectRequest);
        log.info("Created project id={}", savedProject.getProjectId());
        return ResponseEntity.status(HttpStatus.OK).body(savedProject);
    }

    @PostMapping("/submitRatings")
    @Transactional
    public ResponseEntity<?> submitRatings(@RequestBody DTO.RatingSubmissionRequest request) {
        if (request == null || request.projectId() <= 0 || request.studentRollNumber() <= 0) {
            throw new AppException(HttpStatus.BAD_REQUEST, "Project and student are required");
        }
        DTO.ApiResponse response = projectService.saveProjectRatings( request);
        if(response.message().equals("Submitted")){
            log.info("Submitted rating for project id={}", request.projectId());
            return ResponseEntity.status(HttpStatus.OK).body(new DTO.ApiResponse("Ratings submitted successfully"));
        }else{
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PatchMapping("/completeProject")
    @Transactional
    ResponseEntity<?> markProjectComplete(@RequestParam int projectId){
        DTO.ApiResponse response = projectService.markProjectComplete(projectId);
        log.info("Completed project id={}", projectId);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

}
