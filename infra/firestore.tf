locals {
  work_experience_map = {
    for _, o in var.work_experience:
      base64encode(o["companyName"]["stringValue"]) => merge(o, {"id":{"stringValue": base64encode(o["companyName"]["stringValue"])}})
      # lower(replace(replace(o["companyName"]["stringValue"], "/&/", ""), "/\\s+/", "-")) => o
  }
}


resource "google_firestore_database" "personal_database" {
  project                     = var.project_id
  name                        = "personal-database"
  location_id                 = var.firestore_location
  type                        = "FIRESTORE_NATIVE"
  concurrency_mode            = "OPTIMISTIC"
  app_engine_integration_mode = "DISABLED"
  deletion_policy             = "DELETE"
}

resource "google_firestore_document" "work_experience_doc" {
  for_each    = local.work_experience_map
  project     = var.project_id
  database    = google_firestore_database.personal_database.name
  collection  = "workExperience"
  document_id = each.value["id"]["stringValue"]
  fields      = jsonencode(each.value)
}