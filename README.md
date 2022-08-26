# hospitality-checkout
This is used to check in and checkout customers 

## Installation Guide
- Clone the project *git clone https://github.com/EphraimDev/hospital-checkout.git*
- Create your .env from the .env.example file 
-- For linux run *cp .env.example .env*
-- For windows run *copy .env.example .env*
- Install dependencies * npm i*
- Fill your database config in your .env. Please make use of mysql or postgres

## Migrations
- Run migrations using *npm run migration*

## Seeding
- Run seeder using *npm run seed*

## Build project
- Run *npm run build*

## Start project
- Run *npm start*

## Documentation
- https://documenter.getpostman.com/view/4011331/VUr1GCNm

## Endpoints
| Description  | Route | Method | Body | Params | Query |
| ----------- | ------ | ---    | ---  | ---    | ---   |
| Staff Login | /staff/login | POST | email, password | | |
| Add Staff   | /staff/create | POST | email, first_name, last_name, phone_number | | |
| Check In Customer | /reservations | POST | email, first_name, last_name, phone_number, room_type, room_number, checkout_time, amount_paid | | |
| All reservations | /reservations | GET | | | status, checking_time, checkout_time, room_type, room_number |
| Single reservation | /reservations/:id | GET | | id | |     
| Checkout reservation | /reservations/:id/checkout | GET | | id | |
| Pay overstay fee | /reservations/:id/pay | POST | overstay_fee | id | |

