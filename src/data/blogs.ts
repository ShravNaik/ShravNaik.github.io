export interface Blog {
  id: string;
  title: string;
  description: string;
  content: string;
  date: string;
  readTime: string;
  imageUrl: string;
  tags: string[];
  gridSpan?: string;
}

export const blogs: Blog[] = [
  {
    id: "building-bluecue",
    title: "Building BlueCue: Real-Time Chat with React Native & Supabase",
    description: "A deep dive into architecting a high-performance, cross-platform chat application with secure authentication and real-time WebSockets.",
    content: `Building a real-time chat application from scratch presents numerous architectural challenges, from managing real-time state across mobile devices to ensuring secure authentication and seamless media sharing. In this post, I want to explore how I built BlueCue using Expo, React Native, Clerk, and Supabase.

### 1. Choosing the Right Stack

When designing BlueCue, my primary goal was to achieve native-like performance on both iOS and Android without maintaining two separate codebases. Expo and React Native offered the perfect blend of fast iteration cycles and robust native API access.

For authentication, Clerk was a natural choice due to its excellent developer experience and pre-built, highly secure user management flows. It allowed me to implement seamless sign-in and sign-up flows with minimal friction.

### 2. Real-Time Infrastructure with Supabase

The core of any modern chat application is its real-time messaging capabilities. Rather than managing and scaling a custom WebSocket server, I leveraged Supabase's real-time capabilities built on top of PostgreSQL.

By subscribing to database insert events on the \`messages\` table, BlueCue instantly pushes new messages to active chat participants. 

\`\`\`typescript
const subscription = supabase
  .channel('public:messages')
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, payload => {
    // Handle incoming message real-time
    setMessages(prev => [...prev, payload.new]);
  })
  .subscribe();
\`\`\`

### 3. Overcoming Performance Bottlenecks

As chat history grows, rendering long lists of messages can severely degrade mobile performance. To ensure a buttery-smooth 60 FPS scrolling experience, I utilized React Native's \`FlatList\` paired with memoized list items, custom pagination fetching older messages on-demand, and optimized image caching for shared media.

### Conclusion

Building BlueCue proved to be an incredible journey in understanding cross-platform mobile architecture and real-time backend synchronization. The combination of Expo and Supabase provides a powerful, modern stack for building complex mobile applications quickly.`,
    date: "May 15, 2026",
    readTime: "4 min read",
    imageUrl: "/BlueCue/BlueCueBanner.png",
    tags: ['React Native', 'Supabase', 'Expo', 'Architecture'],
    gridSpan: "md:col-span-2 lg:col-span-2"
  },
];
