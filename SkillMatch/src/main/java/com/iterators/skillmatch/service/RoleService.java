package com.iterators.skillmatch.service;

import com.iterators.skillmatch.exception.GlobalException;
import com.iterators.skillmatch.model.Role;
import com.iterators.skillmatch.model.enums.Department;
import com.iterators.skillmatch.model.enums.UserRole;

import java.util.List;

public interface RoleService {
    Role assignRoleAndDepartment(String email, UserRole role, Department department) throws GlobalException;

    void updateRole(String email, UserRole role, Department department) throws GlobalException;

    void deleteRole(String email) throws GlobalException;

    List<Role> getAllRoles();

    Role getRole(String email) throws GlobalException;
}
