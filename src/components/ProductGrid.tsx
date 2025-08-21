import React from "react";
import { ShoppingCart, Star, Truck } from "lucide-react";

interface ProductOption {
  id: string;
  name: string;
  bottles: number;
  originalPrice: number;
  discountedPrice: number;
  savings: number;
  image: string;
  badge: string;
  badgeColor: string;
  shipping: string;
  isRecommended?: boolean;
}

const ProductGrid: React.FC = () => {
  const products: ProductOption[] = [
    {
      id: "try-two",
      name: "Try Two",
      bottles: 2,
      originalPrice: 99,
      discountedPrice: 79,
      savings: 40,
      image: "https://i.ibb.co/Y4GhYf4n/2bottles.webp",
      badge: "Try Two",
      badgeColor: "from-green-300 to-green-400",
      shipping: "+ SHIPPING",
      isRecommended: false,
    },
    {
      id: "best-value",
      name: "Best Value",
      bottles: 6,
      originalPrice: 99,
      discountedPrice: 49,
      savings: 300,
      image: "https://i.ibb.co/Zz090NLQ/6-Himalayan.webp",
      badge: "Best Value ",
      badgeColor: "from-green-600 to-green-700",
      shipping: "+ FREE US SHIPPING",
      isRecommended: true,
    },
    {
      id: "good-value",
      name: "Good Value",
      bottles: 3,
      originalPrice: 99,
      discountedPrice: 59,
      savings: 97,
      image: "https://i.ibb.co/rfTvxPb8/3-Himalayan.webp",
      badge: "Good Value",
      badgeColor: "from-green-300 to-green-400",
      shipping: "+ FREE US SHIPPING",
      isRecommended: false,
    },
  ];

  const handlePurchase = (productId: string) => {
    // Aqui você pode adicionar a lógica de redirecionamento para pagamento
    console.log(`Compra iniciada para: ${productId}`);
    // Exemplo: window.location.href = `/checkout/${productId}`;
  };

  return (
    <div className="py-12 bg-gradient-to-br from-pink-50 to-purple-50">
      <div className="container mx-auto px-4">
        {/* Título da seção */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Escolha Seu Plano
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Desbloqueie seu treino personalizado e transforme seus objetivos em
            realidade
          </p>
        </div>

        {/* Grid de produtos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {products.map((product) => (
            <div
              key={product.id}
              className={`relative bg-white rounded-3xl shadow-lg hover:shadow-xl 
                transition-all duration-300 transform hover:-translate-y-1 ${
                  product.isRecommended
                    ? "ring-4 ring-green-400 ring-opacity-50 scale-105"
                    : ""
                }`}
            >
              {/* Badge superior */}
              <div
                className={`absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r ${product.badgeColor} text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg`}
              >
                <div className="text-center mt">
                  <div className="font-bold text-lg">{product.badge}</div>
                  <div className="text-xs opacity-90">
                    {product.bottles} Bottles
                  </div>
                </div>
              </div>

              {/* Conteúdo do card */}
              <div className="p-6 pt-12 mt-10">
                {/* Imagem do produto */}
                <div className="text-center mb-6">
                  <img
                    src={product.image}
                    alt={`Himalayan Burn ${product.bottles} bottles`}
                    className="w-32 h-32 object-contain mx-auto"
                  />
                </div>

                {/* Preços */}
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-gray-800 mb-2">
                    ${product.discountedPrice}
                  </div>
                  <div className="text-sm text-gray-600 mb-2">Per Bottle</div>
                  <div className="text-lg font-bold text-green-600">
                    YOU SAVE ${product.savings}!
                  </div>
                </div>

                {/* Informação adicional para o produto recomendado */}
                {product.isRecommended && (
                  <div className="text-center mb-6">
                    <p className="text-sm font-bold text-gray-800 uppercase">
                      THE TREATMENT RECOMMENDED FOR YOU BY THE DOCTOR
                    </p>
                  </div>
                )}

                {/* Botão de compra */}
                <button
                  onClick={() => handlePurchase(product.id)}
                  className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-bold py-4 px-6 rounded-xl text-lg hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
                >
                  <div className="flex items-center justify-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    <span>Order Now</span>
                  </div>
                  <div className="text-sm opacity-90 mt-1">
                    {product.id === "try-two"
                      ? "Basic Order!"
                      : product.id === "best-value"
                      ? "Best Offer!"
                      : "Good Offer!"}
                  </div>
                </button>

                {/* Informações de pagamento e total */}
                <div className="mt-6 text-center">
                  {/* Ícones de cartão */}
                  <div className="flex justify-center gap-2 mb-3">
                    <div className="w-8 h-6 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                      MC
                    </div>
                    <div className="w-8 h-6 bg-blue-500 rounded text-white text-xs flex items-center justify-center font-bold">
                      V
                    </div>
                    <div className="w-8 h-6 bg-green-600 rounded text-white text-xs flex items-center justify-center font-bold">
                      AE
                    </div>
                    <div className="w-8 h-6 bg-orange-600 rounded text-white text-xs flex items-center justify-center font-bold">
                      D
                    </div>
                  </div>

                  {/* Total */}
                  <div className="mb-2">
                    <span className="text-gray-500 line-through">
                      TOTAL: ${product.originalPrice * product.bottles}
                    </span>
                    <div className="text-xl font-bold text-gray-800">
                      ${product.discountedPrice * product.bottles}
                    </div>
                  </div>

                  {/* Frete */}
                  <div
                    className={`text-sm font-bold ${
                      product.shipping.includes("FREE")
                        ? "text-red-600"
                        : "text-gray-600"
                    }`}
                  >
                    {product.shipping}
                  </div>
                </div>

                {/* Garantia */}
                <div className="mt-6 text-center">
                  <div className="text-sm font-bold text-gray-700 bg-gray-100 py-2 px-4 rounded-lg">
                    60-DAYS GUARANTEE
                  </div>
                </div>
              </div>

              {/* Indicador de recomendação */}
              {product.isRecommended && (
                <div className="absolute -top-2 -right-2">
                  <div className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                    ⭐ RECOMMENDED
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Informações adicionais */}
        <div className="text-center mt-12">
          <div className="flex items-center justify-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-green-500" />
              <span>Entrega rápida</span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-4 h-4 text-yellow-500" />
              <span>Garantia de 60 dias</span>
            </div>
            <div className="flex items-center gap-2">
              <ShoppingCart className="w-4 h-4 text-blue-500" />
              <span>Pagamento seguro</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductGrid;
