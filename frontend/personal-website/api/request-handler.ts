import type { VercelRequest, VercelResponse } from '@vercel/node';
import { getVercelOidcToken } from '@vercel/oidc';
import { ExternalAccountClient } from 'google-auth-library';


// GCP Variables
const GCP_PROJECT_NUMBER = process.env.GCP_PROJECT_NUMBER;
const GCP_SERVICE_ACCOUNT_EMAIL = process.env.GCP_SERVICE_ACCOUNT_EMAIL;
const GCP_WORKLOAD_IDENTITY_POOL_ID = process.env.GCP_WORKLOAD_IDENTITY_POOL_ID;
const GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID =
  process.env.GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID;
const GCP_FUNCTION_URL = process.env.GCP_FUNCTION_URL ? process.env.GCP_FUNCTION_URL : "http://localhost:8080" ;
const GCP_ACCESSOR_EMAIL = process.env.GCP_ACCESSOR_EMAIL;

const authClient = ExternalAccountClient.fromJSON({
  type: 'external_account',
  audience: `//iam.googleapis.com/projects/${GCP_PROJECT_NUMBER}/locations/global/workloadIdentityPools/${GCP_WORKLOAD_IDENTITY_POOL_ID}/providers/${GCP_WORKLOAD_IDENTITY_POOL_PROVIDER_ID}`,
  subject_token_type: 'urn:ietf:params:oauth:token-type:jwt',
  token_url: 'https://sts.googleapis.com/v1/token',
  service_account_impersonation_url: `https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/${GCP_SERVICE_ACCOUNT_EMAIL}:generateAccessToken`,
  subject_token_supplier: {
    getSubjectToken: getVercelOidcToken,
  },
});


interface GeneralResponse {
  status: string  
}

interface ErrorResponse extends GeneralResponse {
  message: string,
  trace: string
}

interface SuccessResponse extends GeneralResponse {
  payload: object[] | object
}

interface TokenResponse {
  token: string
}

const generateErrorResponse = (message: string, trace: string = ""): ErrorResponse => {
  return {
    status: "ERROR",
    message: message, 
    trace: trace
  }
}

const postRequest = async <T>(url: string, payload: object, headers: HeadersInit): Promise<T> => {
  let resp = await fetch(
    url,
    {
      method: "POST",
      body: JSON.stringify(payload),
      headers: headers
    }
  )
  
  let respData = resp.json()
  if (!resp.ok) {
    throw new Error(`Url - ${url} returned the following error message -> ${JSON.stringify(respData)}`)
  }

  return respData as T
}

const getIDToken = async (
  accessToken: string | undefined | null, 
  audience: string | undefined, 
  serviceEmail: string | undefined
): Promise<string> => {

  if (!accessToken || !audience || !serviceEmail) {
    throw new Error("One of the parameters specified to the 'getIdToken' func is undefined!")
  }

  let requestPayload = {
    audience: audience, 
    includeEmail: "true"
  }

  let requestHeaders = {
    "Authorization": `Bearer ${accessToken}`, 
    "Content-Type": "application/json"
  }

  let respData: TokenResponse = await postRequest<TokenResponse>(
    `https://iamcredentials.googleapis.com/v1/projects/-/serviceAccounts/${serviceEmail}:generateIdToken`,
    requestPayload,
    requestHeaders
  )

  return respData.token
}

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  
  try {
    if (request.method != "POST") {
      response.status(400).json(
        generateErrorResponse("Only POST requests are supported!")
      ) 
      return
    }

    let idToken = await getIDToken(
      (await authClient?.getAccessToken())?.token,
      GCP_FUNCTION_URL,
      GCP_ACCESSOR_EMAIL 
    )


    let apiResponseData = await postRequest<object[] | object>(
      GCP_FUNCTION_URL,
      request.body,
      { 
        "Authorization": `Bearer ${idToken}`, 
        "Content-Type": "application/json" 
      }
    )
  
    const successResponse: SuccessResponse = {
      status: "OK",
      payload: apiResponseData
    }

    response.status(200).json(successResponse);

    // Lines for testing
    // let decodedToken = jwtDecode((await authClient?.getAccessToken())?.token as string)
    // response.status(200).json((await authClient?.getAccessToken())?.token as string);

  } catch (error) {
    var err = error as Error;
    response.status(400).json(generateErrorResponse(err.message, err.stack));
  }
}