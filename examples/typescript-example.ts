/**
 * Löneprocess API - TypeScript Example
 * 
 * This example shows how to integrate with the Löneprocess API
 * using TypeScript with full type safety.
 */

import { initializeApp, FirebaseApp } from 'firebase/app';
import { getAuth, signInWithCustomToken, Auth, User } from 'firebase/auth';

// Type definitions
interface LoneperiodResponse {
  id: string;
  period_namn: string;
  start_date: string;
  end_date: string;
  status: 'completed' | 'active' | 'draft';
  fas: 'Förberedelse' | 'Körning' | 'Avstämning' | 'Avslut';
  created_at: string;
  updated_at: string;
}

interface ActivityResponse {
  id: string;
  namn: string;
  beskrivning: string;
  process: 'forberedelse' | 'korning' | 'avstamning' | 'avslut';
  ansvarig_roll: string;
  status: 'active' | 'inactive';
  ordning: number;
}

interface EmployeeResponse {
  id: string;
  namn: string;
  org_kod: string;
  org_namn: string;
  status: 'active' | 'inactive';
  anstallningsdatum: string;
}

interface ErrorResponse {
  id: string;
  loneperiod_id: string;
  error_code: string;
  error_message: string;
  severity: 'error' | 'warning' | 'info';
  employee_id: string | null;
  status: 'unresolved' | 'resolved' | 'acknowledged';
  detected_at: string;
}

// Firebase configuration
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY!,
  authDomain: "loneprocess-api-staging.firebaseapp.com",
  projectId: "loneprocess-api-staging"
};

// API Client Class
class LoneprocessAPI {
  private auth: Auth;
  private baseURL: string;

  constructor(auth: Auth, baseURL: string = 'http://localhost:8000') {
    this.auth = auth;
    this.baseURL = baseURL;
  }

  /**
   * Authenticate with custom token
   */
  async authenticate(customToken: string): Promise<User> {
    try {
      const userCredential = await signInWithCustomToken(this.auth, customToken);
      return userCredential.user;
    } catch (error) {
      throw new Error(`Authentication failed: ${error}`);
    }
  }

  /**
   * Get current ID token
   */
  private async getIdToken(): Promise<string> {
    const user = this.auth.currentUser;
    if (!user) {
      throw new Error('Not authenticated');
    }
    return await user.getIdToken();
  }

  /**
   * Make authenticated API request
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const token = await this.getIdToken();
    
    const response = await fetch(`${this.baseURL}${endpoint}`, {
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
   * Get all salary periods
   */
  async getLoneperiods(): Promise<LoneperiodResponse[]> {
    return this.request<LoneperiodResponse[]>('/api/v1/loneperiods');
  }

  /**
   * Get specific period
   */
  async getLoneperiod(id: string): Promise<LoneperiodResponse> {
    return this.request<LoneperiodResponse>(`/api/v1/loneperiods/${id}`);
  }

  /**
   * Get activities with optional filters
   */
  async getActivities(filters?: {
    process?: string;
    role?: string;
    status?: string;
  }): Promise<ActivityResponse[]> {
    const params = new URLSearchParams(filters as any);
    return this.request<ActivityResponse[]>(
      `/api/v1/activities?${params}`
    );
  }

  /**
   * Get employees with optional filters
   */
  async getEmployees(filters?: {
    org_kod?: string;
    status?: string;
    limit?: number;
  }): Promise<EmployeeResponse[]> {
    const params = new URLSearchParams(filters as any);
    return this.request<EmployeeResponse[]>(
      `/api/v1/la/employees?${params}`
    );
  }

  /**
   * Get error list for a period
   */
  async getErrorsForPeriod(
    periodId: string,
    severity?: 'error' | 'warning' | 'info'
  ): Promise<ErrorResponse[]> {
    const params = severity ? `?severity=${severity}` : '';
    return this.request<ErrorResponse[]>(
      `/api/v1/la/fellistor/${periodId}${params}`
    );
  }
}

// Usage example
async function main() {
  // Initialize Firebase
  const app: FirebaseApp = initializeApp(firebaseConfig);
  const auth: Auth = getAuth(app);
  
  // Create API client
  const api = new LoneprocessAPI(auth);
  
  // Authenticate
  const customToken = process.env.CUSTOM_TOKEN!;
  await api.authenticate(customToken);
  console.log('✅ Authenticated!');
  
  // Get all periods
  const periods = await api.getLoneperiods();
  console.log(`Found ${periods.length} periods`);
  
  // Get preparation activities
  const activities = await api.getActivities({ process: 'forberedelse' });
  console.log(`Found ${activities.length} preparation activities`);
  
  // Get Ekonomi employees
  const employees = await api.getEmployees({ org_kod: '1001' });
  console.log(`Found ${employees.length} employees in Ekonomi`);
  
  // Get critical errors for January
  const errors = await api.getErrorsForPeriod('202501', 'error');
  console.log(`Found ${errors.length} critical errors in January`);
}

main().catch(console.error);
