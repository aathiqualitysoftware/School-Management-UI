package com.lrs.Service;

import com.lrs.Entity.Roles;
import com.lrs.Entity.Users;
import com.lrs.exception.ServiceException;

import java.util.List;

public interface RolesService {
    List<Roles> getRoles(Long roles) throws ServiceException;
}
