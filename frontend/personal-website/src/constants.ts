

const VERCEL_ENDPOINT: string = import.meta.env.VERCEL_SERVER_ENDPOINT ? import.meta.env.VERCEL_SERVER_ENDPOINT: "/api/request-handler";
const WORK_EXPERIENCE_COLLECTION: string = import.meta.env.WORK_EXPERIENCE_COLLECTION ? import.meta.env.WORK_EXPERIENCE_COLLECTION : "workExperience";
const RESUME_LINK: string = import.meta.env.RESUME_LINK ? import.meta.env.RESUME_LINK : "https://drive.google.com/file/d/1h0SF687I4Upb-Eow0JGOK1WALTWPHAyh/view?usp=sharing";

export {
    VERCEL_ENDPOINT,
    WORK_EXPERIENCE_COLLECTION,
    RESUME_LINK
}