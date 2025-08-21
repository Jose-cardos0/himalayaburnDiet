import React, { useState, useEffect } from "react";
import {
  Star,
  Check,
  Zap,
  BookOpen,
  Smartphone,
  TrendingUp,
  Shield,
  Clock,
  Users,
  Award,
} from "lucide-react";

const Oferta: React.FC = () => {
  const [selectedPackage, setSelectedPackage] = useState<"1" | "3" | "6">("3");

  useEffect(() => {
    // Contador regressivo - oferta termina em 7 dias
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 7);

    const timer = setInterval(() => {
      const now = new Date().getTime();
      const distance = endDate.getTime() - now;

      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      const daysElement = document.getElementById("days");
      const hoursElement = document.getElementById("hours");
      const minutesElement = document.getElementById("minutes");
      const secondsElement = document.getElementById("seconds");

      if (daysElement)
        daysElement.textContent = days.toString().padStart(2, "0");
      if (hoursElement)
        hoursElement.textContent = hours.toString().padStart(2, "0");
      if (minutesElement)
        minutesElement.textContent = minutes.toString().padStart(2, "0");
      if (secondsElement)
        secondsElement.textContent = seconds.toString().padStart(2, "0");

      if (distance < 0) {
        clearInterval(timer);
        if (daysElement) daysElement.textContent = "00";
        if (hoursElement) hoursElement.textContent = "00";
        if (minutesElement) minutesElement.textContent = "00";
        if (secondsElement) secondsElement.textContent = "00";
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const packages = {
    "1": {
      name: "1 Pote",
      price: "R$ 75,00",
      originalPrice: "R$ 200,00",
      savings: "R$ 125,00",
      description: "Comece sua transformação hoje",
      popular: false,
      bonus: [
        "Emagrecimento Garantido",
        "Aumento de Energia",
        "Melhora da Autoestima",
      ],
      image: "https://i.ibb.co/vvsKsgPv/1ozen.webp",
    },
    "3": {
      name: "2 Potes",
      price: "R$ 140,00",
      originalPrice: "R$ 400,00",
      savings: "R$ 260,00",
      description: "Mais vendido - Melhor custo-benefício",
      popular: true,
      bonus: [
        "Ebook de Receitas",
        "App de Dieta e Treino",
        "Guia de Suplementação",
      ],
      image: "https://i.ibb.co/5V4f4n8/2ozen.webp",
    },
    "6": {
      name: "3 Potes",
      price: "R$ 195,00",
      originalPrice: "R$ 600,00",
      savings: "R$ 405,00",
      description: "Transformação completa com máximo desconto",
      popular: false,
      bonus: [
        "Ebook de Receitas",
        "App de Dieta e Treino",
        "Guia de Suplementação",
        "Consultoria VIP",
      ],
      image: "https://i.ibb.co/bMJ63rDj/3ozen.webp",
    },
  };

  const benefits = [
    {
      icon: <TrendingUp className="w-6 h-6 text-secondary-purple" />,
      title: "Aumenta a Taxa Metabólica",
      description:
        "Acelera seu metabolismo em até 300% para queimar gordura 24h por dia",
    },
    {
      icon: <Shield className="w-6 h-6 text-secondary-purple" />,
      title: "Emagrecimento Saudável",
      description: "Perda de peso natural sem efeitos colaterais ou rebote",
    },
    {
      icon: <Zap className="w-6 h-6 text-secondary-purple" />,
      title: "Energia Extraordinária",
      description: "Mais disposição para treinos intensos e atividades diárias",
    },
    {
      icon: <Clock className="w-6 h-6 text-secondary-purple" />,
      title: "Resultados Rápidos",
      description: "Veja diferenças na primeira semana de uso",
    },
  ];

  const testimonials = [
    {
      name: "Ana Paula, 32 anos",
      text: "Perdi 15kg em 3 meses com Ozemfire! Meu metabolismo nunca funcionou tão bem.",
      rating: 5,
    },
    {
      name: "Mariana, 28 anos",
      text: "O app de dieta é incrível! Meu treino ficou muito mais eficiente.",
      rating: 5,
    },
    {
      name: "Carolina, 35 anos",
      text: "Finalmente encontrei algo que funciona! Ozemfire mudou minha vida.",
      rating: 5,
    },
  ];

  const handleOrder = () => {
    // Aqui você pode adicionar a lógica de checkout
    alert(`Pedido realizado para ${packages[selectedPackage].name}!`);
  };

  // Função para obter a classe do textarea baseada na validação
  const getTextareaClass = (value: string, isRequired: boolean = true) => {
    if (!isRequired) return "feminine-textarea";

    if (value.trim() === "") {
      return "feminine-textarea border-red-300 focus:border-red-500";
    }
    return "feminine-textarea border-green-300 focus:border-green-500";
  };

  // Estado para controlar a visibilidade do aviso flutuante
  const [showFloatingNotice, setShowFloatingNotice] = useState(true);

  // Função para fechar o aviso flutuante
  const closeFloatingNotice = () => {
    setShowFloatingNotice(false);
  };

  // Estilos CSS para as faixas marquee
  const marqueeStyles = `
    /* Marquee Styles - Redesigned */
    .marquee-container {
      width: 100%;
      overflow: hidden;
      position: relative;
      margin: 40px 0;
      height: 120px;
      display: flex;
      align-items: center;
      transform: rotate(-2deg);
      box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
      animation-play-state: running;
    }

    .marquee-container::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(45deg, #ff006e, #8338ec, #3a86ff);
      background-size: 400% 400%;
      animation: gradientShift 4s ease infinite;
      animation-delay: 0s;
      z-index: 1;
    }

    .marquee-container::after {
      content: "";
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(
        90deg,
        transparent,
        rgba(255, 255, 255, 0.3),
        transparent
      );
      animation: shine 3s infinite;
      animation-delay: 0s;
      z-index: 3;
    }

    @keyframes gradientShift {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }

    @keyframes shine {
      0% {
        left: -100%;
      }
      100% {
        left: 100%;
      }
    }

    .marquee {
      color: white;
      font-weight: 800;
      font-size: 32px;
      white-space: nowrap;
      position: relative;
      z-index: 2;
      text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.7);
      letter-spacing: 3px;
      display: flex;
      animation: scroll-left 240s linear infinite;
      animation-delay: 0s;
      transform: translateX(0%);
    }

    .marquee.fast {
      animation: scroll-left 160s linear infinite;
      animation-delay: 0s;
    }

    .marquee.slow {
      animation: scroll-left 200s linear infinite;
      animation-delay: 0s;
    }

    .marquee.ultra-slow {
      animation: scroll-left 280s linear infinite;
      animation-delay: 0s;
    }

    @keyframes scroll-left {
      0% {
        transform: translateX(0%);
      }
      100% {
        transform: translateX(-100%);
      }
    }

    .marquee-text {
      display: inline-block;
      padding-right: 0;
      animation-fill-mode: both;
    }

    /* Alternative Marquee Styles */
    .marquee-container.style-2 {
      background: linear-gradient(45deg, #ff6b6b, #ee5a24, #ff9f43, #feca57);
      transform: rotate(1.5deg);
      height: 140px;
    }

    .marquee-container.style-3 {
      background: linear-gradient(45deg, #5f27cd, #341f97, #2e86de, #54a0ff);
      transform: rotate(-1deg);
      height: 130px;
    }

    .marquee-container.style-4 {
      background: linear-gradient(45deg, #00d2d3, #ff9ff3, #54a0ff, #5f27cd);
      transform: rotate(2deg);
      height: 150px;
    }

    .marquee-container.style-2 .marquee {
      font-size: 34px;
    }

    .marquee-container.style-3 .marquee {
      font-size: 30px;
    }

    .marquee-container.style-4 .marquee {
      font-size: 36px;
    }

    /* Ajustar primeira faixa marquee para mobile */
    .marquee-container.marquer1 {
      margin-top: 50px;
      position: relative;
      z-index: 100;
    }

    /* Responsividade para mobile */
    @media (max-width: 768px) {
      .marquee-container {
        height: 90px;
        margin: 20px 0;
      }
      
      .marquee {
        font-size: 24px;
      }
      
      .marquee-container.style-2 .marquee {
        font-size: 26px;
      }
      
      .marquee-container.style-3 .marquee {
        font-size: 22px;
      }
      
      .marquee-container.style-4 .marquee {
        font-size: 28px;
      }
    }

    /* Animações personalizadas */
    .animate-fade-in {
      animation: fadeIn 1s ease-in;
    }

    .animate-fade-in-delay {
      animation: fadeIn 1s ease-in 0.3s both;
    }

    .animate-fade-in-delay-2 {
      animation: fadeIn 1s ease-in 0.6s both;
    }

    .animate-slide-up {
      animation: slideUp 1s ease-out;
    }

    .animate-float {
      animation: float 3s ease-in-out infinite;
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes slideUp {
      from { 
        opacity: 0; 
        transform: translateY(30px); 
      }
      to { 
        opacity: 1; 
        transform: translateY(0); 
      }
    }

    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }

    /* Efeitos de hover melhorados */
    .feminine-button:hover {
      transform: scale(1.05) translateY(-2px);
      box-shadow: 0 20px 40px rgba(255, 105, 180, 0.4);
    }

    /* Animação das partículas flutuantes */
    .animate-float-particle {
      animation: floatParticle linear infinite;
    }

    @keyframes floatParticle {
      0% {
        transform: translateY(0px) translateX(0px) rotate(0deg);
        opacity: 0;
      }
      10% {
        opacity: 0.6;
      }
      90% {
        opacity: 0.6;
      }
      100% {
        transform: translateY(-100vh) translateX(100px) rotate(360deg);
        opacity: 0;
      }
    }

    /* Estilos para o aviso flutuante */
    .floating-notice {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 1000;
      max-width: 320px;
      background: linear-gradient(135deg, #ff69b4, #ff1493, #ff69b4);
      border-radius: 20px;
      padding: 20px;
      box-shadow: 0 20px 40px rgba(255, 105, 180, 0.4);
      animation: floatNotice 3s ease-in-out infinite, slideInNotice 0.8s ease-out;
      backdrop-filter: blur(10px);
      border: 2px solid rgba(255, 255, 255, 0.3);
      transform-origin: top right;
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .floating-notice:hover {
      transform: scale(1.02) translateY(-2px);
      box-shadow: 0 25px 50px rgba(255, 105, 180, 0.6);
    }

    @keyframes slideInNotice {
      0% { 
        opacity: 0; 
        transform: translateX(100px) scale(0.8) rotate(-5deg); 
      }
      100% { 
        opacity: 1; 
        transform: translateX(0px) scale(1) rotate(0deg); 
      }
    }

    .floating-notice::before {
      content: '';
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      background: linear-gradient(45deg, #ff69b4, #ff1493, #ff69b4, #ff69b4);
      border-radius: 22px;
      z-index: -1;
      animation: borderGlow 2s ease-in-out infinite alternate;
    }

    .floating-notice::after {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
      animation: shineEffect 3s infinite;
    }

    @keyframes floatNotice {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-10px) rotate(1deg); }
    }

    @keyframes borderGlow {
      0% { opacity: 0.7; }
      100% { opacity: 1; }
    }

    @keyframes shineEffect {
      0% { left: -100%; }
      100% { left: 100%; }
    }

    .notice-close-btn {
      position: absolute;
      top: 8px;
      right: 8px;
      background: rgba(255, 255, 255, 0.2);
      border: none;
      border-radius: 50%;
      width: 24px;
      height: 24px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
      backdrop-filter: blur(5px);
    }

    .notice-close-btn:hover {
      background: rgba(255, 255, 255, 0.4);
      transform: scale(1.1);
    }

    .notice-heart {
      display: inline-block;
      animation: heartBeat 1.5s ease-in-out infinite;
      margin: 0 2px;
    }

    @keyframes heartBeat {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.2); }
    }

    .notice-sparkle {
      position: absolute;
      width: 4px;
      height: 4px;
      background: white;
      border-radius: 50%;
      animation: sparkleFloat 2s ease-in-out infinite;
    }

    .notice-sparkle:nth-child(1) { top: 10px; left: 20px; animation-delay: 0s; }
    .notice-sparkle:nth-child(2) { top: 15px; right: 25px; animation-delay: 0.5s; }
    .notice-sparkle:nth-child(3) { bottom: 12px; left: 15px; animation-delay: 1s; }
    .notice-sparkle:nth-child(4) { bottom: 8px; right: 20px; animation-delay: 1.5s; }

    @keyframes sparkleFloat {
      0%, 100% { opacity: 0; transform: translateY(0px) scale(0.5); }
      50% { opacity: 1; transform: translateY(-5px) scale(1); }
    }

    /* Responsividade para mobile */
    @media (max-width: 768px) {
      .floating-notice {
        top: 10px;
        right: 10px;
        left: 10px;
        max-width: none;
        width: calc(100% - 20px);
      }
    }
  `;

  return (
    <div className="min-h-screen bg-gradient-to-br from-clean-pink via-white to-soft-purple">
      {/* Estilos CSS para as faixas marquee */}
      <style dangerouslySetInnerHTML={{ __html: marqueeStyles }} />

      {/* Partículas Flutuantes */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-particle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 10}s`,
              animationDuration: `${10 + Math.random() * 20}s`,
            }}
          >
            <div className="w-2 h-2 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full opacity-60"></div>
          </div>
        ))}
      </div>

      {/* Aviso Flutuante Fofinho */}
      {showFloatingNotice && (
        <div className="floating-notice" onClick={closeFloatingNotice}>
          {/* Partículas brilhantes */}
          <div className="notice-sparkle"></div>
          <div className="notice-sparkle"></div>
          <div className="notice-sparkle"></div>
          <div className="notice-sparkle"></div>

          {/* Botão de fechar */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              closeFloatingNotice();
            }}
            className="notice-close-btn"
            aria-label="Fechar aviso"
          >
            <span className="text-white text-sm font-bold">×</span>
          </button>

          {/* Conteúdo do aviso */}
          <div className="text-white text-center">
            <div className="mb-3">
              <span className="notice-heart text-2xl">💖</span>
              <span className="notice-heart text-xl">✨</span>
              <span className="notice-heart text-2xl">💖</span>
            </div>

            <h4 className="font-bold text-lg mb-2">
              Resultados Garantidos!
              <span className="notice-heart text-xl ml-1">💪</span>
            </h4>

            <p className="text-sm leading-relaxed mb-3">
              <span className="font-semibold">✨ 30 dias:</span> Primeiros
              resultados visíveis
              <br />
              <span className="font-semibold">🚀 90 dias:</span> Até
              <span className="text-yellow-300 font-bold"> -15kg </span>
              com dieta regulada pelo nosso app!
            </p>

            <div className="flex justify-center items-center gap-2 text-xs opacity-90">
              <span className="notice-heart text-sm">🌸</span>
              <span>Transformação garantida</span>
              <span className="notice-heart text-sm">🌸</span>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="bg-white shadow-feminine">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <img
                src="/iconozen.png"
                alt="Ozemfire Logo"
                className="w-12 h-12"
              />
              <h1 className="text-2xl font-bold text-gray-800">Ozemfire</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Entrega em todo Brasil
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Faixa Marquee 1 - Logo após o header */}
      <div className="marquee-container marquer1">
        <div className="marquee fast">
          <span className="marquee-text">
            🌸 OFERTA ESPECIAL • PRODUTO EXCLUSIVO • TRANSFORME SEU CORPO •
            METABOLISMO ACELERADO • EMAGRECIMENTO SAUDÁVEL • ENERGIA
            EXTRAORDINÁRIA • RESULTADOS RÁPIDOS • SUPLEMENTO NATURAL • APROVADO
            PELA ANVISA • GARANTIA TOTAL • ENTREGA RÁPIDA • PREÇO ÚNICO • BÔNUS
            INCLUSOS • EBOOK DE RECEITAS • APP COMPLETO • CONSULTORIA VIP • 🌸
            OFERTA ESPECIAL • PRODUTO EXCLUSIVO • TRANSFORME SEU CORPO •
            METABOLISMO ACELERADO • EMAGRECIMENTO SAUDÁVEL • ENERGIA
            EXTRAORDINÁRIA • RESULTADOS RÁPIDOS • SUPLEMENTO NATURAL • APROVADO
            PELA ANVISA • GARANTIA TOTAL • ENTREGA RÁPIDA • PREÇO ÚNICO • BÔNUS
            INCLUSOS • EBOOK DE RECEITAS • APP COMPLETO • CONSULTORIA VIP •
          </span>
        </div>
      </div>

      {/* Contador Regressivo */}
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <div className="bg-gradient-to-r from-pink-400 to-purple-600 rounded-3xl p-8 shadow-2xl animate-pulse">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            ⏰ OFERTA TERMINA EM:
          </h2>
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="bg-white bg-opacity-20 rounded-2xl p-4 backdrop-blur-sm">
              <div
                className="text-4xl md:text-5xl font-bold text-white"
                id="days"
              >
                00
              </div>
              <div className="text-sm text-white opacity-90">DIAS</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-2xl p-4 backdrop-blur-sm">
              <div
                className="text-4xl md:text-5xl font-bold text-white"
                id="hours"
              >
                00
              </div>
              <div className="text-sm text-white opacity-90">HORAS</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-2xl p-4 backdrop-blur-sm">
              <div
                className="text-4xl md:text-5xl font-bold text-white"
                id="minutes"
              >
                00
              </div>
              <div className="text-sm text-white opacity-90">MIN.</div>
            </div>
            <div className="bg-white bg-opacity-20 rounded-2xl p-4 backdrop-blur-sm">
              <div
                className="text-4xl md:text-5xl font-bold text-white"
                id="seconds"
              >
                00
              </div>
              <div className="text-sm text-white opacity-90">SEG.</div>
            </div>
          </div>
          <p className="text-white text-lg opacity-90">
            🚨 Esta oferta especial termina em breve! Não perca a chance de
            transformar seu corpo!
          </p>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8 animate-fade-in">
            <span className="inline-block bg-gradient-to-r from-primary-pink to-secondary-purple text-white px-6 py-2 rounded-full text-sm font-semibold mb-4 animate-bounce">
              🔥 OFERTA ESPECIAL - LIMITADA
            </span>
            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6 animate-slide-up">
              O{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-pink to-secondary-purple animate-pulse">
                Remédio Milagroso
              </span>{" "}
              que Vai Transformar Seu Corpo
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto animate-fade-in-delay">
              Descubra o segredo das celebridades: Ozemfire aumenta sua taxa
              metabólica e faz você emagrecer com saúde, sem dietas malucas ou
              exercícios exaustivos.
            </p>
          </div>

          {/* Placeholder para imagem principal */}
          <div className="mb-12 animate-float">
            <div
              className="w-80 h-80 mx-auto drop-shadow-2xl rounded-3xl 
              flex items-center justify-center 
               hover:scale-105 transition-transform duration-500"
            >
              <div className="text-center text-white">
                <img
                  className=""
                  src="https://i.ibb.co/Dgv2xF3c/ozendeitado2.webp"
                  alt=""
                />
              </div>
            </div>
          </div>

          {/* CTA Principal */}
          <div className="mb-16 animate-fade-in-delay-2">
            <button
              onClick={handleOrder}
              className="feminine-button text-xl px-12 py-4 text-lg font-bold transform hover:scale-105 transition-all duration-300 animate-pulse"
            >
              QUERO TRANSFORMAR MEU CORPO AGORA! 🚀
            </button>
            <p className="text-sm text-gray-500 mt-3">
              ⚡ Entrega em 24-48h • 💳 Parcelado em até 12x • 🛡️ Garantia de 30
              dias
            </p>
          </div>
        </div>
      </section>

      {/* Faixa Marquee 2 - Entre Hero e Benefícios */}
      <div className="marquee-container style-2">
        <div className="marquee">
          <span className="marquee-text">
            💖 OZEMFIRE • O SUPLEMENTO QUE VAI REVOLUCIONAR SUA VIDA • PERDA DE
            PESO NATURAL • METABOLISMO TURBO • ENERGIA INFINITA • CORPO DOS
            SONHOS • AUTOESTIMA ELEVADA • CONFIANÇA TOTAL • BELEZA RADIANTE •
            SAÚDE PERFEITA • VITALIDADE EXTRAORDINÁRIA • 💖 OZEMFIRE • O
            SUPLEMENTO QUE VAI REVOLUCIONAR SUA VIDA • PERDA DE PESO NATURAL •
            METABOLISMO TURBO • ENERGIA INFINITA • CORPO DOS SONHOS • AUTOESTIMA
            ELEVADA • CONFIANÇA TOTAL • BELEZA RADIANTE • SAÚDE PERFEITA •
            VITALIDADE EXTRAORDINÁRIA •
          </span>
        </div>
      </div>

      {/* Benefícios */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
            Por que Ozemfire é{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-pink to-secondary-purple">
              Revolucionário
            </span>
            ?
          </h2>
          <div className="mb-0 animate-float">
            <div
              className="w-80 h-80 mx-auto drop-shadow-2xl rounded-3xl 
              flex items-center justify-center 
               hover:scale-105 transition-transform duration-500"
            >
              <div className="text-center text-white">
                <img
                  className=""
                  src="https://i.ibb.co/bMJ63rDj/3ozen.webp"
                  alt=""
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-clean-pink to-white shadow-feminine hover:scale-105 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-r from-primary-pink to-secondary-purple rounded-full flex items-center justify-center hover:rotate-12 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Faixa Marquee 3 - Entre Benefícios e Produtos Inclusos */}
      <div className="marquee-container style-3">
        <div className="marquee ultra-slow">
          <span className="marquee-text">
            ✨ OFERTA LIMITADA • DESCONTO EXCLUSIVO • ECONOMIA GARANTIDA •
            PACOTES ESPECIAIS • BÔNUS IMPERDÍVEIS • VALOR INCOMPARÁVEL •
            INVESTIMENTO INTELIGENTE • FUTURO RADIANTE • TRANSFORMAÇÃO COMPLETA
            • ✨ OFERTA LIMITADA • DESCONTO EXCLUSIVO • ECONOMIA GARANTIDA •
            PACOTES ESPECIAIS • BÔNUS IMPERDÍVEIS • VALOR INCOMPARÁVEL •
            INVESTIMENTO INTELIGENTE • FUTURO RADIANTE • TRANSFORMAÇÃO COMPLETA
            •
          </span>
        </div>
      </div>

      {/* Produtos Inclusos */}
      <section className="py-20 px-4 bg-gradient-to-br from-soft-purple to-clean-pink">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
            O que Você Recebe{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-pink to-secondary-purple">
              Além do Ozemfire
            </span>
            ?
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Ebook */}
            <div
              className="bg-white rounded-2xl p-8 shadow-feminine text-center hover:scale-105 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: "0.1s" }}
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-primary-pink to-secondary-purple rounded-full flex items-center justify-center hover:rotate-12 transition-transform duration-300">
                <BookOpen className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Ebook de Receitas
              </h3>
              <p className="text-gray-600 mb-6">
                50+ receitas deliciosas e nutritivas que aceleram o metabolismo
                e ajudam na perda de peso de forma saudável.
              </p>
              <div className="text-primary-pink font-semibold">
                Valor: R$ 97,00
              </div>
            </div>

            {/* App */}
            <div
              className="bg-white rounded-2xl p-8 shadow-feminine text-center hover:scale-105 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: "0.3s" }}
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-primary-pink to-secondary-purple rounded-full flex items-center justify-center hover:rotate-12 transition-transform duration-300">
                <Smartphone className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                App Completo
              </h3>
              <p className="text-gray-600 mb-6">
                Aplicativo que monta sua dieta e treino personalizados baseado
                no seu tipo de corpo, objetivos e rotina diária.
              </p>
              <div className="text-primary-pink font-semibold">
                Valor: R$ 197,00
              </div>
            </div>

            {/* Garantia */}
            <div
              className="bg-white rounded-2xl p-8 shadow-feminine text-center hover:scale-105 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: "0.5s" }}
            >
              <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-primary-pink to-secondary-purple rounded-full flex items-center justify-center hover:rotate-12 transition-transform duration-300">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">
                Garantia Total
              </h3>
              <p className="text-gray-600 mb-6">
                30 dias de garantia incondicional. Se não ficar satisfeita,
                devolvemos 100% do seu dinheiro.
              </p>
              <div className="text-primary-pink font-semibold">Sem Risco</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pacotes */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
            Escolha o{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-pink to-secondary-purple">
              Pacote Ideal
            </span>{" "}
            para Você
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {Object.entries(packages).map(([key, pkg]) => (
              <div
                key={key}
                className={`relative rounded-2xl p-8 cursor-pointer transition-all duration-300 animate-fade-in ${
                  selectedPackage === key
                    ? "bg-gradient-to-br from-primary-pink to-secondary-purple text-white shadow-feminine scale-105 ring-4 ring-pink-300"
                    : "bg-gradient-to-br from-clean-pink to-white text-gray-800 shadow-feminine hover:scale-102 hover:ring-2 hover:ring-pink-200"
                }`}
                onClick={() => setSelectedPackage(key as "1" | "3" | "6")}
                style={{ animationDelay: `${parseInt(key) * 0.2}s` }}
              >
                {pkg.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <span className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                      ⭐ MAIS VENDIDO
                    </span>
                  </div>
                )}

                <div className="text-center">
                  <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                  <p className="text-sm mb-4 opacity-80">{pkg.description}</p>

                  {/* Placeholder para imagem do pote */}
                  <div className="w-32 h-32 mx-auto mb-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:rotate-12 transition-transform duration-300 overflow-hidden">
                    <img
                      src={pkg.image}
                      alt={`Pote ${key}x`}
                      className="w-full h-full object-contain p-2"
                    />
                  </div>

                  <div className="mb-6">
                    <div className="text-4xl font-bold mb-2">{pkg.price}</div>
                    <div className="text-lg line-through opacity-70">
                      {pkg.originalPrice}
                    </div>
                    <div className="text-sm font-semibold">
                      Economia de {pkg.savings}
                    </div>
                  </div>

                  <ul className="text-left space-y-2 mb-6">
                    {pkg.bonus.map((bonus, index) => (
                      <li key={index} className="flex items-center space-x-2">
                        <Check
                          className="w-5 h-5 text-green-400 animate-pulse"
                          style={{ animationDelay: `${index * 0.1}s` }}
                        />
                        <span className="text-sm">{bonus}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          {/* CTA dos Pacotes */}
          <div className="text-center">
            <button
              onClick={handleOrder}
              className="feminine-button text-xl px-12 py-4 text-lg font-bold transform hover:scale-105 transition-all duration-300"
            >
              QUERO O PACOTE {packages[selectedPackage].name} AGORA! 🚀
            </button>
            <p className="text-sm text-gray-500 mt-3">
              ⚡ Entrega em 24-48h • 💳 Parcelado em até 12x • 🛡️ Garantia de 30
              dias
            </p>
          </div>
        </div>
      </section>

      {/* Faixa Marquee 4 - Entre Pacotes e Depoimentos */}
      <div className="marquee-container style-4">
        <div className="marquee slow">
          <span className="marquee-text">
            🎀 JUNTE-SE A MILHARES DE MULHERES SATISFEITAS • DEPOIMENTOS REAIS •
            RESULTADOS COMPROVADOS • CIENTIFICAMENTE TESTADO • FORMULAÇÃO
            EXCLUSIVA • INGREDIENTES PREMIUM • QUALIDADE SUPERIOR • 🎀 JUNTE-SE
            A MILHARES DE MULHERES SATISFEITAS • DEPOIMENTOS REAIS • RESULTADOS
            COMPROVADOS • CIENTIFICAMENTE TESTADO • FORMULAÇÃO EXCLUSIVA •
            INGREDIENTES PREMIUM • QUALIDADE SUPERIOR •
          </span>
        </div>
      </div>

      {/* Depoimentos */}
      <section className="py-20 px-4 bg-gradient-to-br from-clean-pink to-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
            O que Nossas{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-pink to-secondary-purple">
              Clientes Dizem
            </span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-feminine hover:scale-105 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 text-yellow-400 fill-current animate-pulse"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">
                  "{testimonial.text}"
                </p>
                <p className="font-semibold text-gray-800">
                  {testimonial.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-16">
            Perguntas{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-pink to-secondary-purple">
              Frequentes
            </span>
          </h2>

          <div className="space-y-6">
            <div className="bg-gradient-to-r from-clean-pink to-white rounded-2xl p-6 shadow-feminine">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Ozemfire é seguro para usar?
              </h3>
              <p className="text-gray-600">
                Sim! Ozemfire é 100% natural, aprovado pela ANVISA e não causa
                efeitos colaterais. É seguro para uso contínuo e adequado para
                todas as idades.
              </p>
            </div>

            <div className="bg-gradient-to-r from-clean-pink to-white rounded-2xl p-6 shadow-feminine">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Em quanto tempo vou ver resultados?
              </h3>
              <p className="text-gray-600">
                A maioria das pessoas nota diferenças na primeira semana de uso.
                Para resultados ótimos, recomendamos uso contínuo por 3 meses.
              </p>
            </div>

            <div className="bg-gradient-to-r from-clean-pink to-white rounded-2xl p-6 shadow-feminine">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Como funciona o app de dieta e treino?
              </h3>
              <p className="text-gray-600">
                O app analisa seu tipo de corpo, objetivos e rotina para criar
                um plano personalizado de alimentação e exercícios que funciona
                especificamente para você.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="py-20 px-4 bg-gradient-to-br from-primary-pink to-secondary-purple">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            Não Deixe para Amanhã o que Pode Transformar Sua Vida Hoje! 🚀
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Junte-se a milhares de mulheres que já transformaram seus corpos com
            Ozemfire. Sua transformação começa agora!
          </p>

          <div className="mb-8">
            <button
              onClick={handleOrder}
              className="bg-white text-secondary-purple text-xl px-12 py-4 rounded-full font-bold transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              QUERO TRANSFORMAR MEU CORPO AGORA! 💪
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-sm">
            <div className="flex items-center justify-center space-x-2">
              <Shield className="w-5 h-5" />
              <span>Garantia de 30 dias</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Clock className="w-5 h-5" />
              <span>Entrega em 24-48h</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Suporte 24/7</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm opacity-70">
            © 2024 Ozemfire. Todos os direitos reservados. Este produto não
            substitui uma alimentação equilibrada e hábitos de vida saudáveis.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Oferta;
