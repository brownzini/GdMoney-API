### ⚙️GdMoney API

Api of my marketplace system integrated with blockchain, 
based on bsc network (bep20) and bnb payment token

## 💡 Técnologias

NodeJs
Typescript
Firebase

## 🚀 Starting
Rodar o servidor
```bash
npm run dev
# ou
yarn dev
```
Abra em [http://localhost:3000](http://localhost:3000)

## 📚 [Documentation]

## Users
>[GET] - Get all users | /users | Return json data<br />
>[GET] - Get details of specific user | /users/profile/:id | Return json data<br />
>[GET] - Get balance of wallet user   | /profile/getbalancebnb/:id | Return json data<br />
>[POST] - Create user | /users/create | Return json message<br />
>[PUT] - Update user  | /users/update/:id | Return json message<br />
>[DELETE] Delete user | /delete/:id | Return json message<br />

## Authenticate
>[POST] - Login user | /login  | Return token of user<br />
>[POST] - Logout user| /logout | Return message user<br />
>[POST] - Refresh Token | /refresh-token | Return json with user token and refresh token id<br />

## Products
>[GET] - Get all products | /products | Return json data<br />
>[GET] - Get details of specific product | /products/:id | Return json data<br />
>[POST] - Create product | /products/add | Return json message<br />
>[PUT] - Update user  | /products/update/:id | Return json message<br />
```bash
 ## Note 
   For delete product just update the field status to false
```
