package com.iterators.skillmatch.service.impl;

import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.iterators.skillmatch.exception.GlobalException;
import com.iterators.skillmatch.model.Role;
import com.iterators.skillmatch.model.enums.Department;
import com.iterators.skillmatch.model.enums.UserRole;
import com.iterators.skillmatch.repository.RoleRepository;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ContextConfiguration(classes = {RoleServiceImpl.class})
@ExtendWith(SpringExtension.class)
class RoleServiceImplDiffblueTest {
    @MockBean
    private RoleRepository roleRepository;

    @Autowired
    private RoleServiceImpl roleServiceImpl;

    @Test
    void testAssignRoleAndDepartment() throws GlobalException {
        Role role = new Role();
        role.setDepartment(Department.HR);
        role.setEmail("jane.doe@example.org");
        role.setId("42");
        role.setRole(UserRole.RECRUITER);

        Role role2 = new Role();
        role2.setDepartment(Department.HR);
        role2.setEmail("jane.doe@example.org");
        role2.setId("42");
        role2.setRole(UserRole.RECRUITER);
        when(roleRepository.findByEmail(Mockito.<String>any())).thenReturn(role);
        when(roleRepository.save(Mockito.<Role>any())).thenReturn(role2);
        Role actualAssignRoleAndDepartmentResult = roleServiceImpl.assignRoleAndDepartment("jane.doe@example.org",
                UserRole.RECRUITER, Department.HR);
        verify(roleRepository).findByEmail(Mockito.<String>any());
        verify(roleRepository).save(Mockito.<Role>any());
        assertSame(role2, actualAssignRoleAndDepartmentResult);
    }

    @Test
    void testAssignRoleAndDepartment2() throws GlobalException {
        Role role = new Role();
        role.setDepartment(Department.HR);
        role.setEmail("jane.doe@example.org");
        role.setId("42");
        role.setRole(UserRole.RECRUITER);

        Role role2 = new Role();
        role2.setDepartment(Department.HR);
        role2.setEmail("jane.doe@example.org");
        role2.setId("42");
        role2.setRole(UserRole.RECRUITER);
        when(roleRepository.findByEmail(Mockito.<String>any())).thenReturn(role);
        when(roleRepository.save(Mockito.<Role>any())).thenReturn(role2);
        Role actualAssignRoleAndDepartmentResult = roleServiceImpl.assignRoleAndDepartment("jane.doe@example.org",
                UserRole.ADMIN, Department.HR);
        verify(roleRepository).findByEmail(Mockito.<String>any());
        verify(roleRepository).save(Mockito.<Role>any());
        assertSame(role2, actualAssignRoleAndDepartmentResult);
    }

    @Test
    void testUpdateRole() throws GlobalException {
        Role role = new Role();
        role.setDepartment(Department.HR);
        role.setEmail("jane.doe@example.org");
        role.setId("42");
        role.setRole(UserRole.RECRUITER);

        Role role2 = new Role();
        role2.setDepartment(Department.HR);
        role2.setEmail("jane.doe@example.org");
        role2.setId("42");
        role2.setRole(UserRole.RECRUITER);
        when(roleRepository.save(Mockito.<Role>any())).thenReturn(role2);
        when(roleRepository.findByEmail(Mockito.<String>any())).thenReturn(role);
        roleServiceImpl.updateRole("jane.doe@example.org", UserRole.RECRUITER, Department.HR);
        verify(roleRepository).findByEmail(Mockito.<String>any());
        verify(roleRepository).save(Mockito.<Role>any());
    }

    @Test
    void testUpdateRole2() throws GlobalException {
        Role role = new Role();
        role.setDepartment(Department.HR);
        role.setEmail("jane.doe@example.org");
        role.setId("42");
        role.setRole(UserRole.RECRUITER);

        Role role2 = new Role();
        role2.setDepartment(Department.HR);
        role2.setEmail("jane.doe@example.org");
        role2.setId("42");
        role2.setRole(UserRole.RECRUITER);
        when(roleRepository.save(Mockito.<Role>any())).thenReturn(role2);
        when(roleRepository.findByEmail(Mockito.<String>any())).thenReturn(role);
        roleServiceImpl.updateRole("jane.doe@example.org", UserRole.ADMIN, Department.HR);
        verify(roleRepository).findByEmail(Mockito.<String>any());
        verify(roleRepository).save(Mockito.<Role>any());
    }

    @Test
    void testDeleteRole() throws GlobalException {
        Role role = new Role();
        role.setDepartment(Department.HR);
        role.setEmail("jane.doe@example.org");
        role.setId("42");
        role.setRole(UserRole.RECRUITER);
        doNothing().when(roleRepository).delete(Mockito.<Role>any());
        when(roleRepository.findByEmail(Mockito.<String>any())).thenReturn(role);
        roleServiceImpl.deleteRole("jane.doe@example.org");
        verify(roleRepository).findByEmail(Mockito.<String>any());
        verify(roleRepository).delete(Mockito.<Role>any());
        assertTrue(roleServiceImpl.logger instanceof ch.qos.logback.classic.Logger);
        assertTrue(roleServiceImpl.getAllRoles().isEmpty());
    }

    @Test
    void testGetAllRoles() {
        ArrayList<Role> roleList = new ArrayList<>();
        when(roleRepository.findAll()).thenReturn(roleList);
        List<Role> actualAllRoles = roleServiceImpl.getAllRoles();
        verify(roleRepository).findAll();
        assertTrue(actualAllRoles.isEmpty());
        assertSame(roleList, actualAllRoles);
    }

    @Test
    void testGetRole() throws GlobalException {
        Role role = new Role();
        role.setDepartment(Department.HR);
        role.setEmail("jane.doe@example.org");
        role.setId("42");
        role.setRole(UserRole.RECRUITER);
        when(roleRepository.findByEmail(Mockito.<String>any())).thenReturn(role);
        Role actualRole = roleServiceImpl.getRole("jane.doe@example.org");
        verify(roleRepository).findByEmail(Mockito.<String>any());
        assertSame(role, actualRole);
    }
}
