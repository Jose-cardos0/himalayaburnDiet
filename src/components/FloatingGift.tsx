import React from "react";
import { Link } from "react-router-dom";

const FloatingGift: React.FC = () => {
  return (
    <>
      <style>
        {`
          .floating-gift {
            position: fixed;
            bottom: 30px;
            right: 30px;
            z-index: 1000;
            cursor: pointer;
            transition: all 0.3s ease;
            border-radius: 50%;
          
          }

          .floating-gift:hover {
            transform: scale(1.1) rotate(5deg);
            animation-play-state: paused;
          }

          .gift-container {
            position: relative;
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #ff69b4, #ff1493, #ff69b4);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            filter: drop-shadow(0 10px 30px rgba(255, 105, 180, 0.4));
            border: 3px solid rgba(255, 255, 255, 0.3);
            overflow: hidden;
            animation: giftPulse 4s ease-in-out infinite;
          }

          .gift-container::before {
            content: '';
            position: absolute;
            top: -2px;
            left: -2px;
            right: -2px;
            bottom: -2px;
            background: linear-gradient(45deg, #ff69b4, #ff1493, #ff69b4, #ff69b4);
            border-radius: 50%;
            z-index: -1;
            animation: borderPulse 2s ease-in-out infinite;
            
          }

          .gift-container::after {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent);
            animation: giftShine 3s infinite;
          }

          .gift-image {
            width: 80px;
            height: 80px;
            object-fit: contain;
            filter: drop-shadow(0 10px 30px rgba(255, 105, 180, 0.4)) drop-shadow(0 0 20px rgba(255, 105, 180, 0.6));
            z-index: 2;
            position: relative;
            border-radius: 50%;
            animation: giftFloat 3s ease-in-out infinite, giftGlow 2s ease-in-out infinite alternate;
            animation-delay: 1s;
          }

          .gift-text {
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            background: linear-gradient(135deg, #ff69b4, #ff1493);
            color: white;
            padding: 4px 12px;
            border-radius: 12px;
            font-size: 10px;
            font-weight: bold;
            white-space: nowrap;
            box-shadow: 0 4px 12px rgba(255, 105, 180, 0.4);
            animation: textPulse 1.5s ease-in-out infinite alternate;
          }

          .gift-sparkle {
            position: absolute;
            width: 3px;
            height: 3px;
            background: white;
            border-radius: 50%;
            animation: sparkleFloat 2s ease-in-out infinite;
          }

          .gift-sparkle:nth-child(1) { top: 10px; left: 15px; animation-delay: 0s; }
          .gift-sparkle:nth-child(2) { top: 15px; right: 20px; animation-delay: 0.5s; }
          .gift-sparkle:nth-child(3) { bottom: 12px; left: 20px; animation-delay: 1s; }
          .gift-sparkle:nth-child(4) { bottom: 8px; right: 15px; animation-delay: 1.5s; }

          @keyframes giftFloat {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-8px) rotate(2deg); }
          }

    

      

          @keyframes borderPulse {
            0% { opacity: 0.7; transform: scale(1); }
            100% { opacity: 1; transform: scale(1.05); }
          }

          @keyframes giftShine {
            0% { left: -100%; }
            100% { left: 100%; }
          }

          @keyframes textPulse {
            0% { transform: translateX(-50%) scale(1); }
            100% { transform: translateX(-50%) scale(1.05); }
          }

          @keyframes sparkleFloat {
            0%, 100% { opacity: 0; transform: translateY(0px) scale(0.5); }
            50% { opacity: 1; transform: translateY(-3px) scale(1); }
          }

          @keyframes giftPulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.02); }
          }

          /* Responsividade para mobile */
          @media (max-width: 768px) {
            .floating-gift {
              bottom: 20px;
              right: 20px;
            }
            
            .gift-container {
              width: 70px;
              height: 70px;
            }
            
            .gift-image {
              width: 100px;
              height: 100px;
            }
            
            .gift-text {
              font-size: 9px;
              padding: 3px 10px;
              bottom: -22px;
            }
          }

          /* Efeito de clique */
          .floating-gift:active {
            transform: scale(0.95);
            transition: transform 0.1s ease;
          }
        `}
      </style>

      <Link to="/oferta" className="floating-gift">
        <div className="">
          {/* Partículas brilhantes */}
          <div className="gift-sparkle"></div>
          <div className="gift-sparkle"></div>
          <div className="gift-sparkle"></div>
          <div className="gift-sparkle"></div>

          {/* Imagem do presente */}
          <img src="/gift.webp" alt="Oferta Especial" className="gift-image" />

          {/* Texto "OFERTA" */}
          <div className="gift-text">CLIQUE AQUI</div>
        </div>
      </Link>
    </>
  );
};

export default FloatingGift;
