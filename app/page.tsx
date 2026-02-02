'use client';

import Footer from '@/components/Footer';
import ChatWindow from '@/components/ChatWindow';

export default function Home() {
  return (
    <>
      {/* Main Content - Full Screen */}
      <main className="min-h-screen relative">
        <ChatWindow />
      </main>

      {/* Footer - Below fold, visible only when scrolling */}
      <Footer />
    </>
  );
}
