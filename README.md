<h1 align="center">Phoebe <a href="https://accord-ajr.onrender.com/"></a></h1

[Phoebe](https://phoebe.onrender.com/) is a solo project created by Randy Hac, crafted as part of AppAcademy's project. Modeled after Asana, Phoebe offers users a platform to manage productivity that allows users to create projects, add team members, and organize the processes of tasks.

<img width="1413" alt="image" src="https://github.com/randydhack/phoebe/assets/113399691/dd12870e-b515-4dfd-91a5-990485b69bef">


## Technologies Used
Phoebe was built using the following technologies:

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

Enjoy Phoebe!

## GetTogether Showcase!

<img width="1280" alt="image" src="https://github.com/randydhack/phoebe/assets/113399691/6c6bccf8-5a84-46aa-8bcb-05125a873cae">
<img width="1280" alt="image" src="https://github.com/randydhack/phoebe/assets/113399691/6056b527-5a56-49d8-a0b2-4e4a7dfa1168">


<img width="1280" alt="image" src="https://github.com/randydhack/phoebe/assets/113399691/89d301ff-2078-4762-8cc2-beadc8f58297">
<img width="1280" alt="image" src="https://github.com/randydhack/phoebe/assets/113399691/153c4f4b-8d58-4f3f-996a-c33d3c284c0a">
<img width="1280" alt="image" src="https://github.com/randydhack/phoebe/assets/113399691/0f2741c5-cd11-459b-addd-fdee10cd3232"> 
<img width="1280" alt="image" src="https://github.com/randydhack/phoebe/assets/113399691/2540e521-4044-4edd-b93b-0bd1458e989c">





## [Wiki Documents](https://github.com/abramfelix1/Accord/wiki)
- [Database Schema](https://github.com/randydhack/GetTogether/wiki/Database-Schema-Design)
- [Features](https://github.com/randydhack/GetTogether/wiki/Features)
- [API Documentations](https://github.com/randydhack/GetTogether/wiki/API-Documentation)


## Future Features

- **AWS**: Allow users to add images from computer.
- **Invitation Notice** Owners will have an inbox for invitations to accept or decline users to join their group.

## Technical Implementation Details




## Authors
* Randy's [Github](https://github.com/randydhack) and [LinkedIn](https://www.linkedin.com/in/randy-hac-4577a71b0/)

