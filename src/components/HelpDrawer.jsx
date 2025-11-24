import { useState, useRef, useEffect } from "react";
import useHelpChat from "@/hooks/useHelpChat";
import { useHelpDrawerStore } from "@/stores/helpDrawerStore";
import { X, MessageSquare, SendHorizontal, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const HelpDrawer = () => {
  const { isOpen, openDrawer, closeDrawer } = useHelpDrawerStore();
  const { messages, send, loading, initialLoading } = useHelpChat();
  const [input, setInput] = useState("");
  const listRef = useRef(null);

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight + 200;
  }, [messages]);

  const onSend = async () => {
    const t = input.trim();
    if (!t) return;
    setInput("");
    await send(t);
  };

  return (
    <>
      <button
        onClick={openDrawer}
        // title="Hi! I'm KindPlate Assistant 👋"
        className="fixed right-5 bottom-5 z-[60] w-14 h-14 rounded-full bg-primary text-white shadow-lg flex items-center justify-center hover:scale-110 transition cursor-pointer tooltip tooltip-left"
        data-tip="Hi! I'm KindPlate Assistant 👋"
      >
        <MessageSquare size={22} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="flex-1 bg-black/40 cursor-pointer"
              onClick={closeDrawer}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            />

            <motion.div
              className="w-full max-w-md h-full bg-white shadow-2xl flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 140, damping: 18 }}
            >
              <div className="p-4 border-b flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src="/logo.png"
                    alt="Logo"
                    className="w-10 h-10 rounded-full object-cover shadow-sm"
                  />
                  <div>
                    <div className="font-semibold text-sm">
                      KindPlate Assistant
                    </div>
                    <div className="text-xs text-gray-500">
                      Ask me anything about the app
                    </div>
                  </div>
                </div>
                <button className="btn btn-ghost btn-sm" onClick={closeDrawer}>
                  <X />
                </button>
              </div>

              {/* Messages */}
              <div
                ref={listRef}
                className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-3"
              >
                {initialLoading && (
                  <div className="text-center text-gray-500 mt-5">
                    Loading conversation…
                  </div>
                )}

                {!initialLoading && messages.length === 0 && (
                  <div className="text-center text-gray-500 mt-5">
                    Hi — ask me about posting, points, or your leaderboard.
                  </div>
                )}

                {!initialLoading &&
                  messages.map((m, idx) => (
                    <motion.div
                      key={idx}
                      className={`chat ${
                        m.sender === "user" ? "chat-end" : "chat-start"
                      }`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div
                        className={`chat-bubble ${
                          m.sender === "user"
                            ? "chat-bubble-primary"
                            : "chat-bubble-neutral"
                        } max-w-[75%] whitespace-pre-wrap`}
                      >
                        {m.text}
                      </div>
                    </motion.div>
                  ))}

                {loading && !initialLoading && (
                  <div className="chat chat-start">
                    <div className="chat-bubble max-w-[40%]">
                      <span className="loading loading-dots loading-xs"></span>
                    </div>
                  </div>
                )}
              </div>

              {/* Input */}
              <div className="p-3 border-t flex gap-2">
                <input
                  className="input input-bordered flex-1"
                  placeholder="Ask something…"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && onSend()}
                />
                <button
                  className="btn btn-accent px-3 flex items-center justify-center hover:scale-105 transition"
                  disabled={loading || input.trim().length === 0}
                  onClick={onSend}
                >
                  <Send size={20} />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
