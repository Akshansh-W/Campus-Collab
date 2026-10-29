package com.CampusColab.Service;

import com.CampusColab.DTO.DTO;
import com.CampusColab.Model.ProjectMember;
import com.CampusColab.Repository.ProjectMemberRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectMemberService {

    private static final Logger log = LoggerFactory.getLogger(ProjectMemberService.class);

    private final ProjectMemberRepository memberRepository;

    public ProjectMemberService(ProjectMemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }
    public int getActiveProjects(long rollNumber) {
        List<ProjectMember> members =
                memberRepository
                        .findByStudent_RollNumberAndProject_Status(
                                rollNumber,
                                "ACTIVE"
                        );

        int activeProjects = members.stream()
                .map(ProjectMember::getProject)
                .toList().size();
        log.debug("Counted {} active projects for a student", activeProjects);
        return activeProjects;
    }
    public void deleteMember(int projectId){
        memberRepository.deleteByProject_ProjectId(projectId);
        log.info("Deleted memberships for projectId={}", projectId);
    }
    public void saveMember(ProjectMember member){
        memberRepository.save(member);
        log.info("Saved project membership projectId={}", member.getProject().getProjectId());
    }
    public List<ProjectMember> findMember(int projectId){
        List<ProjectMember> members = memberRepository.findByProject_ProjectId(projectId);
        log.debug("Loaded {} memberships for projectId={}", members.size(), projectId);
        return members;
    }
    public List<ProjectMember> findMember(long rollNumber){
        List<ProjectMember> members = memberRepository.findByStudent_RollNumber(rollNumber);
        log.debug("Loaded {} memberships for a student", members.size());
        return members;
    }
    public List<DTO.memberResponse> getMember(int projectId){
        List<ProjectMember> members = memberRepository.findByProject_ProjectId(projectId);
        List<DTO.memberResponse> response = members.stream()
                .map(member -> new DTO.memberResponse(
                        member.getMemberId(),
                        member.getStudent().getRollNumber(),
                        member.getStudent().getStudentName(),
                        member.getStudent().getStudentEmail(),
                        member.getRole(),
                        member.getAppliedRole(),
                        member.getStudent().getCurrentYear(),
                        member.getStudent().getDepartment(),
                        member.getStudent().getRating(),
                        member.getStudent().getCompletedProjects()
                ))
                .toList();
        log.debug("Mapped {} project members for projectId={}", members.size(), projectId);
        return response;
    }
}
