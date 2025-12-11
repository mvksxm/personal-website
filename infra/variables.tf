variable "project_id" {
  type = string
}

variable "firestore_location" {
  type = string
}

variable "work_experience" {
  type = set(
    object({
      companyName         = string,
      dateStart           = string,
      dateEnd             = string,
      location            = string,
      logoUrl             = string,
      jobResponsibilities = list(string)
    })
  )
}