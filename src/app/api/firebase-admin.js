// src/lib/firebase-admin.js
import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
// import serviceAccount from './firebase-service-account.json';
import dotenv from 'dotenv';
dotenv.config();

const serviceAccount = {
  type: process.env.SERVICEACCOUNT_type,
  project_id: process.env.SERVICEACCOUNT_project_id,
  private_key_id: process.env.SERVICEACCOUNT_private_key_id,
  private_key: process.env.SERVICEACCOUNT_private_key,
  client_email: process.env.SERVICEACCOUNT_client_email,
  client_id: process.env.SERVICEACCOUNT_client_id,
  auth_uri: process.env.SERVICEACCOUNT_auth_uri,
  token_uri: process.env.SERVICEACCOUNT_token_uri,
  auth_provider_x509_cert_url: process.env.SERVICEACCOUNT_auth_provider_x509_cert_url,
  client_x509_cert_url: process.env.SERVICEACCOUNT_client_x509_cert_url,
  universe_domain: process.env.SERVICEACCOUNT_universe_domain,
};


if (!getApps().length) {
  initializeApp({
    credential: cert(serviceAccount),
  });
}

const db = getFirestore();

export { db };
