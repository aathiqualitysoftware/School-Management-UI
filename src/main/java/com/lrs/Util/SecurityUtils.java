package com.lrs.Util;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.lrs.Dto.LogInStudentResponse;
import lombok.extern.log4j.Log4j;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;

import java.util.HashMap;
import java.util.Map;


@Slf4j
public final class SecurityUtils {
    public SecurityUtils() {
    }
    public static String getLogInUserName(){
        String userName = "";
        if(SecurityContextHolder.getContext().getAuthentication()!=null
        && SecurityContextHolder.getContext().getAuthentication().getPrincipal() instanceof Jwt data){
            userName = data.getClaim("sub");
        }
        return userName;
    }
    public static LogInStudentResponse getLogInStudent(){
        LogInStudentResponse logInStudentResponse = new LogInStudentResponse();
        if(SecurityContextHolder.getContext().getAuthentication()!=null
                && SecurityContextHolder.getContext().getAuthentication().getPrincipal() instanceof Jwt data){
            Map<String,Object> map = new HashMap<>();
            map = data.getClaim("student");
            ObjectMapper mapper = new ObjectMapper();
            logInStudentResponse = mapper.convertValue(map, LogInStudentResponse.class);
        }
        return logInStudentResponse;
    }
}
