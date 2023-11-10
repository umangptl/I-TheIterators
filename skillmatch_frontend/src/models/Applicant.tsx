export interface Applicant {
    email: string,
    firstName: string
    lastName: string,
    phoneNumber: string,
    address: string,
    resume: Uint32Array | undefined,
    coverLetter: Uint32Array | undefined
}