package com.iterators.skillmatch.service.impl;

import com.iterators.skillmatch.exception.GlobalException;
import com.iterators.skillmatch.model.Role;
import com.iterators.skillmatch.model.enums.Department;
import com.iterators.skillmatch.model.enums.UserRole;
import com.iterators.skillmatch.repository.RoleRepository;
import com.iterators.skillmatch.service.RoleService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RoleServiceImpl implements RoleService {

    @Autowired
     RoleRepository roleRepository;
    Logger logger = LoggerFactory.getLogger(RecruiterServiceImpl.class);

    @Override
    public Role assignRoleAndDepartment(String email, UserRole role, Department department) throws GlobalException {
        try {
            Role roleAssignment = roleRepository.findByEmail(email);

            if (roleAssignment != null) {
                // Update the existing role assignment
                roleAssignment.setRole(role);
                roleAssignment.setDepartment(department);
            } else {
                // Create a new role assignment
                roleAssignment = new Role();
                roleAssignment.setEmail(email);
                roleAssignment.setRole(role);
                roleAssignment.setDepartment(department);
            }

            return roleRepository.save(roleAssignment);
        } catch (Exception exception) {
            // Handle any exceptions related to data access (e.g., database errors)
            throw new GlobalException("Error assigning role and department", exception);
        }
    }

    @Override
    public void updateRole(String email, UserRole role, Department department) throws GlobalException {
        try {
            Role roleAssignment = roleRepository.findByEmail(email);

            if (roleAssignment != null) {
                roleAssignment.setRole(role);
                roleAssignment.setDepartment(department);
                roleRepository.save(roleAssignment);
            }
            else{
                logger.info("Role assignment not found for email: " + email);
            }
        } catch (Exception exception) {
            throw new GlobalException("Error updating role and department", exception);
        }
    }

    @Override
    public void deleteRole(String email) throws GlobalException {
        try {
            Role roleAssignment = roleRepository.findByEmail(email);

            if (roleAssignment != null) {
                roleRepository.delete(roleAssignment);
            } else {
                logger.info("Role assignment not found for email: " + email);
            }
        } catch (Exception exception) {
            throw new GlobalException("Error deleting role assignment", exception);
        }
    }

    @Override
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }

}
