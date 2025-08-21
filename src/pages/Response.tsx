import React, { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  Printer,
  Sparkles,
  User,
  Target,
  Dumbbell,
  Heart,
  Apple,
  MapPin,
  Calendar,
  Scale,
  Ruler,
  Zap,
  History,
  Trash2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import ProductGrid from "../components/ProductGrid";
// import FloatingGift from "../components/FloatingGift";

interface UserData {
  nome: string;
  idade: string;
  peso: string;
  altura: string;
  sexo: string;
  frequencia: string;
  objetivo: string;
  problemSaude: string;
  alimentos: string;
  alergicos: string;
  areasCorpo: Record<string, boolean>;
  outrasAreas: string;
}

interface TreinoSalvo {
  id: string;
  timestamp: string;
  texto: string;
  dados: UserData;
}

const Response: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [texto, setTexto] = useState("");
  const [dados, setDados] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [treinosSalvos, setTreinosSalvos] = useState<TreinoSalvo[]>([]);
  const [treinoAtualIndex, setTreinoAtualIndex] = useState(0);
  const [showHistoricoModal, setShowHistoricoModal] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [conteudoBloqueado, setConteudoBloqueado] = useState(true);

  useEffect(() => {
    const textoParam = searchParams.get("texto");
    const dadosParam = searchParams.get("dados");

    console.log("Parâmetros recebidos:", { textoParam, dadosParam });

    if (textoParam && dadosParam) {
      try {
        const textoDecodificado = decodeURIComponent(textoParam);
        const dadosDecodificados = decodeURIComponent(dadosParam);

        console.log("Texto decodificado:", textoDecodificado);
        console.log("Dados decodificados:", dadosDecodificados);

        const dadosParseados = JSON.parse(dadosDecodificados);
        console.log("Dados parseados:", dadosParseados);

        setTexto(textoDecodificado);
        setDados(dadosParseados);
      } catch (error) {
        console.error("Erro detalhado ao decodificar parâmetros:", error);
        console.error("Texto param:", textoParam);
        console.error("Dados param:", dadosParam);
      }
    } else {
      console.log("Parâmetros ausentes, verificando localStorage...");
      // Tentar buscar dados do localStorage como fallback
      try {
        const dadosLocalStorage = localStorage.getItem("ozemfire_dados");
        if (dadosLocalStorage) {
          const dadosParseados = JSON.parse(dadosLocalStorage);
          console.log("Dados encontrados no localStorage:", dadosParseados);

          setTexto(dadosParseados.texto);
          setDados(dadosParseados.dados);

          // Limpar localStorage após usar
          localStorage.removeItem("ozemfire_dados");
        } else {
          console.log("Nenhum dado encontrado no localStorage");
        }
      } catch (error) {
        console.error("Erro ao ler localStorage:", error);
      }
    }

    // Carregar histórico de treinos do localStorage
    carregarTreinosSalvos();
    setLoading(false);
  }, [searchParams]);

  // useEffect para carregar o script do VTurb
  useEffect(() => {
    // Carregar o script do VTurb após o componente ser montado
    const loadVTurbScript = () => {
      const existingScript = document.getElementById(
        "scr_683e26e558c3f17ae88f6614"
      );
      if (!existingScript) {
        const script = document.createElement("script");
        script.id = "scr_683e26e558c3f17ae88f6614";
        script.src =
          "https://scripts.converteai.net/6f77653e-f9e8-4faa-95e2-321f656df389/players/683e26e558c3f17ae88f6614/player.js";
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

    // Aguardar um pouco para garantir que o DOM esteja pronto
    const timer = setTimeout(loadVTurbScript, 1000);

    return () => clearTimeout(timer);
  }, []);

  const carregarTreinosSalvos = () => {
    try {
      const treinos = JSON.parse(
        localStorage.getItem("ozemfire_treinos") || "[]"
      );
      setTreinosSalvos(treinos);

      // Se não há texto atual mas há treinos salvos, carregar o primeiro
      if (!texto && treinos.length > 0) {
        setTexto(treinos[0].texto);
        setDados(treinos[0].dados);
        setTreinoAtualIndex(0);
      }
    } catch (error) {
      console.error("Erro ao carregar treinos salvos:", error);
    }
  };

  const selecionarTreino = (index: number) => {
    if (index >= 0 && index < treinosSalvos.length) {
      const treino = treinosSalvos[index];
      setTexto(treino.texto);
      setDados(treino.dados);
      setTreinoAtualIndex(index);
    }
  };

  const limparHistorico = () => {
    if (
      window.confirm(
        "Tem certeza que deseja limpar todo o histórico de treinos?"
      )
    ) {
      localStorage.removeItem("ozemfire_treinos");
      setTreinosSalvos([]);
      setTexto("");
      setDados(null);
      setTreinoAtualIndex(0);
    }
  };

  const formatarData = (timestamp: string) => {
    const data = new Date(timestamp);
    return data.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const abrirModalHistorico = () => {
    setShowHistoricoModal(true);
  };

  const deletarTreino = (id: string) => {
    if (window.confirm("Tem certeza que deseja deletar este treino?")) {
      const treinosAtualizados = treinosSalvos.filter(
        (treino) => treino.id !== id
      );
      localStorage.setItem(
        "ozemfire_treinos",
        JSON.stringify(treinosAtualizados)
      );
      setTreinosSalvos(treinosAtualizados);

      // Se o treino deletado era o atual, carregar o primeiro disponível
      if (treinosAtualizados.length > 0) {
        setTexto(treinosAtualizados[0].texto);
        setDados(treinosAtualizados[0].dados);
        setTreinoAtualIndex(0);
      } else {
        setTexto("");
        setDados(null);
        setTreinoAtualIndex(0);
      }
    }
  };

  const desbloquearConteudo = () => {
    setConteudoBloqueado(false);
    // Aqui você pode adicionar lógica para redirecionar para página de pagamento
    // ou abrir modal de compra
  };

  const handlePrint = () => {
    // Aguardar um pouco para os estilos serem aplicados
    setTimeout(() => {
      window.print();
    }, 100);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-purple-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando seus dados...</p>
        </div>
      </div>
    );
  }

  if (!dados || !texto) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-white to-purple-50">
        <div className="text-center max-w-md mx-auto p-8">
          <div className="bg-white rounded-2xl p-8 shadow-feminine">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Nenhum dado encontrado
            </h1>
            <p className="text-gray-600 mb-6">
              Parece que não há dados para exibir. Por favor, volte ao
              formulário e crie seu treino personalizado.
            </p>
            <Link to="/form">
              <button className="feminine-button px-6 py-3 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Voltar ao Formulário
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Função para processar o texto da IA e aplicar estilos
  const processarTexto = (texto: string) => {
    const linhas = texto.split("\n");
    return linhas.map((linha, index) => {
      const linhaTrim = linha.trim();

      // Títulos principais
      if (linhaTrim.match(/^[A-Z\s]+:$/) || linhaTrim.match(/^[A-Z\s]+$/)) {
        return (
          <h2
            key={index}
            className="text-2xl font-bold text-pink-600 mb-4 mt-8 first:mt-0"
          >
            {linhaTrim}
          </h2>
        );
      }

      // Subtítulos
      if (linhaTrim.match(/^[A-Z][a-z\s]+:$/)) {
        return (
          <h3
            key={index}
            className="text-xl font-semibold text-purple-600 mb-3 mt-6"
          >
            {linhaTrim}
          </h3>
        );
      }

      // Listas numeradas
      if (linhaTrim.match(/^\d+\./)) {
        return (
          <li key={index} className="text-gray-700 mb-2 ml-4">
            {linhaTrim}
          </li>
        );
      }

      // Listas com marcadores
      if (linhaTrim.match(/^[-•*]/)) {
        return (
          <li key={index} className="text-gray-700 mb-2 ml-4">
            {linhaTrim}
          </li>
        );
      }

      // Linhas vazias
      if (linhaTrim === "") {
        return <div key={index} className="h-2"></div>;
      }

      // Texto normal
      return (
        <p key={index} className="text-gray-700 mb-3 leading-relaxed">
          {linhaTrim}
        </p>
      );
    });
  };

  return (
    <div className="min-h-screen bg-feminine-gradient">
      {/* Botão flutuante do presente */}
      {/* <FloatingGift /> */}

      {/* Header com botões de ação */}
      <div className="bg-white/90 backdrop-blur-sm border-b border-pink-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/">
              <img
                src="/logoHima.webp"
                alt="Ozemfire Logo"
                width={40}
                height={40}
                className="drop-shadow-lg hover:scale-110 transition-transform duration-300"
                style={{
                  filter: "drop-shadow(0 0 10px rgba(249, 102,186, 1))",
                }}
              />
            </Link>

            <div className="flex items-center gap-4">
              {/* {treinosSalvos.length > 0 && (
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <History className="w-4 h-4 text-pink-500" />
                  <span>
                    {treinosSalvos.length} treino
                    {treinosSalvos.length !== 1 ? "s" : ""} salvo
                    {treinosSalvos.length !== 1 ? "s" : ""}
                  </span>
                  <button
                    onClick={abrirModalHistorico}
                    className="text-pink-500 hover:text-pink-700 underline text-xs"
                    title="Ver histórico"
                  >
                    Ver histórico
                  </button>
                </div>
              )} */}

              {/* Indicador de status do conteúdo */}
              <div className="flex items-center gap-2 text-sm">
                {conteudoBloqueado ? (
                  <div className="flex items-center gap-2 text-orange-600 bg-orange-50 px-3 py-1 rounded-full">
                    <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                    <span>Conteúdo Bloqueado</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Conteúdo Desbloqueado</span>
                  </div>
                )}
              </div>

              <button
                onClick={handlePrint}
                className="feminine-button px-6 py-3 text-sm relative group flex items-center gap-2"
                title="Clique para imprimir ou salvar como PDF"
              >
                <Printer className="w-4 h-4 mr-2" />
                PDF
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
                  Clique para imprimir ou salvar como PDF
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-800"></div>
                </div>
              </button>

              <Link to="/form">
                <button className="feminine-button px-6 py-3 text-sm flex items-center gap-2">
                  <Sparkles className="w-4 h-4" />
                  Novo
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Seletor de histórico de treinos */}
      {treinosSalvos.length > 1 && (
        <div className="bg-white/80 backdrop-blur-sm border-b border-pink-200">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <History className="w-5 h-5 text-pink-500" />
                <span className="text-sm font-medium text-gray-700">
                  Histórico de Treinos ({treinosSalvos.length})
                </span>
                <button
                  onClick={abrirModalHistorico}
                  className="text-xs text-pink-500 hover:text-pink-700 underline"
                  title="Ver histórico completo"
                >
                  Ver todos
                </button>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => selecionarTreino(treinoAtualIndex - 1)}
                  disabled={treinoAtualIndex === 0}
                  className="p-2 rounded-full hover:bg-pink-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="w-4 h-4 text-pink-500" />
                </button>

                <span className="text-sm text-gray-600 min-w-[80px] text-center">
                  {treinoAtualIndex + 1} de {treinosSalvos.length}
                </span>

                <button
                  onClick={() => selecionarTreino(treinoAtualIndex + 1)}
                  disabled={treinoAtualIndex === treinosSalvos.length - 1}
                  className="p-2 rounded-full hover:bg-pink-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="w-4 h-4 text-pink-500" />
                </button>
              </div>

              <button
                onClick={limparHistorico}
                className="p-2 rounded-full hover:bg-red-100 transition-colors"
                title="Limpar histórico"
              >
                <Trash2 className="w-4 h-4 text-red-500" />
              </button>
            </div>

            {/* Informações do treino atual */}
            <div className="mt-3 text-center">
              <p className="text-xs text-gray-500">
                Treino gerado em:{" "}
                {formatarData(treinosSalvos[treinoAtualIndex]?.timestamp || "")}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Conteúdo principal */}
      <div className="container mx-auto px-4 py-8">
        {/* Cabeçalho da folha */}
        <div className="bg-gradient-to-r from-pink-200 via-purple-200 to-pink-200 p-8 text-white text-center print:break-inside-avoid rounded-3xl mb-8">
          <div className="flex flex-col items-center justify-center mb-4">
            <img
              src="/logoHima.webp"
              alt="Ozemfire"
              width={150}
              height={150}
              className="drop-shadow-lg"
            />
            {/* <div>
              <h1 className="text-4xl font-bold">OzemFire</h1>
            </div> */}
          </div>
        </div>

        {/* Informações do usuário */}
        <div className="p-8 print:break-inside-avoid mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
            <User className="w-6 h-6 text-pink-500" />
            Dados Pessoais
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div className="bg-pink-50 rounded-2xl p-4 border-l-4 border-pink-400">
              <h3 className="font-semibold text-pink-600 text-sm uppercase tracking-wide mb-2 flex items-center gap-2">
                <User className="w-4 h-4" />
                Informações Básicas
              </h3>
              <p className="text-gray-700">
                <strong>Nome:</strong> {dados.nome}
              </p>
              <p className="text-gray-700">
                <strong>Idade:</strong> {dados.idade} anos
              </p>
              <p className="text-gray-700">
                <strong>Sexo:</strong> {dados.sexo}
              </p>
              <p className="text-gray-700">
                <strong>Frequência:</strong> {dados.frequencia}
              </p>
            </div>

            <div className="bg-purple-50 rounded-2xl p-4 border-l-4 border-purple-400">
              <h3 className="font-semibold text-purple-600 text-sm uppercase tracking-wide mb-2 flex items-center gap-2">
                <Ruler className="w-4 h-4" />
                Medidas
              </h3>
              <p className="text-gray-700">
                <strong>Peso:</strong> {dados.peso} kg
              </p>
              <p className="text-gray-700">
                <strong>Altura:</strong> {dados.altura} m
              </p>
            </div>

            <div className="bg-pink-50 rounded-2xl p-4 border-l-4 border-pink-400">
              <h3 className="font-semibold text-pink-600 text-sm uppercase tracking-wide mb-2 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Objetivos
              </h3>
              <p className="text-gray-700">
                <strong>Objetivo:</strong> {dados.objetivo}
              </p>
              <p className="text-gray-700">
                <strong>Problema de saúde:</strong> {dados.problemSaude}
              </p>
            </div>

            <div className="bg-purple-50 rounded-2xl p-4 border-l-4 border-purple-400">
              <h3 className="font-semibold text-purple-600 text-sm uppercase tracking-wide mb-2 flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Preferências
              </h3>
              <p className="text-gray-700">
                <strong>Alimentos incluídos:</strong> {dados.alimentos}
              </p>
              <p className="text-gray-700">
                <strong>Alimentos excluídos:</strong>{" "}
                {dados.alergicos || "Nenhum"}
              </p>
            </div>

            {dados.areasCorpo && (
              <div className="bg-pink-50 rounded-2xl p-4 border-l-4 border-pink-400 col-span-1 md:col-span-2">
                <h3 className="font-semibold text-pink-600 text-sm uppercase tracking-wide mb-2 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Áreas para Perda de Gordura
                </h3>
                <p className="text-gray-700">
                  {Object.entries(dados.areasCorpo)
                    .filter(([key, value]) => value)
                    .map(([key, value]) => {
                      const areaNames = {
                        A: "Abdômen",
                        B: "Culotes",
                        C: "Braços",
                        D: "Quadris",
                        E: "Pernas",
                        F: "Outras áreas",
                        G: "Nenhuma",
                        H: "Todo o corpo",
                      };
                      return areaNames[key as keyof typeof areaNames];
                    })
                    .join(", ")}
                </p>
                {dados.outrasAreas && (
                  <p className="text-gray-700 mt-2">
                    <strong>Específico:</strong> {dados.outrasAreas}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>

        {/*Video VTURB aqui */}
        <div className="mb-8">
          <div className="bg-gradient-to-r from-pink-100 to-purple-100 p-6 rounded-3xl">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center flex items-center justify-center gap-2">
              <Zap className="w-6 h-6 text-pink-500" />
              Vídeo Exclusivo
            </h3>

            <div
              id="vid_683e26e558c3f17ae88f6614"
              style={{
                position: "relative",
                width: "100%",
                padding: "56.25% 0 0",
                borderRadius: "16px",
                overflow: "hidden",
              }}
            >
              {!videoLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-2xl">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-3"></div>
                    <p className="text-gray-600 text-sm">Carregando vídeo...</p>
                  </div>
                </div>
              )}

              <img
                id="thumb_683e26e558c3f17ae88f6614"
                src="https://images.converteai.net/6f77653e-f9e8-4faa-95e2-321f656df389/players/683e26e558c3f17ae88f6614/thumbnail.jpg"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  borderRadius: "16px",
                }}
                alt="Vídeo exclusivo Himalaya Burn"
              />
              <div
                id="backdrop_683e26e558c3f17ae88f6614"
                style={{
                  WebkitBackdropFilter: "blur(5px)",
                  backdropFilter: "blur(5px)",
                  position: "absolute",
                  top: 0,
                  height: "100%",
                  width: "100%",
                  borderRadius: "16px",
                }}
              ></div>
            </div>

            <p className="text-center text-sm text-gray-600 mt-3">
              Assista ao vídeo exclusivo e descubra mais sobre o Himalaya Burn
            </p>
          </div>
        </div>

        {/* Grid de Produtos */}
        <ProductGrid />

        {/* Conteúdo gerado pela IA */}
        <div className="p-8 bg-gradient-to-br from-pink-50 to-purple-50 print:break-inside-avoid rounded-3xl relative overflow-hidden border border-pink-200/30 shadow-lg">
          {/* Conteúdo com posicionamento relativo */}
          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
              <Dumbbell className="w-6 h-6 text-pink-500" />
              Seu Treino Personalizado
            </h2>

            <div className="prose prose-lg max-w-none relative">
              {processarTexto(texto)}

              {/* Overlay com blur por cima do texto - só mostra quando bloqueado */}
              {conteudoBloqueado && (
                <>
                  <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                      WebkitBackdropFilter: "blur(8px)",
                      backdropFilter: "blur(8px)",
                      background: "rgba(255, 255, 255, 0.1)",
                    }}
                  ></div>

                  {/* Mensagem de bloqueio */}
                  <div className="absolute inset-0 flex items-center justify-center z-20">
                    <div className="bg-white/90 backdrop-blur-md rounded-2xl p-8 text-center shadow-2xl border border-pink-200 max-w-md mx-4">
                      <div className="w-16 h-16 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Dumbbell className="w-8 h-8 text-white" />
                      </div>

                      <h3 className="text-xl font-bold text-gray-800 mb-3">
                        Conteúdo Bloqueado
                      </h3>

                      <p className="text-gray-600 mb-6 leading-relaxed">
                        Para acessar sua dieta e treino personalizados,
                        <span className="text-pink-500 font-semibold">
                          {" "}
                          adquira o plano completo
                        </span>
                        e desbloqueie todo o conteúdo exclusivo!
                      </p>

                      <button
                        onClick={desbloquearConteudo}
                        className="feminine-button px-8 py-3 text-lg w-full"
                      >
                        <Sparkles className="w-5 h-5 mr-2" />
                        COMPRAR PARA DESBLOQUEAR
                      </button>

                      <p className="text-xs text-gray-500 mt-4">
                        ✨ Acesso vitalício • Suporte personalizado • Resultados
                        garantidos
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 p-8 bg-gradient-to-r from-pink-400 via-purple-400 to-pink-500 text-white rounded-3xl print:break-inside-avoid">
          <div className="flex items-center justify-center space-x-4 mb-4">
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Dumbbell className="w-4 h-4 text-white" />
            </div>
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Apple className="w-4 h-4 text-white" />
            </div>
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
          </div>
          <p className="text-lg font-semibold">
            Transforme seus objetivos em realidade com Himalaya Burn! 💪✨
          </p>
          <p className="text-sm opacity-90 mt-2">
            Este treino foi personalizado especialmente para você usando
            inteligência artificial
          </p>
        </div>
      </div>

      {/* Modal de Histórico Completo */}
      {showHistoricoModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
            <div className="bg-gradient-to-r from-pink-400 to-purple-500 p-6 text-white">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold flex items-center gap-3">
                  <History className="w-6 h-6" />
                  Histórico Completo de Treinos
                </h2>
                <button
                  onClick={() => setShowHistoricoModal(false)}
                  className="text-white hover:text-pink-200 transition-colors"
                >
                  ✕
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[60vh]">
              {treinosSalvos.length === 0 ? (
                <div className="text-center py-8">
                  <History className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Nenhum treino salvo ainda</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {treinosSalvos.map((treino, index) => (
                    <div
                      key={treino.id}
                      className={`border rounded-2xl p-4 transition-all hover:shadow-md ${
                        index === treinoAtualIndex
                          ? "border-pink-400 bg-pink-50"
                          : "border-gray-200 hover:border-pink-200"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-pink-400"></div>
                          <span className="font-semibold text-gray-800">
                            {treino.dados.nome} - {treino.dados.objetivo}
                          </span>
                          {index === treinoAtualIndex && (
                            <span className="text-xs bg-pink-500 text-white px-2 py-1 rounded-full">
                              Atual
                            </span>
                          )}
                        </div>
                        <span className="text-xs text-gray-500">
                          {formatarData(treino.timestamp)}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-sm text-gray-600 mb-3">
                        <span>
                          <strong>Idade:</strong> {treino.dados.idade} anos
                        </span>
                        <span>
                          <strong>Peso:</strong> {treino.dados.peso} kg
                        </span>
                        <span>
                          <strong>Altura:</strong> {treino.dados.altura} m
                        </span>
                        <span>
                          <strong>Sexo:</strong> {treino.dados.sexo}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => {
                            selecionarTreino(index);
                            setShowHistoricoModal(false);
                          }}
                          className="feminine-button px-4 py-2 text-sm"
                        >
                          Visualizar
                        </button>
                        <button
                          onClick={() => deletarTreino(treino.id)}
                          className="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                        >
                          Deletar
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-gray-50 p-4 border-t flex justify-between items-center">
              <span className="text-sm text-gray-600">
                Total: {treinosSalvos.length} treino
                {treinosSalvos.length !== 1 ? "s" : ""}
              </span>
              <button
                onClick={limparHistorico}
                className="px-4 py-2 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
              >
                Limpar Tudo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Response;
