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
        * <b>fromLang</b> - The language of text that you have to translate. 
        * <b>toLang</b> - The language in which text is to be translated.
        * <b>fromText</b> - The text you have to translate.
        * <b>toText</b> - The translated text.

        #### userModel.js
   * keys.js - This file contains database url which is used for connecting server to database.

