## API USAGE

### Technologies Used

- Node.js
- Express.js
- MongoDB
- VineJS

### Prerequisites

Make sure you have the following installed on your machine:

- Node.js (v14 or later)
- MongoDB (locally installed)
- Postman (for API testing)

### Installation

1. Clone the repository:

   ```bash
   https://github.com/shivam-0510/GrowthX-Backend-Assignment.git
   cd .\GrowthX-Backend-Assignment\

2. Install Dependencies:

   ```bash
   npm install

3. Create a .env file and add the following variables:

   ```bash
   PORT=8080
   MONGO_URI=mongodb://localhost:27017/GrowthX-Backend

4. Start the application:

   ```bash
   nodemon .\server.js

### Usage
1. Open postman and create a new collection.

2. Create a new user:
   Add a post request

   ```bash
   localhost:8080/api/v1/user/register
   ```
   Select "raw" and "JSON" from the dropdown menu in the body section, then add data in the following form.
   ```bash
   {
      "username":"shivam0510",
      "email":"skg050210@gmail.com",
      "password":"shivam0510"
   }
   ```
   Then click on send button to send request. You will get the response like this.
   ```bash
   {
    "message": "User registered successfully",
    "user": {
        "username": "shivam0510",
        "email": "skg050210@gmail.com",
        "password": "$2a$10$PCak**********************************",
        "assignmentsSubmitted": [],
        "_id": "67385b70bc4b61f91031fefc",
        "createdAt": "2024-11-16T08:44:32.274Z",
        "updated": "2024-11-16T08:44:32.274Z",
        "__v": 0
    },
    "access_token": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9************************************"
   }
   ```

3. Login user:
   Add a post request

   ```bash
   localhost:8080/api/v1/user/login
   ```
   Select "raw" and "JSON" from the dropdown menu in the body section, then add data in the following form.
   ```bash
   {
      "email":"skg050210@gmail.com",
      "password":"shivam0510"
   }
   ```
   Then click on send button to send request.

4. Create a new admin:
   Add a post request

   ```bash
   localhost:8080/api/v1/admin/register
   ```
   Select "raw" and "JSON" from the dropdown menu in the body section, then add data in the following form.
   ```bash
   {
      "username":"shivam",
      "email":"1234@gmail.com",
      "password":"1234556"
   }
   ```
   Then click on send button to send request.

5. Login a new admin:
   Add a post request

   ```bash
   localhost:8080/api/v1/admin/register
   ```
   Select "raw" and "JSON" from the dropdown menu in the body section, then add data in the following form.
   ```bash
   {
      "email":"1234@gmail.com",
      "password":"1234556"
   }
   ```
   Then click on send button to send request.

6. Uploading assignment:
   Open Postman and add a post request

   ```bash
   localhost:8080/api/v1/user/register
   ```
   Select "raw" and "JSON" from the dropdown menu in the body section, then add data in the following form.
   ```bash
   {
      "username":"shivam0510",
      "email":"skg050210@gmail.com",
      "password":"shivam0510"
   }
   ```
   Then click on send button to send request.
   