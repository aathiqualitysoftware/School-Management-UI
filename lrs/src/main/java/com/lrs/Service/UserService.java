package com.lrs.Service;

import com.lrs.Entity.Users;
import com.lrs.exception.ServiceException;

import java.util.List;

public interface UserService {
    List<Users>  getAllUsers();
    Users register(String username, String rawPassword);
    Users validate(String username, String rawPassword, String roleName) throws ServiceException;
}
