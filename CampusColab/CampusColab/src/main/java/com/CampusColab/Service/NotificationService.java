package com.CampusColab.Service;

import com.CampusColab.DTO.DTO;
import com.CampusColab.Model.Notification;
import com.CampusColab.Model.Project;
import com.CampusColab.Model.ProjectJoinRequest;
import com.CampusColab.Model.Student;
import com.CampusColab.Repository.NotificationRepository;
import org.jspecify.annotations.NonNull;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class NotificationService {
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
    }

    public List<DTO.NotificationResponse> getNotification(long rollNumber){
        List<Notification> notifications =
                notificationRepository.findByStudent_RollNumber(rollNumber);
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
        try {
            notificationRepository.deleteById(notificationId);
            return true;
        } catch (Exception e) {
            return false;
        }


    }
}
