package com.iterators.skillmatch.controller;

import static org.mockito.Mockito.doNothing;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.iterators.skillmatch.model.Recruiter;
import com.iterators.skillmatch.model.enums.Department;
import com.iterators.skillmatch.model.enums.Provider;
import com.iterators.skillmatch.service.RecruiterService;
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

@ContextConfiguration(classes = {RecruiterController.class})
@ExtendWith(SpringExtension.class)
class RecruiterController_Test {
  @Autowired
  private RecruiterController recruiterController;

  @MockBean
  private RecruiterService recruiterService;
  @Test
  void testAddRecruiter() throws Exception {
    Recruiter recruiter = new Recruiter();
    recruiter.setDepartment(Department.HR);
    recruiter.setEmail("jane.doe@example.org");
    recruiter.setFirstName("Jane");
    recruiter.setId("42");
    recruiter.setLastName("Doe");
    recruiter.setProvider(Provider.LOCAL);
    String content = (new ObjectMapper()).writeValueAsString(recruiter);
    MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.get("/recruiter")
        .contentType(MediaType.APPLICATION_JSON)
        .content(content);
    ResultActions actualPerformResult = MockMvcBuilders.standaloneSetup(recruiterController)
        .build()
        .perform(requestBuilder);
    actualPerformResult.andExpect(MockMvcResultMatchers.status().is(405));
  }

  @Test
  void testDeleteRecruiter() throws Exception {
    doNothing().when(recruiterService).deleteRecruiter(Mockito.<String>any());
    MockHttpServletRequestBuilder requestBuilder = MockMvcRequestBuilders.delete("/recruiter/{recruiterId}", "42");
    MockMvcBuilders.standaloneSetup(recruiterController)
        .build()
        .perform(requestBuilder)
        .andExpect(MockMvcResultMatchers.status().isOk());
  }
}
