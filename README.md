# SDC Bridge IKEA Reviews Service
Based on Viking IKEA Clone "Vikea"

> This service will serve up all the reviews for the requested item.
<br />

## Related Projects

  - https://github.com/HR-SDC-Bridge

<br />

## Table of Contents

1. [API](#api)
2. [Requirements](#requirements)
3. [Development](#development)

<br />

## API
### Read
 - For summaries of reviews for all items: GET /api/reviews
 - For pages use query param eg. GET /api/reviews?page=2
```JSON

{
  "page": {
    "number": 1,
    "outOf": 5
  },
  "summaries": [
    {
      "itemID": 1,
      "number": 479,
      "average": 4.4
    },
    {
      "itemID": 2,
      "number": 11,
      "average": 5
    },
    ...
  ]
}

```
 - For a summary: GET /api/reviews/:itemID
 - example responses based on item at https://www.ikea.com/us/en/p/hemnes-2-drawer-chest-black-brown-50242619/:
```JSON

{
  "itemID": 1,
  "number": 479,
  "average": 4.4
}

```

 - Use a comma-separated list to get the exact summaries you need:
 - eg. GET /api/reviews/11,22,38

```JSON

[
  {
    "itemID": 11,
    "number": 3,
    "average": 4.7
  },
  {
    "itemID": 22,
    "number": 8,
    "average": 3.9
  },
  {
    "itemID": 38,
    "number": 73,
    "average": 4.8
  }
]

```

 - For all details: GET /api/reviews/:itemID/details
 - 20 reviews will show per page.
 - Get other pages by eg. GET /api/reviews/:itemID/details?page=2
 - example response:
```JSON

{
  "itemID": 1,
  "averageRatings": {
    "number": 479,
    "overall": 4.4,
    "easeOfAssembly": 4.1,
    "valueForMoney": 4.4,
    "productQuality": 4.3,
    "appearance": 4.6,
    "worksAsExpected": 4.5
  },
  "page": {
    "number": 1,
    "outOf": 24
  },
  "customerReviews": [
    {
      "reviewID": 1,
      "name": "Carlos",
      "date": "02/22/2021",
      "title": "Good set",
      "reviewText": "Good set",
      "recommended": true,
      "overall": 5,
      "easeOfAssembly": 3,
      "valueForMoney": 5,
      "productQuality": 5,
      "appearance": 5,
      "worksAsExpected": 5
    },
    {
      "reviewID": 2,
      "name": "JANELEN",
      "date": "02/19/2021",
      "title": "Perfect for a guest bedroom",
      "reviewText": "Clean lines, drawers open easily and they look good.",
      "recommended": true,
      "overall": 5,
      "easeOfAssembly": 4,
      "valueForMoney": 5,
      "productQuality": 5,
      "appearance": 5,
      "worksAsExpected": 5
    },
    ...
  ]
}

```

 - For a single review: GET /api/reviews/:itemID/details/:reviewID
 - example response:
```JSON

{
  "reviewID": 2,
  "name": "JANELEN",
  "date": "02/19/2021",
  "title": "Perfect for a guest bedroom",
  "reviewText": "Clean lines, drawers open easily and they look good.",
  "recommended": true,
  "overall": 5,
  "easeOfAssembly": 4,
  "valueForMoney": 5,
  "productQuality": 5,
  "appearance": 5,
  "worksAsExpected": 5
}

```

### Create

Endpoint | Type | Behavior
--- | --- | ---
'/api/reviews/:itemID' | POST | Add a new review for specific item by ID

 - Expected JSON input:

```JSON
{
  "overall": 3.7,
  "easeOfAssembly": 3.7,
  "valueForMoney": 3.3,
  "productQuality": 2.6,
  "appearance": 3.2,
  "worksAsExpected": 3.7,
  "recommended": true,
  "title": "Very versatile",
  "reviewText": "Works very well in different rooms.",
  "reviewerName": "Melissa Ryan",
  "reviewerId": 666
}
```

### Update

Endpoint | Type | Behavior
--- | --- | ---
'/api/reviews/:reviewID' | PUT | Update a review by review ID

- Expected JSON input:

```JSON
  {
    "overall": 3.7,
    "easeOfAssembly": 3.7,
    "valueForMoney": 3.3,
    "productQuality": 2.6,
    "appearance": 3.2,
    "worksAsExpected": 3.7,
    "recommended": true,
    "title": "OK at first but fell apart",
    "reviewText": "It fell apart after I moved.",
    "reviewerName": "Chloe Tan",
    "reviewerId": 666
  }
```

### Delete

Endpoint | Type | Behavior
--- | --- | ---
'/api/reviews/:reviewID' | DELETE | Delete a review by review ID

<br /><br />


## Requirements

An `nvmrc` file is included if using [nvm](https://github.com/creationix/nvm).

- Node 6.13.0
- etc

## Development

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

