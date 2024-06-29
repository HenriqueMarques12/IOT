
IoT App
Este é um aplicativo IoT desenvolvido com React e TypeScript utilizando Vite.

Pré-requisitos
Node.js (versão 14 ou superior)
npm (versão 6 ou superior)
Instalação
Siga os passos abaixo para configurar e executar o projeto na sua máquina local.

1. Clone o Repositório
bash
Copiar código
git clone https://github.com/HenriqueMarques12/IOT
cd iot-app

2. Instale as Dependências
npm install

3. Configuração de Variáveis de Ambiente
Crie um arquivo .env na raiz do projeto e adicione as variáveis de ambiente necessárias. Por exemplo:

VITE_API_TOKEN="a5de6173a66f5ff49f63118746fd8860"

OBS: use o Token de Autenticação que foi disponibilizado na https://www.football-data.org/

Desenvolvimento
Para iniciar o servidor de desenvolvimento e visualizar o aplicativo no navegador, execute:

npm run dev

O servidor de desenvolvimento iniciará e você poderá acessar a aplicação em http://localhost:5173.

Build
Para construir a aplicação para produção, execute:

npm run build

Os arquivos estáticos prontos para deploy serão gerados na pasta dist.

Deploy
Para servir os arquivos estáticos gerados na pasta dist, você pode usar um servidor HTTP simples como serve:

Instale o serve globalmente (se ainda não tiver):

npm install -g serve
Sirva os arquivos estáticos:

serve -s dist

Estrutura do Projeto
Abaixo está uma visão geral da estrutura de diretórios do projeto:

/iot-app
├── /node_modules
├── /public
│   ├── favicon.ico
│   └── index.html
├── /src
│   ├── /components
│   ├── /hooks
│   ├── /mocks
│   ├── /pages
│   ├── /types
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── .eslintrc.js
├── .prettierrc
├── .env
├── index.html
├── package.json
├── tsconfig.json
└── vite.config.ts

Suporte
Se você encontrar algum problema ou tiver dúvidas, sinta-se à vontade para abrir uma issue no repositório.

Este arquivo `README.md` fornece todas as informações necessárias para configurar o ambiente, construir e executar a aplicação IoT, além de incluir instruções para garantir a qualidade do código e executar testes.