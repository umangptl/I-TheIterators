package com.iterators.skillmatch.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertSame;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import com.iterators.skillmatch.config.JWTUtils;
import com.iterators.skillmatch.exception.GlobalException;
import com.iterators.skillmatch.model.Recruiter;
import com.iterators.skillmatch.model.enums.Department;
import com.iterators.skillmatch.model.enums.Provider;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit.jupiter.SpringExtension;

@ContextConfiguration(classes = {AccountService.class, String.class})
@ExtendWith(SpringExtension.class)
class AccountService_Test {
    @Autowired
    private AccountService accountService;

    @MockBean
    private JWTUtils jWTUtils;

    @MockBean
    private RecruiterService recruiterService;

    @Test
    void testCreateOrUpdateUser() throws GlobalException {
        Recruiter recruiter = new Recruiter();
        recruiter.setDepartment(Department.HR);
        recruiter.setEmail("jane.doe@example.org");
        recruiter.setFirstName("Jane");
        recruiter.setId("42");
        recruiter.setLastName("Doe");
        recruiter.setProvider(Provider.LOCAL);
        doNothing().when(recruiterService).updateRecruiter(Mockito.<Recruiter>any());
        when(recruiterService.getRecruiterByEmail(Mockito.<String>any())).thenReturn(recruiter);

        Recruiter account = new Recruiter();
        account.setDepartment(Department.HR);
        account.setEmail("jane.doe@example.org");
        account.setFirstName("Jane");
        account.setId("42");
        account.setLastName("Doe");
        account.setProvider(Provider.LOCAL);
        Recruiter actualCreateOrUpdateUserResult = accountService.createOrUpdateUser(account);
        verify(recruiterService).getRecruiterByEmail(Mockito.<String>any());
        verify(recruiterService).updateRecruiter(Mockito.<Recruiter>any());
        assertEquals("Doe", actualCreateOrUpdateUserResult.getLastName());
        assertEquals("Jane", actualCreateOrUpdateUserResult.getFirstName());
        assertSame(recruiter, actualCreateOrUpdateUserResult);
    }

    @Test
    void testCreateOrUpdateUser2() throws GlobalException {
        Recruiter recruiter = new Recruiter();
        recruiter.setDepartment(Department.HR);
        recruiter.setEmail("jane.doe@example.org");
        recruiter.setFirstName("Jane");
        recruiter.setId("42");
        recruiter.setLastName("Doe");
        recruiter.setProvider(Provider.LOCAL);
        doThrow(new IllegalArgumentException("foo")).when(recruiterService).updateRecruiter(Mockito.<Recruiter>any());
        when(recruiterService.getRecruiterByEmail(Mockito.<String>any())).thenReturn(recruiter);

        Recruiter account = new Recruiter();
        account.setDepartment(Department.HR);
        account.setEmail("jane.doe@example.org");
        account.setFirstName("Jane");
        account.setId("42");
        account.setLastName("Doe");
        account.setProvider(Provider.LOCAL);
        assertThrows(IllegalArgumentException.class, () -> accountService.createOrUpdateUser(account));
        verify(recruiterService).getRecruiterByEmail(Mockito.<String>any());
        verify(recruiterService).updateRecruiter(Mockito.<Recruiter>any());
    }

}
