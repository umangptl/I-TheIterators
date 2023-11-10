export interface Job {
    jobId: string;
    title: string;
    datePosted: string;
    deadline: string;
    description: string;
    skillsRequired: string[];
    location: string;
    requiredQualifications: string;
    hiringTeamInfo: string;
    requiredDocuments: string;
    tag: string;
    experience: string;
    //applicantNo: number;
    type: string;
    //department: string;
  }