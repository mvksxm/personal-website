locals {
  project_path = abspath("${path.cwd}/../")
}

data "google_project" "project" {
  project_id = var.project_id
}