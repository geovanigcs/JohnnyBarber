"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Calendar } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      const letters = titleRef.current.querySelectorAll(".letter");
      gsap.fromTo(
        letters,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.05,
          ease: "power3.out",
        }
      );
    }
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <img
          src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png"
          alt="Johnny Barber Background"
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.3)" }}
        />
      </div>

      <div className="absolute inset-0 bg-gradient-to-b from-dark/50 via-transparent to-dark" />

      <div className="relative z-10 container-custom text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <div className="inline-block p-4 rounded-full bg-primary/20 backdrop-blur-sm">
            <span className="text-6xl">💈</span>
          </div>
        </motion.div>

        <h1 ref={titleRef} className="font-display text-5xl md:text-7xl lg:text-8xl text-white mb-6">
          {"Johnny Barber".split("").map((char, index) => (
            <span key={index} className="letter inline-block">
              {char === " " ? "\u00A0" : char}
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-xl md:text-2xl text-gray-300 mb-4"
        >
          Olá, Geovani!
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-lg md:text-xl text-gray-400 mb-12 max-w-2xl mx-auto"
        >
          Seja bem-vindo! Tradição e estilo desde 1950.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            href="/agendar"
            className="group flex items-center space-x-2 px-8 py-4 bg-primary hover:bg-primary-hover rounded-lg text-white font-medium transition-all transform hover:scale-105"
          >
            <Calendar className="group-hover:rotate-12 transition-transform" size={20} />
            <span>Agendar Horário</span>
          </Link>
          <a
            href="#servicos"
            className="px-8 py-4 border-2 border-primary hover:bg-primary/10 rounded-lg text-white font-medium transition-all"
          >
            Ver Serviços
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-primary rounded-full flex justify-center pt-2"
          >
            <div className="w-1 h-2 bg-primary rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
