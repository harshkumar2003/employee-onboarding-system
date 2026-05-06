# Employee Onboarding Portal

# Goal
#### A web-based platform that helps companies onboard new employees digitally through task management, document verification, progress tracking, and role-based access.

# Roles

### - Employee -- completes onboarding
### - HR/Admin -- Manages onboarding

# Employee Features

### - Login
### - View dashboard
### - Upload documents
### - Complete tasks
### - View onboarding progress

# HR/Admin Features

### - Login
### - Create employee accounts
### - Assign tasks
### - Verify documents
### - Track onboarding status


# Employee Onboarding Flow

```text
+-------------------+
|   HR Creates      |
| Employee Account  |
+---------+---------+
          |
          v
+-------------------+
| Employee Receives |
| Login Credentials |
+---------+---------+
          |
          v
+-------------------+
| Employee Logs In  |
+---------+---------+
          |
          v
+-------------------+
| Employee Uploads  |
| Required Documents|
+---------+---------+
          |
          v
+-------------------+
| HR Verifies       |
| Documents         |
+----+---------+----+
     |         |
   Valid     Invalid
     |         |
     v         v
+-------------------+      +----------------------+
| Employee Completes|<-----| Employee Re-Uploads |
| Onboarding Tasks  |      | Correct Documents   |
+---------+---------+      +----------------------+
          |
          v
+-------------------+
| HR Reviews Final  |
| Onboarding Status |
+---------+---------+
          |
          v
+-------------------+
| Status Becomes    |
| "Completed"       |
+-------------------+
```
