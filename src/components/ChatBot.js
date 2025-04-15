import React, { useState, useRef, useEffect } from "react";

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [firstOpen, setFirstOpen] = useState(false);
  const chatBodyRef = useRef(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);

    if (!firstOpen) {
      setMessages([
        {
          text: "Hi! How can I assist you today?",
          sender: "bot",
        },
      ]);
      setFirstOpen(true);
    }
  };

  const generateBotReply = (userInput) => {
    const input = userInput.toLowerCase();
    if (input.includes("hello") || input.includes("hi")) {
      return "Hi! How can I assist you today?";
    } else if (input.includes("product")) {
      return "You can browse our products in the Products section.";
    } else if (input.includes("contact")) {
      return "You can reach out through our Contact page.";
    } else if (input.includes("price")) {
      return "Our product prices are listed alongside each item.";
    } else if (input.includes("order")) {
      return "You can track or place orders through your account page.";
    } else if (input.includes("thank")) {
      return "You're welcome!";
    } else {
      return "Sorry, I didn’t understand that.";
    }
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);

    const reply = generateBotReply(input);

    setTimeout(() => {
      const botMessage = { text: reply, sender: "bot" };
      setMessages((prev) => [...prev, botMessage]);
    }, 500);

    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSend();
  };

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);


  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Chat Toggle Button */}
      <button
        className="bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition"
        onClick={toggleChat}
      >
        💬
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="w-80 bg-white rounded-lg shadow-2xl mt-4 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 text-white px-4 py-2 font-bold text-lg flex justify-between items-center">
            Chat with us
            <button onClick={toggleChat} className="text-white">✖</button>
          </div>

          {/* Chat Body */}
          <div
            ref={chatBodyRef}
            className="flex-1 p-4 overflow-y-auto max-h-80 space-y-2 bg-gray-100"
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg max-w-[80%] ${msg.sender === "user"
                    ? "bg-blue-500 text-white self-end ml-auto"
                    : "bg-gray-300 text-black self-start mr-auto"
                  }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="p-3 border-t flex">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              className="flex-1 p-2 border rounded-l-lg focus:outline-none"
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 text-white px-4 rounded-r-lg hover:bg-blue-700"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
