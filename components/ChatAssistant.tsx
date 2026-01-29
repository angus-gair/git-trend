import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Terminal, Cpu, Network } from 'lucide-react';
import { Episode, AIConfig, ChatSession } from '../types';
import { createChatSession } from '../services/geminiService';

interface Message {
  role: 'user' | 'model';
  text: string;
}

interface ChatAssistantProps {
  episodes: Episode[];
  aiConfig: AIConfig;
}

const ChatAssistant: React.FC<ChatAssistantProps> = ({ episodes, aiConfig }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "TERMINAL_LINK_ESTABLISHED. QUERY_DATABASE..." }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatSessionRef = useRef<ChatSession | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [hasInitialized, setHasInitialized] = useState(false);

  // Re-initialize if critical config changes
  useEffect(() => {
    if (isOpen) {
        setHasInitialized(false);
        try {
            chatSessionRef.current = createChatSession(episodes, aiConfig);
            setHasInitialized(true);
        } catch (e) {
            console.error("Failed to init chat", e);
        }
    }
  }, [aiConfig.provider, aiConfig.googleModelId, aiConfig.openaiBaseUrl, aiConfig.openaiModelId, aiConfig.openaiApiKey, episodes]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;

    const userMsg = inputValue.trim();
    setInputValue("");
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      if (!chatSessionRef.current) {
         chatSessionRef.current = createChatSession(episodes, aiConfig);
      }

      const stream = chatSessionRef.current.sendMessageStream({ message: userMsg });
      let fullResponse = "";
      setMessages(prev => [...prev, { role: 'model', text: "" }]);

      for await (const chunk of stream) {
        const text = chunk.text;
        if (text) {
          fullResponse += text;
          setMessages(prev => {
            const newMessages = [...prev];
            newMessages[newMessages.length - 1].text = fullResponse;
            return newMessages;
          });
        }
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "FATAL_ERROR: CONNECTION_SEVERED." }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 p-4 bg-black dark:bg-acid text-acid dark:text-black border-2 border-acid dark:border-black shadow-hard hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all group"
        aria-label="Open Terminal"
      >
        <Terminal className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[400px] h-[500px] bg-black border-4 border-acid shadow-hard-white flex flex-col font-mono animate-in slide-in-from-bottom-10">
      {/* Terminal Header */}
      <div className="flex items-center justify-between p-2 bg-acid text-black border-b-2 border-black">
        <div className="flex items-center gap-2">
          {aiConfig.provider === 'google' ? <Cpu className="w-4 h-4" /> : <Network className="w-4 h-4" />}
          <h3 className="font-bold tracking-widest text-xs uppercase">
             LINK // {aiConfig.provider === 'google' ? aiConfig.googleModelId : aiConfig.openaiModelId}
          </h3>
        </div>
        <button 
          onClick={() => setIsOpen(false)}
          className="hover:bg-black hover:text-acid p-1 transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-black bg-grid-pattern bg-[length:20px_20px]">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
            <span className="text-[10px] text-concrete-500 mb-1 uppercase">
               {msg.role === 'user' ? 'USER_INPUT' : 'SYS_RESPONSE'}
            </span>
            <div className={`
              max-w-[90%] p-3 text-xs md:text-sm font-bold border-2
              ${msg.role === 'user' 
                ? 'bg-acid text-black border-acid' 
                : 'bg-black text-acid border-concrete-800'}
            `}>
              {msg.text}
              {isLoading && idx === messages.length - 1 && msg.text === "" && (
                <span className="inline-block w-2 h-4 bg-acid animate-pulse ml-1 align-middle"></span>
              )}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-2 bg-black border-t-2 border-concrete-800">
        <div className="relative flex items-center">
          <span className="absolute left-3 text-acid font-bold">{'>'}</span>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="ENTER COMMAND..."
            className="w-full pl-8 pr-14 py-3 bg-concrete-900 text-acid font-bold focus:outline-none border-2 border-concrete-700 focus:border-acid placeholder-concrete-700"
            disabled={isLoading}
            autoFocus
          />
          <button
            type="submit"
            disabled={!inputValue.trim() || isLoading}
            className="absolute right-2 p-1.5 bg-acid text-black hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-bold uppercase text-xs"
          >
            TX
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatAssistant;