Sign up for User through unique mobile number

Role base login  2.1) Admin (full access, Please add admin static entry direct into database )
2.2) User (Self Write)

User can order the product after login

Admin can upload Multiple images of Product (validation(size, type ) for product [.jpg | .png])

Login (JWT token)

CRUD Product [Name, Size, Image, Colour, Price, Quantity].

CRUD Order User wise [user_id, order_code, order_date, required_date, shipped_date, order_status ]

Sorting, pagination, search by Name of Product (In the first page should be 10 records after that 12 records each)

Admin can manage all products and orders of user.


## Project setup
```
npm install
```

### Run
```
node server.js
```
