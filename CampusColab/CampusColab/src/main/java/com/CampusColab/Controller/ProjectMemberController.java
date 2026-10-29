package com.CampusColab.Controller;

import com.CampusColab.DTO.DTO;
import com.CampusColab.Model.ProjectMember;
import com.CampusColab.Service.ProjectMemberService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pMember")
@CrossOrigin(origins = "http://localhost:5173")
public class ProjectMemberController {
    private static final Logger log = LoggerFactory.getLogger(ProjectMemberController.class);

    private final ProjectMemberService memberService;

    public ProjectMemberController(ProjectMemberService memberService){
        this.memberService = memberService;
    }

    @GetMapping("/getMembers")
    ResponseEntity<?> getMembers(@RequestParam int projectId){
        List<DTO.memberResponse> response = memberService.getMember(projectId);
        log.info("Fetched {} members for project id={}", response.size(), projectId);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }


    @GetMapping("/getStudentProjects")
    public ResponseEntity<?> getStudentProjects(@RequestParam long rollNumber) {
        List<ProjectMember> members = memberService.findMember(rollNumber);
        List<DTO.ProjectResponse> projects = members.stream()
                .map(ProjectMember::getProject)
                .map(DTO.ProjectResponse::fromEntity)
                .toList();
        log.info("Fetched {} projects for a student", projects.size());
        return ResponseEntity.ok(projects);
    }
}
