# Movie Management System

## Description

This application provides a Details of User and Post  where users can add Its data to database and download the post data in excel. 


## Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Routes](#routes)
  - [User Routes](#user-routes)
  - [Post Routes](#post-routes)
 

## Features

- User and Post data Added to Database
- Download the Post data in excel


## Technologies Used

- Node.js
- Express.js
- MongoDB
- HTML
- CSS
- JavaScript


## Installation

  ### For Backend

   1. Clone the repository:

    ```bash
    git clone https://github.com/your-username/cointab.git
    cd backend
    ```

  2. Install dependencies:

    ```bash
    npm install
    ```

  3. Set up your MongoDB connection by creating a `.env` file in the root directory with the following content:

    ```env
    MONGOURL=your-mongodb-connection-string

 
    ```

  - Replace `your-mongodb-connection-string` with your MongoDB connection string .
  

  4. Run the application:

    ```bash
    npm run server
    ```

  The server will be running on http://localhost:8080 by default.

 ### For Frontend
 
   1. Navigate to the frontend directory:

    ```bash
    cd frontend
    ```
    


## Routes


### User Routes

| Method | Endpoint             | Description              | 
| ------ | ---------------------| ------------------------ | 
| GET   | `/user/userdata`     |      Check the user present in database   |
| POST   | `/user/addUser`        | Add the user in database  |
| GET   | `/user/user/:id`       | Getting data i=of user          | 





### Post Routes

| Method | Endpoint             | Description              |
| ------ | ---------------------| ------------------------ | 
| POST   | `post/addBulkPosts`     | Add the Post data     |
| GET   | `post/checkUserId/:userId`       | 	Check the user post is available |



