"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Menu, X, Calendar, User, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { href: "#agenda", label: "Agenda" },
    { href: "#servicos", label: "Serviços" },
    { href: "#clientes", label: "Clientes" },
    { href: "#sobre", label: "Sobre" },
    { href: "#contato", label: "Contato" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-dark/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <nav className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
              <span className="text-2xl font-display text-white">JB</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="text-xl font-display text-white">Johnny Barber</h1>
              <p className="text-xs text-gray-400">Barbearia</p>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-gray-300 hover:text-primary transition-colors duration-200"
              >
                {item.label}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {session ? (
              <div className="hidden lg:flex items-center space-x-4">
                <Link
                  href="/agendamentos"
                  className="flex items-center space-x-2 text-gray-300 hover:text-primary transition-colors"
                >
                  <Calendar size={20} />
                  <span>Agendamentos</span>
                </Link>
                <button
                  onClick={() => signOut()}
                  className="flex items-center space-x-2 text-gray-300 hover:text-secondary transition-colors"
                >
                  <LogOut size={20} />
                  <span>Sair</span>
                </button>
                <div className="flex items-center space-x-2">
                  <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                    <User size={20} />
                  </div>
                  <span className="text-sm text-gray-300">{session.user?.name}</span>
                </div>
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden lg:block px-6 py-2 bg-primary hover:bg-primary-hover rounded-lg text-white font-medium transition-colors"
              >
                Entrar
              </Link>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden text-white p-2"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden mt-4 py-4 border-t border-gray-800"
            >
              <div className="flex flex-col space-y-4">
                {menuItems.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-gray-300 hover:text-primary transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
                {session ? (
                  <>
                    <Link
                      href="/agendamentos"
                      className="flex items-center space-x-2 text-gray-300 hover:text-primary transition-colors"
                    >
                      <Calendar size={20} />
                      <span>Agendamentos</span>
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="flex items-center space-x-2 text-gray-300 hover:text-secondary transition-colors text-left"
                    >
                      <LogOut size={20} />
                      <span>Sair</span>
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="px-6 py-2 bg-primary hover:bg-primary-hover rounded-lg text-white font-medium transition-colors text-center"
                  >
                    Entrar
                  </Link>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
