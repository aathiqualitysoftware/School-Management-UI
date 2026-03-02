package com.lrs.Util;
import com.lrs.Dto.StudentDetailsProjection;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.context.annotation.Bean;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtUtil {
    private static final String SECRET_KEY = "mySecretKeyForJwtTokensThatIsAtLeast256BitsLong"; // Use a secure key in production
    private static final long EXPIRATION_TIME = 1000 * 60 * 60; // 1 hour

    private final Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

    // Generate token with username and roles
    public String generateToken(String username, List<String> roles, StudentDetailsProjection students) {
        Map<String, Object> claims = new HashMap<>();
        Map<String, Object> student = new HashMap<>();
        claims.put("roles", roles);
        List<String> cntList = roles.stream().filter(x->x.equalsIgnoreCase("Admin")).toList();
        if(!cntList.isEmpty()){

        }else{
            if(null!=students){
                student.put("studentName",students.getName());
                student.put("studentId",students.getStudentId());
                student.put("className",students.getClassName());
                student.put("sectionName",students.getSectionName());
                student.put("classId",students.getClassId());
                student.put("sectionId",students.getSectionId());
            }

        }
        claims.put("student", student);

        claims.put("sub", username);
        return Jwts.builder()
                .setSubject(username)
                .setClaims(claims)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    // Validate and get subject (username)
    public String validateAndGetSubject(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    // Get roles from token
    public List<String> getRolesFromToken(String token) {
        Claims claims = getAllClaimsFromToken(token);
        return claims.get("roles", List.class);
    }

    // Check if token is expired
    public boolean isTokenExpired(String token) {
        Date expiration = getClaimFromToken(token, Claims::getExpiration);
        return expiration.before(new Date());
    }

    // Validate token (check signature and expiration)
    public boolean validateToken(String token, String username) {
        String tokenUsername = validateAndGetSubject(token);
        return (username.equals(tokenUsername) && !isTokenExpired(token));
    }

    private <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    private Claims getAllClaimsFromToken(String token) {
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token).getBody();
    }
    @Bean
    public JwtDecoder jwtDecoder() {
        SecretKey secretKey = new SecretKeySpec(SECRET_KEY.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
        return NimbusJwtDecoder.withSecretKey(secretKey).build();
    }

}