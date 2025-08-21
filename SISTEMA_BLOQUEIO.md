# Sistema de Bloqueio de Conteúdo - Himalaya Burn

## Visão Geral

O projeto Himalaya Burn agora possui um sistema de bloqueio de conteúdo que aplica blur sobre o texto gerado pela IA, criando uma experiência de "conteúdo premium" que precisa ser desbloqueado através de compra.

## Funcionalidade Implementada

### **Estado de Bloqueio**

- **Padrão**: Todo conteúdo inicia bloqueado (`conteudoBloqueado = true`)
- **Controle**: Estado React para gerenciar status de bloqueio
- **Persistência**: Pode ser integrado com sistema de autenticação/pagamento

### **Efeito Visual**

- **Blur aplicado**: `backdrop-filter: blur(8px)` sobre o texto
- **Overlay**: Camada semi-transparente para intensificar o bloqueio
- **Mensagem**: Card centralizado com call-to-action para compra

## Implementação Técnica

### **Estado do Componente**

```tsx
const [conteudoBloqueado, setConteudoBloqueado] = useState(true);
```

### **Função de Desbloqueio**

```tsx
const desbloquearConteudo = () => {
  setConteudoBloqueado(false);
  // Aqui você pode adicionar lógica para redirecionar para página de pagamento
  // ou abrir modal de compra
};
```

### **Interface Condicional**

```tsx
{
  /* Overlay com blur por cima do texto - só mostra quando bloqueado */
}
{
  conteudoBloqueado && (
    <>
      {/* Camada de blur */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backdropFilter: "blur(8px)",
          background: "rgba(255, 255, 255, 0.1)",
        }}
      ></div>

      {/* Mensagem de bloqueio */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        {/* Card de compra */}
      </div>
    </>
  );
}
```

## Elementos Visuais

### **1. Camada de Blur**

- **Posicionamento**: `absolute inset-0` para cobrir todo o conteúdo
- **Efeito**: `backdrop-filter: blur(8px)` para desfocar o texto
- **Fundo**: `rgba(255, 255, 255, 0.1)` para overlay sutil
- **Interação**: `pointer-events-none` para não bloquear cliques

### **2. Card de Bloqueio**

- **Design**: Card branco com backdrop-blur e sombra
- **Ícone**: Dumbbell em círculo gradiente rosa/roxo
- **Título**: "Conteúdo Bloqueado" em destaque
- **Descrição**: Texto explicativo sobre como desbloquear
- **Botão**: CTA principal "COMPRAR PARA DESBLOQUEAR"
- **Benefícios**: Lista de vantagens do plano completo

### **3. Indicador de Status**

- **Header**: Mostra status atual (bloqueado/desbloqueado)
- **Cores**: Laranja para bloqueado, verde para desbloqueado
- **Visual**: Badge com indicador circular colorido

## Estrutura do Card de Bloqueio

```tsx
<div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 text-center shadow-2xl border border-pink-200 max-w-md mx-4">
  {/* Ícone */}
  <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
    <Dumbbell className="w-8 h-8 text-white" />
  </div>

  {/* Título */}
  <h3 className="text-xl font-bold text-gray-800 mb-3">Conteúdo Bloqueado</h3>

  {/* Descrição */}
  <p className="text-gray-600 mb-6 leading-relaxed">
    Para acessar sua dieta e treino personalizados,
    <span className="text-pink-500 font-semibold">
      {" "}
      adquira o plano completo
    </span>e desbloqueie todo o conteúdo exclusivo!
  </p>

  {/* Botão CTA */}
  <button
    onClick={desbloquearConteudo}
    className="feminine-button px-8 py-3 text-lg w-full"
  >
    <Sparkles className="w-5 h-5 mr-2" />
    COMPRAR PARA DESBLOQUEAR
  </button>

  {/* Benefícios */}
  <p className="text-xs text-gray-500 mt-4">
    ✨ Acesso vitalício • Suporte personalizado • Resultados garantidos
  </p>
</div>
```

## Fluxo de Usuário

### **1. Usuário Gera Treino**

- Preenche formulário e clica em "Gerar"
- Gemini AI responde com treino personalizado
- Conteúdo é salvo no localStorage
- **Status**: Conteúdo bloqueado por padrão

### **2. Visualização Bloqueada**

- Texto aparece com blur aplicado
- Card de bloqueio é exibido sobre o conteúdo
- Usuário vê que precisa comprar para acessar
- **Status**: Indicador laranja "Conteúdo Bloqueado"

### **3. Processo de Compra**

- Usuário clica em "COMPRAR PARA DESBLOQUEAR"
- Função `desbloquearConteudo()` é executada
- Estado muda para `conteudoBloqueado = false`
- **Status**: Indicador verde "Conteúdo Desbloqueado"

### **4. Conteúdo Desbloqueado**

- Blur é removido do texto
- Card de bloqueio desaparece
- Usuário pode ler treino completo
- **Status**: Conteúdo totalmente acessível

## Integração com Sistema de Pagamento

### **Função de Desbloqueio Atual**

```tsx
const desbloquearConteudo = () => {
  setConteudoBloqueado(false);
  // TODO: Integrar com sistema de pagamento
};
```

### **Implementação Futura**

```tsx
const desbloquearConteudo = async () => {
  try {
    // Verificar se usuário já comprou
    const hasAccess = await checkUserAccess();

    if (hasAccess) {
      setConteudoBloqueado(false);
    } else {
      // Redirecionar para página de pagamento
      window.location.href = "/checkout";
      // Ou abrir modal de pagamento
      openPaymentModal();
    }
  } catch (error) {
    console.error("Erro ao verificar acesso:", error);
  }
};
```

## Personalização

### **Intensidade do Blur**

```tsx
// Blur mais intenso
backdropFilter: "blur(12px)";

// Blur mais sutil
backdropFilter: "blur(4px)";
```

### **Cores do Card**

```tsx
// Card mais colorido
className = "bg-gradient-to-r from-pink-50 to-purple-50";

// Card mais neutro
className = "bg-white";
```

### **Mensagens Personalizadas**

```tsx
// Mensagem mais direta
"Compre agora para desbloquear seu treino!";

// Mensagem mais motivacional
"Transforme seus objetivos em realidade! Desbloqueie seu treino personalizado!";
```

## Benefícios da Implementação

### **1. Conversão**

- Cria senso de urgência e valor
- Call-to-action claro e direto
- Benefícios bem destacados

### **2. Experiência do Usuário**

- Mostra preview do que será recebido
- Transição suave entre estados
- Feedback visual claro do status

### **3. Monetização**

- Estratégia de freemium efetiva
- Valor percebido aumentado
- Funnel de conversão otimizado

### **4. Engajamento**

- Usuário vê o conteúdo mas não consegue ler
- Motivação para completar a compra
- Retenção de usuários interessados

## Considerações Técnicas

### **Performance**

- Blur aplicado apenas quando necessário
- Estados gerenciados eficientemente
- Renderização condicional otimizada

### **Acessibilidade**

- Texto ainda está no DOM (para leitores de tela)
- Contraste adequado mantido
- Navegação por teclado funcional

### **Responsividade**

- Card se adapta a diferentes tamanhos de tela
- Blur funciona em mobile e desktop
- Layout flexível para todos os dispositivos

O sistema de bloqueio cria uma experiência premium que motiva os usuários a adquirir o plano completo, enquanto mantém a elegância e funcionalidade do projeto Himalaya Burn. 🔒✨
