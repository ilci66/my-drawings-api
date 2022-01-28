* I will be deploying this api to heroku probably, to use in the future
* Also planning on updating it regularly with my new drawings
* Don't wanna use graphql in this one, couldn't find a solution for the error I ran into at on my last project (react native threw an error I couldn't find a solution for) 
* I have read a lot about "pg" directly and used it in my last project so I will use "sequalize" in this one to learn about it
* As I'm actually planning on using this in the future as well I wanna make it production ready, so learning about transctions now as it's not included by default
* Reading babel docs and experimenting 
* Instead of sending just the drawings, I wanna send the types of objects drawn too, utilize eager loading in the home page, good practice 

# My Drawings Api

## Project Description
An api that serves drawings. Trasnpiling my code using babel for older browsers

### Motivation
My main motivation was to categorize my drawings and this app gave me the opportunity to practice sequelize and postgresql in a fun way. Still in development though.

### Technologies Used:
*   **Babel** 
*   **PostgreSQL**, for saving drawing and type information 
*   **sequelize**, for interacting with the database

### Challanges and Improvements
*   Subscription and auth methods can be implmented so non-admin users could also interact with api without corrupting the data in the database


### How to Install and Run the Project
1.  Clone the git repository
2.  Run "npm install" both in the root and in the backend 
3.  Populate in .env:

*   USER= postgres username
*   HOST= postgres host
*   DATABASE= postgres database name
*   PASSWORD= postgres database password
*   POSTGRESQL_PORT= postgres database port
*   PORT=3001
*   BACKEND_PORT=3002
*   NODE_ENV=development

4.  Run "npm devstart" for development
5.  Enjoy ;)

#### Feel free to use the code however you like 