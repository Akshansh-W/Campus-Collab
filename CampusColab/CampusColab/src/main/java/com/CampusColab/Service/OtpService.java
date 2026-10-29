package com.CampusColab.Service;

import com.CampusColab.ExceptionHandler.AppException;
import com.resend.Resend;
import com.resend.core.exception.ResendException;
import com.resend.services.emails.model.CreateEmailOptions;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class OtpService {

    private static final Logger log = LoggerFactory.getLogger(OtpService.class);

    private final Resend resend;
    private final String from;

    public OtpService(
            @Value("${resend.api.key}") String apiKey,
            @Value("${resend.from}") String from
    ) {
        this.resend = new Resend(apiKey);
        this.from = from;
    }

    public record OtpData(String otp,LocalDateTime expiryTime){}
    private final Map<String,OtpData> otpStorage = new ConcurrentHashMap<>();


    public void generateAndSendOtp(String email){
        String otp = String.format("%04d",new SecureRandom().nextInt(10000));
        int otpExpireTime = 5;
        LocalDateTime expiryTime = LocalDateTime.now().plusMinutes(otpExpireTime);
        OtpData otpData = new OtpData(otp, expiryTime);

        otpStorage.put(email, otpData);

        try {
            CreateEmailOptions message = CreateEmailOptions.builder()
                    .from(from)
                    .to(email)
                    .subject("OTP Verification")
                    .text("Thanks for choosing CampusColab, Your one time password for Signing " +
                            "in is " + otp + ", don't share it with anybody")
                    .build();
            resend.emails().send(message);
            log.info("OTP verification email sent");
        } catch (ResendException e) {
            otpStorage.remove(email, otpData);
            log.error("OTP email delivery failed ({})", e.getClass().getSimpleName());
            throw new AppException(HttpStatus.SERVICE_UNAVAILABLE, "Unable to send OTP email");
        } catch (RuntimeException e) {
            otpStorage.remove(email, otpData);
            log.error("OTP email delivery failed ({})", e.getClass().getSimpleName());
            throw new AppException(HttpStatus.SERVICE_UNAVAILABLE, "Unable to send OTP email");
        }
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
