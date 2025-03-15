# 🎤 Sistema de Karaokê - API NestJS
## Feature-Based Modular Architecture in NestJS

📌 API desenvolvida em **NestJS** para gerenciar participantes em um **Sistema de Karaokê**, permitindo que os usuários se cadastrem, escolham músicas e acumulem pontos.

---
## 🚀 Recursos

[x] Cadastro de participantes com **restrição de tempo entre candidaturas**  
[x] Registro de **pontuação automática** ao cantar ou desistir  
[x] Listagem dos **participantes do dia**  
[x] Atualização de status dos participantes  
---

## 📌 Configuração do Projeto

Clone este repositório e instale as dependências:

```bash
git clone https://github.com/seu-repositorio/karaoke-api.git
cd karaoke-api
npm install
```

---

## 📌 Configuração do Banco de Dados
Este projeto usa **MongoDB Atlas**. Crie um banco gratuito [aqui](https://www.mongodb.com/atlas/database).

Crie um arquivo `.env` na raiz do projeto e adicione:

```env
MONGO_URI=mongodb+srv://seu-usuario:senha@cluster.mongodb.net/karaoke
PORT=3000
```

---

## 📌 Rodando a API
Execute a API localmente:

```bash
# Modo desenvolvimento
npm run start

# Modo hot-reload
npm run start:dev

# Modo produção
npm run start:prod
```

A API estará disponível em **http://localhost:3000**.

---

## 📌 Testando a API
### **1️⃣ Criar um novo participante**
```bash
curl -X POST http://localhost:3000/participants \
-H "Content-Type: application/json" \
-d '{"phone": "123456789", "name": "Alice", "song": "Song A", "band": "Band A"}'
```

### **2️⃣ Atualizar status**
```bash
curl -X PATCH http://localhost:3000/participants/123456789/status \
-H "Content-Type: application/json" \
-d '{"status": "sang"}'
```

### **3️⃣ Listar participantes do dia**
```bash
curl -X GET http://localhost:3000/participants/today
```

---

## 📌 Testes
```bash
# Testes unitários
npm run test

# Testes e2e
npm run test:e2e

# Cobertura de testes
npm run test:cov
```

---

## 📌 Licença
Este projeto é **open-source** e licenciado sob a [MIT License](https://opensource.org/licenses/MIT).

---

## Estrutura do Projeto

```
src/
├── participants/
│   ├── enums/                        Define constantes e tipos (ex: MusicStatus)
│   │   ├── music-status.enum.ts
│   ├── participant.controller.ts     Controla requisições HTTP
│   ├── participant.module.ts         Define o módulo do participante
│   ├── participant.repository.ts     Acesso ao banco de dados (MongoDB)
│   ├── participant.schema.ts         Modelo do MongoDB
│   ├── participant.service.ts        Regras de negócio (pontuação, restrições)
├── app.module.ts
├── main.ts
```
