### ⚙️GdMoney API

Api of my marketplace system integrated with blockchain, 
based on bsc network (bep20) and bnb payment token

## 💡 Technologies

NodeJs
Typescript
Firebase

## 🚀 Starting
Run the server
```bash
npm run dev
# ou
yarn dev
```
Open in [http://localhost:3000](http://localhost:3000)

## 📚 [Documentation]

## Users
>[GET] - Get all users | /users | Return json data<br />
>[GET] - Get details of specific user | /users/profile/:id | Return json data<br />
>[GET] - Get balance of wallet user   | /users/profile/getbalancebnb/:id | Return json data<br />
>[POST] - Create user | /users/create | Return json message<br />
>[PUT] - Update user  | /users/update/:id | Return json message<br />
>[DELETE] Delete user | /users/delete/:id | Return json message<br />

## Authenticate
>[POST] - Login user | /login  | Return token of user<br />
>[POST] - Logout user| /logout | Return message user<br />
>[POST] - Refresh Token | /refresh-token | Return json with user token and refresh token id<br />

## Products
>[GET] - Get all products | /products | Return json data<br />
>[GET] - Get details of specific product | /products/:id | Return json data<br />
>[POST] - Create product | /products/add | Return json message<br />
>[PUT] - Update product  | /products/update/:id | Return json message<br />
```bash
 ## Note 
   For delete product just update the field status to false
```
## Categories
>[GET] - Get all categories | /categories | Return json data<br />
>[GET] - Get details of specific category | /categories/:id | Return json data<br />
>[POST] - Create category | /categories/add | Return json message<br />
>[PUT] - Update category  | /categories/update/:id | Return json message<br />
>[DELETE] Delete category | /categories/delete/:id | Return json message<br />

## Persistence
>[POST] - Send purchase requisition | /persistence/request | Return json message<br />
>[POST] - Confirm purchase request /persistence/confirm | Return json message<br />
```bash
 ## Note 
   Only use this function after requesting a purchase order with /persistence/request
```
