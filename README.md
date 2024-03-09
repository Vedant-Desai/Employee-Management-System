# Employee Management System

## Frontend

### 1. Signup/Login Page
Develop a user-friendly signup/login page allowing both employees and managers to securely access the system.

### 2. Department Management
Enable managers to create, update, and delete departments through dedicated pages, ensuring exclusive access.

### 3. Employee Overview
Implement a page displaying all employees, accessible to managers only, for a comprehensive view of the workforce.

### 4. Employee Details
Create a detailed page or model providing in-depth information about employees, accessible to individual employees for their own details.

### 5. Employee Filtering
Integrate a filter button using API endpoints to sort employees based on location and name in ascending and descending order. This ensures efficient filtering without relying on client-side JavaScript code.

### 6. Department Assignment
Facilitate managers in assigning departments to employees through an intuitive interface.

## Backend

### 1. Authentication
Implement secure login/signup routes for user authentication, ensuring the protection of user credentials.

### 2. Department CRUD Operations
Develop routes to perform CRUD (Create, Read, Update, Delete) operations on departments, restricting certain actions to managers for enhanced security.

### 3. Employee CRUD Operations
Create routes for CRUD operations on employees, with authorization restrictions on update and delete operations limited to managers.

### 4. Employee Filtering Endpoints
a. *Filter by Location*
   - Develop an endpoint to provide employees in an array sorted by location in ascending order.

b. *Name Sorting*
   - Implement an endpoint to provide employees in both ascending and descending order of their names based on the selected filter.
