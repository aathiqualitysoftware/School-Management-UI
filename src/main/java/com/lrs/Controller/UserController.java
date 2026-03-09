package com.lrs.Controller;

import com.lrs.Dto.GenericResponse;
import com.lrs.Dto.UserResponse;
import com.lrs.Entity.Users;
import com.lrs.Service.UserService;
import com.lrs.exception.ServiceException;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/user")
@RestController
@Slf4j
public class UserController {

    private UserService userService;
    private ModelMapper modelMapper;
    @Autowired
    public UserController(UserService userService,
                          ModelMapper modelMapper){
        this.userService = userService;
        this.modelMapper = modelMapper;
    }
    @GetMapping
    public ResponseEntity<GenericResponse<List<UserResponse>>> getAllUsers() throws ServiceException {
        /*get all users*/
        List<Users> users = userService.getAllUsers();
//        log.info("Successfully fetched all the users");
/* build responce*/
        GenericResponse<List<UserResponse>> response = new GenericResponse<>();
        response.setData(modelMapper.map(users,new TypeToken<List<UserResponse>>(){
        }.getType()));
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
