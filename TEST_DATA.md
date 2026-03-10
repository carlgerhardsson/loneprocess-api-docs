# Test Data Documentation

All data in the staging environment is **fake test data** - no production or sensitive information.

---

## 📊 Data Overview

| Collection | Count | Description |
|------------|-------|-------------|
| **Employees** | 100 | Swedish test names with org codes |
| **Löneperiods** | 12 | Jan-Dec 2025 salary periods |
| **Activities** | 50 | Various process activities |
| **Fellistor** | 120 | Error records with different severities |
| **Assignments** | 240 | Activities linked to periods |
| **Körningsstatus** | 12 | Running status per period |

---

## 👥 Employees

**100 realistic Swedish employees**

### Sample Data:
```json
{
  "id": "EMP001",
  "namn": "Anna Andersson",
  "org_kod": "1001",
  "org_namn": "Ekonomi",
  "status": "active",
  "anstallningsdatum": "2020-01-15"
}
```

### Organization Codes:
- `1001` - Ekonomi
- `1002` - HR
- `1003` - IT
- `1004` - Försäljning
- `1005` - Produktion

### Status Values:
- `active` - Active employee
- `inactive` - Inactive employee

---

## 📅 Löneperiods

**12 salary periods for 2025**

### Sample Data:
```json
{
  "id": "202501",
  "period_namn": "2025-01",
  "start_date": "2025-01-01",
  "end_date": "2025-01-31",
  "status": "completed",
  "fas": "Avslut"
}
```

### Period IDs:
- `202501` through `202512` (Jan-Dec 2025)

### Status Values:
- `completed` - Finished period
- `active` - Currently running
- `draft` - Not yet started

### Fas (Phase) Values:
- `Förberedelse` - Preparation
- `Körning` - Running
- `Avstämning` - Reconciliation  
- `Avslut` - Closing

---

## ✅ Activities

**50 activities across different processes**

### Sample Data:
```json
{
  "id": "ACT001",
  "namn": "Kontrollera semesterdagar",
  "beskrivning": "Verifiera att alla semesterdagar är korrekta",
  "process": "forberedelse",
  "ansvarig_roll": "Löneadministratör",
  "status": "active",
  "ordning": 1
}
```

### Process Types:
- `forberedelse` - Preparation activities
- `korning` - Running activities
- `avstamning` - Reconciliation activities
- `avslut` - Closing activities

### Roles:
- `Löneadministratör`
- `Lönechef`
- `Ekonomichef`
- `Systemansvarig`

---

## ❌ Fellistor (Error Lists)

**120 error records with different severities**

### Sample Data:
```json
{
  "id": "ERR001",
  "loneperiod_id": "202501",
  "error_code": "E301",
  "error_message": "Saknad tidrapport för anställd",
  "severity": "error",
  "employee_id": "EMP042",
  "status": "unresolved",
  "detected_at": "2025-01-15T10:30:00Z"
}
```

### Severity Levels:
- `error` - Critical errors (blocks salary run)
- `warning` - Warnings (review needed)
- `info` - Informational messages

### Error Codes:
- `E3xx` - Errors (E301, E302, E303...)
- `W1xx` - Warnings (W101, W102, W103...)
- `I2xx` - Info (I201, I202, I203...)

### Status Values:
- `unresolved` - Not yet fixed
- `resolved` - Fixed
- `acknowledged` - Noted but not fixed

---

## 🔗 Assignments

**240 activity-period assignments**

### Sample Data:
```json
{
  "id": "ASG001",
  "loneperiod_id": "202501",
  "activity_id": "ACT001",
  "status": "completed",
  "completed_at": "2025-01-10T14:30:00Z",
  "completed_by": "anna.andersson@company.se"
}
```

### Status Values:
- `pending` - Not started
- `in_progress` - Currently working on
- `completed` - Finished
- `skipped` - Not applicable

---

## 🔄 Data Refresh

**When is test data updated?**

- **Never automatically** - Data is static for consistency
- **On request** - Contact admin to reseed data
- **Manual reset** - Can be triggered by admin

---

## 🎯 Using Test Data

### Good Examples:

```javascript
// Fetch all employees
const employees = await api.get('/api/v1/la/employees?limit=100');

// Get January 2025 period
const period = await api.get('/api/v1/loneperiods/202501');

// Get errors for a period
const errors = await api.get('/api/v1/la/fellistor/202501?severity=error');
```

### Filtering:

```javascript
// Filter by org code
GET /api/v1/la/employees?org_kod=1001

// Filter by status
GET /api/v1/activities?status=active

// Filter by severity
GET /api/v1/la/fellistor/202501?severity=error
```

---

## ⚠️ Important Notes

1. **No PII** - All names are fake Swedish names
2. **No real personnummer** - All IDs are test IDs
3. **Consistent data** - Same data across all requests
4. **Read-only** - Cannot modify test data via API

---

**Questions about test data?** Contact: carl.gerhardsson@cgi.com