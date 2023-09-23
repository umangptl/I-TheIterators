package com.iterators.skillmatch.model.enums;

public enum Department {
    HR("Human Resources"),
    TECH("Technical"),
    SALES("Sales"),
    MKTG("Marketing"),
    FINANCE("Finance"),
    ADMIN("Administration"),
    IT("Information Technology"),
    OPS("Operations"),
    CUST_SERV("Customer Service"),
    LEGAL("Legal and Compliance"),
    EXEC_SEARCH("Executive Search"),
    CAMPUS("Campus Recruitment"),
    GLOBAL("Global Recruitment"),
    CONTRACT("Contract and Temporary Staffing"),
    DIVERSITY("Diversity and Inclusion"),
    TALENT_ACQ("Talent Acquisition");

    private final String department;

    Department(String department) {
        this.department = department;
    }

    public String getDepartment() {
        return department;
    }
}
