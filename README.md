# Task Manager Application

A Spring Boot REST API application for managing tasks.

## Overview

This is a task management system built with Spring Boot that provides RESTful endpoints for creating, reading, updating, and deleting tasks.

## Prerequisites

- Java 11 or higher
- Maven 3.6+

## Getting Started

### Build the Project

```bash
./mvnw clean install
```

### Run the Application

```bash
./mvnw spring-boot:run
```

The application will start on `http://localhost:8080`

## Project Structure

```
taskmanager/
├── src/main/java/com/dylan/taskmanager/
│   ├── TaskmanagerApplication.java      # Main Spring Boot application class
│   ├── controller/                      # REST controllers
│   ├── service/                         # Business logic
│   ├── repository/                      # Data access layer
│   └── model/                           # Entity models
├── src/main/resources/
│   ├── application.properties           # Application configuration
│   ├── static/                          # Static resources
│   └── templates/                       # HTML templates
└── pom.xml                              # Maven configuration
```

## API Endpoints

### Tasks
- `GET /tasks` - Retrieve all tasks
- `GET /tasks/{id}` - Retrieve a specific task
- `POST /tasks` - Create a new task
- `PUT /tasks/{id}` - Update a task
- `DELETE /tasks/{id}` - Delete a task

## Configuration

Edit `src/main/resources/application.properties` to customize application settings.

## Testing

Run tests using:

```bash
./mvnw test
```

## License

This project is open source and available under the MIT License.
