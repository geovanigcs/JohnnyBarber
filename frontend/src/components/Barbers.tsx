"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { Star, MessageSquare } from "lucide-react";
import Image from "next/image";

const testimonials = [
  {
    name: "Carlos Mendes",
    imageUrl: "https://randomuser.me/api/portraits/men/32.jpg",
    comment: "Atendimento excepcional! Sempre saio satisfeito com o resultado. O ambiente é acolhedor e os profissionais são muito atenciosos.",
    rating: 5.0,
    service: "Corte + Barba",
  },
  {
    name: "Roberto Lima",
    imageUrl: "https://randomuser.me/api/portraits/men/45.jpg",
    comment: "A melhor barbearia da região! Qualidade impecável e atenção aos detalhes. Recomendo muito!",
    rating: 5.0,
    service: "Corte Degradê",
  },
  {
    name: "Fernando Costa",
    imageUrl: "https://randomuser.me/api/portraits/men/52.jpg",
    comment: "Já sou cliente há anos. Profissionais capacitados e ambiente agradável. Sempre volto!",
    rating: 5.0,
    service: "Corte Social",
  },
  {
    name: "André Souza",
    imageUrl: "https://randomuser.me/api/portraits/men/62.jpg",
    comment: "Excelente serviço! Conseguem entender exatamente o que eu quero. Vale cada centavo!",
    rating: 5.0,
    service: "Barba Completa",
  },
  {
    name: "Paulo Santos",
    imageUrl: "https://randomuser.me/api/portraits/men/71.jpg",
    comment: "Profissionais muito qualificados! O resultado sempre supera as expectativas.",
    rating: 5.0,
    service: "Corte + Sobrancelha",
  },
  {
    name: "Marcos Oliveira",
    imageUrl: "https://randomuser.me/api/portraits/men/83.jpg",
    comment: "Melhor custo-benefício da cidade. Atendimento de primeira e preço justo!",
    rating: 5.0,
    service: "Corte Tradicional",
  },
  {
    name: "Ricardo Alves",
    imageUrl: "https://randomuser.me/api/portraits/men/12.jpg",
    comment: "Sempre impecável! A equipe é muito profissional e o resultado é sempre perfeito.",
    rating: 5.0,
    service: "Corte + Barba",
  },
  {
    name: "Daniel Ferreira",
    imageUrl: "https://randomuser.me/api/portraits/men/22.jpg",
    comment: "Ambiente top! Ótimo atendimento e serviço de qualidade. Super recomendo!",
    rating: 5.0,
    service: "Corte Degradê",
  },
  {
    name: "Lucas Martins",
    imageUrl: "https://randomuser.me/api/portraits/men/33.jpg",
    comment: "Melhor barbearia que já fui! Profissionais experientes e resultados incríveis.",
    rating: 5.0,
    service: "Barba Completa",
  },
  {
    name: "Felipe Costa",
    imageUrl: "https://randomuser.me/api/portraits/men/44.jpg",
    comment: "Excelente custo-benefício! Saio sempre satisfeito com o corte e o atendimento.",
    rating: 5.0,
    service: "Corte Social",
  },
];

export default function Barbers() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    const cardWidth = 366;
    const totalWidth = cardWidth * testimonials.length;

    gsap.to(carousel, {
      x: `-=${totalWidth}`,
      duration: 40,
      ease: "none",
      repeat: -1,
      modifiers: {
        x: (x) => {
          const xValue = parseFloat(x);
          return `${xValue % totalWidth}px`;
        }
      }
    });
  }, []);

  const duplicatedTestimonials = [...testimonials, ...testimonials, ...testimonials];

  return (
    <section id="clientes" ref={sectionRef} className="py-20 overflow-hidden">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 mb-4">
            <MessageSquare className="text-primary" size={32} />
            <h2 className="font-display text-5xl md:text-6xl text-white">
              Nossos Clientes
            </h2>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Veja o que nossos clientes falam sobre nossos serviços
          </p>
        </motion.div>

        <div className="relative overflow-hidden">
          <div 
            ref={carouselRef}
            className="flex gap-8"
          >
            {duplicatedTestimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-[350px] bg-dark-card rounded-2xl overflow-hidden shadow-xl shadow-primary/10"
              >
                <div className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div className="relative w-16 h-16 rounded-full overflow-hidden ring-2 ring-primary/50">
                      <Image
                        src={testimonial.imageUrl}
                        alt={testimonial.name}
                        fill
                        quality={95}
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div>
                      <h3 className="text-xl font-display text-white">{testimonial.name}</h3>
                      <div className="flex items-center space-x-1 mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="text-yellow-400 fill-yellow-400" size={14} />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-300 text-sm leading-relaxed italic">
                      "{testimonial.comment}"
                    </p>
                  </div>

                  <div className="pt-4 border-t border-gray-700">
                    <span className="text-primary text-sm font-medium">{testimonial.service}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
