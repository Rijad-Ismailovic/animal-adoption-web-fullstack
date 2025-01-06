# Full Stack Website Project

## Overview
A full-stack web application that showcases modern development practices. It includes a responsive frontend, a robust hierarchical backend, and integration with a database for CRUD operations.

## Features

### Frontend
- **Bootstrap 5**: Utilized for a fully responsive and modern UI design.
- **AJAX Calls**: Seamless client-server communication for dynamic content updates without page reloads.

### Backend
- **Hierarchical Architecture**: Divided into layers for better maintainability:
  - **Route Layer**: Handles API endpoints.
  - **Service Layer**: Contains business logic.
  - **DAO Layer**: Manages database interactions.
- **Middleware**: Used for tasks such as authentication, logging, and error handling.
- **JWT Authentication**: Secure authentication using JSON Web Tokens.
- **Password Hashing**: Ensures passwords are securely stored and verified in the database.
- **Swagger Documentation**: Provides an interactive API documentation interface.

### Database
- **Database Connection**: Fully integrated with a relational database.
- **CRUD Operations**: Create, Read, Update, and Delete functionalities implemented for database entities.

## Technologies Used
- **Frontend**: HTML, CSS, Bootstrap 5, JavaScript
- **Backend**: FlightPHP
- **Database**: MySQL
- **API Documentation**: Swagger

  
## Project Structure
```plaintext
├── backend/
│   ├── public/
│   │   ├── v1/
│   │       ├── docs/
│   │       ├── rest/
│   │           ├── dao/
│   │           ├── routes/
│   │           ├── services/
│   │           └── config.php
│   ├── vendor/
│   └── index.php
├── frontend/
│   ├── assets/
│   ├── services/
│   ├── utils/
│   ├── views/
│   └── index.html
├── .gitignore
└── README.md
```
