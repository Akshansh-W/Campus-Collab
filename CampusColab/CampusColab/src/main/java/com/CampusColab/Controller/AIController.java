package com.CampusColab.Controller;

import com.CampusColab.DTO.DTO;
import com.CampusColab.ExceptionHandler.AppException;
import com.CampusColab.Service.AIService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/ai")
public class AIController {

    private static final Logger log = LoggerFactory.getLogger(AIController.class);

    private final AIService service;

    // Constructor DI
    public AIController(AIService service) {
        this.service = service;
    }

    // Generate project overview with the help of projectName, techStack and requirements
    @PostMapping("/generateOverview")
    ResponseEntity<?> generateOverview(@RequestBody DTO.GenerateRequest request) {
        if (request == null) {
            throw new AppException(HttpStatus.BAD_REQUEST, "Overview request is required");
        }
        String overview = service.generateOverview(request.projectName(), request.techStack(), request.requirements());
        log.info("Generated project overview");
        return ResponseEntity.status(HttpStatus.OK).body(new DTO.GeneratedResponse(overview));

    }

}
