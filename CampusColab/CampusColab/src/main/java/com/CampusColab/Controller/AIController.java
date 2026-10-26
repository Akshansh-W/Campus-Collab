package com.CampusColab.Controller;

import com.CampusColab.DTO.DTO;
import com.CampusColab.Service.AIService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ai")
public class AIController {

    private final AIService service;

    // Constructor DI
    public AIController(AIService service) {
        this.service = service;
    }

    // Generate project overview with the help of projectName, techStack and requirements
    @PostMapping("/generateOverview")
    ResponseEntity<?> generateOverview(@RequestBody DTO.GenerateRequest request) {
        if (request == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        try {
            String overview = service.generateOverview(request.projectName(), request.techStack(), request.requirements());
            return ResponseEntity.status(HttpStatus.OK).body(new DTO.GeneratedResponse(overview));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

}
