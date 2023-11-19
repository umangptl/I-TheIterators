package com.iterators.skillmatch.service.impl;

import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.iterators.skillmatch.exception.GlobalException;
import com.iterators.skillmatch.model.Applicant;
import com.iterators.skillmatch.repository.ApplicantRepository;

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

@ContextConfiguration(classes = {ApplicantServiceImpl.class})
@ExtendWith(SpringExtension.class)
class ApplicantServiceImpl_Test {
    @MockBean
    private ApplicantRepository applicantRepository;

    @Autowired
    private ApplicantServiceImpl applicantServiceImpl;

    @Test
    void testAddApplicant() throws GlobalException {
        when(applicantRepository.insert(Mockito.<Applicant>any())).thenReturn(new Applicant());
        applicantServiceImpl.addApplicant(new Applicant());
        verify(applicantRepository).insert(Mockito.<Applicant>any());
        assertTrue(applicantServiceImpl.logger instanceof ch.qos.logback.classic.Logger);
        assertTrue(applicantServiceImpl.getAllApplicant().isEmpty());
    }

    @Test
    void testUpdateApplicant() throws GlobalException {
        when(applicantRepository.save(Mockito.<Applicant>any())).thenReturn(new Applicant());
        applicantServiceImpl.updateApplicant(new Applicant());
        verify(applicantRepository).save(Mockito.<Applicant>any());
        assertTrue(applicantServiceImpl.logger instanceof ch.qos.logback.classic.Logger);
        assertTrue(applicantServiceImpl.getAllApplicant().isEmpty());
    }

    @Test
    void testDeleteApplicant() throws GlobalException {
        doNothing().when(applicantRepository).deleteById(Mockito.<String>any());
        applicantServiceImpl.deleteApplicant("42");
        verify(applicantRepository).deleteById(Mockito.<String>any());
        assertTrue(applicantServiceImpl.logger instanceof ch.qos.logback.classic.Logger);
        assertTrue(applicantServiceImpl.getAllApplicant().isEmpty());
    }

    @Test
    void testGetApplicant() throws GlobalException {
        Applicant applicant = new Applicant();
        Optional<Applicant> ofResult = Optional.of(applicant);
        when(applicantRepository.findById(Mockito.<String>any())).thenReturn(ofResult);
        Applicant actualApplicant = applicantServiceImpl.getApplicant("42");
        verify(applicantRepository).findById(Mockito.<String>any());
        assertSame(applicant, actualApplicant);
    }

    @Test
    void testGetApplicant2() throws GlobalException {
        Optional<Applicant> emptyResult = Optional.empty();
        when(applicantRepository.findById(Mockito.<String>any())).thenReturn(emptyResult);
        assertThrows(GlobalException.class, () -> applicantServiceImpl.getApplicant("42"));
        verify(applicantRepository).findById(Mockito.<String>any());
    }

    @Test
    void testGetAllApplicant() throws GlobalException {
        ArrayList<Applicant> applicantList = new ArrayList<>();
        when(applicantRepository.findAll()).thenReturn(applicantList);
        List<Applicant> actualAllApplicant = applicantServiceImpl.getAllApplicant();
        verify(applicantRepository).findAll();
        assertTrue(actualAllApplicant.isEmpty());
        assertSame(applicantList, actualAllApplicant);
    }

    @Test
    void testFilterApplicantOnName() throws GlobalException {
        when(applicantRepository.findByFirstNameIgnoreCaseContaining(Mockito.<String>any())).thenReturn(new ArrayList<>());
        when(applicantRepository.findByLastNameIgnoreCaseContaining(Mockito.<String>any())).thenReturn(new ArrayList<>());
        List<Applicant> actualFilterApplicantOnNameResult = applicantServiceImpl.filterApplicantOnName("Filter String");
        verify(applicantRepository).findByFirstNameIgnoreCaseContaining(Mockito.<String>any());
        verify(applicantRepository).findByLastNameIgnoreCaseContaining(Mockito.<String>any());
        assertTrue(actualFilterApplicantOnNameResult.isEmpty());
    }

    @Test
    void testFilterApplicantOnEmail() throws GlobalException {
        ArrayList<Applicant> applicantList = new ArrayList<>();
        when(applicantRepository.findByEmailContaining(Mockito.<String>any())).thenReturn(applicantList);
        List<Applicant> actualFilterApplicantOnEmailResult = applicantServiceImpl.filterApplicantOnEmail("Filter String");
        verify(applicantRepository).findByEmailContaining(Mockito.<String>any());
        assertTrue(actualFilterApplicantOnEmailResult.isEmpty());
        assertSame(applicantList, actualFilterApplicantOnEmailResult);
    }
}
