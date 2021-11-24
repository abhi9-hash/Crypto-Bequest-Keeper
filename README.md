# Crypto-Bequest-Keeper
Repository for backend code of bequest keeper using encryption algorithms.

# To run localy:

   * Download the code.
   * Explore to the root folder in termnal.
   * Execute *npm install*.
   * Execute *nodemon*.

Server will run locally.

# Folder Structure

   * index.js - It is the main file which runs the server.
   * routes - This folder contains routers for API end points. It contains <b>accountRouter.js</b> (/account) and <b>userRouter.js</b> (/users) files which have API endpoints.

        * In accountRouter.js,     
                url       |   Type        |                       Body
            ------------- | ------------- | -----------------------------
             /register    | POST          | name,email,phone,password
             /login       | POST          | email,password
             /edit        | PUT           | email,password,phone
             
        * In userRouter.js,
                url       |   Type        |                       Body           |   Headers
            ------------- | ------------- | ------------------------------------ | -------------
             /            | POST          | secretkey,nominee1,nominee2,nominee3 | text,authorization(token)
             /info        | POST          | secretkey                            | authorization(token)
             /edit        | PUT           | secretkey,nominee1,nominee2,nominee3 | text,authorization(token)
             /nominee     | POST          | userid,secretkey                     |
             
   * models - This folder contains <b>accountModel.js</b> and <b>userModel.js</b> files which have schema designs for user bequest and user info.
        
        #### accountModel.js
        * <b>userid</b> - User's ID 
        * <b>token</b> - Encrypted string of JWT token
        * <b>timestamps</b> - Time at which user stores secret message

        #### userModel.js
        * <b>name</b> - User's name 
        * <b>email</b> - User's E-mail
        * <b>phone</b> - User's Phone Number 
        * <b>password</b> - User's password
        * <b>lastlogins</b> - Time at which user logs in
        * <b>filledDetails</b> - Flag which checks if user has stored his secret 
        * <b>mailsent</b> - Flag which checks if mail has been sent to remind user to login
        * <b>nominee1</b> - Nominee with whom user wants to share his secret message 
        * <b>nominee2</b> - Nominee with whom user wants to share his secret message
        * <b>nominee3</b> - Nominee with whom user wants to share his secret message
   * utils.js - This file contains middlewares for user authentication and generating jwt token

