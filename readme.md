# FAQ AI Assistant

Este é um projeto de assistente virtual baseado em IA que responde perguntas sobre uma empresa utilizando uma base de conhecimento (FAQ) pré-definida.

## Funcionalidades

- Responde perguntas sobre a empresa usando IA
- Utiliza embeddings para busca semântica
- Armazena vetores no Redis para consultas rápidas
- Usa o modelo Gemma2 via Ollama para geração de respostas
- Busca respostas similares baseadas no contexto

## Tecnologias Utilizadas

- Node.js
- TypeScript
- LangChain
- Redis Vector Store
- Ollama (Gemma2 model)
- Nomic Embed Text (para embeddings)

## Pré-requisitos e Instalação

### 1. Instalando Node.js
1. Instale o NVM (Node Version Manager):
   - Linux/macOS: `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash`
   - Windows: Baixe o [nvm-windows](https://github.com/coreybutler/nvm-windows/releases)
2. Reinicie seu terminal
3. Instale a versão do Node.js especificada no projeto:
   ```bash
   nvm install 22.13.0
   nvm use 22.13.0
   ```
4. Verifique a instalação:

### 2. Instalando Ollama

1. Instale o Ollama de acordo com seu sistema operacional:

   - macOS:
     ```bash
     curl -fsSL https://ollama.com/install.sh | sh
     ```

   - Linux:
     ```bash
     curl -fsSL https://ollama.com/install.sh | sh
     ```

   - Windows:
     - Baixe o instalador em: https://ollama.com/download/windows
     - Execute o instalador e siga as instruções

2. Verifique a instalação:
   ```bash
   ollama --version
   ```

3. Baixe os modelos necessários:
   ```bash
   ollama pull gemma:2b
   ollama pull nomic-embed-text
   ```

4. O Ollama estará disponível em http://localhost:11434


### 3. Instalando Redis

1. Certifique-se que você tem o Docker instalado em seu sistema. Se não tiver, [instale o Docker](https://docs.docker.com/get-docker/) primeiro.

2. Execute o Redis usando Docker:
   ```bash
   docker run --name redis-vector -p 6379:6379 -d redis/redis-stack-server:latest
   ```

3. Verifique se o container está rodando:
   ```bash
   docker ps
   ```

4. O Redis estará disponível em localhost na porta 6379

5. Para parar o container:
   ```bash
   docker stop redis-vector
   ```

6. Para iniciar novamente:
   ```bash
   docker start redis-vector
   ```

### 4. Iniciando o Projeto

1. Clone o repositório e acesse a pasta do projeto:
   ```bash
   git clone https://github.com/viisouza10/ai-4-devs.git
   cd ai-4-devs
   ```

2. Instale a versão correta do Node.js usando o nvm:
   ```bash
   nvm install
   nvm use
   ```

3. Instale as dependências do projeto:
   ```bash
   npm install
   ```

4. Certifique-se que o Redis e o Ollama estão rodando:
   ```bash
   # Verifique se o Redis está rodando
   docker ps
   
   # Se não estiver, inicie com
   docker start redis-vector
   
   # Verifique se o Ollama está rodando acessando
   http://localhost:11434
   ```

5. Execute os scripts do projeto:
   ```bash
   # Para indexar os dados do FAQ
   npx tsx src/ingest.ts
   
   # Para realizar buscas
   npx tsx src/search.ts
   
   # Para fazer perguntas, forneça a pergunta como argumento
   npx tsx src/ask.ts "sua pergunta aqui"
   ```

Os serviços estarão disponíveis em:
- Ollama: http://localhost:11434
- Redis: localhost:6379

