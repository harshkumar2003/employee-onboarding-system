# Employee Onboarding Portal

## Project Overview

The Employee Onboarding Portal is a system that allows HR to onboard new employees through a structured workflow.

There are two roles:

* HR
* Employee

The onboarding process follows a strict sequential flow. Employees cannot move to the next step until the current step is completed and approved.

---

# Onboarding Flow

```text
HR Creates Employee
        ↓
Invitation Email Sent
        ↓
Employee Accepts Invitation
        ↓
Account Creation
        ↓
Personal Details
        ↓
100% Completed
        ↓
Document Upload
        ↓
All Documents Uploaded
        ↓
HR Verification
        ↓
All Documents Approved
        ↓
Bank Details
        ↓
100% Completed
        ↓
Policy Acceptance
        ↓
NDA Accepted
Company Policy Accepted
Terms & Conditions Accepted
        ↓
Onboarding Completed
```

---

# HR Flow

## Step 1: Add Employee

HR enters:

* Full Name
* Email
* Phone Number
* Date of Joining (DOJ)

System actions:

* Create Employee Record
* Generate Invitation Token
* Send Invitation Email

Employee Status:

```text
INVITED
```

---

# Employee Flow

## Step 1: Account Creation

Employee receives invitation email.

Employee:

* Creates Password
* Activates Account

Status:

```text
PERSONAL_DETAILS_PENDING
```

---

## Step 2: Personal Details

### Auto Filled

* Full Name
* Email
* Phone Number

### Employee Fills

* Address
* Date Of Birth
* Emergency Contact

Required Completion:

```text
100%
```

Status:

```text
DOCUMENTS_PENDING
```

---

## Step 3: Document Upload

Employee uploads:

* Aadhaar Card
* PAN Card
* Resume
* 10th Marksheet
* 12th Marksheet
* Graduation Certificate
* Passport Photo

Document Status:

```text
PENDING
APPROVED
REJECTED
```

Employee cannot proceed until:

```text
All Documents Approved
```

Status:

```text
BANK_DETAILS_PENDING
```

---

## Step 4: Bank Details

Employee fills:

* Account Holder Name
* Account Number
* IFSC Code
* Bank Name

Status:

```text
POLICY_ACCEPTANCE_PENDING
```

---

## Step 5: Policy Acceptance

Employee accepts:

* NDA
* Company Policy
* Terms & Conditions

All policies must be accepted.

Status:

```text
COMPLETED
```

---

# Database Design

## users

Stores authentication and role information.

| Column     | Type      |
| ---------- | --------- |
| id         | UUID      |
| full_name  | VARCHAR   |
| email      | VARCHAR   |
| password   | VARCHAR   |
| role       | ENUM      |
| is_active  | BOOLEAN   |
| created_at | TIMESTAMP |

---

## employees

Stores onboarding information.

| Column            | Type      |
| ----------------- | --------- |
| id                | UUID      |
| user_id           | UUID      |
| phone             | VARCHAR   |
| doj               | DATE      |
| onboarding_status | ENUM      |
| current_step      | INT       |
| invite_sent       | BOOLEAN   |
| created_at        | TIMESTAMP |

---

## personal_details

Stores employee personal information.

| Column            | Type    |
| ----------------- | ------- |
| id                | UUID    |
| employee_id       | UUID    |
| address           | TEXT    |
| dob               | DATE    |
| emergency_contact | VARCHAR |
| completed         | BOOLEAN |

---

## documents

Stores uploaded documents.

| Column        | Type      |
| ------------- | --------- |
| id            | UUID      |
| employee_id   | UUID      |
| document_type | ENUM      |
| file_url      | VARCHAR   |
| status        | ENUM      |
| remarks       | TEXT      |
| uploaded_at   | TIMESTAMP |

### Document Types

```text
AADHAAR
PAN
RESUME
TENTH_MARKSHEET
TWELFTH_MARKSHEET
GRADUATION_CERTIFICATE
PHOTO
```

---

## bank_details

Stores banking information.

| Column              | Type    |
| ------------------- | ------- |
| id                  | UUID    |
| employee_id         | UUID    |
| account_holder_name | VARCHAR |
| account_number      | VARCHAR |
| ifsc_code           | VARCHAR |
| bank_name           | VARCHAR |
| completed           | BOOLEAN |

---

## policy_acceptance

Stores policy acceptance records.

| Column                  | Type      |
| ----------------------- | --------- |
| id                      | UUID      |
| employee_id             | UUID      |
| nda_accepted            | BOOLEAN   |
| company_policy_accepted | BOOLEAN   |
| terms_accepted          | BOOLEAN   |
| accepted_at             | TIMESTAMP |

---



# Entity Relationship

```text
users
  │
  └──── employees
            │
            ├──── personal_details
            │
            ├──── documents
            │
            ├──── bank_details
            │
            ├──── policy_acceptance
```

---

# Onboarding Status Flow

```text
INVITED
↓
PERSONAL_DETAILS_PENDING
↓
DOCUMENTS_PENDING
↓
DOCUMENT_VERIFICATION_PENDING
↓
BANK_DETAILS_PENDING
↓
POLICY_ACCEPTANCE_PENDING
↓
COMPLETED
```

---

# Tech Stack

Backend:

* Java
* Spring Boot
* Spring Security
* Spring Data JPA

Database:

* PostgreSQL

Primary Key Strategy:

* UUID
