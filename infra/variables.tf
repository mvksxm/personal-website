variable "project_id" {
  type = string
}

variable "region" {
  type    = string
  default = "us-central1"
}

variable "firestore_location" {
  type    = string
  default = "nam5"
}

variable "work_experience" {
  type = set(
    object({
      companyName = map(string),
      position    = map(string)
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

variable "function_env_vars" {
  type    = map(string)
  default = {}
}

variable "function_roles" {
  type    = set(string)
  default = []
}

variable "vercel_team" {
  type    = string
  default = "maxs-projects-09304feb"
}

variable "vercel_project" {
  type    = string
  default = "personal-website"
}

variable "vercel_envs" {
  type = set(string)
  default = [
    "production"
  ]
}