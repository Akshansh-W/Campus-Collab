# CampusCollab

CampusCollab is a full-stack student collaboration platform designed to help students discover projects, form teams, manage tasks, and complete projects together.

The platform provides a complete project lifecycle — from creating a project and recruiting team members to assigning tasks, reviewing work, rating team members, and completing the project.

## Features

### Project Discovery
- Browse and explore student projects
- Paginated project loading with infinite scrolling
- View project details, requirements and technology stack
- Project of the Month showcase

### Project Management
- Create and manage projects
- Project admin and member roles
- Project workspace
- Project lifecycle management
- Project completion tracking

### Team Collaboration
- Send and manage project joining requests
- Accept students into projects
- Assign project-specific roles
- View project team members
- Manage team participation

### Task Management
- Assign tasks to team members
- Set task priority and deadlines
- Track task status
- Student task workflow
- Submit task reports and work links
- Admin task review

### Ratings & Project Completion
- Rate team members after project completion
- Submit feedback
- Update student ratings
- Track completed projects
- Track collaboration statistics
- Project completion workflow

### Notifications
- Project-related notifications
- Task and project completion notifications
- Team activity notifications

### AI Features
- AI-powered project recommendations
- AI-based Project of the Month selection
- Gemini API integration for project evaluation

## Tech Stack

### Frontend
- React
- Vite
- React Router
- Tailwind CSS
- Lucide React

### Backend
- Java
- Spring Boot
- Spring Data JPA
- Hibernate
- REST APIs

### Database
- PostgreSQL

### AI
- Google Gemini API

## Architecture

CampusCollab follows a layered backend architecture:

```text
Frontend
   |
   | REST API
   ↓
Controller
   |
   ↓
Service
   |
   ↓
Repository
   |
   ↓
PostgreSQL
