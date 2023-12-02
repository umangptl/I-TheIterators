package com.iterators.skillmatch.controller;

import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.iterators.skillmatch.model.Job;
import com.iterators.skillmatch.model.enums.Documents;
import com.iterators.skillmatch.service.JobService;

import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Date;

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

@ContextConfiguration(classes = {JobController.class})
@ExtendWith(SpringExtension.class)
class JobController_Test {
    @Autowired
    private JobController jobController;

    @MockBean
    private JobService jobService;

    @Test
    void testAddJob() throws Exception {
        when(jobService.getAllJob()).thenReturn(new ArrayList<>());

        Job job = new Job();
        job.setDatePosted(Date.from(LocalDate.of(2023, 5, 12).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()));
        job.setDeadline(Date.from(LocalDate.of(2024, 5, 12).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()));
        job.setDescription("this god is for job-1");
        job.setExperience("Experience required is 2 years");
        job.setHiringTeamInfo("Hiring Team Info @someone.com");
        job.setJobId("42");
        job.setLocation("San-Jose");
        job.setRequiredDocuments(new ArrayList<>());
        job.setRequiredQualifications("Required Qualifications 2+ years of experience");
        job.setSalary(100000.0d);
        job.setSkillsRequired(new ArrayList<>());
        job.setTag("HR-department");
        job.setTitle("Senior HR");
        job.setType("Full-Time");
        String content = (new ObjectMapper()).writeValueAsString(job);
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/job")
                .contentType(MediaType.APPLICATION_JSON)
                .content(content);
        MockMvcBuilders.standaloneSetup(jobController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
                .andExpect(MockMvcResultMatchers.content().string("[]"));
    }

    @Test
    void testDeleteJob() throws Exception {
        doNothing().when(jobService).deleteJob(Mockito.<String>any());
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.delete("/job/{jobId}", "42");
        MockMvcBuilders.standaloneSetup(jobController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk());
    }

    @Test
    void testFilterJobByDatePosted() throws Exception {
        Date fromResult = Date.from(LocalDate.of(1970, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant());
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/job/dateposted/{startDate}/{endDate}",
                fromResult, Date.from(LocalDate.of(1970, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()));
        ResultActions actualPerformResult = MockMvcBuilders.standaloneSetup(jobController).build().perform(requestBuilder);
        actualPerformResult.andExpect(MockMvcResultMatchers.status().is(400));
    }

    @Test
    void testFilterJobByDeadline() throws Exception {
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/job/deadline/{endDate}",
                Date.from(LocalDate.of(1970, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()));
        ResultActions actualPerformResult = MockMvcBuilders.standaloneSetup(jobController).build().perform(requestBuilder);
        actualPerformResult.andExpect(MockMvcResultMatchers.status().is(400));
    }

    @Test
    void testFilterJobByDeadline2() throws Exception {
        Job job = new Job();
        job.setDatePosted(Date.from(LocalDate.of(2023, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()));
        job.setDeadline(Date.from(LocalDate.of(2023, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()));
        job.setDescription("The characteristics of Job");
        job.setExperience("Experience Intern-level");
        job.setHiringTeamInfo("Hiring Team Info +123445");
        job.setJobId("42");
        job.setLocation("New York");
        ArrayList<Documents> requiredDocuments = new ArrayList<>();
        job.setRequiredDocuments(requiredDocuments);
        job.setRequiredQualifications("Required Qualifications Intern-level");
        job.setSalary(80000.0d);
        job.setSkillsRequired(new ArrayList<>());
        job.setTag("Tech");
        job.setTitle("Software Engineer");
        job.setType("Intern");
        when(jobService.getJob(Mockito.<String>any())).thenReturn(job);
        Date.from(LocalDate.of(2023, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant());
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/job/deadline/{endDate}", "",
                "Uri Variables");
        MockMvcBuilders.standaloneSetup(jobController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
                .andExpect(MockMvcResultMatchers.content()
                        .string(
                                "{\"jobId\":\"42\",\"title\":\"Software Engineer\",\"datePosted\":1672531200000,\"deadline\":1672531200000,\"description\":\"The characteristics of Job"
                                        + "\",\"skillsRequired\":[],\"salary\":80000.0,\"location\":\"New York\",\"requiredQualifications\":\"Required Qualifications Intern-level"
                                        + "\",\"hiringTeamInfo\":\"Hiring Team Info +123445\",\"requiredDocuments\":[],\"tag\":\"Tech\",\"experience\""
                                        + ":\"Experience Intern-level\",\"type\":\"Intern\"}"));
    }

    @Test
    void testFilterJobByTitle() throws Exception {
        when(jobService.filterJobOnTitle(Mockito.<String>any())).thenReturn(new ArrayList<>());
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/job/title/{titleFilter}", "Dr");
        MockMvcBuilders.standaloneSetup(jobController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
                .andExpect(MockMvcResultMatchers.content().string("[]"));
    }

    @Test
    void testGetAllJobs() throws Exception {
        when(jobService.getAllJob()).thenReturn(new ArrayList<>());
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/job");
        MockMvcBuilders.standaloneSetup(jobController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
                .andExpect(MockMvcResultMatchers.content().string("[]"));
    }

    @Test
    void testGetJobById() throws Exception {
        Job job = new Job();
        job.setDatePosted(Date.from(LocalDate.of(1970, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()));
        job.setDeadline(Date.from(LocalDate.of(1970, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()));
        job.setDescription("The characteristics of someone or something");
        job.setExperience("Experience");
        job.setHiringTeamInfo("Hiring Team Info");
        job.setJobId("42");
        job.setLocation("Location");
        job.setRequiredDocuments(new ArrayList<>());
        job.setRequiredQualifications("Required Qualifications");
        job.setSalary(10.0d);
        job.setSkillsRequired(new ArrayList<>());
        job.setTag("Tag");
        job.setTitle("Dr");
        job.setType("Type");
        when(jobService.getJob(Mockito.<String>any())).thenReturn(job);
        MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/job/{jobId}", "42");
        MockMvcBuilders.standaloneSetup(jobController)
                .build()
                .perform(requestBuilder)
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.content().contentType("application/json"))
                .andExpect(MockMvcResultMatchers.content()
                        .string(
                                "{\"jobId\":\"42\",\"title\":\"Dr\",\"datePosted\":0,\"deadline\":0,\"description\":\"The characteristics of someone"
                                        + " or something\",\"skillsRequired\":[],\"salary\":10.0,\"location\":\"Location\",\"requiredQualifications\":\"Required"
                                        + " Qualifications\",\"hiringTeamInfo\":\"Hiring Team Info\",\"requiredDocuments\":[],\"tag\":\"Tag\",\"experience\""
                                        + ":\"Experience\",\"type\":\"Type\"}"));
    }
}
