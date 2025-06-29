import { useState, useEffect, useRef } from "react";
import { FiMessageSquare, FiSend, FiUser } from "react-icons/fi";

const ChatTab = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasUserSentMessage, setHasUserSentMessage] = useState(false);
  const messagesEndRef = useRef(null);

  // Sample knowledge base for simulated responses
  const knowledgeBase = {
    greetings: [
      "Hello there!",
      "Hi! How can I help?",
      "Greetings! What can I do for you today?",
    ],
    capabilities: [
      "I can help with information, calculations, and general knowledge questions.",
      "My capabilities include answering questions, providing explanations, and assisting with various topics.",
      "I'm trained to assist with a wide range of subjects from science to humanities.",
    ],
    default: [
      "That's an interesting question. Let me think about that...",
      "I understand what you're asking. Here's what I can tell you...",
      "Thanks for your question. Here's some information that might help...",
    ],
  };

  // Auto-scroll to bottom and check for first message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    if (messages.some((msg) => msg.sender === "user")) {
      setHasUserSentMessage(true);
    }
  }, [messages]);

  const getSimulatedResponse = (userInput) => {
    const input = userInput.toLowerCase();

    if (input.includes("hello") || input.includes("hi")) {
      return knowledgeBase.greetings[
        Math.floor(Math.random() * knowledgeBase.greetings.length)
      ];
    }

    if (input.includes("can you") || input.includes("capabilities")) {
      return knowledgeBase.capabilities[
        Math.floor(Math.random() * knowledgeBase.capabilities.length)
      ];
    }

    return (
      knowledgeBase.default[
        Math.floor(Math.random() * knowledgeBase.default.length)
      ] + ` (You asked: "${userInput}")`
    );
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === "") return;

    // Add user message
    const newUserMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: "user",
    };

    setMessages([...messages, newUserMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI typing delay
    setTimeout(() => {
      const aiResponse = {
        id: messages.length + 2,
        text: getSimulatedResponse(inputValue),
        sender: "ai",
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  return (
    <div style={{height:"93vh"}} className="flex flex-col">
      {/* Messages container */}
      <div style={{height:"100%", overflowY:"scroll"}} className="flex-1 p-2 relative">
        {/* Gradient Welcome Message (only shows before first user message) */}
        {!hasUserSentMessage && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none gap-1">
            <h2 className="text-2xl md:text-5xl font-bold">
              Welcome to
            </h2>
            <h2 className="text-2xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Vittron.Ai
            </h2>
          </div>
        )}

        {/* Messages */}
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs md:max-w-md lg:max-w-lg p-3 rounded-xl ${
                message.sender === "user"
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {message.sender === "user" ? (
                <p>{message.text}</p>
              ) : (
                <div className="flex items-start">
                  <div className="mr-2 mt-1">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                      <FiUser className="h-3 w-3" />
                    </div>
                  </div>
                  <p className="flex-1">{message.text}</p>
                </div>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 text-gray-800 p-3 rounded-lg max-w-xs">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                <div
                  className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                ></div>
                <div
                  className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                ></div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="">
        <div className="relative">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message here..."
            className="w-full p-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            disabled={isTyping}
          />
          <button
            onClick={handleSendMessage}
            disabled={isTyping || !inputValue.trim()}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-indigo-600 hover:text-indigo-800 disabled:text-gray-400"
          >
            <FiSend className="h-6 w-6" />
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-2 text-center">
          {hasUserSentMessage
            ? "Continue your conversation"
            : "Start typing to begin chatting"}
        </p>
      </div>
    </div>
  );
};

export default ChatTab;
