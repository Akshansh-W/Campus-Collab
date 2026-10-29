package com.CampusColab.Controller;

import com.CampusColab.DTO.DTO;
import com.CampusColab.Model.*;
import com.CampusColab.Service.ProjectJoinRequestService;
import com.CampusColab.ExceptionHandler.AppException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/pjr")
public class ProjectJoinRequestController {

    private static final Logger log = LoggerFactory.getLogger(ProjectJoinRequestController.class);

    private final ProjectJoinRequestService joinRequestService;

    public ProjectJoinRequestController(ProjectJoinRequestService joinRequestService){
        this.joinRequestService = joinRequestService;
    }

    @PostMapping("/submitRequest")
    ResponseEntity<?> submitJoinReq(@RequestBody DTO.JoinRequest joinRequest){
        if(joinRequest == null){
            throw new AppException(HttpStatus.BAD_REQUEST, "Join request details are required");
        }
        joinRequestService.submitJoinRequest(joinRequest);
        log.info("Submitted project join request for project id={}", joinRequest.projectId());
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/getAllRequests")
    ResponseEntity<?> getAllRequests(@RequestParam int projectId){
        List<DTO.JoinRequestResponse> response = joinRequestService.getAllRequest(projectId);
        log.info("Fetched {} join requests for project id={}", response.size(), projectId);
        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @PostMapping("/deleteRequest")
    public ResponseEntity<?> deleteRequest(@RequestParam int requestId) {
        joinRequestService.deleteRequest(requestId);
        log.info("Deleted join request id={}", requestId);
        return ResponseEntity.ok().build();
    }


    @PostMapping("/acceptRequest")
    public ResponseEntity<?> acceptRequest(@RequestParam int requestId){
        joinRequestService.acceptRequest(requestId);
        log.info("Accepted join request id={}", requestId);
        return ResponseEntity.status(HttpStatus.OK).build();
    }

}
