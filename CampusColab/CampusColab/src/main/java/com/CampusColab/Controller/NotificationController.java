package com.CampusColab.Controller;

import com.CampusColab.DTO.DTO;
import com.CampusColab.Service.NotificationService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/notification")

public class NotificationController {
    private final NotificationService notificationService;

    // Constructor DI for notificationRepository
    public NotificationController(NotificationService notificationService){
        this.notificationService = notificationService;
    }

    // Controller for getting all the notification assigned to the student
    @GetMapping("/getNotification")
    ResponseEntity<?> getNotification(@RequestParam long rollNumber) {
        try {
            List<DTO.NotificationResponse> response = notificationService.getNotification(rollNumber);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    // Controller for deleting notification by notificationId
    @PostMapping("deleteNotification/{notificationId}")
    ResponseEntity<?> deleteNotification(@PathVariable int notificationId){
        try{
            if(notificationService.deleteNotification(notificationId)) {
                return ResponseEntity.status(HttpStatus.OK).build();
            }else{
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
}
