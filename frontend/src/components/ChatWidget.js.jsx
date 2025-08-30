// src/components/ChatWidget.js
import React, { useState } from "react";
import { MessageCircle } from "lucide-react";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Chat Icon */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-indigo-600 hover:bg-indigo-500 text-white p-4 rounded-full shadow-lg"
        aria-label="Open Chat"
      >
        <MessageCircle size={24} />
      </button>

      {/* Chat Popup/Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-900 rounded-lg overflow-hidden shadow-lg w-[90%] max-w-3xl h-[80%] relative">
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center"
              aria-label="Close Chat"
            >
              ✕
            </button>

            {/* Embedded Content via iframe */}
            <iframe
              src="https://green-h2-advisor.lovable.app/"
              title="H2Agent Chat"
              className="w-full h-full border-0"
            ></iframe>
          </div>
        </div>
      )}
    </>
  );
}
