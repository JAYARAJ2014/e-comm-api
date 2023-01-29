# e-comm-api
A sample e-comm project in NodeJS, TypeScript, MongoDb that makes use of JWT, Cookies, Stripe, Image Upload and Emailing

### Steps

- Create an express server app and a simple route. -- app.ts
- Setup connectoin to database  --connect.ts
- Setup middlewares

### FAQ
- Why express-async-errors is needed ? What does it do ?
  - To create error middleware to catc errors without using try-catch
- Cookie Gotchas
  - HttpOnly cookie is not accessible through client side Java Script
  - Cookie is set by server and send back to server by browser. Frontend app can be unware of this (Will not work if client is mobile)
  - Cookie has size limitations. 
  - Cookies can be used only in the same domain
