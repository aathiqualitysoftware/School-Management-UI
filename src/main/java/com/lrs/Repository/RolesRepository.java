package com.lrs.Repository;
import com.lrs.Entity.Roles;
import com.lrs.Entity.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface RolesRepository extends JpaRepository<Roles, Long> {
    Optional<Roles> findByRoleName(String roleName);
    List<Roles> findAll();
    List<Roles> findByRoleId(Long roleId);
    // Find by role category
    List<Roles> findByRoleCategory(String roleCategory);

}

