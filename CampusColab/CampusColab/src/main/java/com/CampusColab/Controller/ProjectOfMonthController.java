package com.CampusColab.Controller;

import com.CampusColab.DTO.DTO;
import com.CampusColab.Model.ProjectOfMonth;
import com.CampusColab.Repository.ProjectOfMonthRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Optional;

@RestController
@RequestMapping("/projectOfMonth")
public class ProjectOfMonthController {

    private final ProjectOfMonthRepository projectOfMonthRepository;

    public ProjectOfMonthController(
            ProjectOfMonthRepository projectOfMonthRepository
    ) {
            this.projectOfMonthRepository = projectOfMonthRepository;
    }


    @GetMapping("/getLatest")
    public ResponseEntity<?> getLatestProjectOfMonth() {
        Optional<ProjectOfMonth> latest =
                projectOfMonthRepository.findTopByOrderBySelectedAtDesc();

        if (latest.isEmpty()) {
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body(new DTO.ApiResponse("No project of the month found"));
        }
        ProjectOfMonth pom = latest.get();
        DTO.ProjectOfMonthResponse response =
                new DTO.ProjectOfMonthResponse(
                        DTO.ProjectResponse.fromEntity(
                                pom.getProject()
                        ),
                        pom.getReason()
                );
        return ResponseEntity.ok(response);
    }
}
