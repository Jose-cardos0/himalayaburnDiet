import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import {
  User,
  Target,
  Apple,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Loader,
} from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
// import FloatingGift from "../components/FloatingGift";

const API_KEY = "AIzaSyD2DGLj6TrFyuU7rsigVe4UCIGmcKkzw-g";
const genAI = new GoogleGenerativeAI(API_KEY);

const Form: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [frequencia, setFrequencia] = useState("");
  const [objetivo, setObjetivo] = useState("");
  const [sexo, setSexo] = useState("");
  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [loading, setLoading] = useState(false);
  const [problemSaude, setProblemSaude] = useState(
    "Não tenho nenhum problema de saúde"
  );
  const [alimentos, setAlimentos] = useState("");
  const [checkedSim, setCheckedSim] = useState(false);
  const [checkedNao, setCheckedNao] = useState(true);
  const [alergicos, setAlergicos] = useState("");

  // Estados para áreas do corpo
  const [areasCorpo, setAreasCorpo] = useState({
    A: false, // Abdomen
    B: false, // Culotes
    C: false, // Braços
    D: false, // Quadris
    E: false, // Pernas
    F: false, // Outras áreas
    G: false, // Nenhuma
    H: false, // Todo o corpo
  });
  const [outrasAreas, setOutrasAreas] = useState("");

  const handleAreaChange = (area: string) => {
    setAreasCorpo((prev) => {
      const newState = { ...prev };

      // Se selecionar "Todo o corpo" ou "Nenhuma", desmarca as outras
      if (area === "G" || area === "H") {
        Object.keys(newState).forEach((key) => {
          if (key !== area) {
            newState[key as keyof typeof newState] = false;
          }
        });
        newState[area as keyof typeof newState] = true;
      } else {
        // Se selecionar outras áreas, desmarca "Todo o corpo" e "Nenhuma"
        newState.G = false;
        newState.H = false;
        newState[area as keyof typeof newState] =
          !newState[area as keyof typeof newState];
      }

      return newState;
    });
  };

  const nextStep = () => {
    // Validar campos obrigatórios antes de avançar
    if (currentStep === 1) {
      if (
        !nome.trim() ||
        !idade.trim() ||
        !peso.trim() ||
        !altura.trim() ||
        !sexo ||
        !frequencia ||
        !objetivo
      ) {
        alert(
          "Por favor, preencha todos os campos obrigatórios antes de continuar."
        );
        return;
      }
    } else if (currentStep === 2) {
      if (!alimentos.trim()) {
        alert(
          "Por favor, informe quais alimentos você quer incluir em sua dieta."
        );
        return;
      }
    }

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      // Validar campos obrigatórios
      const camposObrigatorios = [
        nome,
        idade,
        peso,
        altura,
        sexo,
        frequencia,
        objetivo,
        alimentos,
      ];

      const camposVazios = camposObrigatorios.filter(
        (campo) => !campo || campo.trim() === ""
      );

      if (camposVazios.length > 0) {
        const camposFaltando = [
          !nome ? "Nome" : "",
          !idade ? "Idade" : "",
          !peso ? "Peso" : "",
          !altura ? "Altura" : "",
          !sexo ? "Sexo" : "",
          !frequencia ? "Frequência de treino" : "",
          !objetivo ? "Objetivo" : "",
          !alimentos ? "Alimentos incluídos" : "",
        ].filter(Boolean);

        alert(
          `Por favor, preencha os seguintes campos obrigatórios:\n${camposFaltando.join(
            "\n"
          )}`
        );
        return;
      }

      // Construir string das áreas selecionadas
      const areasSelecionadas = Object.entries(areasCorpo)
        .filter(([key, value]) => value)
        .map(([key, value]) => {
          const areaNames = {
            A: "Abdomen",
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
        .join(", ");

      const mensagem = `MONTE UM TREINO PARA UM ${sexo} de ${peso} com ${altura} e idade ${idade} anos.
        Ele frequenta a academia ${frequencia} e tem o foco de ${objetivo}. 
        Monte um treino detalhado com as quantidades de repetição e progressão de carga adequada semanalmente. 
        Lembre-se que se o ${sexo} for feminino o treino deve ser focado em inferiores.
        Aproveite e monte uma dieta baseada no calculo IMC ${altura}, ${peso} e ${objetivo}. 
        Coloque os alimentos ${alimentos} no plano da dieta, remova os alimentos ${alergicos}. 
        Lembre-se, eu tenho um problema de saúde que é ${problemSaude}, monte o treino e a dieta de acordo com minhas necessidades e restrições. 
        A dieta deve ser detalhada kcal por refeição, quantidade de proteina, carboidrados e gordura por refeição. 
        O usuário deseja perder gordura nas seguintes áreas do corpo: ${areasSelecionadas}${
        outrasAreas ? `, especificamente: ${outrasAreas}` : ""
      }.`;

      setLoading(true);

      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(mensagem);
      const response = await result.response;
      const texto = await response.text();

      // Criar objeto com dados do usuário e resposta da IA
      const dadosUsuario = {
        nome,
        idade,
        peso,
        altura,
        sexo,
        frequencia,
        objetivo,
        problemSaude,
        alimentos,
        alergicos,
        areasCorpo,
        outrasAreas,
      };

      // Salvar no localStorage com timestamp
      const treinoSalvo = {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        texto: texto,
        dados: dadosUsuario,
      };

      // Obter treinos existentes do localStorage
      const treinosExistentes = JSON.parse(localStorage.getItem("ozemfire_treinos") || "[]");
      
      // Adicionar novo treino ao início da lista
      treinosExistentes.unshift(treinoSalvo);
      
      // Manter apenas os últimos 10 treinos para não sobrecarregar o localStorage
      if (treinosExistentes.length > 10) {
        treinosExistentes.splice(10);
      }
      
      // Salvar no localStorage
      localStorage.setItem("ozemfire_treinos", JSON.stringify(treinosExistentes));

      // Codificar o texto para passar via URL
      const encodedText = encodeURIComponent(texto);
      const encodedData = encodeURIComponent(
        JSON.stringify(dadosUsuario)
      );

      // Verificar se a URL não está muito longa
      const urlCompleta = `/response?texto=${encodedText}&dados=${encodedData}`;

      if (urlCompleta.length > 2000) {
        // Armazenar dados no localStorage como fallback
        localStorage.setItem(
          "ozemfire_dados",
          JSON.stringify({
            texto,
            dados: dadosUsuario,
          })
        );

        // Redirecionar para página de resultado sem parâmetros
        navigate("/response");
        return;
      }

      // Redirecionar para a página de resultado
      navigate(urlCompleta);
    } catch (error) {
      console.error("Erro detalhado ao gerar conteúdo:", error);
      alert(
        `Ocorreu um erro ao gerar seu treino: ${
          error instanceof Error ? error.message : "Erro desconhecido"
        }`
      );
    } finally {
      setLoading(false);
    }
  };

  // Função para verificar se o passo atual está válido
  const isStepValid = (step: number) => {
    if (step === 1) {
      return (
        nome.trim() &&
        idade.trim() &&
        peso.trim() &&
        altura.trim() &&
        sexo &&
        frequencia &&
        objetivo
      );
    } else if (step === 2) {
      return alimentos.trim();
    }
    return true;
  };

  // Função para obter a classe do botão baseada na validação
  const getButtonClass = (step: number) => {
    const isValid = isStepValid(step);
    return `px-8 py-3 text-lg transition-all duration-300 ${
      isValid
        ? "feminine-button hover:scale-105"
        : "bg-gray-300 text-gray-500 cursor-not-allowed opacity-60"
    }`;
  };

  // Função para obter a classe do input baseada na validação
  const getInputClass = (value: string, isRequired: boolean = true) => {
    if (!isRequired) return "feminine-input";

    if (value.trim() === "") {
      return "feminine-input border-red-300 focus:border-red-500";
    }
    return "feminine-input border-green-300 focus:border-green-500";
  };

  // Função para obter a classe do select baseada na validação
  const getSelectClass = (value: string) => {
    if (value === "") {
      return "feminine-select border-red-300 focus:border-red-500";
    }
    return "feminine-select border-green-300 focus:border-green-500";
  };

  // Função para obter a classe do textarea baseada na validação
  const getTextareaClass = (value: string, isRequired: boolean = true) => {
    if (!isRequired) return "feminine-textarea";

    if (value.trim() === "") {
      return "feminine-textarea border-red-300 focus:border-red-500";
    }
    return "feminine-textarea border-green-300 focus:border-green-500";
  };

  return (
    <main className="min-h-screen bg-feminine-gradient py-8">
      {/* Botão flutuante do presente */}
      {/* <FloatingGift /> */}

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-400 via-purple-400 to-pink-500 bg-clip-text text-transparent mb-4">
            Crie Seu Treino Personalizado
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Preencha as informações abaixo e nossa IA criará um plano de treino
            e dieta
            <span className="text-pink-500 font-medium">
              {" "}
              feito especialmente para você
            </span>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto">
          {/* Indicador de Progresso */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-medium text-gray-600">
                Etapa {currentStep} de 3
              </span>
              <span className="text-sm font-medium text-gray-600">
                {Math.round((currentStep / 3) * 100)}% completo
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-pink-400 to-purple-500 h-2 rounded-full transition-all duration-500 ease-in-out"
                style={{ width: `${(currentStep / 3) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Legenda dos campos obrigatórios */}
          <div className="mb-6 text-center">
            <p className="text-sm text-gray-600">
              <span className="text-red-500 font-semibold">*</span> Campos
              obrigatórios
            </p>
          </div>

          {/* Passo 1: Informações básicas */}
          <div
            id="form1"
            className={`w-full h-auto ${
              currentStep === 1 ? "block" : "hidden"
            } space-y-6`}
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-feminine">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
                <User className="w-6 h-6 text-pink-500" />
                Informações Básicas
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome <span className="text-red-500">*</span>
                  </label>
                  <input
                    className={getInputClass(nome, true)}
                    required
                    type="text"
                    name="name"
                    placeholder="Seu nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Idade <span className="text-red-500">*</span>
                  </label>
                  <input
                    className={getInputClass(idade, true)}
                    required
                    type="number"
                    name="idade"
                    placeholder="Sua idade"
                    value={idade}
                    onChange={(e) => setIdade(e.target.value)}
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Peso (kg) <span className="text-red-500">*</span>
                  </label>
                  <input
                    className={getInputClass(peso, true)}
                    type="number"
                    required
                    name="peso"
                    placeholder="Seu peso"
                    value={peso}
                    onChange={(e) => setPeso(e.target.value)}
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Altura (m) <span className="text-red-500">*</span>
                  </label>
                  <input
                    className={getInputClass(altura, true)}
                    name="altura"
                    required
                    placeholder="Ex: 1.60"
                    value={altura}
                    onChange={(e) => setAltura(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sexo <span className="text-red-500">*</span>
                  </label>
                  <select
                    className={getSelectClass(sexo)}
                    name="sexo"
                    required
                    value={sexo}
                    onChange={(e) => setSexo(e.target.value)}
                  >
                    <option value="">Selecione seu sexo</option>
                    <option value="Masculino">Masculino</option>
                    <option value="Feminino">Feminino</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Frequência de treino <span className="text-red-500">*</span>
                  </label>
                  <select
                    className={getSelectClass(frequencia)}
                    name="frequencia"
                    required
                    value={frequencia}
                    onChange={(e) => setFrequencia(e.target.value)}
                  >
                    <option value="">Selecione a frequência</option>
                    <option value="não faço ne um exercício físico">
                      Não me exercito
                    </option>
                    <option value="7 dias">7 dias na semana</option>
                    <option value="5 dias">5 dias na semana</option>
                    <option value="3 dias">3 dias na semana</option>
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Objetivo <span className="text-red-500">*</span>
                  </label>
                  <select
                    className={getSelectClass(objetivo)}
                    name="objetivo"
                    required
                    value={objetivo}
                    onChange={(e) => setObjetivo(e.target.value)}
                  >
                    <option value="">Selecione seu objetivo</option>
                    <option value="Hipertrofia">Hipertrofia</option>
                    <option value="Perca de peso">Perda de peso</option>
                    <option value="Manutenção da saúde">
                      Manutenção da saúde
                    </option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex justify-center">
              <button
                type="button"
                onClick={nextStep}
                className={getButtonClass(1)}
                disabled={!isStepValid(1)}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Próximo <ArrowRight className="w-5 h-5" />
                </span>
              </button>
            </div>
          </div>

          {/* Passo 2: Informações adicionais */}
          <div
            id="form2"
            className={`w-full h-auto ${
              currentStep === 2 ? "block" : "hidden"
            } space-y-6`}
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-feminine">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
                <Apple className="w-6 h-6 text-pink-500" />
                Informações Adicionais
              </h3>

              <div className="mb-6">
                <p className="text-sm font-medium text-gray-700 mb-4">
                  Você tem algum problema de saúde?
                </p>
                <div className="flex items-center justify-center gap-8">
                  <div className="flex items-center">
                    <input
                      onClick={() => {
                        const inputSaude =
                          document.getElementById("inputSaude");
                        inputSaude?.classList.remove("hidden");
                      }}
                      id="sim"
                      type="checkbox"
                      name="checkbox"
                      checked={checkedSim}
                      onChange={() => {
                        setCheckedSim(true);
                        setCheckedNao(false);
                      }}
                      className="feminine-checkbox"
                    />
                    <label className="text-gray-700 text-sm ml-3 font-medium">
                      Sim
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      onClick={() => {
                        const inputSaude =
                          document.getElementById("inputSaude");
                        inputSaude?.classList.add("hidden");
                      }}
                      id="nao"
                      type="checkbox"
                      name="checkbox"
                      checked={checkedNao}
                      onChange={() => {
                        setCheckedSim(false);
                        setCheckedNao(true);
                      }}
                      className="feminine-checkbox"
                    />
                    <label className="text-gray-700 text-sm ml-3 font-medium">
                      Não
                    </label>
                  </div>
                </div>
              </div>

              <div
                id="inputSaude"
                className={`mb-6 ${checkedSim ? "block" : "hidden"}`}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Descreva seu problema de saúde
                </label>
                <textarea
                  className="feminine-textarea"
                  value={problemSaude}
                  onChange={(e) => setProblemSaude(e.target.value)}
                  placeholder="Descreva seu problema de saúde..."
                ></textarea>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quais alimentos você quer incluir em sua dieta?{" "}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  className={getTextareaClass(alimentos, true)}
                  value={alimentos}
                  onChange={(e) => setAlimentos(e.target.value)}
                  placeholder="Ex: frutas, verduras, carnes magras..."
                ></textarea>
              </div>

              <div className="mb-8">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quais alimentos você não deseja incluir?
                </label>
                <textarea
                  className="feminine-textarea"
                  value={alergicos}
                  onChange={(e) => setAlergicos(e.target.value)}
                  placeholder="Ex: glúten, lactose, frutos do mar..."
                ></textarea>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button
                type="button"
                onClick={prevStep}
                className="feminine-button px-8 py-3 text-lg"
              >
                <span className="relative z-10">Anterior</span>
              </button>
              <button
                type="button"
                onClick={nextStep}
                className={getButtonClass(2)}
                disabled={!isStepValid(2)}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Próximo <ArrowRight className="w-5 h-5" />
                </span>
              </button>
            </div>
          </div>

          {/* Passo 3: Áreas do corpo */}
          <div
            id="form3"
            className={`w-full h-auto ${
              currentStep === 3 ? "block" : "hidden"
            } space-y-6`}
          >
            <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 shadow-feminine">
              <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center flex items-center justify-center gap-2">
                <Target className="w-6 h-6 text-pink-500" />
                Áreas do Corpo para Perda de Gordura
              </h3>

              <div className="mb-6">
                <p className="text-sm text-gray-600 mb-4 text-center">
                  Selecione as áreas onde você deseja perder gordura:
                </p>

                <div className="flex justify-center mb-6">
                  <img
                    src="/body.webp"
                    alt="Áreas do corpo"
                    width={150}
                    height={150}
                    className="rounded-lg shadow-lg"
                  />
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={areasCorpo.A}
                      onChange={() => handleAreaChange("A")}
                      className="feminine-checkbox"
                    />
                    <span className="text-sm text-gray-700">A - Abdômen</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={areasCorpo.B}
                      onChange={() => handleAreaChange("B")}
                      className="feminine-checkbox"
                    />
                    <span className="text-sm text-gray-700">B - Culotes</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={areasCorpo.C}
                      onChange={() => handleAreaChange("C")}
                      className="feminine-checkbox"
                    />
                    <span className="text-sm text-gray-700">C - Braços</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={areasCorpo.D}
                      onChange={() => handleAreaChange("D")}
                      className="feminine-checkbox"
                    />
                    <span className="text-sm text-gray-700">D - Quadris</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={areasCorpo.E}
                      onChange={() => handleAreaChange("E")}
                      className="feminine-checkbox"
                    />
                    <span className="text-sm text-gray-700">E - Pernas</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={areasCorpo.F}
                      onChange={() => handleAreaChange("F")}
                      className="feminine-checkbox"
                    />
                    <span className="text-sm text-gray-700">
                      F - Outras áreas
                    </span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={areasCorpo.G}
                      onChange={() => handleAreaChange("G")}
                      className="feminine-checkbox"
                    />
                    <span className="text-sm text-gray-700">G - Nenhuma</span>
                  </label>

                  <label className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={areasCorpo.H}
                      onChange={() => handleAreaChange("H")}
                      className="feminine-checkbox"
                    />
                    <span className="text-sm text-gray-700">
                      H - Todo o corpo
                    </span>
                  </label>
                </div>

                {areasCorpo.F && (
                  <div className="mt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Qual seria a área específica do seu corpo?
                    </label>
                    <textarea
                      className="feminine-textarea"
                      value={outrasAreas}
                      onChange={(e) => setOutrasAreas(e.target.value)}
                      placeholder="Descreva as áreas específicas..."
                    ></textarea>
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button
                type="button"
                onClick={prevStep}
                className="feminine-button px-8 py-3 text-lg"
              >
                <span className="relative z-10">Anterior</span>
              </button>
              <button
                type="submit"
                disabled={loading}
                className="feminine-button px-8 py-3 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {loading ? (
                    <>
                      Gerando!
                      <Loader className="w-5 h-5 animate-spin" />
                    </>
                  ) : (
                    <>
                      Gerar <Sparkles className="w-5 h-5" />
                    </>
                  )}
                </span>
              </button>
            </div>
          </div>
        </form>

        <div className="text-center mt-8 max-w-2xl mx-auto">
          <p className="text-sm text-gray-500 font-light leading-relaxed flex items-center justify-center gap-2">
            <AlertTriangle className="w-4 h-4 text-orange-500" />
            <span>
              <strong>Atenção:</strong> Procure um profissional credenciado.
              Lembre-se que este app retorna informações geradas por uma IA e
              deve ser usado como orientação complementar.
            </span>
          </p>
        </div>
      </div>
    </main>
  );
};

export default Form;
