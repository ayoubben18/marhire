● Here's what each category stores in sessionStorage:

  CarRentalForm (Category 2):

  {
    "category": 2,
    "pickup_location": "location",
    "dropoff_location": "location",
    "pickup_date": "2025-08-19",
    "dropoff_date": "2025-08-22",
    "pickup_time": "00:00",
    "dropoff_time": "00:00"
  }

  BoatForm (Category 4):

  {
    "category": 4,
    "boat_type": "Any type",
    "city": "destination",
    "date": "2025-08-19",
    "time": "time",
    "people": 1,
    "start_date": "2025-08-19",
    "end_date": "2025-08-19"
  }

  PrivateDriverForm (Category 3):

  {
    "category": 3,
    "service_type": "airport_transfer",
    "city_a": "pickup_location",
    "city_b": "dropoff_location",
    "date": "2025-08-19",
    "time": "time",
    "pickup_date": "2025-08-19",
    "pickup_time": "time",
    "persons": 1
  }

  ThingsToDoForm (Category 5):

  {
    "category": 5,
    "date": "2025-08-19",
    "people": 1,
    "time_preference": "morning/afternoon/evening",
    "destination": "location",
    "start_date": "2025-08-19",
    "end_date": "2025-08-19"
  }

  Key issues I can see:
  1. Inconsistent field names across categories (city vs destination, persons vs people)
  2. Missing fields that booking form expects
  3. Field name mismatches between what's stored and what booking form looks for