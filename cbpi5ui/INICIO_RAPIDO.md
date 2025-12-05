# 🚀 Início Rápido - CraftBeerPi 5 UI

Guia rápido para começar a desenvolver no CraftBeerPi 5 UI.

## ⚡ Comandos Essenciais

### Windows (PowerShell) - Node.js 17+
 
```powershell
# 1. Instalar dependências
npm install

# 2. Iniciar servidor de desenvolvimento
npm run start:win
# OU
.\scripts\start.ps1

# 3. Fazer build de produção
npm run build:win
# OU
.\scripts\build.ps1
```

### Linux/Mac - Node.js 17+

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar servidor de desenvolvimento
npm run start:unix
# OU
bash ./scripts/start.sh

# 3. Fazer build de produção
npm run build:unix
# OU
bash ./scripts/build.sh
```

### Node.js 14-16 (Versões Antigas)

```bash
# Funciona normalmente sem scripts especiais
npm start
npm run build
```

## 🌐 Acesso

Após iniciar o servidor:
- **Desenvolvimento:** http://localhost:3000
- **Backend API:** http://localhost:8000 (deve estar rodando)

## 📚 Documentação Completa

- [Guia Completo de Execução e Build](./src/docs/GUIA_EXECUCAO_BUILD.md)
- [Changelog V4 para V5](./src/docs/CHANGELOG_V4_TO_V5.md)
- [Como Adicionar Páginas](./src/docs/ADICIONAR_PAGINAS.md)

## ⚠️ Problemas Comuns

### Erro: `error:0308010C:digital envelope routines::unsupported`

**Solução:** Use os scripts específicos do seu sistema:
- Windows: `npm run start:win`
- Linux/Mac: `npm run start:unix`

### Erro: Conflito de dependências no `npm install`

**Solução:** O projeto já está configurado com `.npmrc`. Se ainda tiver problemas:
```bash
npm install --legacy-peer-deps
```

---

**Versão:** CraftBeerPi 5.0  
**Última atualização:** 2024

