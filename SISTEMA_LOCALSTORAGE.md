# Sistema de LocalStorage - Himalaya Burn

## Visão Geral

O projeto Himalaya Burn agora possui um sistema completo de armazenamento local que salva automaticamente todas as respostas da Gemini AI no localStorage do navegador. Isso permite que os usuários acessem seu histórico de treinos personalizados mesmo após fechar e reabrir o navegador.

## Funcionalidades Implementadas

### 1. Salvamento Automático
- **Quando**: Toda vez que um novo treino é gerado pela Gemini AI
- **Onde**: localStorage com chave `ozemfire_treinos`
- **O que é salvo**:
  - ID único do treino (timestamp)
  - Data e hora de geração
  - Resposta completa da IA
  - Todos os dados do usuário (nome, idade, peso, altura, etc.)

### 2. Histórico de Treinos
- **Navegação**: Botões de anterior/próximo para navegar entre treinos
- **Seletor**: Interface visual mostrando qual treino está sendo exibido
- **Modal completo**: Visualização detalhada de todos os treinos salvos

### 3. Gerenciamento de Dados
- **Limite**: Máximo de 10 treinos salvos (para não sobrecarregar o localStorage)
- **Deleção individual**: Possibilidade de deletar treinos específicos
- **Limpeza total**: Botão para limpar todo o histórico

## Estrutura dos Dados Salvos

```json
{
  "ozemfire_treinos": [
    {
      "id": "1703123456789",
      "timestamp": "2023-12-21T10:30:45.123Z",
      "texto": "Resposta completa da Gemini AI...",
      "dados": {
        "nome": "João Silva",
        "idade": "25",
        "peso": "70",
        "altura": "1.75",
        "sexo": "Masculino",
        "frequencia": "3 dias",
        "objetivo": "Hipertrofia",
        "problemSaude": "Nenhum",
        "alimentos": "Frango, arroz, batata",
        "alergicos": "Lactose",
        "areasCorpo": {
          "A": true,
          "B": false,
          "C": true,
          "D": false,
          "E": false,
          "F": false,
          "G": false,
          "H": false
        },
        "outrasAreas": ""
      }
    }
  ]
}
```

## Interface do Usuário

### Header Principal
- Indicador visual mostrando quantos treinos estão salvos
- Link para acessar o histórico completo

### Seletor de Histórico (quando há múltiplos treinos)
- Navegação entre treinos com botões anterior/próximo
- Contador mostrando posição atual (ex: "2 de 5")
- Data de geração do treino atual
- Botão para limpar todo o histórico

### Modal de Histórico Completo
- Lista detalhada de todos os treinos salvos
- Informações resumidas de cada treino
- Botões para visualizar ou deletar treinos individuais
- Contador total de treinos
- Botão para limpar todo o histórico

## Benefícios

1. **Persistência**: Treinos não são perdidos ao fechar o navegador
2. **Histórico**: Acesso a versões anteriores de treinos
3. **Comparação**: Possibilidade de comparar diferentes treinos gerados
4. **Backup**: Segurança adicional caso haja problemas com a API
5. **Experiência**: Interface mais rica e funcional para o usuário

## Considerações Técnicas

- **Compatibilidade**: Funciona em todos os navegadores modernos
- **Performance**: Limite de 10 treinos para não sobrecarregar o localStorage
- **Segurança**: Dados ficam apenas no dispositivo do usuário
- **Responsividade**: Interface adaptada para mobile e desktop

## Como Usar

1. **Gerar treino**: Preencher formulário e clicar em "Gerar"
2. **Visualizar histórico**: Clicar em "Ver histórico" no header
3. **Navegar entre treinos**: Usar botões anterior/próximo
4. **Deletar treino**: Usar botão "Deletar" no modal de histórico
5. **Limpar tudo**: Usar botão "Limpar Tudo" para remover todo o histórico

## Manutenção

O sistema é totalmente automático e não requer manutenção manual. Os dados são gerenciados automaticamente pelo navegador e podem ser limpos pelo usuário através da interface.
