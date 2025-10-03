# 🗺️ KcalMap - Seu Mapa Diário de Calorias

Uma aplicação web moderna para monitoramento de calorias, desenvolvida com Django e React, com foco em uma experiência de usuário ágil, gamificada e totalmente responsiva.

![Mockup do App](https://storage.googleapis.com/gemini-prod-us-central1-xl-assets/72bbdc99_KcalApp_Light_Theme.png)

## 📜 Sobre o Projeto

KcalMap nasceu da ideia de simplificar o processo de contagem de calorias. Em vez de formulários complexos e múltiplas telas, a aplicação se concentra em uma interface de timeline intuitiva, onde o usuário pode registrar e visualizar suas refeições de forma cronológica e fluida. A arquitetura foi pensada para ser escalável e performática, separando o backend (API RESTful) do frontend (Single-Page Application).

Este projeto foi desenvolvido como parte de um processo de aprendizado e mentoria, explorando as melhores práticas de arquitetura tanto no Django (camada de serviços, serializers otimizados) quanto no React (hooks, contextos, design responsivo).

## ✨ Principais Funcionalidades

* **Autenticação Segura:** Sistema completo de registro e login com tokens JWT (`simple-jwt`).
* **Perfil de Usuário:** Configuração de dados essenciais como peso, altura, idade e metas de calorias.
* **Dashboard em Timeline:** Visualização cronológica de todas as refeições e alimentos consumidos durante o dia.
* **Registro Rápido de Alimentos:** Um modal de busca inteligente que prioriza alimentos frequentes/favoritos e permite a busca em uma base de dados global.
* **Edição "In-place":** Altere a quantidade ou remova um alimento diretamente na timeline, sem precisar navegar para outra tela.
* **Painel de Calorias em Tempo Real:** Um "widget" que atualiza instantaneamente o progresso de calorias do dia.
* **Design Responsivo (Mobile-First):** Interface projetada para funcionar perfeitamente em celulares, tablets e desktops.
* **Temas Light & Dark:** Suporte a temas claro e escuro para melhor conforto visual.

## 🛠️ Tecnologias Utilizadas

Este projeto foi construído utilizando um stack moderno e robusto:

#### **Backend**
* **Python 3.11+**
* **Django 5.0+**
* **Django Rest Framework (DRF):** Para a construção da API RESTful.
* **Simple JWT:** Para autenticação baseada em tokens.
* **SQLite 3:** Banco de dados padrão para desenvolvimento.

#### **Frontend**
* **React 18+**
* **React Router:** Para o gerenciamento de rotas.
* **React Context:** Para gerenciamento de estado global (autenticação, dados do usuário, etc.).
* **CSS Modules:** Para estilização componentizada e sem conflitos.

## 🚀 Começando

Siga estas instruções para configurar e rodar o projeto em seu ambiente de desenvolvimento local.

### Pré-requisitos

Antes de começar, garanta que você tenha as seguintes ferramentas instaladas:
* Python (versão 3.11 ou superior)
* Node.js e npm (versão 18 ou superior)
* Git

### Instalação e Configuração

1.  **Clone o repositório:**
    ```bash
    git clone https://github.com/ivannerilo/KcalMap.git
    cd KcalMap # Ou o nome da pasta do seu projeto
    ```

2.  **Configurando o Backend (Django):**
    ```bash
    # Navegue até a pasta do backend
    cd backend

    # Crie e ative um ambiente virtual
    python -m venv venv
    # No Windows:
    # venv\Scripts\activate
    # No macOS/Linux:
    # source venv/bin/activate

    # Instale as dependências do Python
    pip install -r requirements.txt

    # Aplique as migrações do banco de dados
    python manage.py migrate

    # (Opcional) Popule o banco com dados iniciais de alimentos
    python manage.py seed_foods

    # Inicie o servidor do backend
    python manage.py runserver
    ```
    🎉 O backend estará rodando em `http://localhost:8000`.

3.  **Configurando o Frontend (React):**
    Abra um **novo terminal**.
    ```bash
    # A partir da pasta raiz do projeto, navegue até a pasta do frontend
    cd frontend

    # Instale as dependências do Node.js
    npm install

    # Inicie o servidor de desenvolvimento do React
    npm start
    ```
    🎉 A aplicação estará acessível em `http://localhost:3000`.

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo `LICENSE` para mais detalhes.

## 👤 Contato

**Ivan Nerilo** - [https://www.linkedin.com/in/ivan-lopes-nerilo-ab3a18351/] - [ivannerilo05@gmail.com]

Link do Projeto: [https://github.com/ivannerilo/KcalMap](https://github.com/ivannerilo/KcalMap)
