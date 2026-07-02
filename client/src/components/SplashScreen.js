// client/src/components/SplashScreen.js
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../logo.png";

export default function SplashScreen() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2000); // 2 seconds display
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="splash-overlay"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div 
          className="splash-logo-container"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={logo}
            alt="PlayPulse logo"
            className="splash-logo"
          />
          <div className="splash-loader"></div>
          <span style={{ fontSize: "12px", color: "#64748b", marginTop: "12px", fontWeight: "600", letterSpacing: "1px", textTransform: "uppercase" }}>
            Loading PlayPulse
          </span>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
