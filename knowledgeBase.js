const knowledgeBase = [
  {
    type: "greeting",
    keywords: ["hi", "hello", "hey"],
    answer: (username) => `Hi ${username}, How can I assist you today?`
  },
  {
    type: "pnr_status",
    keywords: ["pnr", "pnr status"],
    answer: () => "You can check your PNR status at https://www.indianrail.gov.in"
  },
  {
    type: "train_between",
    keywords: ["train between", "trains between stations"],
    answer: () => "Use 'Trains Between Stations' on IRCTC or NTES."
  },
  {
    type: "live_status",
    keywords: ["live status", "train live status"],
    answer: () => "Live train status is available at https://enquiry.indianrail.gov.in"
  },
  {
    type: "cancel_ticket",
    keywords: ["cancel ticket", "ticket cancellation"],
    answer: () => "Login to IRCTC and go to 'My Bookings' to cancel your ticket."
  },
  {
    type: "tatkal",
    keywords: ["tatkal"],
    answer: () => "Tatkal bookings open at 10 AM (AC) and 11 AM (Sleeper) the day before travel."
  },
  {
    type: "irctc",
    keywords: ["irctc"],
    answer: () => "Visit IRCTC at https://www.irctc.co.in"
  },
  {
    type: "station_code",
    keywords: ["station code"],
    answer: () => "You can find station codes on Indian Railways' official site."
  }
];

// Exporting knowledgeBase for server.js
export { knowledgeBase };
