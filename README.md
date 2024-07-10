# Overview

DatingApp is a full-stack web application similar to Tinder, with various cool features.

## Usage

- Access the application through the frontend interface.
- Register or log in to your account.
- Upload and manage photos.
- Like profiles and match with other users.
- Send and receive private messages in real-time.

## Deployed Application

The application is currently deployed and can be accessed at the following URL: [https://dating-appv1.fly.dev/](https://dating-appv1.fly.dev/)

## Features

- **User Authentication and Authorization**: Secure login and registration using JWT authentication.
- **Profile Management**: Create, edit, and view user profiles.
- **Photo Upload and Gallery**: Upload photos and view them in a dynamic gallery.
- **Search, Sorting, and Filtering**: Find users using various filters.
- **Liking and Matching System**: Like other profiles and match with users.
- **Private Messaging**: Real-time private messaging system.
- **Notifications**: Receive real-time notifications for messages and likes.
- **Real-Time Presence**: See when other users are online and available.

## Tech Stack

- **Frontend**: Angular, TypeScript, JavaScript, HTML, CSS
- **Backend**: ASP.NET Core Web API, C#
- **Database**: SQLite (for development), PostgreSQL (for production)
- **Authentication**: JWT (JSON Web Tokens)
- **Real-Time Communication**: SignalR
- **ORM**: Entity Framework
- **Identity Management**: ASP.NET Identity Framework
- **Photo Storage**: Cloudinary API
- **Containerization**: Docker
- **Deployment**: Fly.io

## Architecture

- **Backend**: ASP.NET Core Web API with middleware and routing.
- **Data Management**: Entity Framework, Identity Framework, PostgreSQL.
- **Real-Time Communication**: SignalR for live messaging and actions.
- **Frontend**: Angular with reactive forms, interceptors, and secure routing.
- **Design Patterns**: Unit of Work for data management.
