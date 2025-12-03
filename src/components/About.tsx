"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Clock, MapPin } from "lucide-react";

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  const features = [
    {
      icon: Award,
      title: "Qualidade Premium",
      description: "7 anos de experiência e dedicação",
    },
    {
      icon: Clock,
      title: "Horários Flexíveis",
      description: "Terça a Sábado, das 09:30 às 20:00",
    },
    {
      icon: MapPin,
      title: "Localização Central",
      description: "Fácil acesso no centro da cidade",
    },
  ];

  return (
    <section id="sobre" ref={sectionRef} className="py-20 bg-dark-lighter">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Image */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://utfs.io/f/c97a2dc9-cf62-468b-a851-bfd2bdde775f-16p.png"
                alt="Johnny Barber"
                className="w-full h-full object-cover object-center"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent" />
              
              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="absolute bottom-8 left-8 right-8 bg-dark-card/90 backdrop-blur-md p-6 rounded-xl"
              >
                <p className="text-primary font-display text-4xl mb-2">7+</p>
                <p className="text-white font-semibold">Anos de Experiência</p>
                <p className="text-gray-400 text-sm">Desde 2018</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
          >
            <h2 className="font-display text-5xl md:text-6xl text-white mb-6">
              Sobre Nós
            </h2>
            
            <p className="text-gray-300 text-lg mb-6 leading-relaxed">
              Bem-vindo ao <span className="text-primary font-semibold">Johnny Barber</span>, 
              onde estilo e qualidade se encontram desde 2017. Somos uma barbearia moderna que 
              combina técnicas profissionais com as últimas tendências.
            </p>

            <p className="text-gray-400 mb-8 leading-relaxed">
              Com 7 anos de experiência, nossa equipe está dedicada a proporcionar não apenas 
              um corte de cabelo, mas uma experiência completa de cuidado pessoal. Cada cliente 
              é único e merece um atendimento personalizado e de excelência.
            </p>

            {/* Features */}
            <div className="space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 * index, duration: 0.6 }}
                  className="flex items-start space-x-4 p-4 rounded-xl bg-dark-card/50 hover:bg-dark-card transition-colors"
                >
                  <div className="p-3 bg-primary/20 rounded-lg">
                    <feature.icon className="text-primary" size={24} />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
