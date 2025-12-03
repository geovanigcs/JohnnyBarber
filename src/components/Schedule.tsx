"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Calendar, Clock } from "lucide-react";
import { format, addDays, setHours, setMinutes, isSameDay } from "date-fns";
import { ptBR } from "date-fns/locale";

interface TimeSlot {
  time: string;
  available: boolean;
}

export default function Schedule() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);

  const generateTimeSlots = (date: Date) => {
    const slots: TimeSlot[] = [];
    const dayOfWeek = date.getDay();
    
    if (dayOfWeek === 0 || dayOfWeek === 1) {
      return slots;
    }

    let startHour = 9;
    let startMinute = 30;
    const endHour = 20;

    while (startHour < endHour || (startHour === endHour && startMinute === 0)) {
      const timeString = `${String(startHour).padStart(2, '0')}:${String(startMinute).padStart(2, '0')}`;
      slots.push({
        time: timeString,
        available: Math.random() > 0.3,
      });

      startMinute += 30;
      if (startMinute >= 60) {
        startMinute = 0;
        startHour += 1;
      }
    }

    return slots;
  };

  useEffect(() => {
    setTimeSlots(generateTimeSlots(selectedDate));
  }, [selectedDate]);

  const nextDays = Array.from({ length: 7 }, (_, i) => addDays(new Date(), i));
  const workingDays = nextDays.filter(day => {
    const dayOfWeek = day.getDay();
    return dayOfWeek !== 0 && dayOfWeek !== 1;
  });

  return (
    <section id="agenda" ref={sectionRef} className="py-20 bg-dark-lighter">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center space-x-2 mb-4">
            <Calendar className="text-primary" size={32} />
            <h2 className="font-display text-5xl md:text-6xl text-white">
              Agenda
            </h2>
          </div>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Veja os horários disponíveis e agende seu atendimento
          </p>
          <p className="text-primary text-sm mt-2">
            Terça a Sábado • 09:30 às 20:00
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-dark-card rounded-2xl p-8"
          >
            <div className="mb-8">
              <h3 className="text-white text-xl font-semibold mb-4 flex items-center space-x-2">
                <Calendar size={24} className="text-primary" />
                <span>Selecione o Dia</span>
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {workingDays.map((day, index) => {
                  const isSelected = isSameDay(day, selectedDate);
                  return (
                    <button
                      key={index}
                      onClick={() => setSelectedDate(day)}
                      className={`p-4 rounded-xl transition-all ${
                        isSelected
                          ? "bg-primary text-white scale-105"
                          : "bg-dark hover:bg-dark-lighter text-gray-300"
                      }`}
                    >
                      <div className="text-sm font-medium">
                        {format(day, "EEE", { locale: ptBR })}
                      </div>
                      <div className="text-2xl font-bold mt-1">
                        {format(day, "dd")}
                      </div>
                      <div className="text-xs mt-1">
                        {format(day, "MMM", { locale: ptBR })}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <h3 className="text-white text-xl font-semibold mb-4 flex items-center space-x-2">
                <Clock size={24} className="text-primary" />
                <span>Horários Disponíveis</span>
              </h3>
              
              {timeSlots.length === 0 ? (
                <div className="text-center py-8 text-gray-400">
                  <p>Fechado neste dia</p>
                  <p className="text-sm mt-2">Funcionamos de Terça a Sábado</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                  {timeSlots.map((slot, index) => (
                    <button
                      key={index}
                      disabled={!slot.available}
                      className={`p-3 rounded-lg text-sm font-medium transition-all ${
                        slot.available
                          ? "bg-dark hover:bg-primary hover:scale-105 text-white cursor-pointer"
                          : "bg-dark-lighter text-gray-600 cursor-not-allowed opacity-50"
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-700">
              <div className="flex items-center justify-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-primary rounded"></div>
                  <span className="text-gray-400">Disponível</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-dark-lighter rounded opacity-50"></div>
                  <span className="text-gray-400">Ocupado</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
