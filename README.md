🚀 Spring Boot User Management System
A robust, full-stack User Management Application built with a focus on scalability and clean architecture. This project demonstrates a complete CI/CD pipeline, from a local development environment to a fully containerized cloud deployment.

🌐 Live Demo: View Website (url : https://usermanagement-crq7.onrender.com/ )
Note: The application is hosted on a free-tier instance. If the link takes a minute to load, the server is simply waking up!

🛠️ Tech Stack
Backend: Java 20, Spring Boot

Database: PostgreSQL (Cloud) / MySQL (Local)

Frontend: HTML5, CSS3, JavaScript (Served as static resources)

Containerization: Docker (Multi-stage builds)

Deployment: Render

✨ Key Features
Full CRUD Functionality: Seamlessly Create, Read, Update, and Delete user profiles.

Monolithic Architecture: Frontend assets are optimized and served directly via Spring Boot static resources.

Cloud Persistence: Integrated with a managed PostgreSQL instance for real-time data storage.

Production Ready: Configured with dynamic port binding and environment-driven data sources.

🏗️ Architecture & Deployment
This application was successfully migrated from a local environment to a production cloud environment, overcoming complex networking hurdles.

🐳 Dockerization
The project uses a multi-stage Dockerfile to keep the final image lightweight:

Build Stage: Uses Maven to compile and package the .jar file.

Runtime Stage: Uses Eclipse Temurin JRE 20 for a high-performance execution environment.

🌐 Cloud Configuration
Dynamic Port Binding: Configured to listen on the ${PORT} assigned by the host environment.

Database Connectivity: Leverages HikariCP for efficient connection pooling to PostgreSQL.

🚀 Running Locally
Clone the repository:

Bash
git clone https://github.com/your-username/springboot-usermanagement.git
Setup Database: Update application.properties with your local database credentials.

Run the application:

Bash
mvn spring-boot:run
📝 Learning Outcomes
Mastered the transition from MySQL (Local) to PostgreSQL (Production).

Successfully navigated Docker networking and port-binding challenges on cloud platforms.

Implemented Static Resource Handling within a Spring Boot container.
