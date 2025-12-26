type WorkExperienceType = {
    id: string;
    companyName: string;
    position: string;
    dateStart: string;
    dateEnd: string;
    location: string;
    logoUrl: string;
    technologies: string[];
    jobResponsibilities: string[];
}

type StringDivProps = {
    [key: string]: string
}

export type { WorkExperienceType, StringDivProps }