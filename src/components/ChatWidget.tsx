import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MessageCircle, X, Send, Phone, Mail } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  text: string;
  sender: "user" | "agent";
  timestamp: Date;
}

const initialMessages: Message[] = [
  {
    id: "welcome",
    text: "Hi there! 👋 Welcome to Bus2Ride. How can I help you today?",
    sender: "agent",
    timestamp: new Date(),
  },
];

const quickReplies = [
  "Get a quote",
  "Vehicle availability",
  "Pricing info",
  "Speak to an agent",
];

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  const [contactInfo, setContactInfo] = useState({ name: "", email: "", phone: "" });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes("quote") || lowerMessage.includes("price") || lowerMessage.includes("cost")) {
      return "I'd be happy to help you get a quote! For the most accurate pricing, please call us at (888) 535-2566 or click 'Get a Quote' in the menu. Can I help with anything else?";
    }
    if (lowerMessage.includes("available") || lowerMessage.includes("availability") || lowerMessage.includes("book")) {
      return "We have a wide fleet available 24/7! To check specific availability for your date, please call us at (888) 535-2566 or share your event details and we'll check for you.";
    }
    if (lowerMessage.includes("agent") || lowerMessage.includes("human") || lowerMessage.includes("person") || lowerMessage.includes("speak")) {
      return "Of course! You can reach our team directly at (888) 535-2566. We're available 24/7 to assist you. Would you like me to have someone call you back?";
    }
    if (lowerMessage.includes("party bus") || lowerMessage.includes("limo") || lowerMessage.includes("vehicle")) {
      return "We offer party buses (20-50 passengers), stretch limousines (6-18 passengers), SUV limos, executive sedans, sprinter vans, and coach buses. What type of event are you planning?";
    }
    if (lowerMessage.includes("wedding") || lowerMessage.includes("prom") || lowerMessage.includes("bachelor") || lowerMessage.includes("corporate")) {
      return "That sounds exciting! We specialize in that type of event. For personalized recommendations and pricing, please share your date, location, and group size.";
    }
    
    return "Thanks for your message! For immediate assistance, please call us at (888) 535-2566. Our team is available 24/7 to help with your transportation needs.";
  };

  const handleSendMessage = (text: string = inputValue) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate agent response
    setTimeout(() => {
      const response = generateResponse(text);
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        sender: "agent",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, agentMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleQuickReply = (reply: string) => {
    handleSendMessage(reply);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const contactMessage: Message = {
      id: Date.now().toString(),
      text: `Contact request: ${contactInfo.name} - ${contactInfo.email} - ${contactInfo.phone}`,
      sender: "user",
      timestamp: new Date(),
    };
    setMessages((prev) => [...prev, contactMessage]);
    setShowContactForm(false);
    setIsTyping(true);

    setTimeout(() => {
      const agentMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: `Thanks ${contactInfo.name}! A member of our team will reach out to you shortly at ${contactInfo.email || contactInfo.phone}. Is there anything else I can help with?`,
        sender: "agent",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, agentMessage]);
      setIsTyping(false);
      setContactInfo({ name: "", email: "", phone: "" });
    }, 1500);
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              className="w-14 h-14 rounded-full bg-gold hover:bg-gold/90 text-gold-foreground shadow-lg"
            >
              <MessageCircle className="w-6 h-6" />
            </Button>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-background animate-pulse" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-3rem)] h-[550px] max-h-[calc(100vh-6rem)] bg-card border border-border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gold text-gold-foreground p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gold-foreground/20 flex items-center justify-center">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">Bus2Ride Support</h3>
                  <div className="flex items-center gap-1.5 text-xs opacity-90">
                    <span className="w-2 h-2 bg-green-400 rounded-full" />
                    Online now
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-gold-foreground hover:bg-gold-foreground/20"
                onClick={() => setIsOpen(false)}
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      message.sender === "user"
                        ? "bg-gold text-gold-foreground rounded-br-md"
                        : "bg-secondary text-foreground rounded-bl-md"
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-secondary text-foreground p-3 rounded-2xl rounded-bl-md">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}

              {/* Contact Form */}
              {showContactForm && (
                <motion.form
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={handleContactSubmit}
                  className="bg-secondary p-4 rounded-xl space-y-3"
                >
                  <p className="text-sm font-medium text-foreground">Request a callback:</p>
                  <Input
                    placeholder="Your name"
                    value={contactInfo.name}
                    onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
                    required
                    className="h-9 text-sm"
                  />
                  <Input
                    type="email"
                    placeholder="Email address"
                    value={contactInfo.email}
                    onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
                    className="h-9 text-sm"
                  />
                  <Input
                    type="tel"
                    placeholder="Phone number"
                    value={contactInfo.phone}
                    onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
                    className="h-9 text-sm"
                  />
                  <div className="flex gap-2">
                    <Button type="submit" size="sm" variant="gold" className="flex-1">
                      Submit
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => setShowContactForm(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </motion.form>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            {messages.length <= 2 && !showContactForm && (
              <div className="px-4 pb-2 flex flex-wrap gap-2">
                {quickReplies.map((reply) => (
                  <button
                    key={reply}
                    onClick={() => handleQuickReply(reply)}
                    className="px-3 py-1.5 text-xs border border-border rounded-full hover:bg-secondary transition-colors text-muted-foreground hover:text-foreground"
                  >
                    {reply}
                  </button>
                ))}
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t border-border bg-card">
              <div className="flex gap-2 mb-3">
                <a href="tel:888-535-2566" className="flex-1">
                  <Button variant="outline" size="sm" className="w-full text-xs">
                    <Phone className="w-3 h-3 mr-1" />
                    Call Now
                  </Button>
                </a>
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 text-xs"
                  onClick={() => setShowContactForm(!showContactForm)}
                >
                  <Mail className="w-3 h-3 mr-1" />
                  Callback
                </Button>
              </div>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
                className="flex gap-2"
              >
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type your message..."
                  className="flex-1"
                />
                <Button type="submit" variant="gold" size="icon" disabled={!inputValue.trim()}>
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatWidget;
