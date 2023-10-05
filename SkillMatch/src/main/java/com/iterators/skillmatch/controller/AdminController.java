package com.iterators.skillmatch.controller;

import com.iterators.skillmatch.exception.GlobalException;
import com.iterators.skillmatch.model.Role;
import com.iterators.skillmatch.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private RoleService roleService;

    @PostMapping("/assignRole")
    public Role assignRole(@RequestBody Role request) throws GlobalException {
        return roleService.assignRoleAndDepartment(request.getEmail() , request.getRole(), request.getDepartment());
    }

    @PutMapping("/updateRole")
    public void updateRole(@RequestBody Role request) throws GlobalException {
        roleService.updateRole(request.getEmail(), request.getRole(), request.getDepartment());
    }

    @DeleteMapping("/deleteRole/{email}")
    public void deleteRole(@PathVariable String email) throws GlobalException {
        roleService.deleteRole(email);
    }

    @GetMapping("/getAllRoles")
    public List<Role> getAllRoles() {
        return roleService.getAllRoles();
    }
}

