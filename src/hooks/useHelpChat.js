import { useState, useEffect, useRef } from "react";
import { getHelpHistory, sendHelpMessage } from "@/api/aiApi";
import { useHelpDrawerStore } from "@/stores/helpDrawerStore";

export default function useHelpChat() {
  const { isOpen } = useHelpDrawerStore();
  const [messages, setMessages] = useState([]);
  const [initialLoading, setInitialLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  // Load history
  useEffect(() => {
    if (!isOpen) return;
    setInitialLoading(true);

    (async () => {
      try {
        const res = await getHelpHistory();

        const mapped = (res.history || []).map((m) => ({
          sender: m.role,
          text: m.text,
          timestamp: m.timestamp,
        }));

        setMessages(mapped);
      } catch (err) {
        console.error("LOAD HISTORY ERROR:", err);
      } finally {
        setInitialLoading(false);
      }
    })();
  }, [isOpen]);

  // send message
  const send = async (text) => {
    const clean = text.trim();
    if (!clean) return;

    setMessages((prev) => [
      ...prev,
      { sender: "user", text: clean, timestamp: new Date().toISOString() },
    ]);

    setLoading(true);

    try {
      const res = await sendHelpMessage(clean);
      const reply = res.reply || "Error occurred.";

      setMessages((prev) => [
        ...prev,
        { sender: "model", text: reply, timestamp: new Date().toISOString() },
      ]);
    } catch (err) {
      console.error("SEND ERROR:", err);
      setMessages((prev) => [
        ...prev,
        {
          sender: "model",
          text: err.message,
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return { messages, send, loading, initialLoading };
}
