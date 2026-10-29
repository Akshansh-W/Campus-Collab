package com.CampusColab.Service;

import com.CampusColab.DTO.DTO;
import com.CampusColab.Model.Notification;
import com.CampusColab.Model.Project;
import com.CampusColab.Model.ProjectJoinRequest;
import com.CampusColab.Model.Student;
import com.CampusColab.Repository.NotificationRepository;
import com.CampusColab.ExceptionHandler.AppException;
import org.jspecify.annotations.NonNull;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NotificationService {
    private static final Logger log = LoggerFactory.getLogger(NotificationService.class);

    private final NotificationRepository notificationRepository;

    public NotificationService(NotificationRepository notificationRepository){
        this.notificationRepository = notificationRepository;
    }

    public void sendDeclinedNotification(@NonNull ProjectJoinRequest joinRequest){
        Notification notification = new Notification();

        notification.setStudent(joinRequest.getStudent());
        notification.setTitle("Application Declined");
        notification.setMessage(
                "Your application for " + joinRequest.getAppliedRole() + " in "
                        + joinRequest.getProject().getProjectName() + " was declined."
        );
        notification.setType("APPLICATION_DECLINED");
        notification.setCreatedAt(LocalDateTime.now());

        notificationRepository.save(notification);
        log.info("Saved declined-application notification");
    }

    public void sendAcceptNotification(@NonNull ProjectJoinRequest joinRequest){
        Notification notification = new Notification();

        notification.setStudent(joinRequest.getStudent());
        notification.setTitle("Application Accepted");
        notification.setMessage(
                "Your application for " + joinRequest.getAppliedRole() + " in "
                        + joinRequest.getProject().getProjectName() + " was accepted."
        );
        notification.setType("APPLICATION_ACCEPTED");
        notification.setCreatedAt(LocalDateTime.now());

        notificationRepository.save(notification);
        log.info("Saved accepted-application notification");
    }
    public void sendCompletionNotification(@NonNull Project project, Student student){
        Notification notification = new Notification();

        notification.setStudent(student);
        notification.setTitle("Project Completed !!");
        notification.setMessage(
                project.getProjectName() + " has been marked as completed by the project admin "
                        + project.getAdmin().getStudentName()
                        + "\nYour project statistics have been updated."
        );
        notification.setType("PROJECT_COMPLETE");
        notification.setCreatedAt(LocalDateTime.now());

        notificationRepository.save(notification);
        log.info("Saved project-completion notification projectId={}", project.getProjectId());
    }

    public void sendRatingNotification(@NonNull Project project, Student student, int rating, String comment) {
        Notification notification = new Notification();
        notification.setStudent(student);
        notification.setTitle("New Team Rating");
        notification.setMessage(
                "You received a " + rating + "/5 rating for " + project.getProjectName()
                        + (comment == null || comment.isBlank() ? "." : ". Feedback: " + comment)
        );
        notification.setType("TEAM_RATING");
        notification.setCreatedAt(LocalDateTime.now());
        notificationRepository.save(notification);
        log.info("Saved rating notification projectId={}", project.getProjectId());
    }

    public List<DTO.NotificationResponse> getNotification(long rollNumber){
        List<Notification> notifications =
                notificationRepository.findByStudent_RollNumber(rollNumber);
        log.debug("Loaded {} notifications for a student", notifications.size());
        return notifications.stream()
                .map(notification -> new DTO.NotificationResponse(
                        notification.getNotificationId(),
                        notification.getTitle(),
                        notification.getMessage(),
                        notification.getType(),
                        notification.getCreatedAt()
                ))
                .toList();
    }
    public boolean deleteNotification(int notificationId){
        if (!notificationRepository.existsById(notificationId)) {
            throw new AppException(HttpStatus.NOT_FOUND, "Notification not found");
        }
        notificationRepository.deleteById(notificationId);
        log.info("Deleted notification notificationId={}", notificationId);
        return true;
    }
}
