package com.CampusColab.Controller;

import com.CampusColab.DTO.DTO;
import com.CampusColab.ExceptionHandler.AppException;
import com.CampusColab.Model.Student;
import com.CampusColab.Service.JwtServices;
import com.CampusColab.Service.OtpService;
import com.CampusColab.Service.ProjectMemberService;
import com.CampusColab.Service.StudentService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/student")
@CrossOrigin(origins = "http://localhost:5173")
public class StudentController {

	private static final Logger log = LoggerFactory.getLogger(StudentController.class);

	private final OtpService otpService;
	private final StudentService studentService;
	private final JwtServices jwtServices;
	private final PasswordEncoder passwordEncoder;
	private final ProjectMemberService memberService;

	// Constructor Injection
	public StudentController(OtpService otpService, StudentService studentService,
							 JwtServices jwtServices ,
							 PasswordEncoder passwordEncoder, ProjectMemberService service) {
		this.otpService = otpService;
		this.studentService = studentService;
		this.jwtServices = jwtServices;
		this.passwordEncoder = passwordEncoder;
		this.memberService = service;
	}



	@PostMapping("/sendOtp")
	public ResponseEntity<?> sendOtp(@RequestBody DTO.OtpRequest otpRequest) {
		Student student = studentService.findStudent(otpRequest.email());
		if(student == null) {
			otpService.generateAndSendOtp(otpRequest.email());
			log.info("OTP verification email sent");
			return ResponseEntity.status(HttpStatus.OK).body(new DTO.ApiResponse("Otp sent successfully"));
		}else{
			log.info("OTP request rejected because the email is already registered");
			return ResponseEntity.status(HttpStatus.CONFLICT).body(new DTO.ApiResponse("Email already in use"));
		}
	}


	@PostMapping("/validateOtp")
	public ResponseEntity<?> validateOtp(@RequestBody DTO.OtpRequest otpRequest) {
		String email = otpRequest.email();
		String otp = otpRequest.otp();

		boolean isValid = otpService.validateOtp(email, otp);
		if (isValid) {
			log.info("OTP validation succeeded");
			return ResponseEntity.status(HttpStatus.OK).build();
		} else {
			log.warn("OTP validation failed");
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new DTO.ApiResponse("Invalid OTP"));
		}

	}

	@PostMapping("/createStudent")
	public ResponseEntity<?> createStudent(@RequestBody Student student) {
		DTO.ResponseWithToken savedStudent = studentService.storeStudentInDb(student);
		log.info("Student account created");
		return ResponseEntity.status(HttpStatus.CREATED).body(savedStudent);
	}


	@PostMapping("/getDashBoardData")
	public ResponseEntity<?> getDashBoardData(@RequestHeader("Authorization") String authHeader){
		String token = jwtServices.isTokenValid(authHeader);
		if(token == null){
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new DTO.ApiResponse("Session Expired, Please Login again"));
		}

		String email = jwtServices.extractEmail(token);

		if(email != null) {
			// Data for the dashboard
			Student student = studentService.findStudent(email);
			if (student == null) {
				throw new AppException(HttpStatus.NOT_FOUND, "Student not found");
			}

			// Data for the Stats card
			DTO.Stats stats = new DTO.Stats(student.noOfProjects(), student.getCompletedProjects(),
					student.getCollaborators(), student.getRating());

			// Data for the Active project section
			int activeProject = memberService.getActiveProjects(student.getRollNumber());

			log.info("Dashboard data fetched");
			return ResponseEntity.status(HttpStatus.OK).body(new DTO.SendProfileData(student,stats,activeProject));
		}else{
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(new DTO.ApiResponse("Invalid Token !!"));
		}
	}


	@PostMapping("/loginStudent")
	public ResponseEntity<?> loginStudent(@RequestBody DTO.LoginRequest loginRequest) {
		String email = loginRequest.email();
		Student student = studentService.findStudent(email);

		// Hashing password is commented out
//		if (student != null && passwordEncoder.matches(loginRequest.password(), student.getStudentPassword())) {
//			System.out.println(student.getStudentName());
//			String token = jwtServices.generateJwt(email, student.getRollNumber());
//			return ResponseEntity.status(HttpStatus.OK).body(new LoginResponse(token));
//		}

		// Remove this if block and use upper block to enable hashing password
		if(student != null && student.getStudentPassword().equals(loginRequest.password())){
			String token = jwtServices.generateJwt(email, student.getRollNumber());
			log.info("Student login succeeded");
			return ResponseEntity.status(HttpStatus.OK).body(new DTO.LoginResponse(token));
		}
		log.warn("Student login failed");
		return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new DTO.ApiResponse("User with this credentials does not exist"));
	}

}
