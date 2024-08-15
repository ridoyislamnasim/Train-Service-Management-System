
 # Train-Service-Management-System

 Create a backend system using Node.js, Express, and MongoDB that supports managing train services, stations, user wallets, and ticketing. This task is designed to evaluate the candidate's proficiency with backend development, scheduling mechanisms, user management, and wallet integration.


## Getting Started

Follow these steps to set up and run the project locally.

## Table of Contents
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [DOWNLOAD POSTMAN COLLECTION](#download-postman-collection)
- [Project Structure](#project-structure)
- [Description](#description)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
  - [User Management](#user-management)
  - [Station Management](#station-management)
  - [Train Management](#train-management)
  - [Wallet Management](#wallet-management)
  - [Ticket Management](#ticket-management)


### Prerequisites

- Node.js and npm installed on your machine

### Installation

1. **Clone the Repository**

   ```sh
   git clone https://github.com/ridoyislamnasim/Train-Service-Management-System.git
2. **Navigate to the Project Directory**
    ```shell
    cd Train-Service-Management-System/
3. **Open the Project in Your Code Editor**
    ```sh
    code .
4. **Install Project Dependencies**
    ```sh 
    npm i

## Running the Project
1. **Start the Development Server**
   ```sh
    npm run dev

## Testing the API

**Using Postman**

Import the Postman collection file (Train_Service_Management_System.postman_collection.json) into Postman.
Open the collection and run the requests to test the API endpoints.

### [DOWNLOAD POSTMAN COLLECTION](https://drive.google.com/drive/folders/1Fd6g25YaBdo6O-emXF4_NXCAnvlyB8BR?usp=sharing)

### user information

| Name              | Email                     | password | roles |
| ----------------- | ----------------------    | -------- | -----|
| ridoy islam nasim | ridoyislamnasim@gmail.com | 12345    | user |
| admin      | admin@gmail.com    | 12345    | admin |

## Project Structure

Below is the updated directory structure of the Train Service Management System:

```plaintext
/project-root
├── api
│   └── routes
│           ├── index.js
│           ├── station.router.js
│           ├── ticket.router.js
│           ├── train.router.js
│           ├── user.router.js
│           └── wallet.router.js
├── config
│   └── config.js
├── middleware
│   ├── auth
│   │     └──jwtAuth.js
│   ├── errors
│   ├── transaction
│   │     └── withTransaction.js
│   └── upload
├── models
│   ├── index.js
│   ├── STATION/stationSchema.js
│   ├── TICKET/ticketSchema.js
│   ├── TRAIN/trainSchema.js
│   └── USER/userSchema.js
├── modules
│   ├── station
│   │       ├── station.controller.js
│   │       ├── station.repository.js
│   │       └── station.service.js
│   ├── ticket
│   │       ├── ticket.controller.js
│   │       ├── ticket.repository.js
│   │       └── ticket.service.js
│   ├── train
│   │       ├── train.controller.js
│   │       ├── train.repository.js
│   │       └── train.service.js
│   ├── user
│   │       ├── user.controller.js
│   │       ├── user.repository.js
│   │       └── user.service.js
│   └── wallet
│           ├── wallet.controller.js
│           ├── wallet.repository.js
│           └── wallet.service.js
├── utils
├── server.js
├── uploads
└── .env
```

## Description

The Train Service Management System API provides a RESTful interface for managing train operations. It is designed to handle various functionalities related to train services, including:

- **User Management**: Allows for user registration, authentication, and retrieval of user details. This ensures that only authenticated users can perform certain operations within the system.

- **Station Management**: Enables the creation, updating, deletion, and retrieval of train stations. This is crucial for defining the routes and stops that trains will service. Access is restricted to admin users.

- **Train Management**: Facilitates the management of train details, including the creation and updating of train information, and listing of available trains. It supports setting up train routes and schedules by associating trains with specific stations. Access is restricted to admin users.

- **Wallet Management**: Provides users with the ability to add credits to their wallet, which can be used for purchasing tickets. It also allows users to view their transaction history, helping them keep track of their expenditures.

- **Ticket Management**: Allows users to purchase tickets for train journeys. This includes selecting a train, choosing start and end stations, and specifying the journey date and seat number. It ensures that users can book their trips efficiently and reliably.

# Authentication
The API uses JWT-based authentication. After logging in, include the Authorization: {{ACCESS_TOKEN}} header in your requests to access protected endpoints.
# API Endpoints
## User Management
#### Register a new user

     POST /user/registration
Body Parameters:
 - email (string)
 - password (string)
 - name (string)

Description: Registers a new user
### 1. User login
    POST /user/login
Body Parameters:
 - email (string)
 - password (string)

###  2. Get Users with Pagination
    GET {{URL}}/user?page={page}&limit={limit}
Retrieves a paginated list of users.
### 3. Get Single User
    GET {{URL}}/user/{userId}
Description: Retrieves details of a specific user by their ID.


##  Station Management
### 1. Create a new station
    POST /station

Body Parameters:
 - name (string)
 - state (string)
 - city (string)
### 2. Update Station
    PUT {{URL}}/station/{stationId}
Description: Updates details of an existing station.

Body Parameters:
 - name (string)
 - state (string)
 - city (string)

### 3. Get stations with pagination
    GET /station?page={page}&limit={limit}
### 4. Get Single Station
    GET {{URL}}/station/{stationId}
Description: Retrieves details of a specific station by ID.
### 4. Delete Station
     DELETE {{URL}}/station/{stationId}
Description: Deletes a station by its ID.
    
## Train Management
### 1. Create a new train
    POST /train

Body Parameters:
 - name (string)
 - number (string)
 - station (array of station IDs)
 - fareRatePerStop (number)
### 2. Update Train
     PUT {{URL}}/train/{trainId}
Description: Updates details of an existing train.

Body Parameters:
 - name (string)
 - number (string)
 - station (array)
 - fareRatePerStop (number)
### 3. Get Trains with Pagination
     GET {{URL}}/train?page={page}&limit={limit}
Description: Retrieves a paginated list of trains.

### 4. Get all trains
    GET /train/all
Description: Retrieves a list of all trains.
### 5. Get Single Train
    GET {{URL}}/train/{trainId}
Description: Retrieves details of a specific train by ID.

## Wallet Management
### 1. Credit wallet
    POST {{URL}}/wallet/credit
Body Parameters:
 - amount (number)
Description: Adds credit to the user's wallet.
### 2. Get User Transactions
    GET {{URL}}/wallet/transactions/{userId}
Description: Retrieves all transactions for a specific user.

## Ticket Management
### 1. Purchase a ticket
    POST {{URL}}/ticket
Body Parameters:
 - train (ID)
 - startStation (ID)
 - endStation (ID)
 - seatNumber (string)
 - journeyDate (string)
 Description: Purchases a ticket for a train journey.
 ### 2. Update a ticket
    PUT {{URL}}/ticket
Body Parameters:
 - train (ID)
 - startStation (ID)
 - endStation (ID)
 - seatNumber (string)
 - journeyDate (string)

 ### 4. Get Single ticket details
    GET /ticket/{ticketId}
Path Parameters:
 - ticketId (string): The ID of the ticket to retrieve details for.

 ### 5. Get all tickets for a user
    GET /ticket/user
Description: Retrieves all tickets purchased by the authenticated user.

 ### 6. Cancel a ticket
    DELETE /ticket/{ticketId}
Path Parameters:
 - ticketId (string): The ID of the ticket to be canceled.