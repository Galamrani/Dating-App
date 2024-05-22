# DatingApp

DatingApp is a full-stack web application similar to Tinder, with various cool features. 
It enables users to create profiles, browse other profiles, like users, match with them, and communicate via real-time messaging. 
The backend is built with .NET Web API, and the frontend is developed using Angular.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Usage](#usage)
- [Prerequisites](#prerequisites)
- [System Architecture](#system-architecture)


## Features

- User Authentication and Authorization
- Profile Creation and Editing
- Photo Upload and Management
- Likes Functionality
- Real-time Messaging
- User Notifications

## Tech Stack

- **Frontend:** Angular, TypeScript, JavaScript
- **Backend:** .NET Web API, C#
- **Database:** SQLite (for development), PostgreSQL (for production)
- **Authentication:** JWT (JSON Web Tokens)
- **Real-time Communication:** SignalR
- **ORM:** Entity Framework
- **Identity Management:** ASP.NET Identity Framework
- **Photo Storage:** Cloudinary API

## Usage

Im currently working on a way to deploy the app to the web using some web host.
For now, you can run the app locally by following the instructions below.

```bash
# Clone the repository

git clone https://github.com/yourusername/DatingApp.git

# Navigate to the API project folder

cd DatingApp/API

# Run the application

dotnet run

# Open your browser and go to localhost to use the app
https://localhost:5001 or http://localhost:5000
```

### Prerequisites

- .NET SDK
- Node.js and npm
- PostgreSQL

### System Architecture

Im in the process of creating UML diagrams that will show the interactions between various components, the design patterns used, and other critical aspects of the system architecture.
