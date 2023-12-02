package com.iterators.skillmatch.service.impl;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.iterators.skillmatch.exception.GlobalException;
import com.iterators.skillmatch.model.Recruiter;
import com.iterators.skillmatch.model.enums.Department;
import com.iterators.skillmatch.model.enums.Provider;
import com.iterators.skillmatch.repository.RecruiterRepository;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ContextConfiguration(classes = {RecruiterServiceImpl.class})
@ExtendWith(SpringExtension.class)
class RecruiterServiceImpl_Test {
    @MockBean
    private RecruiterRepository recruiterRepository;

    @Autowired
    private RecruiterServiceImpl recruiterServiceImpl;

    @Test
    void testGetRecruiter() throws GlobalException {
        Recruiter recruiter = new Recruiter();
        recruiter.setDepartment(Department.HR);
        recruiter.setEmail("your.user@example.org");
        recruiter.setFirstName("your");
        recruiter.setId("42");
        recruiter.setLastName("user");
        recruiter.setProvider(Provider.LOCAL);
        Optional<Recruiter> ofResult = Optional.of(recruiter);
        when(recruiterRepository.findById(Mockito.<String>any())).thenReturn(ofResult);
        Recruiter actualRecruiter = recruiterServiceImpl.getRecruiter("42");
        verify(recruiterRepository).findById(Mockito.<String>any());
        assertSame(recruiter, actualRecruiter);
    }

    @Test
    void testGetRecruiter2() throws GlobalException {
        Optional<Recruiter> emptyResult = Optional.empty();
        when(recruiterRepository.findById(Mockito.<String>any())).thenReturn(emptyResult);
        assertThrows(GlobalException.class, () -> recruiterServiceImpl.getRecruiter("42"));
        verify(recruiterRepository).findById(Mockito.<String>any());
    }

    @Test
    void testGetRecruiterByEmail() throws GlobalException {
        Recruiter recruiter = new Recruiter();
        recruiter.setDepartment(Department.HR);
        recruiter.setEmail("your.user@example.org");
        recruiter.setFirstName("your");
        recruiter.setId("42");
        recruiter.setLastName("user");
        recruiter.setProvider(Provider.LOCAL);
        when(recruiterRepository.findByEmail(Mockito.<String>any())).thenReturn(recruiter);
        Recruiter actualRecruiterByEmail = recruiterServiceImpl.getRecruiterByEmail("your.user@example.org");
        verify(recruiterRepository).findByEmail(Mockito.<String>any());
        assertSame(recruiter, actualRecruiterByEmail);
    }

    @Test
    void testAddRecruiter() throws GlobalException {
        Recruiter recruiter = new Recruiter();
        recruiter.setDepartment(Department.HR);
        recruiter.setEmail("your.user@example.org");
        recruiter.setFirstName("your");
        recruiter.setId("42");
        recruiter.setLastName("user");
        recruiter.setProvider(Provider.LOCAL);
        when(recruiterRepository.insert(Mockito.<Recruiter>any())).thenReturn(recruiter);

        Recruiter recruiter2 = new Recruiter();
        recruiter2.setDepartment(Department.HR);
        recruiter2.setEmail("your.user@example.org");
        recruiter2.setFirstName("your");
        recruiter2.setId("42");
        recruiter2.setLastName("user");
        recruiter2.setProvider(Provider.LOCAL);
        recruiterServiceImpl.addRecruiter(recruiter2);
        verify(recruiterRepository).insert(Mockito.<Recruiter>any());
        assertTrue(recruiterServiceImpl.logger instanceof ch.qos.logback.classic.Logger);
        assertEquals("42", recruiter2.getId());
        assertEquals("user", recruiter2.getLastName());
        assertEquals("your", recruiter2.getFirstName());
        assertEquals("your.user@example.org", recruiter2.getEmail());
        assertEquals(Department.HR, recruiter2.getDepartment());
        assertEquals(Provider.LOCAL, recruiter2.getProvider());
    }

    @Test
    void testUpdateRecruiter() throws GlobalException {
        Recruiter recruiter = new Recruiter();
        recruiter.setDepartment(Department.HR);
        recruiter.setEmail("your.user@example.org");
        recruiter.setFirstName("your");
        recruiter.setId("42");
        recruiter.setLastName("user");
        recruiter.setProvider(Provider.LOCAL);
        when(recruiterRepository.save(Mockito.<Recruiter>any())).thenReturn(recruiter);

        Recruiter recruiter2 = new Recruiter();
        recruiter2.setDepartment(Department.HR);
        recruiter2.setEmail("your.user@example.org");
        recruiter2.setFirstName("your");
        recruiter2.setId("42");
        recruiter2.setLastName("user");
        recruiter2.setProvider(Provider.LOCAL);
        recruiterServiceImpl.updateRecruiter(recruiter2);
        verify(recruiterRepository).save(Mockito.<Recruiter>any());
        assertTrue(recruiterServiceImpl.logger instanceof ch.qos.logback.classic.Logger);
        assertEquals("42", recruiter2.getId());
        assertEquals("user", recruiter2.getLastName());
        assertEquals("your", recruiter2.getFirstName());
        assertEquals("your.user@example.org", recruiter2.getEmail());
        assertEquals(Department.HR, recruiter2.getDepartment());
        assertEquals(Provider.LOCAL, recruiter2.getProvider());
    }

    @Test
    void testDeleteRecruiter() throws GlobalException {
        doNothing().when(recruiterRepository).deleteById(Mockito.<String>any());
        recruiterServiceImpl.deleteRecruiter("42");
        verify(recruiterRepository).deleteById(Mockito.<String>any());
        assertTrue(recruiterServiceImpl.logger instanceof ch.qos.logback.classic.Logger);
    }

    @Test
    void testProcessOAuthPostLogin() throws GlobalException {
        Recruiter recruiter = new Recruiter();
        recruiter.setDepartment(Department.HR);
        recruiter.setEmail("your.user@example.org");
        recruiter.setFirstName("your");
        recruiter.setId("42");
        recruiter.setLastName("user");
        recruiter.setProvider(Provider.LOCAL);
        when(recruiterRepository.findByEmail(Mockito.<String>any())).thenReturn(recruiter);
        recruiterServiceImpl.processOAuthPostLogin("youruser", "your", "user");
        verify(recruiterRepository).findByEmail(Mockito.<String>any());
        assertTrue(recruiterServiceImpl.logger instanceof ch.qos.logback.classic.Logger);
    }
}
