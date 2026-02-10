export interface DailyMessage {
  date: string; // YYYY-MM-DD
  title: string;
  message: string;
  image?: string;
}

export const VALENTINE_DATE = "2026-02-14"; 

export const messages: DailyMessage[] = [
  {
    date: "2026-02-10",
    title: "The Quiet Moments",
    message: "I found myself thinking today about how much I cherish the simple, quiet moments we share together. Whether it is just sitting in silence or laughing at something completely random, those are the times when I feel the most connected to you. You have this incredible way of making the world feel still and perfect just by being in the room. Every second spent by your side is a gift that I never take for granted.",
  },
  {
    date: "2026-02-11",
    title: "A Light in My Life",
    message: "There are days when things feel heavy and the world seems a bit too loud, but then I think of you and everything changes. You are the light that guides me through my darkest hours and the warmth that keeps me going when things get cold. I want you to know how much your presence truly matters to me. You are not just my partner but my best friend and my greatest source of inspiration every single day.",
  },
  {
    date: "2026-02-12",
    title: "Everything We Have Built",
    message: "Looking back at everything we have shared makes me realize how lucky I am to have you. We have grown together in so many ways and every challenge we have faced has only made us stronger. I am so proud of the life we are building and the love that we share. You are the most beautiful person I have ever known, both inside and out, and I am honored to walk this path with you.",
  },
  {
    date: "2026-02-13",
    title: "The Eve of Our Day",
    message: "As the sun sets today, my heart is already racing for tomorrow. There are so many things I want to say to you, but most of all, I want you to feel how deeply you are loved. You deserve the world and more, and I promise to spend every day trying to give you exactly that. Get some rest tonight knowing that you are the last thing on my mind before I sleep and the first thing I think of when I wake up.",
  },
];
