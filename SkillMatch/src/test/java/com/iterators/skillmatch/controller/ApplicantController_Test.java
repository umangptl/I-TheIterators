package com.iterators.skillmatch.controller;

import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.iterators.skillmatch.model.Applicant;
import com.iterators.skillmatch.model.enums.Provider;
import com.iterators.skillmatch.service.ApplicantService;

import java.util.ArrayList;

import org.bson.types.Binary;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

@ContextConfiguration(classes = {ApplicantController.class})
@ExtendWith(SpringExtension.class)
class ApplicantController_Test {
    @Autowired
    private ApplicantController applicantController;

    @MockBean
    private ApplicantService applicantService;

    @Test
    void testAddApplicant() throws Exception {
        when(applicantService.getAllApplicant()).thenReturn(new ArrayList<>());

        Applicant applicant = new Applicant();
        applicant.setAddress("42 Main St");
        applicant.setCoverLetter(new Binary("AXAXAXAX".getBytes("UTF-8")));
        applicant.setEmail("jane.doe@example.org");
        applicant.setFirstName("Jane");
        applicant.setId("42");
        applicant.setLastName("Doe");
        applicant.setPhoneNumber("999999999");
        applicant.setProvider(Provider.LOCAL);
        applicant.setResume(new Binary("AXAXAXAX".getBytes("UTF-8")));
        String content = (new ObjectMapper()).writeValueAsString(applicant);
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/applicant")
                .contentType(MediaType.APPLICATION_JSON)
                .content(content);
        MockMvcBuilders.standaloneSetup(applicantController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
                .andExpect(MockMvcResultMatchers.content().string("[]"));
    }

    @Test
    void testDeleteApplicant() throws Exception {
        doNothing().when(applicantService).deleteApplicant(Mockito.<String>any());
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.delete("/applicant/{applicantId}", "42");
        MockMvcBuilders.standaloneSetup(applicantController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    void testFilterApplicantByEmail() throws Exception {
        when(applicantService.filterApplicantOnEmail(Mockito.<String>any())).thenReturn(new ArrayList<>());
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/applicant/email/{emailFilter}",
                "jane.doe@example.org");
        MockMvcBuilders.standaloneSetup(applicantController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
                .andExpect(MockMvcResultMatchers.content().string("[]"));
    }

    @Test
    void testFilterApplicantByName() throws Exception {
        when(applicantService.filterApplicantOnName(Mockito.<String>any())).thenReturn(new ArrayList<>());
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/applicant/name/{nameFilter}",
                "Name Filter");
        MockMvcBuilders.standaloneSetup(applicantController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
                .andExpect(MockMvcResultMatchers.content().string("[]"));
    }

    @Test
    void testGetAllApplicants() throws Exception {
        when(applicantService.getAllApplicant()).thenReturn(new ArrayList<>());
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/applicant");
        MockMvcBuilders.standaloneSetup(applicantController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
                .andExpect(MockMvcResultMatchers.content().string("[]"));
    }

    @Test
    void testGetApplicantById() throws Exception {
        when(applicantService.getApplicant(Mockito.<String>any())).thenReturn(new Applicant());
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/applicant/{applicantId}", "42");
        MockMvcBuilders.standaloneSetup(applicantController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
                .andExpect(MockMvcResultMatchers.content()
                        .string(
                                "{\"id\":null,\"email\":null,\"firstName\":null,\"lastName\":null,\"phoneNumber\":null,\"address\":null,\"resume\""
                                        + ":null,\"coverLetter\":null,\"provider\":null,\"actualJobTitle\":null,\"actualEmployer\":null}"));
    }
}
