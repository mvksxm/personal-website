
resource "google_service_account" "function_sa" {
  account_id   = "personal-function-sa"
  display_name = "Service Account for the Personal Website Function"
}

resource "google_project_iam_member" "function_sa_role" {
  for_each = var.function_roles
  project  = var.project_id
  role     = each.value
  member   = "serviceAccount:${google_service_account.function_sa.email}"
}

resource "google_service_account" "vercel_sa" {
  account_id   = "vercel-sa"
  display_name = "Service Account for the Vercel to access the backend cloud function"
}

resource "google_project_iam_member" "vercel_sa_role_invoker" {
  project = var.project_id
  role    = "roles/run.invoker"
  member  = "serviceAccount:${google_service_account.vercel_sa.email}"
}

resource "google_project_iam_member" "vercel_sa_role_token_creator" {
  project = var.project_id
  role    = "roles/iam.serviceAccountTokenCreator"
  member  = "serviceAccount:${google_service_account.vercel_sa.email}"
}

// Service Account Impersonation roles
resource "google_service_account_iam_member" "vercel_sa_policy_user" {
  service_account_id = google_service_account.vercel_sa.name
  role               = "roles/iam.serviceAccountUser"
  for_each           = var.vercel_envs
  member = join("/",
    [
      "principal://iam.googleapis.com/${google_iam_workload_identity_pool.external_identities_pool.name}",
      "subject/owner:${var.vercel_team}:project:${var.vercel_project}:environment:${each.value}"
    ]
  )
}

resource "google_service_account_iam_member" "vercel_sa_policy_token" {
  service_account_id = google_service_account.vercel_sa.name
  role               = "roles/iam.serviceAccountTokenCreator"
  for_each           = var.vercel_envs
  member = join("/",
    [
      "principal://iam.googleapis.com/${google_iam_workload_identity_pool.external_identities_pool.name}",
      "subject/owner:${var.vercel_team}:project:${var.vercel_project}:environment:${each.value}"
    ]
  )
}
