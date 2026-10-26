package com.CampusColab.Controller;

import com.CampusColab.DTO.DTO;
import com.CampusColab.Model.*;
import com.CampusColab.Service.ProjectJoinRequestService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/pjr")
public class ProjectJoinRequestController {

    private final ProjectJoinRequestService joinRequestService;

    public ProjectJoinRequestController(ProjectJoinRequestService joinRequestService){
        this.joinRequestService = joinRequestService;
    }

    @PostMapping("/submitRequest")
    ResponseEntity<?> submitJoinReq(@RequestBody DTO.JoinRequest joinRequest){
        if(joinRequest == null){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
        try{
            joinRequestService.submitJoinRequest(joinRequest);
            return ResponseEntity.status(HttpStatus.CREATED).build();

        }catch (Exception e){
            throw new RuntimeException(e);
        }
    }

    @GetMapping("/getAllRequests")
    ResponseEntity<?> getAllRequests(@RequestParam int projectId){
        try {
            List<DTO.JoinRequestResponse> response = joinRequestService.getAllRequest(projectId);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/deleteRequest")
    public ResponseEntity<?> deleteRequest(@RequestParam int requestId) {
        try {
            joinRequestService.deleteRequest(requestId);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }


    @PostMapping("/acceptRequest")
    public ResponseEntity<?> acceptRequest(@RequestParam int requestId){
        try{
            joinRequestService.acceptRequest(requestId);
            return ResponseEntity.status(HttpStatus.OK).build();
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
