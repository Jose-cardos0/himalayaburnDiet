# Vídeo VTurb - Himalaya Burn

## Visão Geral

O projeto Himalaya Burn agora inclui um vídeo exclusivo integrado usando a plataforma VTurb (ConvertEai). O vídeo é carregado dinamicamente e oferece uma experiência rica para os usuários.

## Problemas Resolvidos

### 1. **Sintaxe JSX**
- ❌ **Antes**: Atributos `style` inline com aspas duplas causavam erros
- ✅ **Depois**: Objetos JavaScript para estilos (padrão React)

### 2. **Script Inline**
- ❌ **Antes**: Tags `<script>` inline não funcionam no React
- ✅ **Depois**: Script carregado dinamicamente via `useEffect`

### 3. **Carregamento Assíncrono**
- ❌ **Antes**: Script carregado imediatamente, podendo falhar
- ✅ **Depois**: Script carregado após componente estar montado

## Implementação Técnica

### Estrutura do Componente

```tsx
// Estado para controlar carregamento
const [videoLoaded, setVideoLoaded] = useState(false);

// useEffect para carregar script VTurb
useEffect(() => {
  const loadVTurbScript = () => {
    const existingScript = document.getElementById("scr_683e26e558c3f17ae88f6614");
    if (!existingScript) {
      const script = document.createElement("script");
      script.id = "scr_683e26e558c3f17ae88f6614";
      script.src = "https://scripts.converteai.net/.../player.js";
      script.async = true;
      
      script.onload = () => {
        console.log("Script VTurb carregado com sucesso");
        setVideoLoaded(true);
      };
      
      script.onerror = () => {
        console.error("Erro ao carregar script VTurb");
      };
      
      document.head.appendChild(script);
    } else {
      setVideoLoaded(true);
    }
  };

  const timer = setTimeout(loadVTurbScript, 1000);
  return () => clearTimeout(timer);
}, []);
```

### Estrutura HTML

```tsx
<div className="bg-gradient-to-r from-pink-100 to-purple-100 p-6 rounded-3xl">
  <h3>Vídeo Exclusivo</h3>
  
  <div id="vid_683e26e558c3f17ae88f6614" style={{...}}>
    {/* Indicador de carregamento */}
    {!videoLoaded && (
      <div className="loading-indicator">
        <div className="spinner"></div>
        <p>Carregando vídeo...</p>
      </div>
    )}
    
    {/* Thumbnail do vídeo */}
    <img id="thumb_..." src="..." alt="..." />
    
    {/* Backdrop com blur */}
    <div id="backdrop_..." style={{...}}></div>
  </div>
  
  <p>Descrição do vídeo</p>
</div>
```

## Funcionalidades

### 1. **Carregamento Inteligente**
- Script carregado apenas quando necessário
- Verificação de script já existente
- Timeout para garantir DOM estar pronto

### 2. **Indicador de Carregamento**
- Spinner animado durante carregamento
- Mensagem clara para o usuário
- Transição suave quando vídeo está pronto

### 3. **Design Responsivo**
- Container com gradiente feminino
- Bordas arredondadas consistentes
- Layout adaptável para mobile/desktop

### 4. **Tratamento de Erros**
- Logs de sucesso e erro no console
- Fallback para script já carregado
- Limpeza de timers no unmount

## Configuração VTurb

### IDs Únicos
- **Container**: `vid_683e26e558c3f17ae88f6614`
- **Thumbnail**: `thumb_683e26e558c3f17ae88f6614`
- **Backdrop**: `backdrop_683e26e558c3f17ae88f6614`
- **Script**: `scr_683e26e558c3f17ae88f6614`

### URL do Script
```
https://scripts.converteai.net/6f77653e-f9e8-4faa-95e2-321f656df389/players/683e26e558c3f17ae88f6614/player.js
```

### Thumbnail
```
https://images.converteai.net/6f77653e-f9e8-4faa-95e2-321f656df389/players/683e26e558c3f17ae88f6614/thumbnail.jpg
```

## Estilos CSS

### Container Principal
- Gradiente rosa para roxo
- Padding interno de 24px
- Bordas arredondadas de 24px
- Margem inferior de 32px

### Container do Vídeo
- Proporção 16:9 (56.25% padding-top)
- Posicionamento relativo
- Bordas arredondadas de 16px
- Overflow hidden

### Indicador de Carregamento
- Spinner animado rosa
- Fundo cinza claro
- Texto centralizado
- Posicionamento absoluto sobre o vídeo

## Benefícios da Implementação

1. **Performance**: Script carregado apenas quando necessário
2. **UX**: Indicador visual de carregamento
3. **Robustez**: Tratamento de erros e fallbacks
4. **Design**: Integração visual com o tema do projeto
5. **Responsividade**: Funciona em todos os dispositivos

## Manutenção

### Para Alterar o Vídeo
1. Atualizar IDs únicos no VTurb
2. Atualizar URL do script
3. Atualizar URL do thumbnail
4. Testar carregamento

### Para Personalizar Estilos
1. Modificar classes Tailwind no container
2. Ajustar estilos inline do vídeo
3. Personalizar indicador de carregamento
4. Manter consistência com o tema

## Troubleshooting

### Vídeo não carrega
1. Verificar console para erros
2. Confirmar URL do script
3. Verificar IDs únicos
4. Testar em diferentes navegadores

### Script duplicado
1. Verificar se já existe no DOM
2. Limpar localStorage se necessário
3. Recarregar página

### Problemas de estilo
1. Verificar classes Tailwind
2. Confirmar estilos inline
3. Testar responsividade
