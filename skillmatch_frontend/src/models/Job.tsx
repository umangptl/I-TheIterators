export interface Job {
  jobId: string;
  title: string;
  datePosted: Date;
  deadline: Date;
  description: string;
  skillsRequired: string[];
  location: string;
  requiredQualifications: string;
  hiringTeamInfo: string;
  requiredDocuments: string[];
  tag: string;
  experience: string;
  salary: number;
  //applicantNo: number;
  type: string;
  //department: string;
}
