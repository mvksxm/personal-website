variable "project_id" {
  type = string
}

variable "firestore_location" {
  type = string
}

variable "work_experience" {
  type = set(
    object({
      companyName = map(string),
      dateStart   = map(string),
      dateEnd     = map(string),
      location    = map(string),
      logoUrl     = map(string),
      technologies = object({
        arrayValue = object({
          values = list(map(string))
        })
      })
      jobResponsibilities = object({
        arrayValue = object({
          values = list(map(string))
        })
      })
    })
  )
}