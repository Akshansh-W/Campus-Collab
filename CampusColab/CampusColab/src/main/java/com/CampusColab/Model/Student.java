package com.CampusColab.Model;


import java.util.ArrayList;
import java.util.List;

import com.CampusColab.Repository.ProjectMemberRepository;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.CampusColab.Model.Project;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

// POJO Class, This will store in the database
@Entity

public class Student {
	// Login,SignUp details
	@Column(unique = true, nullable = false)
	private String studentEmail;
	@Column(length = 255)
	private String studentPassword;

	// Form details
	private String studentName;
	@Id
	private long rollNumber;
	private int currentYear;
	private String department;
	@ElementCollection
	private List<String> technicalInterest = new ArrayList<>();

	// Dashboard details
	private int collaborators = 0;
	private float rating = 0.0f;
	private int completedProjects = 0;

	@OneToMany(mappedBy = "admin", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JsonIgnoreProperties("student")
	private List<Project> projects = new ArrayList<>();

	// Helper Functions
	public int noOfProjects(){
		return projects.size();
	}

	public int getCompletedProjects(){
		return completedProjects;
	}

	public void setCompletedProjects(int completedProjects) {
		this.completedProjects = completedProjects;
	}

	public void incrementCompletedProjects() {
		this.completedProjects += 1;
	}

	public void incrementCollaborators(int collaborators){
		this.collaborators += collaborators;
	}

	// Normal Getters and Setters


	public String getStudentEmail() {
		return studentEmail;
	}

	public void setStudentEmail(String studentEmail) {
		this.studentEmail = studentEmail;
	}

	public String getStudentPassword() {
		return studentPassword;
	}

	public void setStudentPassword(String studentPassword) {
		this.studentPassword = studentPassword;
	}

	public String getStudentName() {
		return studentName;
	}

	public void setStudentName(String studentName) {
		this.studentName = studentName;
	}

	public long getRollNumber() {
		return rollNumber;
	}

	public void setRollNumber(long rollNumber) {
		this.rollNumber = rollNumber;
	}

	public int getCurrentYear() {
		return currentYear;
	}

	public void setCurrentYear(int currentYear) {
		this.currentYear = currentYear;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public List<String> getTechnicalInterest() {
		return technicalInterest;
	}

	public void setTechnicalInterest(List<String> technicalInterest) {
		this.technicalInterest = technicalInterest;
	}

	public int getCollaborators() {
		return collaborators;
	}

	public void setCollaborators(int collaborators) {
		this.collaborators = collaborators;
	}

	public float getRating() {
		return rating;
	}

	public void setRating(float rating) {
		this.rating = rating;
	}
}
