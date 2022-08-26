# parking-system

Application for book your parking slot

## INSTRUCTIONS

- Frontend is build with ReactJS & Backend is NodeJS

* Start the server then start the frontend.

- Some Instruction to Fill the form of Booking

```yml
Row -1 -> Date for duration_from -> date must be future & not more than next hours.
Row -2 -> Date for duration_to -> date must be future & greater than start time.
Row -3 -> Name is Required -> No validations
Row -4 -> Email is Required -> Valid Email
Row -5 -> Mobile is required -> 10 Digit & should start with 4,5, 6, 7, 8, 9 Only.
Row -6 -> Vehicle no is required -> Min length 4 max length 10
```

## UI

`Available`
![plot](./UI%20images/Available.png)

`Booking form`
![plot](./UI%20images/Form-filling.png)

`Booking date & time`
![plot](./UI%20images/booking-date-time.png)

`Booking success`
![plot](./UI%20images/booking-succes.png)

`Slot waiting time`
![plot](./UI%20images/slot-waiting-time.png)

`No Avaibilty`
![plot](./UI%20images/no-avaibility.png)

### SERVER

Start the server`npm start`

Runs the app in the development mode.\
Open [http://localhost:3001](http://localhost:3001)

## Endpoints

`Create a new slot`

POST - [http://localhost:3001/create-slot]

```yml
-----Response---
"status": true,
    "message": "Slot created",
    "data": {
        "slotId": "12",
        "status": "Available",
        "duration": "0 hours",
        "duration_from": 0,
        "duration_to": 0,
        "whom": {
            "name": null,
            "email": null,
            "mobile": null,
            "vehicle_no": null
        },
        "_id": "630852a60a8e05551d4724e2",
        "createdAt": "2022-08-26T04:57:10.097Z",
        "updatedAt": "2022-08-26T04:57:10.097Z",
        "__v": 0
    }
```

`Get all slots Data`

GET - [http://localhost:3001/get-slots]
Query- (?status=Available) (?status=Booked)

```yml
"status": true,
    "slots": [
        {
           slots data
        },
        {
           slots data
        },
        {

        }
    ]
```

`Get Current slot avaibility count`

GET - [http://localhost:3001/current-slots]

```yml
{ "status": true, "slots": { "Available_Slots": 4, "Booked_Slots": 6 } }
```

`Book your slot by id`

PUT - [localhost:3001/book-slot/:id]
REQUEST BODY -raw/json

```yml
{
  "duration_from": "2022-08-25T18:00",
  "duration_to": "2022-08-25T19:00",
  "whom":
    {
      "name": "ffr",
      "email": "ffr@gmail.com",
      "mobile": "7834567896",
      "vehicle_no": "WB 34C 4578",
    },
}
```

`Vacant slot by id`

PUT - [localhost:3001/avail-slot/:id]

```yml
{
  "status": true,
  "message": "Slot availed",
  "data":
    {
      "whom":
        { "name": null, "email": null, "mobile": null, "vehicle_no": null },
      "_id": "6306339416a1f983b12ba442",
      "slotId": "3",
      "status": "Available",
      "duration": null,
      "duration_from": null,
      "duration_to": null,
      "createdAt": "2022-08-24T14:20:04.033Z",
      "updatedAt": "2022-08-26T05:01:17.589Z",
      "__v": 0,
    },
}
```

`Get min waiting time`

GET - [localhost:3001/min-waiting-time]

```yml
{

    "status": true,
    "data": {
        "min_waiting_time": "2 hours",
        "slot_id_will" : "2
        }
}


```

`Check Avaibility & waiting time by id`

GET - [localhost:3001/waiting-time/:id]

```yml
{ "status": true, "data": { "waiting_time": "2 hours" } }
```
