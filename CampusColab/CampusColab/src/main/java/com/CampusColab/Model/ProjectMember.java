package com.CampusColab.Model;

import jakarta.persistence.*;

@Entity
public class ProjectMember {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int memberId;

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;

    @ManyToOne
    @JoinColumn(name = "student_rollNumber")
    private Student student;

    @Column(nullable = false)
    private String role;

    @Column(nullable = false)
    private String appliedRole;

    public String getAppliedRole() {return appliedRole;}

    public void setAppliedRole(String appliedRole) {this.appliedRole = appliedRole;}

    public int getMemberId() {return memberId;}

    public void setMemberId(int memberId) {
        this.memberId = memberId;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

}
