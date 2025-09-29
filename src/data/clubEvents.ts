import { ClubEvent } from "@/types/club";

export const clubEvents: ClubEvent[] = [
  // Campus Life Events
  {
    id: "cl-1",
    title: "Fresher's Welcome Party",
    date: "2024-10-15",
    time: "6:00 PM",
    type: "upcoming-events",
    clubId: "campus-life",
    clubName: "Campus Life",
    description: "Grand welcome party for new students with cultural performances and networking",
    registrationRequired: true,
    status: "open"
  },
  {
    id: "cl-2",
    title: "Student Council Elections",
    date: "2024-10-25",
    time: "10:00 AM",
    type: "registrations",
    clubId: "campus-life",
    clubName: "Campus Life",
    description: "Annual student council elections - nominations now open",
    registrationRequired: true,
    status: "open"
  },
  
  // NSS Events
  {
    id: "nss-1",
    title: "Village Cleanup Drive",
    date: "2024-10-20",
    time: "7:00 AM",
    type: "upcoming-events",
    clubId: "nss",
    clubName: "NSS",
    description: "Community service initiative to clean local villages",
    registrationRequired: true,
    status: "open"
  },
  {
    id: "nss-2",
    title: "Weekly Planning Meeting",
    date: "2024-10-12",
    time: "4:00 PM",
    type: "meetings",
    clubId: "nss",
    clubName: "NSS",
    description: "Weekly meeting to plan upcoming community service activities",
    registrationRequired: false,
    status: "upcoming"
  },

  // Rotaract Events
  {
    id: "rot-1",
    title: "Blood Donation Camp",
    date: "2024-10-18",
    time: "9:00 AM",
    type: "upcoming-events",
    clubId: "rotaract",
    clubName: "Rotaract",
    description: "Annual blood donation drive in collaboration with local hospitals",
    registrationRequired: true,
    status: "open"
  },
  
  // Hustlers Events
  {
    id: "hus-1",
    title: "Startup Pitch Competition",
    date: "2024-10-22",
    time: "2:00 PM",
    type: "registrations",
    clubId: "hustlers",
    clubName: "Hustlers",
    description: "Present your startup ideas to industry experts and win funding",
    registrationRequired: true,
    status: "open"
  },
  {
    id: "hus-2",
    title: "Entrepreneurship Workshop",
    date: "2024-10-16",
    time: "3:00 PM",
    type: "workshops",
    clubId: "hustlers",
    clubName: "Hustlers",
    description: "Learn the fundamentals of starting your own business",
    registrationRequired: true,
    status: "open"
  },

  // Dions Events
  {
    id: "dio-1",
    title: "Theater Auditions",
    date: "2024-10-14",
    time: "5:00 PM",
    type: "auditions",
    clubId: "dions",
    clubName: "Dions",
    description: "Auditions for upcoming theater production 'Hamlet'",
    registrationRequired: true,
    status: "open"
  },
  {
    id: "dio-2",
    title: "Acting Workshop",
    date: "2024-10-19",
    time: "4:00 PM",
    type: "workshops",
    clubId: "dions",
    clubName: "Dions",
    description: "Method acting techniques with professional theater director",
    registrationRequired: true,
    status: "open"
  },

  // Energy Club Events
  {
    id: "ene-1",
    title: "Solar Panel Installation Workshop",
    date: "2024-10-17",
    time: "2:00 PM",
    type: "workshops",
    clubId: "energy-club",
    clubName: "Energy Club",
    description: "Hands-on workshop on solar panel installation and maintenance",
    registrationRequired: true,
    status: "open"
  },

  // Leo Events
  {
    id: "leo-1",
    title: "Leadership Training Session",
    date: "2024-10-21",
    time: "10:00 AM",
    type: "workshops",
    clubId: "leo",
    clubName: "Leo",
    description: "Develop leadership skills through interactive training modules",
    registrationRequired: true,
    status: "open"
  },

  // YRC Events
  {
    id: "yrc-1",
    title: "First Aid Training",
    date: "2024-10-23",
    time: "11:00 AM",
    type: "workshops",
    clubId: "yrc",
    clubName: "YRC",
    description: "Learn essential first aid and emergency response techniques",
    registrationRequired: true,
    status: "open"
  },

  // Pixters Events
  {
    id: "pix-1",
    title: "Photography Competition",
    date: "2024-10-24",
    time: "9:00 AM",
    type: "registrations",
    clubId: "pixters",
    clubName: "Pixters",
    description: "Annual photography competition with exciting prizes",
    registrationRequired: true,
    status: "open"
  },

  // Enlit Events
  {
    id: "enl-1",
    title: "Poetry Reading Night",
    date: "2024-10-26",
    time: "7:00 PM",
    type: "upcoming-events",
    clubId: "enlit",
    clubName: "Enlit",
    description: "Open mic poetry reading session for all literature enthusiasts",
    registrationRequired: false,
    status: "upcoming"
  },

  // Decibels Events
  {
    id: "dec-1",
    title: "Band Auditions",
    date: "2024-10-27",
    time: "6:00 PM",
    type: "auditions",
    clubId: "decibels",
    clubName: "Decibels",
    description: "Auditions for college band - all instruments welcome",
    registrationRequired: true,
    status: "open"
  },

  // Robotics Events
  {
    id: "rob-1",
    title: "Robot Building Workshop",
    date: "2024-10-28",
    time: "1:00 PM",
    type: "workshops",
    clubId: "robotics",
    clubName: "Robotics",
    description: "Build your first robot with Arduino and sensors",
    registrationRequired: true,
    status: "open"
  }
];