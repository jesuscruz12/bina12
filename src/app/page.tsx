"use client"; // Esto indica que este es un Client Component
import React from 'react';
import './globals.css'; // Enlazamos los estilos globales
import Header from './components/Header'; // Importamos el Header
import Footer from './components/Footer'; // Importamos el Footer
import Page from './cifrado/page'; // Importamos el componente Page

export default function CifradoPage() {
  return (
    <div className="cifrado-page">
      <Header /> {/* Usamos el componente Header */}

      <main>
        <div className="cifrado-container">
          <h1 className="text-center mb-4">Bina 12</h1>

          {/* Menú de navegación */}
          <nav className="menu">
            
            <a href="escitala">Ir a Escítala</a>
          </nav>

          <Page /> {/* Usamos el componente Page */}
        </div>
      </main>

      <Footer /> {/* Usamos el componente Footer */}
    </div>
  );
}
