<h1 align="center">GetTogether<a href="https://randy-get-together.onrender.com/"></a></h1

[GetTogether](https://randy-get-together.onrender.com/) is a solo project created by Randy Hac, crafted as part of AppAcademy's project. Modeled after MeetUp, GetTogether allows users to create and join groups and create events or attend events, which brings people together who have similar interests and hobbies!

<img width="1421" alt="image" src="https://github.com/randydhack/GetTogether/assets/113399691/54901598-b2a0-4e8c-acdc-cbc36eb87c95">



## Technologies Used
GetTogether was built using the following technologies:

### Backend:
- **Javascript**
- **Sequelize**
  - sequelize-express

### Frontend:
- **JavaScript**
- **React**
- **Redux**

## Table of Contents
- [Technologies Used](#technologies-used)
- [Installation](#installation)
  - [Backend Setup: Flask](#backend-setup-flask)
  - [Frontend Setup: React](#frontend-setup-react)
- [Operating](#operating)
- [Accord Showcase!](#accord-showcase)
- [Wiki Documents](#wiki-documents)
- [Future Features](#future-features)
- [Technical Implementation Details](#technical-implementation-details)
- [Authors](#authors)

## Installation

### Backend Setup: SQL

1. **Clone the Repository**
    ```bash
    git clone https://github.com/randydhack/GetTogether.git
    ```

2. **Install Dependencies**
    ```bash
    pipenv install -r requirements.txt
    ```

3. **Configure Environment Settings**
    - Create a `.env` file using the provided example, adjusting settings suitable for your development environment.
    - Ensure the SQLite3 database connection URL is present in the `.env` file.
    - Set a unique name for the `SCHEMA` environment variable, using the `snake_case` convention.

4. **Setup and Start the SQL Server**
    ```bash
    npm install
    npx dotenv sequelize db:migrate
    npx dotenv sequelize db:seed:all
    npm start
    ```

### Frontend Setup: React

1. **Navigate to the React App Folder**
    ```bash
    cd frontend
    ```

2. **Install Dependencies and Start the App**
    ```
    npm install
    npm start
    ```

3. With both backend and frontend running, you're ready to experience Phoebe. Cheers!

## Operating

For subsequent sessions, ensure you have two terminal windows:

1. **Backend Server** (ensure the database is migrated and seeded as mentioned in the installation process)
    ```bash
    cd backend
    npm start
    ```

2. **Frontend Server**
    ```bash
    cd frontend
    npm start
    ```

Enjoy GetTogether!

## GetTogether Showcase!

<img width="1421" alt="image" src="https://github.com/randydhack/GetTogether/assets/113399691/3f46b100-f1b5-430a-b772-554dab9dcd3f">

<img width="1421" alt="image" src="https://github.com/randydhack/GetTogether/assets/113399691/1bd3958a-0276-4fd3-8c5b-10f35ff20c8e">


## [Wiki Documents](https://github.com/randydhack/GetTogether/wiki)
- [Database Schema](https://github.com/randydhack/GetTogether/wiki/Database-Schema-Design)
- [Features](https://github.com/randydhack/GetTogether/wiki/Features)
- [API Documentations](https://github.com/randydhack/GetTogether/wiki/API-Documentation)


## Future Features

- **AWS**: Allow users to add images from their computer.
- **Invitation Notice**: Owners will have an inbox for invitations to accept or decline users to join their group.

## Technical Implementation Details

## Authors
* Randy's [Github](https://github.com/randydhack) and [LinkedIn](https://www.linkedin.com/in/randy-hac-4577a71b0/)

