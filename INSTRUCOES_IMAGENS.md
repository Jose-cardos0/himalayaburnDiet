# 🖼️ Instruções para Imagens dos Potes Ozemfire

## 📸 Imagens Necessárias

### 1. **Imagem Principal do Produto** (Hero Section)

- **Localização**: Linha ~150 do arquivo `Oferta.tsx`
- **Dimensões recomendadas**: 320x320px (w-80 h-80)
- **Conteúdo**: Pote do Ozemfire com 60 cápsulas
- **Substituir**: O placeholder com emoji 💊

### 2. **Imagens dos Pacotes** (Seção de Pacotes)

- **Localização**: Linha ~350 do arquivo `Oferta.tsx`
- **Dimensões recomendadas**: 128x128px (w-32 h-32)
- **Conteúdo**:
  - 1 Pote: Imagem de 1 pote
  - 3 Potes: Imagem de 3 potes
  - 6 Potes: Imagem de 6 potes
- **Substituir**: Os placeholders com emoji 💊

## 🔧 Como Substituir as Imagens

### Opção 1: Usando Imagens Locais

1. Adicione as imagens na pasta `public/`
2. Substitua os placeholders por:

```tsx
<img
  src="/nome-da-imagem.jpg"
  alt="Ozemfire - {nome-do-pacote}"
  className="w-80 h-80 object-cover rounded-3xl"
/>
```

### Opção 2: Usando URLs Externas

```tsx
<img
  src="https://seudominio.com/imagem-ozemfire.jpg"
  alt="Ozemfire - {nome-do-pacote}"
  className="w-80 h-80 object-cover rounded-3xl"
/>
```

## 📋 Lista de Imagens por Seção

### **Hero Section (Imagem Principal)**

```tsx
{
  /* Substituir este bloco */
}
<div className="w-80 h-80 mx-auto bg-gradient-to-br from-primary-pink to-secondary-purple rounded-3xl flex items-center justify-center shadow-feminine">
  <div className="text-center text-white">
    <div className="text-6xl mb-4">💊</div>
    <p className="text-lg font-semibold">Imagem do Produto Ozemfire</p>
    <p className="text-sm opacity-80">Pote com 60 cápsulas</p>
  </div>
</div>;

{
  /* Por uma imagem real */
}
<img
  src="/ozemfire-principal.jpg"
  alt="Ozemfire - Remédio Emagrecedor"
  className="w-80 h-80 object-cover rounded-3xl shadow-feminine"
/>;
```

### **Seção de Pacotes (Imagens dos Potes)**

```tsx
{
  /* Substituir este bloco */
}
<div className="w-32 h-32 mx-auto mb-6 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
  <div className="text-center">
    <div className="text-4xl mb-2">💊</div>
    <p className="text-xs">Pote {key}x</p>
  </div>
</div>;

{
  /* Por imagens reais */
}
<img
  src={`/ozemfire-${key}-potes.jpg`}
  alt={`Ozemfire - ${pkg.name}`}
  className="w-32 h-32 object-cover rounded-full mb-6"
/>;
```

## 🎨 Especificações das Imagens

### **Formato Recomendado**

- **Formato**: JPG ou PNG
- **Qualidade**: Alta (otimizada para web)
- **Tamanho máximo**: 500KB por imagem
- **Resolução**: 72 DPI (adequada para web)

### **Conteúdo das Imagens**

1. **Imagem Principal**: Pote do Ozemfire em destaque, com fundo limpo
2. **1 Pote**: Imagem de 1 pote do produto
3. **3 Potes**: Imagem de 3 potes organizados
4. **6 Potes**: Imagem de 6 potes organizados

### **Estilo Visual**

- **Fundo**: Limpo e neutro (branco ou transparente)
- **Iluminação**: Boa iluminação para destacar o produto
- **Ângulo**: 45° ou frontal para melhor visualização
- **Produto**: Em foco e bem iluminado

## 🚀 Após Adicionar as Imagens

1. **Teste localmente**: Execute `npm start` e acesse `/oferta`
2. **Verifique responsividade**: Teste em diferentes tamanhos de tela
3. **Otimize**: Comprima as imagens se necessário
4. **Deploy**: Faça o build e deploy no Hostinger

---

**💡 Dica**: Use ferramentas como TinyPNG ou Squoosh para otimizar as imagens sem perder qualidade!
