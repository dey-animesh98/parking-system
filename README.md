# parking-system

Application for book your parking slot

### SERVER

Start the server`npm start`

Runs the app in the development mode.\
Open [http://localhost:3001](http://localhost:3001)

## Endpoints

`Create a new slot`

POST - [http://localhost:3001/create-slot]

`Get all slots Data`

GET - [http://localhost:3001/get-slots]
Query- (?status=Available) (?status=Booked)

`Get Current slot avaibility count`

GET - [http://localhost:3001/current-slots]

`Book your slot by id`

PUT - [localhost:3001/book-slot/:id]

`Vacant slot by id`

PUT - [localhost:3001/avail-slot/:id]

`Get min waiting time`

GET - [localhost:3001/min-waiting-time]

`Check Avaibility & waiting time by id`

GET - [localhost:3001/waiting-time/:id]
