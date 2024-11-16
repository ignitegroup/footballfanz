// This file should be kept secure and not committed to version control
export const serviceAccount = {
  type: "service_account",
  project_id: "reggaefootballfanz-97160",
  private_key_id: "061d8f776b0542bb2cce0cd4489ff1f17e1aa4f9",
  private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  client_email: "firebase-adminsdk-qvjpl@reggaefootballfanz-97160.iam.gserviceaccount.com",
  client_id: "104231742236315943640",
  auth_uri: "https://accounts.google.com/o/oauth2/auth",
  token_uri: "https://oauth2.googleapis.com/token",
  auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
  client_x509_cert_url: "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-qvjpl%40reggaefootballfanz-97160.iam.gserviceaccount.com",
  universe_domain: "googleapis.com"
};