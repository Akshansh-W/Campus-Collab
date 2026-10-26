package com.CampusColab.Controller;

import com.CampusColab.DTO.DTO;
import com.CampusColab.Model.ProjectMember;
import com.CampusColab.Service.ProjectMemberService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/pMember")
@CrossOrigin(origins = "http://localhost:5173")
public class ProjectMemberController {
    private final ProjectMemberService memberService;

    public ProjectMemberController(ProjectMemberService memberService){
        this.memberService = memberService;
    }

    @GetMapping("/getMembers")
    ResponseEntity<?> getMembers(@RequestParam int projectId){
        try{
            List<DTO.memberResponse> response = memberService.getMember(projectId);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @GetMapping("/getStudentProjects")
    public ResponseEntity<?> getStudentProjects(@RequestParam long rollNumber) {
        try {
            List<ProjectMember> members = memberService.findMember(rollNumber);
            List<DTO.ProjectResponse> projects = members.stream()
                    .map(ProjectMember::getProject)
                    .map(DTO.ProjectResponse::fromEntity)
                    .toList();
            return ResponseEntity.ok(projects);
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }
}
