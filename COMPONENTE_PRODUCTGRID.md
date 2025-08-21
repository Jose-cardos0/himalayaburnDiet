# Componente ProductGrid - Himalaya Burn

## Visão Geral

O componente ProductGrid é um grid responsivo que exibe 3 opções de produtos do Himalaya Burn, permitindo que os usuários escolham entre diferentes quantidades de frascos com preços diferenciados e benefícios exclusivos.

## Estrutura do Componente

### **Interface TypeScript**

```tsx
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
```

### **Produtos Disponíveis**

#### 1. **Try Two (2 Frascos)**

- **Preço**: $79 por frasco
- **Economia**: $40
- **Frete**: + SHIPPING
- **Badge**: Verde claro
- **Imagem**: [2bottles.webp](https://i.ibb.co/Y4GhYf4n/2bottles.webp)

#### 2. **Best Value (6 Frascos) - RECOMENDADO**

- **Preço**: $49 por frasco
- **Economia**: $300
- **Frete**: + FREE US SHIPPING
- **Badge**: Verde escuro
- **Imagem**: [6-Himalayan.webp](https://i.ibb.co/Zz090NLQ/6-Himalayan.webp)
- **Destaque**: Anel verde e escala aumentada

#### 3. **Good Value (3 Frascos)**

- **Preço**: $59 por frasco
- **Economia**: $97
- **Frete**: + FREE US SHIPPING
- **Badge**: Verde claro
- **Imagem**: [3-Himalayan.webp](https://i.ibb.co/rfTvxPb8/3-Himalayan.webp)

## Características Visuais

### **Design Responsivo**

- **Mobile**: Grid de 1 coluna
- **Desktop**: Grid de 3 colunas
- **Gap**: 8 unidades entre cards
- **Max-width**: 6xl para centralização

### **Cards de Produto**

- **Background**: Branco com sombra
- **Bordas**: Arredondadas (rounded-3xl)
- **Hover**: Elevação e transformação suave
- **Transições**: 300ms para todas as animações

### **Badges Superiores**

- **Posicionamento**: Absoluto no topo
- **Formato**: Polígono com clip-path
- **Cores**: Gradientes verdes diferenciados
- **Conteúdo**: Nome da oferta + quantidade

### **Botões de Compra**

- **Gradiente**: Amarelo para laranja
- **Hover**: Escala 105% e mudança de cor
- **Ícone**: Carrinho de compras
- **Texto**: "Order Now" + tipo de oferta

## Funcionalidades

### **Sistema de Preços**

```tsx
// Cálculo automático de totais
TOTAL: ${product.originalPrice * product.bottles} // Preço riscado
${product.discountedPrice * product.bottles}      // Preço final
```

### **Indicadores de Pagamento**

- **Cartões aceitos**: MC, V, AE, D
- **Cores diferenciadas**: Azul, verde, laranja
- **Formato**: Retângulos arredondados

### **Informações de Frete**

- **Try Two**: "+ SHIPPING" (cinza)
- **Best Value**: "+ FREE US SHIPPING" (vermelho)
- **Good Value**: "+ FREE US SHIPPING" (vermelho)

### **Garantia**

- **Texto**: "60-DAYS GUARANTEE"
- **Estilo**: Fundo cinza claro, texto escuro
- **Posicionamento**: Centro inferior do card

## Destaque do Produto Recomendado

### **Indicadores Visuais**

- **Anel verde**: `ring-4 ring-green-400 ring-opacity-50`
- **Escala aumentada**: `scale-105`
- **Badge "RECOMMENDED"**: Canto superior direito
- **Cor de badge**: Verde escuro para destaque

### **Informação Adicional**

- **Texto**: "THE TREATMENT RECOMMENDED FOR YOU BY THE DOCTOR"
- **Estilo**: Maiúsculas, negrito, centralizado
- **Posicionamento**: Entre preços e botão

## Integração com Sistema de Pagamento

### **Função de Compra**

```tsx
const handlePurchase = (productId: string) => {
  console.log(`Compra iniciada para: ${productId}`);
  // TODO: Implementar redirecionamento para checkout
  // window.location.href = `/checkout/${productId}`;
};
```

### **IDs dos Produtos**

- `try-two`: Oferta de 2 frascos
- `best-value`: Oferta de 6 frascos (recomendada)
- `good-value`: Oferta de 3 frascos

## Estilos e Animações

### **Hover Effects**

```tsx
className =
  "hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1";
```

- **Sombra**: Aumenta no hover
- **Transformação**: Move card para cima
- **Duração**: 300ms para suavidade

### **Botões Interativos**

```tsx
className =
  "hover:from-yellow-500 hover:to-orange-600 transition-all duration-300 transform hover:scale-105";
```

- **Cores**: Mudam no hover
- **Escala**: Aumenta 5% no hover
- **Transição**: Suave e responsiva

### **Gradientes**

- **Badges**: Verdes em diferentes tons
- **Botões**: Amarelo para laranja
- **Background**: Rosa para roxo na seção

## Responsividade

### **Breakpoints**

- **Mobile**: `grid-cols-1` (1 coluna)
- **Desktop**: `md:grid-cols-3` (3 colunas)
- **Gap**: Consistente em todos os tamanhos

### **Imagens**

- **Tamanho**: 128x128px (w-32 h-32)
- **Object-fit**: contain para manter proporção
- **Centralização**: mx-auto para alinhamento

### **Textos**

- **Títulos**: 3xl/4xl responsivo
- **Preços**: 4xl para destaque
- **Descrições**: lg para legibilidade

## Informações Adicionais

### **Rodapé da Seção**

- **Entrega rápida**: Ícone de caminhão
- **Garantia**: Ícone de estrela
- **Pagamento seguro**: Ícone de carrinho

### **Cores e Temas**

- **Primárias**: Rosa e roxo (tema feminino)
- **Secundárias**: Verde para badges
- **Acentos**: Amarelo/laranja para botões
- **Neutras**: Cinza para textos e fundos

## Personalização

### **Adicionar Novos Produtos**

```tsx
const products: ProductOption[] = [
  // ... produtos existentes
  {
    id: "new-offer",
    name: "Nova Oferta",
    bottles: 4,
    originalPrice: 99,
    discountedPrice: 69,
    savings: 120,
    image: "url-da-imagem",
    badge: "Nova Oferta",
    badgeColor: "from-blue-400 to-blue-500",
    shipping: "+ FREE SHIPPING",
    isRecommended: false,
  },
];
```

### **Modificar Cores**

```tsx
// Badge personalizado
badgeColor: "from-purple-400 to-pink-500";

// Botão personalizado
className = "bg-gradient-to-r from-purple-400 to-pink-500";
```

### **Alterar Layout**

```tsx
// Grid de 4 colunas
className = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6";

// Cards menores
className = "p-4 pt-8"; // Reduzir padding
```

## Benefícios da Implementação

### **1. Conversão Otimizada**

- Produto recomendado em destaque
- Preços e economias bem visíveis
- Call-to-action claro e atrativo

### **2. Experiência do Usuário**

- Design responsivo e moderno
- Animações suaves e interativas
- Informações organizadas e claras

### **3. Integração Perfeita**

- Tema consistente com o projeto
- Posicionamento estratégico após vídeo
- Fluxo natural para conversão

### **4. Manutenibilidade**

- Código TypeScript bem estruturado
- Componente reutilizável
- Fácil personalização e atualização

O componente ProductGrid cria uma experiência de compra premium que complementa perfeitamente o sistema de bloqueio de conteúdo, oferecendo aos usuários opções claras para desbloquear seus treinos personalizados. 🛒✨
