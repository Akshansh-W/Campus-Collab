package com.CampusColab.Service;

import com.CampusColab.DTO.DTO;
import com.CampusColab.Model.ProjectMember;
import com.CampusColab.Repository.ProjectMemberRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectMemberService {

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

        return members.stream()
                .map(ProjectMember::getProject)
                .toList().size();
    }
    public void deleteMember(int projectId){
        try {
            memberRepository.deleteByProject_ProjectId(projectId);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
    public void saveMember(ProjectMember member){
        try{
             memberRepository.save(member);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
    public List<ProjectMember> findMember(int projectId){
        try {
            return memberRepository.findByProject_ProjectId(projectId);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }
    public List<ProjectMember> findMember(long rollNumber){
        return memberRepository.findByStudent_RollNumber(rollNumber);
    }
    public List<DTO.memberResponse> getMember(int projectId){
        List<ProjectMember> members = memberRepository.findByProject_ProjectId(projectId);
        return members.stream()
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
    }
}

