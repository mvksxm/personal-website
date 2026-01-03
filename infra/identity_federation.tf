resource "google_iam_workload_identity_pool" "external_identities_pool" {
  workload_identity_pool_id = "external-identities-pool"
}

resource "google_iam_workload_identity_pool_provider" "vercel_provider" {
  workload_identity_pool_id          = google_iam_workload_identity_pool.external_identities_pool.workload_identity_pool_id
  workload_identity_pool_provider_id = "vercel-provider"
  display_name                       = "Vercel Identity Provider"
  description                        = "Vercel Identity Pool"
  attribute_mapping = {
    "google.subject" = "assertion.sub"
  }
  oidc {
    allowed_audiences = ["https://vercel.com/${var.vercel_team}"]
    issuer_uri        = "https://oidc.vercel.com/${var.vercel_team}"
  }
}