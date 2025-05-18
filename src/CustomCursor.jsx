import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";


export default function CustomCursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <motion.div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        pointerEvents: "none",
        zIndex: 9999,
      }}
      animate={{
        x: pos.x - 1,
        y: pos.y - 1,
      }}
      transition={{
        type: "spring",
        stiffness: 600,
        damping: 100,
        duration: 0.1,
      }}
      className="w-5 h-5 rounded-full border border-slate-900/70 bg-slate-900/70"
    />
  );
}