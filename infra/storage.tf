resource "google_storage_bucket" "personal_bucket" {
  name          = "maksi-personal-bucket"
  project       = var.project_id
  location      = var.region
  force_destroy = true
  labels = {
    "type" : "personal"
  }
}

resource "google_storage_bucket_object" "function_archive" {
  name   = "personal-website/function/function.zip"
  source = "${local.project_path}/backend/function/archive/function.zip"
  bucket = google_storage_bucket.personal_bucket.name
}
