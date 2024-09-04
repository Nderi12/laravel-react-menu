# Project README

A Fullstack Project with Laravel and React Menu Hierarchy

This README will guide you through setting up and running the project locally, as well as how it has made use of use of Docker and CircleCI. 

## Project Overview

This project is a fullstack application with:
- **Laravel** as the backend framework.
- **React** for the frontend.

## Running the Project Locally

You can run the project in two main ways:

### Option 1: Run Locally without Docker

1. **Install Dependencies:**

   - **Backend (Laravel):**
     - Ensure you have [Composer](https://getcomposer.org/download/) installed.
     - Clone the repository:
       ```bash
       git clone https://github.com/your-repository.git
       cd your-repository
       ```
     - Copy the example environment file and generate a new `.env` file:
       ```bash
       cp .env.example .env
       ```
     - Install PHP dependencies:
       ```bash
       composer install
       ```
     - Generate an application key:
       ```bash
       php artisan key:generate
       ```

   - **Frontend (React):**
     - Navigate to the React folder:
       ```bash
       cd react
       ```
     - Install Node.js dependencies:
       ```bash
       npm install
       ```

2. **Run the Backend:**
   - In the root folder of the project, start the Laravel development server:
     ```bash
     php artisan serve
     ```

3. **Run the Frontend:**
   - Open a new terminal window or tab, navigate to the React folder, and start the React development server:
     ```bash
     npm run dev
     ```

   The frontend will be available at `http://localhost:3000` by default.

### Option 2: Run with Docker

1. **Build and Start Docker Containers:**
   - In the root folder of the project, build and start the Docker containers:
     ```bash
     docker-compose up --build
     ```

   This command will build the Docker images and start the containers for both the backend and the frontend.

2. **Access the Application:**
   - Once the containers are up and running, you can access the application at `http://localhost` for the frontend and the backend API should be available within the Docker network.

## CI/CD Pipeline

The project uses CircleCI for continuous integration and continuous deployment. The pipeline is configured to deploy the application to an AWS EC2 instance. 

Here's a structured section for your README.md on CircleCI configuration:

---

## CircleCI Configuration

CircleCI is used for continuous integration and deployment in this project. The configuration ensures that the code is tested and deployed automatically, maintaining the quality and up-to-date state of the application.

### Configuration File

- **Configuration File:** `.circleci/config.yml`

  The `.circleci/config.yml` file contains the CircleCI pipeline configuration. This file defines the various jobs and workflows that CircleCI will execute to build, test, and deploy the application.

### Pipeline Overview

#### Testing

- **Unit Tests:**
  - The CircleCI pipeline runs automated tests to ensure the integrity of the application. For example, it executes `MenuItemTest` in the Laravel backend to verify that menu items function as expected.
  - The testing job is defined in the `config.yml` file and typically involves installing dependencies, running tests, and reporting results.

#### Deployment

- **Automatic Deployment:**
  - Upon successful completion of the tests, CircleCI automatically deploys the application to the AWS EC2 instance.
  - The deployment process is managed through deployment jobs defined in the `config.yml` file. This may involve SSH access to the EC2 instance, copying files, and restarting services.

---

## Accessing the Application

You can access the application at the following IP address:
- **Login Page:** [http://16.171.230.177/login](http://16.171.230.177/login)

---
