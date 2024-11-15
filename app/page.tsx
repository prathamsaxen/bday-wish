"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Cake, Gift, Heart, Music, PartyPopper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function BirthdayWish() {
  const [showWish, setShowWish] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio('/bday-music.mp3');
    if (isPlaying) {
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [isPlaying]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-indigo-400 flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md bg-white/80 backdrop-blur-sm">
        <CardContent className="p-6 text-center">
          <h1 className="text-4xl font-bold text-purple-600 mb-4">Happy Birthday</h1>
          <h2 className="text-3xl font-semibold text-pink-500 mb-6">Soniya Verma!</h2>

          {!showWish ? (
            <Button
              onClick={() => {
                setShowWish(true);
                setIsPlaying(true);
              }}
              className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition duration-300"
            >
              Click to see your wish!
            </Button>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-lg text-gray-700 mb-4">
                May your day be filled with joy, laughter, and unforgettable moments!
              </p>
              <div className="flex justify-center space-x-4 mb-4">
                {[Cake, Gift, Heart, PartyPopper].map((Icon, index) => (
                  <motion.div
                    key={index}
                    className="text-purple-500"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                  >
                    <Icon size={32} />
                  </motion.div>
                ))}
              </div>
              <Button
                onClick={() => setIsPlaying(!isPlaying)}
                className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-green-500 hover:to-blue-600 text-white font-bold py-2 px-4 rounded-full shadow-lg hover:shadow-xl transition duration-300"
              >
                {isPlaying ? "Pause Music" : "Play Music"}
                <Music className="ml-2" size={16} />
              </Button>
            </motion.div>
          )}
        </CardContent>
      </Card>

      {showWish && (
        <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float text-2xl"
              style={{
                left: `${Math.random() * 100}vw`,
                animationDuration: `${Math.random() * 3 + 2}s`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              🎈
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
