import *  as z from "zod"; 


// Function Requests Types
const FunctionRequestSchema = z.object({ 
    isList: z.boolean(),
    collectionName: z.string(),
    documentId: z.optional(z.string())
  });

type FunctionRequest = z.infer<typeof FunctionRequestSchema>;


// Work Experience Types
const WorkExperienceSchema = z.object({
    id: z.string(),
    companyName: z.string(),
    position: z.string(),
    dateStart: z.string(),
    dateEnd: z.string(),
    location: z.string(),
    logoUrl: z.string(), 
    technologies: z.array(z.string()),
    jobResponsibilities: z.array(z.string())
  });

type WorkExperienceType = z.infer<typeof WorkExperienceSchema>;

export {
    FunctionRequest, 
    WorkExperienceType, 
    WorkExperienceSchema,
    FunctionRequestSchema,
}