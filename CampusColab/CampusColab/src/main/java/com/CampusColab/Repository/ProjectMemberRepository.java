package com.CampusColab.Repository;

import com.CampusColab.Model.ProjectMember;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProjectMemberRepository extends JpaRepository<ProjectMember, Integer> {
    List<ProjectMember> findByProject_ProjectId(int projectId);
    List<ProjectMember> findByStudent_RollNumber(long rollNumber);
    void deleteByProject_ProjectId(int projectId);

    List<ProjectMember> findByStudent_RollNumberAndProject_Status(long rollNumber, String active);
}
