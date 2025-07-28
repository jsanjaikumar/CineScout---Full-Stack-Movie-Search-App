import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  Bot,
  User,
  Film,
  MessageCircle,
  X,
  Minimize2,
} from "lucide-react";

const CineScopeChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hi! I'm Master AI, your smart assistant built into the CineScope movie platform. How can I help you discover great movies today? 🎬 chatbot its still under training stage its stores your question at database and we train the bot to assist like yours Needs Thank You, but now its only answer some basic stuff question **whats next feature in your app?,who are you,who is creator of this web app?, after Bot training stage is Over you can raise question such as **is the Beast movie is suitable to watch with family and kids _ its gives the response after review the plot of movie and give you a response **",
      sender: "ai",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const chatRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!isOpen && messages.length > 1) {
      setHasNewMessage(true);
    }
  }, [messages, isOpen]);

  useEffect(() => {
    if (isOpen) {
      setHasNewMessage(false);
    }
  }, [isOpen]);

  // Handle click outside to close chat
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        chatRef.current &&
        !chatRef.current.contains(event.target) &&
        isOpen &&
        !isMinimized
      ) {
        setIsOpen(false);
        setIsMinimized(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, isMinimized]);

  // Simulate AI responses based on the conversation patterns
  const getAIResponse = (userMessage) => {
    const message = userMessage.toLowerCase();

    if (message.includes("name") || message.includes("who are you")) {
      return "I'm Master AI, the friendly assistant for the CineScope movie app. I'm here to help you with movie info! 🤖 ";
    }

    if (
      message.includes("developer") ||
      message.includes("who built") ||
      message.includes("creator")
    ) {
      return "My master, Mr. Sanjai Kumar — a passionate and creative full-stack developer — built CineScope with love and logic. 🎬✨";
    }

    if (
      message.includes("next feature") ||
      message.includes("upcoming") ||
      message.includes("new feature")
    ) {
      return "The next big feature for CineScope is an **AI upgrade** called **Code P**, developed by my master, Mr. Sanjai Kumar, to enhance movie discovery. 🚀";
    }

    if (
      message.includes("batman") &&
      (message.includes("kids") || message.includes("family"))
    ) {
      return "\"The Batman\" is quite dark and intense with mature themes and violence, so it's generally not recommended for young children. It's better suited for older teens and adults.";
    }

    if (
      message.includes("beast") &&
      (message.includes("kids") || message.includes("family"))
    ) {
      return "It has intense survival scenes and violence, so it's better suited for older teens and adults, not young kids.";
    }

    if (message.includes("movie") || message.includes("film")) {
      return "I'd be happy to help you with movie recommendations! Could you tell me what genre you're interested in or if you're looking for something specific for family viewing? 🍿";
    }

    return "I'm here to help you with all your movie-related questions! Ask me about movie recommendations, family-friendly films, or anything about the CineScope platform. 🎭";
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: Date.now(),
      text: inputText,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        text: getAIResponse(inputText),
        sender: "ai",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatMessage = (text) => {
    return text.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    setIsMinimized(false);
  };

  const minimizeChat = () => {
    setIsMinimized(true);
  };

  const maximizeChat = () => {
    setIsMinimized(false);
  };

  // Floating Chat Icon
  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50" ref={chatRef}>
        <button
          onClick={toggleChat}
          className="relative bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 group"
        >
          <MessageCircle className="w-6 h-6" />

          {/* Notification badge */}
          {hasNewMessage && (
            <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
              !
            </div>
          )}

          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 bg-gray-800 text-white text-sm px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap">
            Chat with Master AI
          </div>
        </button>
      </div>
    );
  }

  // Chat Window
  return (
    <div className="fixed bottom-6 right-6 z-50" ref={chatRef}>
      <div
        className={`bg-[#0F0D23] text-white rounded-2xl shadow-2xl border border-purple-500/30 transition-all duration-300 ${
          isMinimized ? "w-80 h-16" : "w-96 h-[600px]"
        }`}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-900 to-indigo-900 p-4 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="bg-purple-600 p-2 rounded-full">
              <Film className="w-4 h-4" />
            </div>
            <div>
              <h1 className="text-sm font-bold">Master AI</h1>
              <p className="text-purple-200 text-xs">CineScope Assistant</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {!isMinimized && (
              <button
                onClick={minimizeChat}
                className="text-purple-200 hover:text-white transition-colors"
              >
                <Minimize2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={isMinimized ? maximizeChat : toggleChat}
              className="text-purple-200 hover:text-white transition-colors"
            >
              {isMinimized ? (
                <MessageCircle className="w-4 h-4" />
              ) : (
                <X className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* Chat Content - Hidden when minimized */}
        {!isMinimized && (
          <>
            {/* Messages Container */}
            <div className="h-96 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-purple-600 scrollbar-track-gray-800">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${
                    message.sender === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`flex items-start space-x-2 max-w-xs ${
                      message.sender === "user"
                        ? "flex-row-reverse space-x-reverse"
                        : ""
                    }`}
                  >
                    <div
                      className={`p-1.5 rounded-full ${
                        message.sender === "user"
                          ? "bg-blue-600"
                          : "bg-purple-600"
                      }`}
                    >
                      {message.sender === "user" ? (
                        <User className="w-3 h-3" />
                      ) : (
                        <Bot className="w-3 h-3" />
                      )}
                    </div>
                    <div
                      className={`p-3 rounded-lg text-sm ${
                        message.sender === "user"
                          ? "bg-blue-600 text-white"
                          : "bg-gray-800 text-white border border-purple-500/30"
                      }`}
                    >
                      <div
                        dangerouslySetInnerHTML={{
                          __html: formatMessage(message.text),
                        }}
                      />
                      <div className="text-xs opacity-70 mt-1">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="flex items-start space-x-2 max-w-xs">
                    <div className="p-1.5 rounded-full bg-purple-600">
                      <Bot className="w-3 h-3" />
                    </div>
                    <div className="p-3 rounded-lg bg-gray-800 text-white border border-purple-500/30">
                      <div className="flex space-x-1">
                        <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-purple-500/30 rounded-b-2xl">
              <div className="flex space-x-2">
                <textarea
                  ref={inputRef}
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about movies..."
                  className="flex-1 bg-gray-800 text-white rounded-lg px-3 py-2 text-sm resize-none border border-purple-500/30 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  rows="1"
                  style={{
                    minHeight: "36px",
                    maxHeight: "80px",
                  }}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!inputText.trim() || isTyping}
                  className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors duration-200"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
              <div className="text-xs text-gray-400 mt-2 text-center">
                Built with ❤️ by Mr. Sanjai Kumar
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CineScopeChatbot;
