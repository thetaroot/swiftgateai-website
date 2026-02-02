'use client';

import Footer from '@/components/Footer';
import ChatWindow from '@/components/ChatWindow';

export default function Home() {
  return (
    <main className="flex flex-col">
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center">
        <ChatWindow />
      </div>
      <Footer />
    </main>
  );
}
