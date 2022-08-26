# hospitality-checkout

This is used to check in and checkout customers

## Installation Guide

- Clone the project _git clone https://github.com/EphraimDev/hospital-checkout.git_
- Create your .env from the .env.example file

1. For linux run _cp .env.example .env_
2. For windows run _copy .env.example .env_

- Install dependencies _ npm i_
- Fill your database config in your .env. Please make use of mysql or postgres

## Migrations

- Run migrations using _npm run migration_

## Seeding

- Run seeder using _npm run seed_

## Build project

- Run _npm run build_

## Start project

- Run _npm start_

## Documentation

- https://documenter.getpostman.com/view/4011331/VUr1GCNm

## Endpoints

| Description          | Route                      | Method | Body                                                                                           | Params | Query                                                        | Added Info                                 |
| -------------------- | -------------------------- | ------ | ---------------------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------ | ------------------------------------------ |
| Staff Login          | /staff/login               | POST   | email, password                                                                                |        |                                                              |                                            |
| Add Staff            | /staff/create              | POST   | email, first_name, last_name, phone_number                                                     |        |                                                              |                                            |
| Check In Customer    | /reservations              | POST   | email, first_name, last_name, phone_number, room_type, room_number, checkout_time, amount_paid |        |                                                              |                                            |
| All reservations     | /reservations              | GET    |                                                                                                |        | status, checking_time, checkout_time, room_type, room_number | status should be _running_ or _checkedout_ |
| Single reservation   | /reservations/:id          | GET    |                                                                                                | id     |                                                              |                                            |
| Checkout reservation | /reservations/:id/checkout | GET    |                                                                                                | id     |                                                              |                                            |
| Pay overstay fee     | /reservations/:id/pay      | POST   | overstay_fee                                                                                   | id     |                                                              |                                            |

## Stack used
- Nodejs
- Typescript
- Mysql/Postgresql