package com.iterators.skillmatch.service.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.iterators.skillmatch.exception.GlobalException;
import com.iterators.skillmatch.model.Job;
import com.iterators.skillmatch.model.enums.ApplicationStatus;
import com.iterators.skillmatch.model.enums.Documents;
import com.iterators.skillmatch.repository.JobRepository;
import com.iterators.skillmatch.service.ApplicationService;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ContextConfiguration(classes = {JobServiceImpl.class})
@ExtendWith(SpringExtension.class)
class JobServiceImpl_Test {
    @MockBean
    private ApplicationService applicationService;

    @MockBean
    private JobRepository jobRepository;

    @Autowired
    private JobServiceImpl jobServiceImpl;

    /**
     * Method under test: {@link JobServiceImpl#getJob(String)}
     */
    @Test
    void testGetJob() throws GlobalException {
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
        Optional<Job> ofResult = Optional.of(job);
        when(jobRepository.findById(Mockito.<String>any())).thenReturn(ofResult);
        Job actualJob = jobServiceImpl.getJob("42");
        verify(jobRepository).findById(Mockito.<String>any());
        assertSame(job, actualJob);
    }

    /**
     * Method under test: {@link JobServiceImpl#getJob(String)}
     */
    @Test
    void testGetJob2() throws GlobalException {
        Optional<Job> emptyResult = Optional.empty();
        when(jobRepository.findById(Mockito.<String>any())).thenReturn(emptyResult);
        assertThrows(GlobalException.class, () -> jobServiceImpl.getJob("42"));
        verify(jobRepository).findById(Mockito.<String>any());
    }

    /**
     * Method under test: {@link JobServiceImpl#getAllJob()}
     */
    @Test
    void testGetAllJob() throws GlobalException {
        ArrayList<Job> jobList = new ArrayList<>();
        when(jobRepository.findAll()).thenReturn(jobList);
        List<Job> actualAllJob = jobServiceImpl.getAllJob();
        verify(jobRepository).findAll();
        assertTrue(actualAllJob.isEmpty());
        assertSame(jobList, actualAllJob);
    }

    /**
     * Method under test: {@link JobServiceImpl#addJob(Job)}
     */
    @Test
    void testAddJob() throws GlobalException {
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
        when(jobRepository.insert(Mockito.<Job>any())).thenReturn(job);

        Job job2 = new Job();
        job2.setDatePosted(Date.from(LocalDate.of(2023, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()));
        job2.setDeadline(Date.from(LocalDate.of(2023, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()));
        job2.setDescription("The characteristics of job");
        job2.setExperience("2+ Experience");
        job2.setHiringTeamInfo("Hiring Team Info");
        job2.setJobId("42");
        job2.setLocation("Austin");
        job2.setRequiredDocuments(new ArrayList<>());
        job2.setRequiredQualifications("Required Qualifications entery-level");
        job2.setSalary(95000.0d);
        job2.setSkillsRequired(new ArrayList<>());
        job2.setTag("Sales");
        job2.setTitle("Sales-Manage");
        job2.setType("Full-Time");
        jobServiceImpl.addJob(job2);
        verify(jobRepository).insert(Mockito.<Job>any());
        assertTrue(jobServiceImpl.logger instanceof ch.qos.logback.classic.Logger);
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        assertEquals("2022-12-31", simpleDateFormat.format(job2.getDatePosted()));
        SimpleDateFormat simpleDateFormat2 = new SimpleDateFormat("yyyy-MM-dd");
        assertEquals("2022-12-31", simpleDateFormat2.format(job2.getDeadline()));
        assertEquals("42", job2.getJobId());
        assertEquals("Sales-Manage", job2.getTitle());
        assertEquals("2+ Experience", job2.getExperience());
        assertEquals("Hiring Team Info", job2.getHiringTeamInfo());
        assertEquals("Austin", job2.getLocation());
        assertEquals("Required Qualifications entery-level", job2.getRequiredQualifications());
        assertEquals("Sales", job2.getTag());
        assertEquals("The characteristics of job", job2.getDescription());
        assertEquals("Full-Time", job2.getType());
        assertEquals(95000.0d, job2.getSalary());
        assertTrue(jobServiceImpl.getAllJob().isEmpty());
        assertEquals(requiredDocuments, job2.getRequiredDocuments());
        assertEquals(requiredDocuments, job2.getSkillsRequired());
    }

    /**
     * Method under test: {@link JobServiceImpl#updateJob(Job)}
     */
    @Test
    void testUpdateJob() throws GlobalException {
        Job job = new Job();
        job.setDatePosted(Date.from(LocalDate.of(2023, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()));
        job.setDeadline(Date.from(LocalDate.of(2023, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()));
        job.setDescription("The characteristics of someone or something");
        job.setExperience("Experience");
        job.setHiringTeamInfo("Hiring Team Info");
        job.setJobId("42");
        job.setLocation("San Paulo");
        ArrayList<Documents> requiredDocuments = new ArrayList<>();
        job.setRequiredDocuments(requiredDocuments);
        job.setRequiredQualifications("Required Qualifications");
        job.setSalary(100000.0d);
        job.setSkillsRequired(new ArrayList<>());
        job.setTag("Tag");
        job.setTitle("Director");
        job.setType("Type");
        when(jobRepository.save(Mockito.<Job>any())).thenReturn(job);

        Job job2 = new Job();
        job2.setDatePosted(Date.from(LocalDate.of(2023, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()));
        job2.setDeadline(Date.from(LocalDate.of(2023, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()));
        job2.setDescription("The characteristics of someone or something");
        job2.setExperience("Experience");
        job2.setHiringTeamInfo("Hiring Team Info");
        job2.setJobId("42");
        job2.setLocation("San Paulo");
        job2.setRequiredDocuments(new ArrayList<>());
        job2.setRequiredQualifications("Required Qualifications");
        job2.setSalary(100000.0d);
        job2.setSkillsRequired(new ArrayList<>());
        job2.setTag("Tag");
        job2.setTitle("Director");
        job2.setType("Type");
        jobServiceImpl.updateJob(job2);
        verify(jobRepository).save(Mockito.<Job>any());
        assertTrue(jobServiceImpl.logger instanceof ch.qos.logback.classic.Logger);
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd");
        assertEquals("2022-12-31", simpleDateFormat.format(job2.getDatePosted()));
        SimpleDateFormat simpleDateFormat2 = new SimpleDateFormat("yyyy-MM-dd");
        assertEquals("2022-12-31", simpleDateFormat2.format(job2.getDeadline()));
        assertEquals("42", job2.getJobId());
        assertEquals("Director", job2.getTitle());
        assertEquals("Experience", job2.getExperience());
        assertEquals("Hiring Team Info", job2.getHiringTeamInfo());
        assertEquals("San Paulo", job2.getLocation());
        assertEquals("Required Qualifications", job2.getRequiredQualifications());
        assertEquals("Tag", job2.getTag());
        assertEquals("The characteristics of someone or something", job2.getDescription());
        assertEquals("Type", job2.getType());
        assertEquals(100000.0d, job2.getSalary());
        assertTrue(jobServiceImpl.getAllJob().isEmpty());
        assertEquals(requiredDocuments, job2.getRequiredDocuments());
        assertEquals(requiredDocuments, job2.getSkillsRequired());
    }

    /**
     * Method under test: {@link JobServiceImpl#deleteJob(String)}
     */
    @Test
    void testDeleteJob() throws GlobalException {
        doNothing().when(applicationService)
                .updateApplicationsByJobId(Mockito.<String>any(), Mockito.<ApplicationStatus>any());
        doNothing().when(jobRepository).deleteById(Mockito.<String>any());
        jobServiceImpl.deleteJob("42");
        verify(applicationService).updateApplicationsByJobId(Mockito.<String>any(), Mockito.<ApplicationStatus>any());
        verify(jobRepository).deleteById(Mockito.<String>any());
        assertTrue(jobServiceImpl.logger instanceof ch.qos.logback.classic.Logger);
        assertTrue(jobServiceImpl.getAllJob().isEmpty());
    }

    /**
     * Method under test: {@link JobServiceImpl#deleteJob(String)}
     */
    @Test
    void testDeleteJob2() throws GlobalException {
        doThrow(new GlobalException("An error occurred", new Throwable())).when(applicationService)
                .updateApplicationsByJobId(Mockito.<String>any(), Mockito.<ApplicationStatus>any());
        doNothing().when(jobRepository).deleteById(Mockito.<String>any());
        assertThrows(GlobalException.class, () -> jobServiceImpl.deleteJob("42"));
        verify(applicationService).updateApplicationsByJobId(Mockito.<String>any(), Mockito.<ApplicationStatus>any());
        verify(jobRepository).deleteById(Mockito.<String>any());
    }

    /**
     * Method under test: {@link JobServiceImpl#filterJobOnTitle(String)}
     */
    @Test
    void testFilterJobOnTitle() throws GlobalException {
        ArrayList<Job> jobList = new ArrayList<>();
        when(jobRepository.findByTitleContainsIgnoreCase(Mockito.<String>any())).thenReturn(jobList);
        List<Job> actualFilterJobOnTitleResult = jobServiceImpl.filterJobOnTitle("Filter String");
        verify(jobRepository).findByTitleContainsIgnoreCase(Mockito.<String>any());
        assertTrue(actualFilterJobOnTitleResult.isEmpty());
        assertSame(jobList, actualFilterJobOnTitleResult);
    }

    /**
     * Method under test: {@link JobServiceImpl#filterJobOnDatePosted(Date, Date)}
     */
    @Test
    void testFilterJobOnDatePosted() throws GlobalException {
        ArrayList<Job> jobList = new ArrayList<>();
        when(jobRepository.findByDatePostedBetween(Mockito.<Date>any(), Mockito.<Date>any())).thenReturn(jobList);
        Date startDate = Date.from(LocalDate.of(2023, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant());
        List<Job> actualFilterJobOnDatePostedResult = jobServiceImpl.filterJobOnDatePosted(startDate,
                Date.from(LocalDate.of(2023, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()));
        verify(jobRepository).findByDatePostedBetween(Mockito.<Date>any(), Mockito.<Date>any());
        assertTrue(actualFilterJobOnDatePostedResult.isEmpty());
        assertSame(jobList, actualFilterJobOnDatePostedResult);
    }

    /**
     * Method under test: {@link JobServiceImpl#filterJobOnDeadline(Date)}
     */
    @Test
    void testFilterJobOnDeadline() throws GlobalException {
        ArrayList<Job> jobList = new ArrayList<>();
        when(jobRepository.findByDeadlineBefore(Mockito.<Date>any())).thenReturn(jobList);
        List<Job> actualFilterJobOnDeadlineResult = jobServiceImpl
                .filterJobOnDeadline(Date.from(LocalDate.of(2024, 1, 1).atStartOfDay().atZone(ZoneOffset.UTC).toInstant()));
        verify(jobRepository).findByDeadlineBefore(Mockito.<Date>any());
        assertTrue(actualFilterJobOnDeadlineResult.isEmpty());
        assertSame(jobList, actualFilterJobOnDeadlineResult);
    }
}
