package com.CampusColab.Service;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Service;

import java.security.Key;
import java.util.Date;

@Service
public class JwtServices {

    private Key getKey(){
        String SECRET_KEY = "SecretKeyForAssigningTokenTOUserWheneverHeOrSheLoggedInIntoTheWebsite";
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    public String generateJwt(String email,long rollNumber){
        long EXPIRATION_TIME = 1000 * 60 * 60 * 24;
        return Jwts.builder()
                .setSubject(email)
                .claim("rollNumber",rollNumber)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(getKey() , SignatureAlgorithm.HS256)
                .compact();
    }

    private Claims extractAllClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(getKey())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }


    public String extractEmail(String token) {
        return extractAllClaims(token).getSubject();
    }
    public Long extractRollNumber(String token){ return extractAllClaims(token).get("rollNumber",Long.class);}

    public String isTokenValid(String authHeader) {
        try {

            // Parses signature and checks expiration automatically
            if (authHeader == null || !authHeader.startsWith("Bearer ")) {
                return null;
            }


            String token = authHeader.substring(7);
            extractAllClaims(token);

            return token;
        } catch (JwtException | IllegalArgumentException e) {
            return null;
        }
    }


}
