"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { MapPin, Phone, Clock, Mail } from "lucide-react";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.3 });

  const contactInfo = [
    {
      icon: MapPin,
      title: "Endereço",
      info: "Taguatinga Center - Taguatinga, DF",
      link: "https://maps.google.com/?q=Taguatinga+Center",
    },
    {
      icon: Phone,
      title: "Telefone",
      info: "(11) 99034-5308 | (11) 99563-2351",
      link: "tel:+5511990345308",
    },
    {
      icon: Clock,
      title: "Horário",
      info: "Ter - Sáb: 09:30 - 20:00",
    },
    {
      icon: Mail,
      title: "Email",
      info: "contato@johnnybarber.com",
      link: "mailto:contato@johnnybarber.com",
    },
  ];

  return (
    <section id="contato" ref={sectionRef} className="py-20 bg-dark">
      <div className="container-custom">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-5xl md:text-6xl text-white mb-4">
            Entre em Contato
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Estamos prontos para atendê-lo. Visite-nos ou entre em contato
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            {contactInfo.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * index, duration: 0.6 }}
                className="flex items-start space-x-4 p-6 rounded-xl bg-dark-card hover:bg-dark-lighter transition-colors group"
              >
                <div className="p-3 bg-primary/20 rounded-lg group-hover:bg-primary/30 transition-colors">
                  <item.icon className="text-primary" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-semibold text-lg mb-1">
                    {item.title}
                  </h3>
                  {item.link ? (
                    <a
                      href={item.link}
                      target={item.link.startsWith("http") ? "_blank" : undefined}
                      rel={item.link.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="text-gray-400 hover:text-primary transition-colors"
                    >
                      {item.info}
                    </a>
                  ) : (
                    <p className="text-gray-400">{item.info}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="h-[500px] rounded-2xl overflow-hidden"
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3838.7805287899977!2d-48.05896892404524!3d-15.839203584736844!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x935a334445b3f5cb%3A0x95d6e692a236c63e!2sTaguatinga%20Shopping!5e0!3m2!1spt-BR!2sbr!4v1733064000000!5m2!1spt-BR!2sbr"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="grayscale hover:grayscale-0 transition-all duration-500"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
