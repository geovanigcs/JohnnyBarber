"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Scissors, Star } from "lucide-react";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

const services = [
  {
    name: "Corte de Cabelo",
    description: "Estilo personalizado com as últimas tendências.",
    price: 60.0,
    imageUrl: "https://utfs.io/f/0ddfbd26-a424-43a0-aaf3-c3f1dc6be6d1-1kgxo7.png",
    rating: 5.0,
  },
  {
    name: "Barba",
    description: "Modelagem completa para destacar sua masculinidade.",
    price: 40.0,
    imageUrl: "https://utfs.io/f/e6bdffb6-24a9-455b-aba3-903c2c2b5bde-1jo6tu.png",
    rating: 5.0,
  },
  {
    name: "Pézinho",
    description: "Acabamento perfeito para um visual renovado.",
    price: 35.0,
    imageUrl: "https://utfs.io/f/8a457cda-f768-411d-a737-cdb23ca6b9b5-b3pegf.png",
    rating: 5.0,
  },
  {
    name: "Sobrancelha",
    description: "Expressão acentuada com modelagem precisa.",
    price: 20.0,
    imageUrl: "https://utfs.io/f/2118f76e-89e4-43e6-87c9-8f157500c333-b0ps0b.png",
    rating: 5.0,
  },
  {
    name: "Massagem",
    description: "Relaxe com uma massagem revigorante.",
    price: 50.0,
    imageUrl: "https://utfs.io/f/c4919193-a675-4c47-9f21-ebd86d1c8e6a-4oen2a.png",
    rating: 5.0,
  },
  {
    name: "Hidratação",
    description: "Hidratação profunda para cabelo e barba.",
    price: 25.0,
    imageUrl: "https://utfs.io/f/8a457cda-f768-411d-a737-cdb23ca6b9b5-b3pegf.png",
    rating: 5.0,
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });

  useEffect(() => {
    if (sectionRef.current) {
      const cards = sectionRef.current.querySelectorAll(".service-card");

      gsap.fromTo(
        cards,
        { opacity: 0, y: 100, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }
  }, []);

  return (
    <section id="servicos" ref={sectionRef} className="py-20 bg-dark-lighter">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 mb-4">
            <Scissors className="text-primary" size={32} />
            <h2 ref={titleRef} className="font-display text-5xl md:text-6xl text-white">
              Nossos Serviços
            </h2>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Oferecemos os melhores serviços para você ficar com um visual impecável
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="service-card group bg-dark-card rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 cursor-pointer"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={service.imageUrl}
                  alt={service.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 right-4 bg-dark/80 backdrop-blur-sm px-3 py-1 rounded-full flex items-center space-x-1">
                  <Star className="text-yellow-400 fill-yellow-400" size={16} />
                  <span className="text-white text-sm font-semibold">{service.rating}</span>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-display text-white mb-2">{service.name}</h3>
                <p className="text-gray-400 mb-4">{service.description}</p>
                
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-3xl font-bold text-primary">
                      R$ {service.price.toFixed(2)}
                    </span>
                  </div>
                  <button className="px-6 py-2 bg-primary hover:bg-primary-hover rounded-lg text-white font-medium transition-colors group-hover:scale-105 transform duration-200">
                    Reservar
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
