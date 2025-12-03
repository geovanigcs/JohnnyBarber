"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-card border-t border-gray-800">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center">
                <span className="text-2xl font-display text-white">G</span>
              </div>
              <div>
                <h3 className="text-xl font-display text-white">Johnny's</h3>
                <p className="text-xs text-gray-400">Barbearia</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm">
              Tradição e estilo desde 1950. A melhor barbearia vintage da cidade.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="#servicos" className="text-gray-400 hover:text-primary transition-colors">
                  Serviços
                </a>
              </li>
              <li>
                <a href="#barbeiros" className="text-gray-400 hover:text-primary transition-colors">
                  Barbeiros
                </a>
              </li>
              <li>
                <a href="#sobre" className="text-gray-400 hover:text-primary transition-colors">
                  Sobre
                </a>
              </li>
              <li>
                <a href="#contato" className="text-gray-400 hover:text-primary transition-colors">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Serviços</h4>
            <ul className="space-y-2">
              <li className="text-gray-400">Corte de Cabelo</li>
              <li className="text-gray-400">Barba</li>
              <li className="text-gray-400">Pézinho</li>
              <li className="text-gray-400">Sobrancelha</li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-white font-semibold mb-4">Redes Sociais</h4>
            <div className="flex space-x-4">
              <a
                href="#"
                className="p-2 bg-dark-lighter rounded-lg hover:bg-primary transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={20} className="text-white" />
              </a>
              <a
                href="#"
                className="p-2 bg-dark-lighter rounded-lg hover:bg-primary transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={20} className="text-white" />
              </a>
              <a
                href="#"
                className="p-2 bg-dark-lighter rounded-lg hover:bg-primary transition-colors"
                aria-label="Twitter"
              >
                <Twitter size={20} className="text-white" />
              </a>
              <a
                href="#"
                className="p-2 bg-dark-lighter rounded-lg hover:bg-primary transition-colors"
                aria-label="Youtube"
              >
                <Youtube size={20} className="text-white" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="pt-8 border-t border-gray-800 text-center">
          <p className="text-gray-400 text-sm">
            © {currentYear} Johnny Barber. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
