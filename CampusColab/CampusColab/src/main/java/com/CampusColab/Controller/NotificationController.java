package com.CampusColab.Controller;

import com.CampusColab.DTO.DTO;
import com.CampusColab.Service.NotificationService;
import com.CampusColab.ExceptionHandler.AppException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/notification")

public class NotificationController {
    private static final Logger log = LoggerFactory.getLogger(NotificationController.class);

    private final NotificationService notificationService;

    // Constructor DI for notificationRepository
    public NotificationController(NotificationService notificationService){
        this.notificationService = notificationService;
    }

    // Controller for getting all the notification assigned to the student
    @GetMapping("/getNotification")
    ResponseEntity<?> getNotification(@RequestParam long rollNumber) {
        List<DTO.NotificationResponse> response = notificationService.getNotification(rollNumber);
        log.info("Fetched {} notifications for a student", response.size());
        return ResponseEntity.ok(response);
    }

    // Controller for deleting notification by notificationId
    @PostMapping("deleteNotification/{notificationId}")
    ResponseEntity<?> deleteNotification(@PathVariable int notificationId){
        if (notificationService.deleteNotification(notificationId)) {
            log.info("Deleted notification id={}", notificationId);
            return ResponseEntity.status(HttpStatus.OK).build();
        }
        throw new AppException(HttpStatus.NOT_FOUND, "Notification not found");
    }
}
