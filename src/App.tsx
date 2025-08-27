import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue } from "firebase/database";

// 🔹 Your Firebase Config
const firebaseConfig = {
  databaseURL: "https://soil-moisture-24cd5-default-rtdb.firebaseio.com/",
};

// 🔹 Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default function App() {
  const [sensorValue, setSensorValue] = useState(0);
  const [motorState, setMotorState] = useState(false);

  // 🔹 Listen for sensor value updates
  useEffect(() => {
    const sensorRef = ref(db, "test/sensor-value");
    onValue(sensorRef, (snapshot) => {
      if (snapshot.exists()) {
        setSensorValue(snapshot.val());
      }
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-600 text-white p-6">
      {/* Dashboard Title */}
      <motion.h1
        className="text-4xl font-bold mb-8"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        🌱 Soil Moisture Dashboard
      </motion.h1>

      {/* Sensor Card */}
      <motion.div
        className="bg-white/10 backdrop-blur-md p-8 rounded-2xl shadow-2xl text-center max-w-md w-full"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-lg font-semibold text-gray-200">Current Moisture Level</p>
        <motion.h2
          key={sensorValue}
          className="text-5xl font-extrabold my-4 text-green-300"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {sensorValue}
        </motion.h2>
        <p className="text-sm text-gray-300">Value fetched from Firebase</p>
      </motion.div>

      {/* Motor Controls */}
      <motion.div
        className="flex gap-6 mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.6 }}
      >
        <button
          onClick={() => setMotorState(true)}
          className={`px-6 py-3 rounded-xl font-semibold shadow-lg transform transition-all duration-300 ${
            motorState
              ? "bg-green-500 hover:bg-green-600 scale-105"
              : "bg-green-400 hover:bg-green-500"
          }`}
        >
          Turn ON Motor
        </button>
        <button
          onClick={() => setMotorState(false)}
          className={`px-6 py-3 rounded-xl font-semibold shadow-lg transform transition-all duration-300 ${
            !motorState
              ? "bg-red-500 hover:bg-red-600 scale-105"
              : "bg-red-400 hover:bg-red-500"
          }`}
        >
          Turn OFF Motor
        </button>
      </motion.div>

      {/* Motor Status */}
      <motion.div
        className="mt-8 px-6 py-3 bg-black/30 rounded-xl shadow-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
      >
        <p className="text-lg font-medium">
          Motor Status:{" "}
          <span
            className={`font-bold ${
              motorState ? "text-green-400" : "text-red-400"
            }`}
          >
            {motorState ? "ON" : "OFF"}
          </span>
        </p>
      </motion.div>
    </div>
  );
}
