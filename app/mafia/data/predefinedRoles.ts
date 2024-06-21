export type PredefinedRole = {
  id: string;
  name: string;
  persianName: string;
  image: string;
  hasAction: boolean;
  actionOrder: number | undefined;
  roleLevel: string;
  side: "Town" | "Mafia" | "ThirdParty";
  timesInGame: number;
  description: string;
};

const predefinedRoles: PredefinedRole[] = [
  {
    id: "13",
    name: "Night-Walker",
    persianName: "شبگرد",
    image: "/mafia/night-walker",
    hasAction: true,
    actionOrder: 1,
    roleLevel: "pro",
    side: "Town",
    timesInGame: 1,
    description:
      "one night can use the power to walk in the night, on that night, the Mafia can not shot. The next day, the player announce as dead.",
  },
  {
    id: "1",
    name: "Godfather",
    persianName: "پدرخوانده",
    image: "/mafia/godfather",
    hasAction: true,
    actionOrder: 2,
    roleLevel: "pro",
    side: "Mafia",
    description:
      "Leader of the Mafia. Appears as negative on investigations, can slaughter a player if guess their role correctly, and doesn't die with the first shot of the Professional.",
    timesInGame: 1,
  },
  {
    id: "2",
    name: "Mafia",
    persianName: "مافیا",
    image: "/mafia/mafia-member",
    hasAction: true,
    actionOrder: 3,
    roleLevel: "beginner",
    side: "Mafia",
    description: "Works with the Godfather to eliminate others.",
    timesInGame: 3,
  },
  {
    id: "12",
    name: "Joker",
    persianName: "جوکر",
    image: "/mafia/joker",
    hasAction: true,
    actionOrder: 4,
    roleLevel: "pro",
    side: "Mafia",
    description:
      "Three times during the night, he chooses a player to reverse that person's inquiry to the detective that night. He can only choose himself once.",
    timesInGame: 1,
  },
  {
    id: "10",
    name: "Magician",
    persianName: "جادوگر",
    image: "/mafia/magician",
    hasAction: true,
    actionOrder: 5,
    roleLevel: "pro",
    side: "Mafia",
    description: "During the night, can take one player's power.",
    timesInGame: 1,
  },
  {
    id: "5",
    name: "Leon",
    persianName: "لئون",
    image: "/mafia/professional",
    hasAction: true,
    actionOrder: 6,
    roleLevel: "beginner",
    side: "Town",
    description:
      "Can shot during the night for two nights. Can't kill the Godfather with the first shot. Can't be killed with the first shot of the Mafia. if shot a town-person the next day announce as dead",
    timesInGame: 1,
  },
  {
    id: "14",
    name: "Dr Lecter",
    persianName: "دکتز لکتر مافیا",
    image: "/mafia/dr-lecter",
    hasAction: true,
    actionOrder: 7,
    roleLevel: "pro",
    side: "Mafia",
    timesInGame: 1,
    description: "In the nights, can save a mafia member",
  },
  {
    id: "3",
    name: "Doctor",
    persianName: "دکتر",
    image: "/mafia/doctor",
    hasAction: true,
    actionOrder: 8,
    roleLevel: "beginner",
    side: "Town",
    description:
      "Can save one person from being killed each night. Can't save the same person two nights in a row. Can save themselves once.",
    timesInGame: 1,
  },
  {
    id: "4",
    name: "Detective",
    persianName: "کارآگاه",
    image: "/mafia/detective",
    hasAction: true,
    actionOrder: 9,
    roleLevel: "beginner",
    side: "Town",
    description:
      "Can investigate one person each night to determine their role.",
    timesInGame: 1,
  },
  {
    id: "7",
    name: "Constantine",
    persianName: "کنستانتین",
    image: "/mafia/constantine",
    hasAction: true,
    actionOrder: 10,
    roleLevel: "pro",
    side: "Town",
    description: "Can bring back one dead player to the game.",
    timesInGame: 1,
  },
  {
    id: "8",
    name: "Psychologist",
    persianName: "روانشناس",
    image: "/mafia/professional",
    hasAction: true,
    actionOrder: 11,
    roleLevel: "pro",
    side: "Town",
    description:
      "In two nights, can silence one player each night for the next day.",
    timesInGame: 1,
  },
  {
    id: "9",
    name: "Party Host",
    persianName: "میزبان مهمانی",
    image: "/mafia/party-host",
    hasAction: true,
    actionOrder: 12,
    roleLevel: "pro",
    side: "Town",
    description:
      "Can wake-up one player each night, if the player is in mafia side, the host will announce as dead next day, if not they can share their knowledge during the night.",
    timesInGame: 1,
  },
  {
    id: "11",
    name: "Die-hard",
    persianName: "جان سخت",
    image: "/mafia/die-hard",
    hasAction: true,
    actionOrder: 13,
    roleLevel: "pro",
    side: "Town",
    timesInGame: 1,
    description:
      "In two nights, Can inquiry the numbers of the mafia members from the game coordinator. the next day response will be announce to all players. do not go out with the first bullet of the Mafia",
  },
  {
    id: "15",
    name: "Serial Killer",
    persianName: "قاتل سربالی",
    image: "/mafia/serial-killer",
    hasAction: true,
    actionOrder: 14,
    roleLevel: "pro",
    side: "ThirdParty",
    timesInGame: 1,
    description:
      "In the nights, can kill one player. can't be killed by the Mafia. win the game if last between last 3 players.",
  },
  {
    id: "6",
    name: "Civilian",
    persianName: "شهروند ساده",
    image: "/mafia/villager",
    hasAction: false,
    actionOrder: undefined,
    roleLevel: "beginner",
    side: "Town",
    description: "Ordinary town-person with no special abilities.",
    timesInGame: 5,
  },
];

export default predefinedRoles;
