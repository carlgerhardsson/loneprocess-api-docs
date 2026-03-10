/**
 * Löneprocess API - JavaScript Example
 * 
 * This example shows how to integrate with the Löneprocess API
 * using vanilla JavaScript and the Fetch API.
 */

import { initializeApp } from 'firebase/app';
import { getAuth, signInWithCustomToken } from 'firebase/auth';

// Firebase configuration (get from admin)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "loneprocess-api-staging.firebaseapp.com",
  projectId: "loneprocess-api-staging"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Your custom token from admin
const CUSTOM_TOKEN = 'YOUR_CUSTOM_TOKEN_HERE';

// API Base URL
const API_BASE_URL = 'http://localhost:8000';

/**
 * Authenticate with Firebase
 */
async function authenticate() {
  try {
    const userCredential = await signInWithCustomToken(auth, CUSTOM_TOKEN);
    console.log('✅ Authenticated successfully!');
    return userCredential.user;
  } catch (error) {
    console.error('❌ Authentication failed:', error.message);
    throw error;
  }
}

/**
 * Get ID token for API requests
 */
async function getIdToken() {
  const user = auth.currentUser;
  if (!user) {
    throw new Error('Not authenticated. Call authenticate() first.');
  }
  return await user.getIdToken();
}

/**
 * Make authenticated API request
 */
async function apiRequest(endpoint, options = {}) {
  const token = await getIdToken();
  
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
      ...options.headers
    }
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}

/**
 * Example 1: Get all salary periods
 */
async function getAllPeriods() {
  const periods = await apiRequest('/api/v1/loneperiods');
  console.log(`Found ${periods.length} salary periods`);
  return periods;
}

/**
 * Example 2: Get activities for a specific process
 */
async function getActivitiesByProcess(process) {
  const activities = await apiRequest(
    `/api/v1/activities?process=${process}`
  );
  console.log(`Found ${activities.length} activities for ${process}`);
  return activities;
}

/**
 * Example 3: Get employees from a specific org
 */
async function getEmployeesByOrg(orgKod) {
  const employees = await apiRequest(
    `/api/v1/la/employees?org_kod=${orgKod}`
  );
  console.log(`Found ${employees.length} employees in org ${orgKod}`);
  return employees;
}

/**
 * Example 4: Get error list for a period
 */
async function getErrorsForPeriod(periodId, severity = null) {
  let endpoint = `/api/v1/la/fellistor/${periodId}`;
  if (severity) {
    endpoint += `?severity=${severity}`;
  }
  
  const errors = await apiRequest(endpoint);
  console.log(`Found ${errors.length} errors for period ${periodId}`);
  return errors;
}

/**
 * Main function - run examples
 */
async function main() {
  try {
    // 1. Authenticate
    await authenticate();
    
    // 2. Get all periods
    const periods = await getAllPeriods();
    console.log('Latest period:', periods[0]);
    
    // 3. Get preparation activities
    const prepActivities = await getActivitiesByProcess('forberedelse');
    console.log('First activity:', prepActivities[0]);
    
    // 4. Get employees from Ekonomi org
    const ekonomiEmployees = await getEmployeesByOrg('1001');
    console.log('First employee:', ekonomiEmployees[0]);
    
    // 5. Get errors for January 2025
    const januaryErrors = await getErrorsForPeriod('202501', 'error');
    console.log(`Critical errors in January: ${januaryErrors.length}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

// Run examples
main();
