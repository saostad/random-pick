const sampleApiResponse = {
  "events": [
    {
      "name": "LITERARY FAIR",
      "date": "2024-09-29",
      "time": "12:00 PM - 5:00 PM",
      "location": "Newtown Park",
      "gcal_link": "https://calendar.google.com/calendar/render?action=TEMPLATE&text=LITERARY+FAIR&dates=20240929T160000Z/20240929T210000Z&details=Literary+Fair+at+Newtown+Park&location=Newtown+Park&ctz=America/New_York"
    },
    {
      "name": "TRUNK OR TREAT",
      "date": "2024-10-23",
      "time": "6:00 PM - 8:00 PM",
      "location": "City Hall",
      "gcal_link": "https://calendar.google.com/calendar/render?action=TEMPLATE&text=TRUNK+OR+TREAT&dates=20241023T220000Z/20241024T000000Z&details=Trunk+or+Treat+at+City+Hall&location=City+Hall&ctz=America/New_York"
    },
    {
      "name": "COMMUNITY SAFETY DAY",
      "date": "2024-10-05",
      "time": "10:00 AM - 1:00 PM",
      "location": "City Hall",
      "gcal_link": "https://calendar.google.com/calendar/render?action=TEMPLATE&text=COMMUNITY+SAFETY+DAY&dates=20241005T140000Z/20241005T170000Z&details=Community+Safety+Day+at+City+Hall&location=City+Hall&ctz=America/New_York"
    },
    {
      "name": "DIWALI FESTIVAL",
      "date": "2024-10-26",
      "time": "12:00 PM - 5:00 PM",
      "location": "City Hall",
      "gcal_link": "https://calendar.google.com/calendar/render?action=TEMPLATE&text=DIWALI+FESTIVAL&dates=20241026T160000Z/20241026T210000Z&details=Diwali+Festival+at+City+Hall&location=City+Hall&ctz=America/New_York"
    },
    {
      "name": "SUMMER CONCERT SERIES",
      "date": "2024-10-05",
      "time": "6:00 PM - 10:00 PM",
      "location": "Newtown Park",
      "details": "Johns Creek Symphony Orchestra",
      "gcal_link": "https://calendar.google.com/calendar/render?action=TEMPLATE&text=SUMMER+CONCERT+SERIES&dates=20241005T220000Z/20241006T020000Z&details=Summer+Concert+Series+featuring+Johns+Creek+Symphony+Orchestra+at+Newtown+Park&location=Newtown+Park&ctz=America/New_York"
    },
    {
      "name": "HONORING OUR VETERANS",
      "date": "2024-11-09",
      "time": "9:00 AM - 10:00 AM",
      "location": "Veterans Memorial Walk inside Newtown Park",
      "gcal_link": "https://calendar.google.com/calendar/render?action=TEMPLATE&text=HONORING+OUR+VETERANS&dates=20241109T140000Z/20241109T150000Z&details=Honoring+Our+Veterans+at+Veterans+Memorial+Walk+inside+Newtown+Park&location=Veterans+Memorial+Walk+inside+Newtown+Park&ctz=America/New_York"
    },
    {
      "name": "SPOOKY MILL",
      "date": "2024-10-12",
      "time": "2:00 PM - 9:00 PM",
      "location": "Autrey Mill Nature Preserve",
      "gcal_link": "https://calendar.google.com/calendar/render?action=TEMPLATE&text=SPOOKY+MILL&dates=20241012T180000Z/20241013T010000Z&details=Spooky+Mill+at+Autrey+Mill+Nature+Preserve&location=Autrey+Mill+Nature+Preserve&ctz=America/New_York"
    },
    {
      "name": "HOLLY JOLLY BLOCK PARTY",
      "date": "2024-12-07",
      "time": "4:00 PM - 8:00 PM",
      "location": "City Hall",
      "gcal_link": "https://calendar.google.com/calendar/render?action=TEMPLATE&text=HOLLY+JOLLY+BLOCK+PARTY&dates=20241207T210000Z/20241208T010000Z&details=Holly+Jolly+Block+Party+at+City+Hall&location=City+Hall&ctz=America/New_York"
    },
    {
      "name": "JOHNS CREEK ARTS FESTIVAL",
      "date": "2024-10-19",
      "time": "10:00 AM - 5:00 PM",
      "location": "Atlanta Athletic Club",
      "gcal_link": "https://calendar.google.com/calendar/render?action=TEMPLATE&text=JOHNS+CREEK+ARTS+FESTIVAL&dates=20241019T140000Z/20241019T210000Z&details=Johns+Creek+Arts+Festival+at+Atlanta+Athletic+Club&location=Atlanta+Athletic+Club&ctz=America/New_York"
    },
    {
      "name": "BREAKFAST WITH SANTA",
      "date": "2024-12-14",
      "time": "9:30 AM - 11:30 AM",
      "location": "Park Place at Newtown School",
      "gcal_link": "https://calendar.google.com/calendar/render?action=TEMPLATE&text=BREAKFAST+WITH+SANTA&dates=20241214T143000Z/20241214T163000Z&details=Breakfast+with+Santa+at+Park+Place+at+Newtown+School&location=Park+Place+at+Newtown+School&ctz=America/New_York"
    }
  ]
}

export const getSampleApiResponse = async () => {
  // 2 seconds delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  return sampleApiResponse;
}
