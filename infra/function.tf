resource "google_cloudfunctions2_function" "function" {
  name        = "personal-website-func"
  location    = var.region
  project     = var.project_id
  description = "Personal Website Function"


  build_config {
    runtime     = "nodejs22"
    entry_point = "PersonalFunction"
    source {
      storage_source {
        bucket = google_storage_bucket.personal_bucket.name
        object = google_storage_bucket_object.function_archive.name
      }
    }
    environment_variables = merge(
      {
        "PROJECT_ID" : var.project_id,
        "DATABASE_ID" : google_firestore_database.personal_database.name
      },
      var.function_env_vars
    )
  }

  service_config {
    # ingress_settings      = "ALLOW_INTERNAL_ONLY"
    max_instance_count    = 1
    available_memory      = "256M"
    timeout_seconds       = 60
    service_account_email = google_service_account.function_sa.email
  }
}