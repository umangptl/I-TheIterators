package com.iterators.skillmatch.controller;

import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.iterators.skillmatch.model.Role;
import com.iterators.skillmatch.model.enums.Department;
import com.iterators.skillmatch.model.enums.UserRole;
import com.iterators.skillmatch.service.RoleService;

import java.util.ArrayList;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

@ContextConfiguration(classes = {RoleController.class})
@ExtendWith(SpringExtension.class)
class RoleController_Test {
    @Autowired
    private RoleController roleController;

    @MockBean
    private RoleService roleService;

    @Test
    void testAssignRole() throws Exception {
        Role role = new Role();
        role.setDepartment(Department.HR);
        role.setEmail("jane.doe@example.org");
        role.setId("42");
        role.setRole(UserRole.RECRUITER);
        String content = (new ObjectMapper()).writeValueAsString(role);
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/role")
                .contentType(MediaType.APPLICATION_JSON)
                .content(content);
        ResultActions actualPerformResult = MockMvcBuilders.standaloneSetup(roleController).build().perform(requestBuilder);
        actualPerformResult.andExpect(MockMvcResultMatchers.status().is(405));
    }

    @Test
    void testDeleteRole() throws Exception {
        doNothing().when(roleService).deleteRole(Mockito.<String>any());
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.delete("/role/{email}",
                "jane.doe@example.org");
        MockMvcBuilders.standaloneSetup(roleController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    void testGetAllRoles() throws Exception {
        when(roleService.getAllRoles()).thenReturn(new ArrayList<>());
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/role/getAllRoles");
        MockMvcBuilders.standaloneSetup(roleController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
                .andExpect(MockMvcResultMatchers.content().string("[]"));
    }

    @Test
    void testGetRole() throws Exception {
        Role role = new Role();
        role.setDepartment(Department.HR);
        role.setEmail("jane.doe@example.org");
        role.setId("42");
        role.setRole(UserRole.RECRUITER);
        when(roleService.getRole(Mockito.<String>any())).thenReturn(role);
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/role/email/{email}",
                "jane.doe@example.org");
        MockMvcBuilders.standaloneSetup(roleController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
                .andExpect(MockMvcResultMatchers.content()
                        .string("{\"id\":\"42\",\"email\":\"jane.doe@example.org\",\"role\":\"RECRUITER\",\"department\":\"HR\"}"));
    }
}
