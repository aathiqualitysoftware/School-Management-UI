package com.lrs.ServiceImpl;

import com.lrs.Entity.Roles;
import com.lrs.Repository.RolesRepository;
import com.lrs.Service.RolesService;
import com.lrs.exception.ErrorCode;
import com.lrs.exception.ServiceException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class RolesServiceImpl implements RolesService {

    RolesRepository repository;
    @Autowired
    public RolesServiceImpl(RolesRepository rolesRepository){
        this.repository = rolesRepository;
    }

    @Override
    public List<Roles> getRoles(Long roleId) throws ServiceException {
        List<Roles> rolesList = repository.findByRoleId(roleId);
        if(rolesList.isEmpty()){
            throw new ServiceException(ErrorCode.SVS_ERR_0003);
        }
        return rolesList;
    }


    public Roles save(Roles role) {
        return repository.save(role);
    }

    public Roles update(Roles role) {
        return repository.save(role);
    }

    public List<Roles> getAll() {
        return repository.findAll();
    }

    public Roles getById(Long id) {
        return repository.findById(id).orElse(null);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public Optional<Roles> getByName(String name) {
        return repository.findByRoleName(name);
    }

    public List<Roles> getByCategory(String category) {
        return repository.findByRoleCategory(category);
    }
}
