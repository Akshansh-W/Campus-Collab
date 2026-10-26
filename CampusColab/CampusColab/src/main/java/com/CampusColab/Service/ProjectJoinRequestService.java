package com.CampusColab.Service;

import com.CampusColab.DTO.DTO;
import com.CampusColab.ExceptionHandler.AppException;
import com.CampusColab.Model.Project;
import com.CampusColab.Model.ProjectJoinRequest;
import com.CampusColab.Model.ProjectMember;
import com.CampusColab.Model.Student;
import com.CampusColab.Repository.ProjectJoinRequestRepository;
import com.CampusColab.Repository.ProjectMemberRepository;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectJoinRequestService {

    private final StudentService studentService;
    private final ProjectService projectService;
    private final NotificationService notificationService;
    private final ProjectJoinRequestRepository joinRequestRepository;
    private final ProjectMemberRepository memberRepository;

    ProjectJoinRequestService(
            StudentService studentService,
            ProjectService projectService,
            NotificationService notificationService,
            ProjectJoinRequestRepository joinRequestRepository,
            ProjectMemberRepository memberRepository
            ){
        this.studentService = studentService;
        this.projectService = projectService;
        this.joinRequestRepository = joinRequestRepository;
        this.notificationService = notificationService;
        this.memberRepository = memberRepository;
    }

    public void submitJoinRequest(DTO.JoinRequest joinRequest){
        Student student = studentService.findStudent(joinRequest.rollNumber());
        Project project = projectService.findProject(Integer.parseInt(joinRequest.projectId()));

        if(project.getAdmin().getStudentName().equals(student.getStudentName())){
            throw new AppException(HttpStatus.BAD_REQUEST,"Admin can't applied for role in their project !");
        }

        boolean alreadyApplied =
                joinRequestRepository.existsByProjectAndStudentAndAppliedRole(
                        project,
                        student,
                        joinRequest.appliedRole()
                );

        if(alreadyApplied){
            throw new AppException(HttpStatus.BAD_REQUEST,"Already applied for this role");
        }

        ProjectJoinRequest joinRequest1 = new ProjectJoinRequest();

        joinRequest1.setAppliedRole(joinRequest.appliedRole());
        joinRequest1.setMessage(joinRequest.message());
        joinRequest1.setProject(project);
        joinRequest1.setStudent(student);
        joinRequest1.setStatus(ProjectJoinRequest.RequestStatus.PENDING);

        ProjectJoinRequest pjr =
                joinRequestRepository.save(joinRequest1);

    }

    @Transactional
    public void deleteRequest(int requestId){
        if (!joinRequestRepository.existsById(requestId)) {
            throw new AppException(HttpStatus.NOT_FOUND,"Request Not Found");
        }
        try {
            ProjectJoinRequest joinRequest = joinRequestRepository.findById(requestId)
                    .orElseThrow(() -> new RuntimeException("Exception arise while fetching"));
            joinRequestRepository.deleteById(requestId);
            notificationService.sendDeclinedNotification(joinRequest);
        }catch (Exception e){
            throw new AppException(HttpStatus.INTERNAL_SERVER_ERROR,"Unexpected error arise");
        }
    }

    @Transactional
    public void acceptRequest(int requestId){
        if (!joinRequestRepository.existsById(requestId)) {
            throw new AppException(HttpStatus.NOT_FOUND,"Request Not Found");
        }
        try {
            ProjectJoinRequest joinRequest = joinRequestRepository.findById(requestId)
                    .orElseThrow(() -> new RuntimeException("Exception arise while fetching"));

            ProjectMember projectMember = new ProjectMember();

            projectMember.setStudent(joinRequest.getStudent());
            projectMember.setAppliedRole((joinRequest.getAppliedRole()));
            projectMember.setRole("MEMBER");
            projectMember.setProject(joinRequest.getProject());

            memberRepository.save(projectMember);
            joinRequestRepository.deleteById(requestId);
            notificationService.sendAcceptNotification(joinRequest);
        } catch (Exception e){
            throw new AppException(HttpStatus.INTERNAL_SERVER_ERROR,"Unexpected Error");
        }
    }

    public List<DTO.JoinRequestResponse> getAllRequest(int projectId){
        List<ProjectJoinRequest> requests = joinRequestRepository.findByProject_ProjectId(projectId);
        return requests.stream()
                .map(request -> new DTO.JoinRequestResponse(
                        request.getRequestId(),
                        request.getStudent().getStudentName(),
                        request.getStudent().getRating(),
                        request.getAppliedRole(),
                        request.getStudent().getCompletedProjects(),
                        request.getMessage()
                ))
                .toList();

    }
}
