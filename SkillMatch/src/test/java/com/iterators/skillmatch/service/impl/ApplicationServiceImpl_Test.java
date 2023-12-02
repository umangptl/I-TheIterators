package com.iterators.skillmatch.service.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.mock;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.iterators.skillmatch.exception.GlobalException;
import com.iterators.skillmatch.model.Applicant;
import com.iterators.skillmatch.model.Application;
import com.iterators.skillmatch.model.enums.ApplicationStatus;
import com.iterators.skillmatch.repository.ApplicationRepository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ContextConfiguration(classes = {ApplicationServiceImpl.class})
@ExtendWith(SpringExtension.class)
class ApplicationServiceImpl_Test {
    @MockBean
    private ApplicationRepository applicationRepository;

    @Autowired
    private ApplicationServiceImpl applicationServiceImpl;

    @Test
    void testGetAllApplications() throws GlobalException {
        ArrayList<Application> applicationList = new ArrayList<>();
        when(applicationRepository.findAll()).thenReturn(applicationList);
        List<Application> actualAllApplications = applicationServiceImpl.getAllApplications();
        verify(applicationRepository).findAll();
        assertTrue(actualAllApplications.isEmpty());
        assertSame(applicationList, actualAllApplications);
    }

    @Test
    void testViewApplication() throws GlobalException {
        Application application = new Application();
        application.setApplicant(new Applicant());
        application.setApplicationId("42");
        application.setJobId("42");
        application.setStatus(ApplicationStatus.PENDING);
        Optional<Application> ofResult = Optional.of(application);
        when(applicationRepository.findById(Mockito.<String>any())).thenReturn(ofResult);
        Application actualViewApplicationResult = applicationServiceImpl.viewApplication("42");
        verify(applicationRepository).findById(Mockito.<String>any());
        assertSame(application, actualViewApplicationResult);
    }

    @Test
    void testViewApplication2() throws GlobalException {
        Optional<Application> emptyResult = Optional.empty();
        when(applicationRepository.findById(Mockito.<String>any())).thenReturn(emptyResult);
        assertThrows(GlobalException.class, () -> applicationServiceImpl.viewApplication("42"));
        verify(applicationRepository).findById(Mockito.<String>any());
    }

    @Test
    void testViewApplicationsByJobId() throws GlobalException {
        ArrayList<Application> applicationList = new ArrayList<>();
        when(applicationRepository.findByJobId(Mockito.<String>any())).thenReturn(applicationList);
        List<Application> actualViewApplicationsByJobIdResult = applicationServiceImpl.viewApplicationsByJobId("42");
        verify(applicationRepository).findByJobId(Mockito.<String>any());
        assertTrue(actualViewApplicationsByJobIdResult.isEmpty());
        assertSame(applicationList, actualViewApplicationsByJobIdResult);
    }

    @Test
    void testViewApplicationsByEmailIdAndJobId() throws GlobalException {
        Application application = new Application();
        application.setApplicant(new Applicant());
        application.setApplicationId("42");
        application.setJobId("42");
        application.setStatus(ApplicationStatus.PENDING);
        when(applicationRepository.findByApplicant_EmailAndJobId(Mockito.<String>any(), Mockito.<String>any()))
                .thenReturn(application);
        Application actualViewApplicationsByEmailIdAndJobIdResult = applicationServiceImpl
                .viewApplicationsByEmailIdAndJobId("42", "42");
        verify(applicationRepository).findByApplicant_EmailAndJobId(Mockito.<String>any(), Mockito.<String>any());
        assertSame(application, actualViewApplicationsByEmailIdAndJobIdResult);
    }

    @Test
    void testViewApplicationsByEmailId() throws GlobalException {
        ArrayList<Application> applicationList = new ArrayList<>();
        when(applicationRepository.findByApplicant_Email(Mockito.<String>any())).thenReturn(applicationList);
        List<Application> actualViewApplicationsByEmailIdResult = applicationServiceImpl.viewApplicationsByEmailId("42");
        verify(applicationRepository).findByApplicant_Email(Mockito.<String>any());
        assertTrue(actualViewApplicationsByEmailIdResult.isEmpty());
        assertSame(applicationList, actualViewApplicationsByEmailIdResult);
    }

    @Test
    void testCountApplication() {
        when(applicationRepository.countApplicationsByApplicant_EmailAndJobId(Mockito.<String>any(), Mockito.<String>any()))
                .thenReturn(1);
        Integer actualCountApplicationResult = applicationServiceImpl.countApplication("42", "42");
        verify(applicationRepository).countApplicationsByApplicant_EmailAndJobId(Mockito.<String>any(),
                Mockito.<String>any());
        assertEquals(1, actualCountApplicationResult.intValue());
    }

    @Test
    void testUpdateApplication() throws GlobalException {
        Application application = new Application();
        application.setApplicant(new Applicant());
        application.setApplicationId("42");
        application.setJobId("42");
        application.setStatus(ApplicationStatus.PENDING);
        Optional<Application> ofResult = Optional.of(application);

        Application application2 = new Application();
        application2.setApplicant(new Applicant());
        application2.setApplicationId("42");
        application2.setJobId("42");
        application2.setStatus(ApplicationStatus.PENDING);
        when(applicationRepository.save(Mockito.<Application>any())).thenReturn(application2);
        when(applicationRepository.findById(Mockito.<String>any())).thenReturn(ofResult);
        applicationServiceImpl.updateApplication("42", ApplicationStatus.PENDING);
        verify(applicationRepository).findById(Mockito.<String>any());
        verify(applicationRepository).save(Mockito.<Application>any());
    }

    @Test
    void testUpdateApplication2() throws GlobalException {
        Optional<Application> emptyResult = Optional.empty();
        when(applicationRepository.findById(Mockito.<String>any())).thenReturn(emptyResult);
        assertThrows(GlobalException.class,
                () -> applicationServiceImpl.updateApplication("42", ApplicationStatus.PENDING));
        verify(applicationRepository).findById(Mockito.<String>any());
    }

    @Test
    void testUpdateApplication3() throws GlobalException {
        Application application = new Application();
        application.setApplicant(new Applicant());
        application.setApplicationId("42");
        application.setJobId("42");
        application.setStatus(ApplicationStatus.PENDING);
        Optional<Application> ofResult = Optional.of(application);

        Application application2 = new Application();
        application2.setApplicant(new Applicant());
        application2.setApplicationId("42");
        application2.setJobId("42");
        application2.setStatus(ApplicationStatus.PENDING);
        when(applicationRepository.save(Mockito.<Application>any())).thenReturn(application2);
        when(applicationRepository.findById(Mockito.<String>any())).thenReturn(ofResult);
        applicationServiceImpl.updateApplication("42", ApplicationStatus.REJECTED);
        verify(applicationRepository).findById(Mockito.<String>any());
        verify(applicationRepository).save(Mockito.<Application>any());
    }

    @Test
    void testUpdateApplication4() throws GlobalException {
        Application application = new Application();
        application.setApplicant(new Applicant());
        application.setApplicationId("42");
        application.setJobId("42");
        application.setStatus(ApplicationStatus.PENDING);
        Optional<Application> ofResult = Optional.of(application);

        Application application2 = new Application();
        application2.setApplicant(new Applicant());
        application2.setApplicationId("42");
        application2.setJobId("42");
        application2.setStatus(ApplicationStatus.PENDING);
        when(applicationRepository.save(Mockito.<Application>any())).thenReturn(application2);
        when(applicationRepository.findById(Mockito.<String>any())).thenReturn(ofResult);
        applicationServiceImpl.updateApplication("42", ApplicationStatus.INTERVIEWING);
        verify(applicationRepository).findById(Mockito.<String>any());
        verify(applicationRepository).save(Mockito.<Application>any());
    }

    @Test
    void testUpdateApplication5() throws GlobalException {
        Application application = new Application();
        application.setApplicant(new Applicant());
        application.setApplicationId("42");
        application.setJobId("42");
        application.setStatus(ApplicationStatus.PENDING);
        Optional<Application> ofResult = Optional.of(application);

        Application application2 = new Application();
        application2.setApplicant(new Applicant());
        application2.setApplicationId("42");
        application2.setJobId("42");
        application2.setStatus(ApplicationStatus.PENDING);
        when(applicationRepository.save(Mockito.<Application>any())).thenReturn(application2);
        when(applicationRepository.findById(Mockito.<String>any())).thenReturn(ofResult);
        applicationServiceImpl.updateApplication("42", ApplicationStatus.SHORTLISTED);
        verify(applicationRepository).findById(Mockito.<String>any());
        verify(applicationRepository).save(Mockito.<Application>any());
    }

    @Test
    void testUpdateApplication6() throws GlobalException {
        Application application = new Application();
        application.setApplicant(new Applicant());
        application.setApplicationId("42");
        application.setJobId("42");
        application.setStatus(ApplicationStatus.PENDING);
        Optional<Application> ofResult = Optional.of(application);

        Application application2 = new Application();
        application2.setApplicant(new Applicant());
        application2.setApplicationId("42");
        application2.setJobId("42");
        application2.setStatus(ApplicationStatus.PENDING);
        when(applicationRepository.save(Mockito.<Application>any())).thenReturn(application2);
        when(applicationRepository.findById(Mockito.<String>any())).thenReturn(ofResult);
        applicationServiceImpl.updateApplication("42", ApplicationStatus.WITHDRAWN);
        verify(applicationRepository).findById(Mockito.<String>any());
        verify(applicationRepository).save(Mockito.<Application>any());
    }

    @Test
    void testUpdateApplication7() throws GlobalException {
        Application application = new Application();
        application.setApplicant(new Applicant());
        application.setApplicationId("42");
        application.setJobId("42");
        application.setStatus(ApplicationStatus.PENDING);
        Optional<Application> ofResult = Optional.of(application);

        Application application2 = new Application();
        application2.setApplicant(new Applicant());
        application2.setApplicationId("42");
        application2.setJobId("42");
        application2.setStatus(ApplicationStatus.PENDING);
        when(applicationRepository.save(Mockito.<Application>any())).thenReturn(application2);
        when(applicationRepository.findById(Mockito.<String>any())).thenReturn(ofResult);
        applicationServiceImpl.updateApplication("42", ApplicationStatus.SELECTED);
        verify(applicationRepository).findById(Mockito.<String>any());
        verify(applicationRepository).save(Mockito.<Application>any());
    }

    @Test
    void testUpdateApplicationsByJobId() throws GlobalException {
        when(applicationRepository.findByJobId(Mockito.<String>any())).thenReturn(new ArrayList<>());
        when(applicationRepository.saveAll(Mockito.<Iterable<Application>>any())).thenReturn(new ArrayList<>());
        applicationServiceImpl.updateApplicationsByJobId("42", ApplicationStatus.PENDING);
        verify(applicationRepository).findByJobId(Mockito.<String>any());
        verify(applicationRepository).saveAll(Mockito.<Iterable<Application>>any());
        assertTrue(applicationServiceImpl.logger instanceof ch.qos.logback.classic.Logger);
        assertTrue(applicationServiceImpl.getAllApplications().isEmpty());
    }

    @Test
    void testUpdateApplicationsByJobId2() throws GlobalException {
        Application application = new Application();
        application.setApplicant(new Applicant());
        application.setApplicationId("42");
        application.setJobId("42");
        application.setStatus(ApplicationStatus.PENDING);

        ArrayList<Application> applicationList = new ArrayList<>();
        applicationList.add(application);
        when(applicationRepository.findByJobId(Mockito.<String>any())).thenReturn(applicationList);
        when(applicationRepository.saveAll(Mockito.<Iterable<Application>>any())).thenReturn(new ArrayList<>());
        applicationServiceImpl.updateApplicationsByJobId("42", ApplicationStatus.PENDING);
        verify(applicationRepository).findByJobId(Mockito.<String>any());
        verify(applicationRepository).saveAll(Mockito.<Iterable<Application>>any());
    }

    @Test
    void testUpdateApplicationsByJobId3() throws GlobalException {
        when(applicationRepository.findByJobId(Mockito.<String>any())).thenReturn(new ArrayList<>());
        when(applicationRepository.saveAll(Mockito.<Iterable<Application>>any())).thenReturn(new ArrayList<>());
        applicationServiceImpl.updateApplicationsByJobId("42", ApplicationStatus.REJECTED);
        verify(applicationRepository).findByJobId(Mockito.<String>any());
        verify(applicationRepository).saveAll(Mockito.<Iterable<Application>>any());
        assertTrue(applicationServiceImpl.logger instanceof ch.qos.logback.classic.Logger);
        assertTrue(applicationServiceImpl.getAllApplications().isEmpty());
    }

    @Test
    void testUpdateApplicationsByJobId4() throws GlobalException {
        when(applicationRepository.findByJobId(Mockito.<String>any())).thenReturn(new ArrayList<>());
        when(applicationRepository.saveAll(Mockito.<Iterable<Application>>any())).thenReturn(new ArrayList<>());
        applicationServiceImpl.updateApplicationsByJobId("42", ApplicationStatus.INTERVIEWING);
        verify(applicationRepository).findByJobId(Mockito.<String>any());
        verify(applicationRepository).saveAll(Mockito.<Iterable<Application>>any());
        assertTrue(applicationServiceImpl.logger instanceof ch.qos.logback.classic.Logger);
        assertTrue(applicationServiceImpl.getAllApplications().isEmpty());
    }

    @Test
    void testUpdateApplicationsByJobId5() throws GlobalException {
        when(applicationRepository.findByJobId(Mockito.<String>any())).thenReturn(new ArrayList<>());
        when(applicationRepository.saveAll(Mockito.<Iterable<Application>>any())).thenReturn(new ArrayList<>());
        applicationServiceImpl.updateApplicationsByJobId("42", ApplicationStatus.SHORTLISTED);
        verify(applicationRepository).findByJobId(Mockito.<String>any());
        verify(applicationRepository).saveAll(Mockito.<Iterable<Application>>any());
        assertTrue(applicationServiceImpl.logger instanceof ch.qos.logback.classic.Logger);
        assertTrue(applicationServiceImpl.getAllApplications().isEmpty());
    }

    @Test
    void testUpdateApplicationsByJobId6() throws GlobalException {
        when(applicationRepository.findByJobId(Mockito.<String>any())).thenReturn(new ArrayList<>());
        when(applicationRepository.saveAll(Mockito.<Iterable<Application>>any())).thenReturn(new ArrayList<>());
        applicationServiceImpl.updateApplicationsByJobId("42", ApplicationStatus.WITHDRAWN);
        verify(applicationRepository).findByJobId(Mockito.<String>any());
        verify(applicationRepository).saveAll(Mockito.<Iterable<Application>>any());
        assertTrue(applicationServiceImpl.logger instanceof ch.qos.logback.classic.Logger);
        assertTrue(applicationServiceImpl.getAllApplications().isEmpty());
    }

    @Test
    void testUpdateApplicationsByJobId7() throws GlobalException {
        when(applicationRepository.findByJobId(Mockito.<String>any())).thenReturn(new ArrayList<>());
        when(applicationRepository.saveAll(Mockito.<Iterable<Application>>any())).thenReturn(new ArrayList<>());
        applicationServiceImpl.updateApplicationsByJobId("42", ApplicationStatus.SELECTED);
        verify(applicationRepository).findByJobId(Mockito.<String>any());
        verify(applicationRepository).saveAll(Mockito.<Iterable<Application>>any());
        assertTrue(applicationServiceImpl.logger instanceof ch.qos.logback.classic.Logger);
        assertTrue(applicationServiceImpl.getAllApplications().isEmpty());
    }

    @Test
    void testUpdateApplicationsByJobId8() throws GlobalException {
        Application application = mock(Application.class);
        when(application.getStatus()).thenReturn(ApplicationStatus.SELECTED);
        doNothing().when(application).setApplicant(Mockito.<Applicant>any());
        doNothing().when(application).setApplicationId(Mockito.<String>any());
        doNothing().when(application).setJobId(Mockito.<String>any());
        doNothing().when(application).setStatus(Mockito.<ApplicationStatus>any());
        application.setApplicant(new Applicant());
        application.setApplicationId("42");
        application.setJobId("42");
        application.setStatus(ApplicationStatus.PENDING);

        ArrayList<Application> applicationList = new ArrayList<>();
        applicationList.add(application);
        when(applicationRepository.findByJobId(Mockito.<String>any())).thenReturn(applicationList);
        when(applicationRepository.saveAll(Mockito.<Iterable<Application>>any())).thenReturn(new ArrayList<>());
        applicationServiceImpl.updateApplicationsByJobId("42", ApplicationStatus.PENDING);
        verify(application).getStatus();
        verify(application).setApplicant(Mockito.<Applicant>any());
        verify(application).setApplicationId(Mockito.<String>any());
        verify(application).setJobId(Mockito.<String>any());
        verify(application).setStatus(Mockito.<ApplicationStatus>any());
        verify(applicationRepository).findByJobId(Mockito.<String>any());
        verify(applicationRepository).saveAll(Mockito.<Iterable<Application>>any());
        assertTrue(applicationServiceImpl.logger instanceof ch.qos.logback.classic.Logger);
        assertTrue(applicationServiceImpl.getAllApplications().isEmpty());
    }

    @Test
    void testAddApplication() throws GlobalException {
        Application application = new Application();
        application.setApplicant(new Applicant());
        application.setApplicationId("42");
        application.setJobId("42");
        application.setStatus(ApplicationStatus.PENDING);
        when(applicationRepository.insert(Mockito.<Application>any())).thenReturn(application);

        Application application2 = new Application();
        Applicant applicant = new Applicant();
        application2.setApplicant(applicant);
        application2.setApplicationId("42");
        application2.setJobId("42");
        application2.setStatus(ApplicationStatus.PENDING);
        applicationServiceImpl.addApplication(application2);
        verify(applicationRepository).insert(Mockito.<Application>any());
        assertTrue(applicationServiceImpl.logger instanceof ch.qos.logback.classic.Logger);
        assertEquals("42", application2.getApplicationId());
        assertEquals("42", application2.getJobId());
        assertEquals(ApplicationStatus.PENDING, application2.getStatus());
        assertTrue(applicationServiceImpl.getAllApplications().isEmpty());
        assertSame(applicant, application2.getApplicant());
    }
}
