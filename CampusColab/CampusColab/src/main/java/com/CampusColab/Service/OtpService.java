package com.CampusColab.Service;

import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class OtpService {

    private static final Logger log = LoggerFactory.getLogger(OtpService.class);

    JavaMailSender mailSender;
    public OtpService(JavaMailSender mailSender){
        this.mailSender = mailSender;
    }

    public record OtpData(String otp,LocalDateTime expiryTime){}
    Map<String,OtpData> otpStorage = new ConcurrentHashMap<>();


    public void generateAndSendOtp(String email){
        String otp = String.format("%04d",new SecureRandom().nextInt(10000));
        int otpExpireTime = 5;
        LocalDateTime expiryTime = LocalDateTime.now().plusMinutes(otpExpireTime);

        otpStorage.put(email,new OtpData(otp,expiryTime));

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("OTP Verification");
        message.setText("Thanks for choosing CampusColab, Your one time password for Signing " +
                "in is "+otp+", don't share it with anybody");

        mailSender.send(message);
        log.info("OTP verification email sent");

    }

    public Boolean validateOtp(String email, String userOtp) {

        OtpData otpData = otpStorage.get(email);

        if (otpData == null) {
            log.warn("OTP validation failed because no OTP is stored");
            return false;
        }

        if (LocalDateTime.now().isAfter(otpData.expiryTime())) {
            log.warn("OTP validation failed because the OTP expired");
            return false;
        }

        if (otpData.otp().equals(userOtp)) {
            otpStorage.remove(email);
            log.info("OTP validation succeeded");
            return true;
        }else{
            log.warn("OTP validation failed because the supplied OTP did not match");
            return false;
        }
    }


}
