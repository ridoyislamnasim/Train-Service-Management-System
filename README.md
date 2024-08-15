
 # Train-Service-Management-System

 Create a backend system using Node.js, Express, and MongoDB that supports managing train services, stations, user wallets, and ticketing. This task is designed to evaluate the candidate's proficiency with backend development, scheduling mechanisms, user management, and wallet integration.


## Getting Started

Follow these steps to set up and run the project locally.

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

### [DOWNLOAD POSTMAN COLLECTION](https://drive.google.com/file/d/1Lqy70tWouCXEF8nTZqzEwtskj-STAcC3/view?usp=drive_link)


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