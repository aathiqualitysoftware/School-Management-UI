package com.lrs.ServiceImpl;

import com.lrs.Dto.AllMasterDataResponse;
import com.lrs.Entity.Roles;
import com.lrs.Entity.Users;
import com.lrs.Repository.RolesRepository;
import com.lrs.Repository.StudRepository;
import com.lrs.Repository.StudentsRepository;
import com.lrs.Repository.UserRepository;
import com.lrs.Service.UserService;
import com.lrs.exception.ErrorCode;
import com.lrs.exception.ServiceException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

@Slf4j
@Service
public class UserServiceImpl implements UserService {

    UserRepository userRepository;
    RolesRepository rolesRepository;
    StudentsRepository studRepository;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();


    @Autowired
    public UserServiceImpl(UserRepository userRepository,
                           RolesRepository rolesRepository,
                           StudentsRepository studRepository){
        this.userRepository = userRepository;
        this.rolesRepository = rolesRepository;
        this.studRepository = studRepository;
    }
    @Override
    public List<Users> getAllUsers() {
        return userRepository.findAll();
    }
    public Users register(String username, String rawPassword) {
        Users u = new Users();
        u.setUserName(username);
        u.setPassword(encoder.encode(rawPassword));
        return userRepository.save(u);
    }

    public Users validate(String username, String rawPassword, String roleName) throws ServiceException {



        Optional<Users> usersMap = Optional.ofNullable(userRepository.findByUserName(username)
                .filter(u -> encoder.matches(rawPassword, u.getPassword()))
                .orElse(null));
       if(usersMap.isEmpty()){
           throw new ServiceException(ErrorCode.SVS_ERR_0005);
       }

        return usersMap.get();
    }

}
