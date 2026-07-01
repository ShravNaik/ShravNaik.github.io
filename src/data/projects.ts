//import { Timeline } from "lucide-react";

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  imageUrl: string;
  videoUrl?: string;
  gallery: string[];
  tags: string[];
  link?: string;
  githubLink?: string;
  gridSpan?: string;
  Role: string;
  Timeline: string;
}

export const projects: Project[] = [
  {
    id: "bluecue",
    title: "BlueCue: Chat app",
    description: "Its a chat app designed using expo, react native, clerk for authentication and supabase for database. It features secure login/signup, real-time chat with your friends and family, image sharing, and much more.",
    longDescription: "BlueCue is a fully-featured, cross-platform mobile chat application built from the ground up to provide a seamless and secure communication experience. Leveraging the power of Expo and React Native, the app delivers native-like performance on both iOS and Android. \n\nAuthentication is securely handled via Clerk, ensuring user data privacy, while Supabase acts as the robust backend database handling real-time WebSocket connections for instant message delivery. Features include image sharing, user presence indicators, typing status, and end-to-end reliability.",
    imageUrl: "/BlueCue/BlueCueBanner.png",
    videoUrl: "/BlueCue/BlueCueAnimation.mp4",
    gallery: [
      "/BlueCue/BlueCueOnboarding.png",
      "/BlueCue/BlueCueSignUpHandling.png",
      "/BlueCue/BlueCueHomeScreen.png",
      "/BlueCue/BlueCueChats.png"
    ],
    tags: ['Expo', 'React Native', 'Clerk', 'Supabase'],
    Role: "Full-Stack Developer",
    Timeline: "Oct '25 - Nov '25",
    githubLink: "https://github.com/ShravNaik/BlueCue/tree/master",
    gridSpan: "md:col-span-2 lg:col-span-2"
  },
  {
    id: "Mnemo",
    title: "Mnemo: Your Timekeeper Companion",
    description: "Mnemo is a smart WhatsApp assistant that helps you stay on track with life's tasks.",
    longDescription: "Mnemo is a smart WhatsApp assistant that helps you stay on track with life's tasks. Add one-time or recurring reminders, mark them as done, edit on the fly, and view pending or completed tasks — all through simple chat commands. With Mnemo, your schedule flows naturally, and nothing slips through the cracks." +
      "\n\n- Python → main programming language\n" +
      "- Flask → lightweight web framework to handle incoming WhatsApp webhook requests\n" +
      "- Twilio API (WhatsApp) → connects Mnemo to WhatsApp, sends and receives messages\n" +
      "- APScheduler → schedules reminders (one‑time and recurring)\n" +
      "- SQLite → local database for storing tasks (easy to use, file‑based)\n" +
      "- dotenv → loads environment variables securely (Twilio credentials, etc.)\n",
    imageUrl: "/Mnemo/MnemoBanner.png",
    gallery: [
      "/Mnemo/MnemoAddCommand.png",
      "/Mnemo/MnemoDoneCommand.png",
      "/Mnemo/MnemoEditCommand.png",
      "/Mnemo/MnemoDeleteCommand.png",
      "/Mnemo/MnemoReminder.png"
    ],
    tags: ['Python', 'Flask', 'SQLite'],
    Role: 'Full-Stack Developer',
    Timeline: "June '26",
    githubLink: "https://github.com/ShravNaik/mnemo-reminder-bot",
    gridSpan: "md:col-span-1 lg:col-span-1"
  }
];
