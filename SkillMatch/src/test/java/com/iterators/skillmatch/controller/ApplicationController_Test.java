package com.iterators.skillmatch.controller;

import static org.mockito.Mockito.when;

import com.iterators.skillmatch.model.Applicant;
import com.iterators.skillmatch.model.Application;
import com.iterators.skillmatch.model.enums.ApplicationStatus;
import com.iterators.skillmatch.model.enums.Provider;
import com.iterators.skillmatch.service.ApplicationService;

import java.io.InputStream;
import java.util.ArrayList;

import org.bson.types.Binary;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.mock.web.MockMultipartFile;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.request.MockHttpServletRequestBuilder;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

@ContextConfiguration(classes = {ApplicationController.class})
@ExtendWith(SpringExtension.class)
class ApplicationController_Test {
    @Autowired
    private ApplicationController applicationController;

    @MockBean
    private ApplicationService applicationService;

    @Test
    void testAddApplication() throws Exception {
        when(applicationService.getAllApplications()).thenReturn(new ArrayList<>());
        MockHttpServletRequestBuilder paramResult = MockMvcRequestBuilders.get("/application").param("applicant", "foo");
        MockHttpServletRequestBuilder requestBuilder = paramResult.param("file",
                String.valueOf(new MockMultipartFile("Name", (InputStream) null)));
        MockMvcBuilders.standaloneSetup(applicationController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
                .andExpect(MockMvcResultMatchers.content().string("[]"));
    }

    @Test
    void testGetAllApplications() throws Exception {
        when(applicationService.getAllApplications()).thenReturn(new ArrayList<>());
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/application");
        MockMvcBuilders.standaloneSetup(applicationController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
                .andExpect(MockMvcResultMatchers.content().string("[]"));
    }

    @Test
    void testGetAllApplications2() throws Exception {
        Application application = new Application();
        application.setApplicant(new Applicant());
        application.setApplicationId("42");
        application.setJobId("42");
        application.setStatus(ApplicationStatus.PENDING);

        ArrayList<Application> applicationList = new ArrayList<>();
        applicationList.add(application);
        when(applicationService.getAllApplications()).thenReturn(applicationList);
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/application");
        MockMvcBuilders.standaloneSetup(applicationController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
                .andExpect(MockMvcResultMatchers.content()
                        .string(
                                "[{\"applicationId\":\"42\",\"status\":\"PENDING\",\"jobId\":\"42\",\"applicant\":{\"id\":null,\"email\":null,\"firstName"
                                        + "\":null,\"lastName\":null,\"phoneNumber\":null,\"address\":null,\"resume\":null,\"coverLetter\":null,\"provider\""
                                        + ":null,\"actualJobTitle\":null,\"actualEmployer\":null}}]"));
    }

    @Test
    void testGetAllApplications3() throws Exception {
        Application application = new Application();
        application.setApplicant(new Applicant());
        application.setApplicationId("42");
        application.setJobId("42");
        application.setStatus(ApplicationStatus.PENDING);

        Application application2 = new Application();
        application2.setApplicant(new Applicant());
        application2.setApplicationId("Application Id");
        application2.setJobId("Job Id");
        application2.setStatus(ApplicationStatus.REJECTED);

        ArrayList<Application> applicationList = new ArrayList<>();
        applicationList.add(application2);
        applicationList.add(application);
        when(applicationService.getAllApplications()).thenReturn(applicationList);
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/application");
        MockMvcBuilders.standaloneSetup(applicationController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
                .andExpect(MockMvcResultMatchers.content()
                        .string(
                                "[{\"applicationId\":\"Application Id\",\"status\":\"REJECTED\",\"jobId\":\"Job Id\",\"applicant\":{\"id\":null,\"email"
                                        + "\":null,\"firstName\":null,\"lastName\":null,\"phoneNumber\":null,\"address\":null,\"resume\":null,\"coverLetter"
                                        + "\":null,\"provider\":null,\"actualJobTitle\":null,\"actualEmployer\":null}},{\"applicationId\":\"42\",\"status\":"
                                        + "\"PENDING\",\"jobId\":\"42\",\"applicant\":{\"id\":null,\"email\":null,\"firstName\":null,\"lastName\":null,\"phoneNumber"
                                        + "\":null,\"address\":null,\"resume\":null,\"coverLetter\":null,\"provider\":null,\"actualJobTitle\":null,"
                                        + "\"actualEmployer\":null}}]"));
    }

    @Test
    void testAddApplication2() throws Exception {
        Application application = new Application();
        application.setApplicant(new Applicant());
        application.setApplicationId("42");
        application.setJobId("42");
        application.setStatus(ApplicationStatus.PENDING);

        ArrayList<Application> applicationList = new ArrayList<>();
        applicationList.add(application);
        when(applicationService.getAllApplications()).thenReturn(applicationList);
        MockHttpServletRequestBuilder paramResult = MockMvcRequestBuilders.get("/application").param("applicant", "foo");
        MockHttpServletRequestBuilder requestBuilder = paramResult.param("file",
                String.valueOf(new MockMultipartFile("Name", (InputStream) null)));
        MockMvcBuilders.standaloneSetup(applicationController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
                .andExpect(MockMvcResultMatchers.content()
                        .string(
                                "[{\"applicationId\":\"42\",\"status\":\"PENDING\",\"jobId\":\"42\",\"applicant\":{\"id\":null,\"email\":null,\"firstName"
                                        + "\":null,\"lastName\":null,\"phoneNumber\":null,\"address\":null,\"resume\":null,\"coverLetter\":null,\"provider\""
                                        + ":null,\"actualJobTitle\":null,\"actualEmployer\":null}}]"));
    }

    @Test
    void testAddApplication3() throws Exception {
        Application application = new Application();
        application.setApplicant(new Applicant());
        application.setApplicationId("42");
        application.setJobId("42");
        application.setStatus(ApplicationStatus.PENDING);

        Application application2 = new Application();
        application2.setApplicant(new Applicant());
        application2.setApplicationId("Application Id");
        application2.setJobId("Job Id");
        application2.setStatus(ApplicationStatus.REJECTED);

        ArrayList<Application> applicationList = new ArrayList<>();
        applicationList.add(application2);
        applicationList.add(application);
        when(applicationService.getAllApplications()).thenReturn(applicationList);
        MockHttpServletRequestBuilder paramResult = MockMvcRequestBuilders.get("/application").param("applicant", "foo");
        MockHttpServletRequestBuilder requestBuilder = paramResult.param("file",
                String.valueOf(new MockMultipartFile("Name", (InputStream) null)));
        MockMvcBuilders.standaloneSetup(applicationController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
                .andExpect(MockMvcResultMatchers.content()
                        .string(
                                "[{\"applicationId\":\"Application Id\",\"status\":\"REJECTED\",\"jobId\":\"Job Id\",\"applicant\":{\"id\":null,\"email"
                                        + "\":null,\"firstName\":null,\"lastName\":null,\"phoneNumber\":null,\"address\":null,\"resume\":null,\"coverLetter"
                                        + "\":null,\"provider\":null,\"actualJobTitle\":null,\"actualEmployer\":null}},{\"applicationId\":\"42\",\"status\":"
                                        + "\"PENDING\",\"jobId\":\"42\",\"applicant\":{\"id\":null,\"email\":null,\"firstName\":null,\"lastName\":null,\"phoneNumber"
                                        + "\":null,\"address\":null,\"resume\":null,\"coverLetter\":null,\"provider\":null,\"actualJobTitle\":null,"
                                        + "\"actualEmployer\":null}}]"));
    }

    @Test
    void testGetApplicationByApplicantId() throws Exception {
        when(applicationService.viewApplicationsByEmailId(Mockito.<String>any())).thenReturn(new ArrayList<>());
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/application/applicant/{emailId}", "42");
        MockMvcBuilders.standaloneSetup(applicationController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
                .andExpect(MockMvcResultMatchers.content().string("[]"));
    }

    @Test
    void testGetApplicationByApplicantId2() throws Exception {
        Application application = new Application();
        application.setApplicant(new Applicant());
        application.setApplicationId("42");
        application.setJobId("42");
        application.setStatus(ApplicationStatus.PENDING);

        ArrayList<Application> applicationList = new ArrayList<>();
        applicationList.add(application);
        when(applicationService.viewApplicationsByEmailId(Mockito.<String>any())).thenReturn(applicationList);
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/application/applicant/{emailId}", "42");
        MockMvcBuilders.standaloneSetup(applicationController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
                .andExpect(MockMvcResultMatchers.content()
                        .string(
                                "[{\"applicationId\":\"42\",\"status\":\"PENDING\",\"jobId\":\"42\",\"applicant\":{\"id\":null,\"email\":null,\"firstName"
                                        + "\":null,\"lastName\":null,\"phoneNumber\":null,\"address\":null,\"resume\":null,\"coverLetter\":null,\"provider\""
                                        + ":null,\"actualJobTitle\":null,\"actualEmployer\":null}}]"));
    }

    @Test
    void testGetApplicationByApplicantId3() throws Exception {
        Application application = new Application();
        application.setApplicant(new Applicant());
        application.setApplicationId("42");
        application.setJobId("42");
        application.setStatus(ApplicationStatus.PENDING);

        Application application2 = new Application();
        application2.setApplicant(new Applicant());
        application2.setApplicationId("Application Id");
        application2.setJobId("Job Id");
        application2.setStatus(ApplicationStatus.REJECTED);

        ArrayList<Application> applicationList = new ArrayList<>();
        applicationList.add(application2);
        applicationList.add(application);
        when(applicationService.viewApplicationsByEmailId(Mockito.<String>any())).thenReturn(applicationList);
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/application/applicant/{emailId}", "42");
        MockMvcBuilders.standaloneSetup(applicationController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
                .andExpect(MockMvcResultMatchers.content()
                        .string(
                                "[{\"applicationId\":\"Application Id\",\"status\":\"REJECTED\",\"jobId\":\"Job Id\",\"applicant\":{\"id\":null,\"email"
                                        + "\":null,\"firstName\":null,\"lastName\":null,\"phoneNumber\":null,\"address\":null,\"resume\":null,\"coverLetter"
                                        + "\":null,\"provider\":null,\"actualJobTitle\":null,\"actualEmployer\":null}},{\"applicationId\":\"42\",\"status\":"
                                        + "\"PENDING\",\"jobId\":\"42\",\"applicant\":{\"id\":null,\"email\":null,\"firstName\":null,\"lastName\":null,\"phoneNumber"
                                        + "\":null,\"address\":null,\"resume\":null,\"coverLetter\":null,\"provider\":null,\"actualJobTitle\":null,"
                                        + "\"actualEmployer\":null}}]"));
    }

    @Test
    void testGetApplicationByApplicantIdAndJobId() throws Exception {
        Application application = new Application();
        application.setApplicant(new Applicant());
        application.setApplicationId("42");
        application.setJobId("42");
        application.setStatus(ApplicationStatus.PENDING);
        when(applicationService.viewApplicationsByEmailIdAndJobId(Mockito.<String>any(), Mockito.<String>any()))
                .thenReturn(application);
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                .get("/application/applicant/{emailId}/job/{jobId}", "42", "42");
        MockMvcBuilders.standaloneSetup(applicationController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
                .andExpect(MockMvcResultMatchers.content()
                        .string(
                                "{\"applicationId\":\"42\",\"status\":\"PENDING\",\"jobId\":\"42\",\"applicant\":{\"id\":null,\"email\":null,\"firstName"
                                        + "\":null,\"lastName\":null,\"phoneNumber\":null,\"address\":null,\"resume\":null,\"coverLetter\":null,\"provider\""
                                        + ":null,\"actualJobTitle\":null,\"actualEmployer\":null}}"));
    }

    @Test
    void testGetApplicationByApplicantIdAndJobId2() throws Exception {
        Application application = new Application();
        Binary resume = new Binary("AXAXAXAX".getBytes("UTF-8"));
        application.setApplicant(new Applicant("42", "jane.doe@example.org", "Jane", "Doe", "6625550144", "42 Main St",
                resume, new Binary("AXAXAXAX".getBytes("UTF-8")), Provider.LOCAL, "Dr", "Actual Employer"));
        application.setApplicationId("42");
        application.setJobId("42");
        application.setStatus(ApplicationStatus.PENDING);
        when(applicationService.viewApplicationsByEmailIdAndJobId(Mockito.<String>any(), Mockito.<String>any()))
                .thenReturn(application);
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders
                .get("/application/applicant/{emailId}/job/{jobId}", "42", "42");
        MockMvcBuilders.standaloneSetup(applicationController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
                .andExpect(MockMvcResultMatchers.content()
                        .string(
                                "{\"applicationId\":\"42\",\"status\":\"PENDING\",\"jobId\":\"42\",\"applicant\":{\"id\":\"42\",\"email\":\"jane.doe@example"
                                        + ".org\",\"firstName\":\"Jane\",\"lastName\":\"Doe\",\"phoneNumber\":\"6625550144\",\"address\":\"42 Main St\",\"resume\""
                                        + ":{\"type\":0,\"data\":\"QVhBWEFYQVg=\"},\"coverLetter\":{\"type\":0,\"data\":\"QVhBWEFYQVg=\"},\"provider\":\"LOCAL\","
                                        + "\"actualJobTitle\":\"Dr\",\"actualEmployer\":\"Actual Employer\"}}"));
    }

    @Test
    void testGetApplicationById() throws Exception {
        Application application = new Application();
        application.setApplicant(new Applicant());
        application.setApplicationId("42");
        application.setJobId("42");
        application.setStatus(ApplicationStatus.PENDING);
        when(applicationService.viewApplication(Mockito.<String>any())).thenReturn(application);
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/application/{applicationId}", "42");
        MockMvcBuilders.standaloneSetup(applicationController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
                .andExpect(MockMvcResultMatchers.content()
                        .string(
                                "{\"applicationId\":\"42\",\"status\":\"PENDING\",\"jobId\":\"42\",\"applicant\":{\"id\":null,\"email\":null,\"firstName"
                                        + "\":null,\"lastName\":null,\"phoneNumber\":null,\"address\":null,\"resume\":null,\"coverLetter\":null,\"provider\""
                                        + ":null,\"actualJobTitle\":null,\"actualEmployer\":null}}"));
    }

    @Test
    void testGetApplicationById2() throws Exception {
        Application application = new Application();
        Binary resume = new Binary("AXAXAXAX".getBytes("UTF-8"));
        application.setApplicant(new Applicant("42", "jane.doe@example.org", "Jane", "Doe", "6625550144", "42 Main St",
                resume, new Binary("AXAXAXAX".getBytes("UTF-8")), Provider.LOCAL, "Dr", "Actual Employer"));
        application.setApplicationId("42");
        application.setJobId("42");
        application.setStatus(ApplicationStatus.PENDING);
        when(applicationService.viewApplication(Mockito.<String>any())).thenReturn(application);
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/application/{applicationId}", "42");
        MockMvcBuilders.standaloneSetup(applicationController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
                .andExpect(MockMvcResultMatchers.content()
                        .string(
                                "{\"applicationId\":\"42\",\"status\":\"PENDING\",\"jobId\":\"42\",\"applicant\":{\"id\":\"42\",\"email\":\"jane.doe@example"
                                        + ".org\",\"firstName\":\"Jane\",\"lastName\":\"Doe\",\"phoneNumber\":\"6625550144\",\"address\":\"42 Main St\",\"resume\""
                                        + ":{\"type\":0,\"data\":\"QVhBWEFYQVg=\"},\"coverLetter\":{\"type\":0,\"data\":\"QVhBWEFYQVg=\"},\"provider\":\"LOCAL\","
                                        + "\"actualJobTitle\":\"Dr\",\"actualEmployer\":\"Actual Employer\"}}"));
    }

    @Test
    void testGetApplicationByJobId() throws Exception {
        when(applicationService.viewApplicationsByJobId(Mockito.<String>any())).thenReturn(new ArrayList<>());
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/application/job/{jobId}", "42");
        MockMvcBuilders.standaloneSetup(applicationController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
                .andExpect(MockMvcResultMatchers.content().string("[]"));
    }

    @Test
    void testGetApplicationByJobId2() throws Exception {
        Application application = new Application();
        application.setApplicant(new Applicant());
        application.setApplicationId("42");
        application.setJobId("42");
        application.setStatus(ApplicationStatus.PENDING);

        ArrayList<Application> applicationList = new ArrayList<>();
        applicationList.add(application);
        when(applicationService.viewApplicationsByJobId(Mockito.<String>any())).thenReturn(applicationList);
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/application/job/{jobId}", "42");
        MockMvcBuilders.standaloneSetup(applicationController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
                .andExpect(MockMvcResultMatchers.content()
                        .string(
                                "[{\"applicationId\":\"42\",\"status\":\"PENDING\",\"jobId\":\"42\",\"applicant\":{\"id\":null,\"email\":null,\"firstName"
                                        + "\":null,\"lastName\":null,\"phoneNumber\":null,\"address\":null,\"resume\":null,\"coverLetter\":null,\"provider\""
                                        + ":null,\"actualJobTitle\":null,\"actualEmployer\":null}}]"));
    }

    @Test
    void testGetApplicationByJobId3() throws Exception {
        Application application = new Application();
        application.setApplicant(new Applicant());
        application.setApplicationId("42");
        application.setJobId("42");
        application.setStatus(ApplicationStatus.PENDING);

        Application application2 = new Application();
        application2.setApplicant(new Applicant());
        application2.setApplicationId("Application Id");
        application2.setJobId("Job Id");
        application2.setStatus(ApplicationStatus.REJECTED);

        ArrayList<Application> applicationList = new ArrayList<>();
        applicationList.add(application2);
        applicationList.add(application);
        when(applicationService.viewApplicationsByJobId(Mockito.<String>any())).thenReturn(applicationList);
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/application/job/{jobId}", "42");
        MockMvcBuilders.standaloneSetup(applicationController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
                .andExpect(MockMvcResultMatchers.content()
                        .string(
                                "[{\"applicationId\":\"Application Id\",\"status\":\"REJECTED\",\"jobId\":\"Job Id\",\"applicant\":{\"id\":null,\"email"
                                        + "\":null,\"firstName\":null,\"lastName\":null,\"phoneNumber\":null,\"address\":null,\"resume\":null,\"coverLetter"
                                        + "\":null,\"provider\":null,\"actualJobTitle\":null,\"actualEmployer\":null}},{\"applicationId\":\"42\",\"status\":"
                                        + "\"PENDING\",\"jobId\":\"42\",\"applicant\":{\"id\":null,\"email\":null,\"firstName\":null,\"lastName\":null,\"phoneNumber"
                                        + "\":null,\"address\":null,\"resume\":null,\"coverLetter\":null,\"provider\":null,\"actualJobTitle\":null,"
                                        + "\"actualEmployer\":null}}]"));
    }

}
