# 🎤 Sistema de Karaokê - API NestJS

📌 API desenvolvida em **NestJS** para gerenciar participantes em um **Sistema de Karaokê**, permitindo que os usuários se cadastrem, escolham músicas e acumulem pontos.

---
## 🚀 Recursos
✅ Cadastro de participantes com **restrição de tempo entre candidaturas**  
✅ Registro de **pontuação automática** ao cantar ou desistir  
✅ Listagem dos **participantes do dia**  
✅ Atualização de status dos participantes  
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
