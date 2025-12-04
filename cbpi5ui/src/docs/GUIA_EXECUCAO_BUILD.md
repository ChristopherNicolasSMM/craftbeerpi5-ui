# Guia de Execução e Build - CraftBeerPi 5 UI

Este guia explica como executar o projeto em modo de desenvolvimento e como fazer o build para produção.

**Última atualização:** 2024  
**Versão:** CraftBeerPi 5.0

---

## 📋 Índice

1. [Pré-requisitos](#pré-requisitos)
2. [Instalação Inicial](#instalação-inicial)
3. [Modo Desenvolvimento](#modo-desenvolvimento)
4. [Build para Produção](#build-para-produção)
5. [Instalação como Plugin Python](#instalação-como-plugin-python)
6. [Empacotamento](#empacotamento)
7. [Troubleshooting](#troubleshooting)
8. [Estrutura de Arquivos](#estrutura-de-arquivos)

---

## 🔧 Pré-requisitos

### Software Necessário

1. **Node.js** (versão 14 ou superior, testado até v22)
   - Download: https://nodejs.org/
   - Verificar instalação: `node --version`
   - Verificar npm: `npm --version`
   - **Nota:** Para Node.js 17+, use os scripts específicos do sistema (`start:win`/`start:unix`)

2. **Python** (versão 3.9 ou superior)
   - Necessário apenas para instalação como plugin
   - Verificar: `python --version` ou `python3 --version`

3. **Git** (opcional, para clonar repositório)
   - Download: https://git-scm.com/

### Verificar Instalações

```bash
# Verificar Node.js
node --version
# Deve mostrar algo como: v16.x.x ou v18.x.x

# Verificar npm
npm --version
# Deve mostrar algo como: 8.x.x ou 9.x.x

# Verificar Python (opcional)
python3 --version
# Deve mostrar: Python 3.9.x ou superior
```

---

## 📦 Instalação Inicial

### 1. Navegar até a Pasta do Projeto

```bash
cd craftbeerpi5-ui/cbpi5ui
```

### 2. Instalar Dependências

```bash
# Usando npm (recomendado)
npm install

# O projeto já está configurado com .npmrc para usar --legacy-peer-deps
# Se ainda tiver problemas, use explicitamente:
npm install --legacy-peer-deps

# OU usando yarn (se preferir)
yarn install
```

**Tempo estimado:** 5-10 minutos (dependendo da conexão)

**O que acontece:**
- Baixa todas as dependências do `package.json`
- Cria a pasta `node_modules/`
- Instala React, Material-UI, e outras bibliotecas

**Nota:** 
- A primeira instalação pode demorar. Instalações subsequentes são mais rápidas.
- O projeto usa `--legacy-peer-deps` devido a conflitos conhecidos entre Material-UI v4 e algumas dependências. Isso é normal e não afeta a funcionalidade.

---

## 🚀 Modo Desenvolvimento

### ⚠️ Importante: Node.js 17+

Se você está usando **Node.js 17 ou superior**, use os scripts específicos do seu sistema operacional para garantir compatibilidade:

- **Windows:** `npm run start:win` ou `.\scripts\start.ps1`
- **Linux/Mac:** `npm run start:unix` ou `bash ./scripts/start.sh`

### Executar o Servidor de Desenvolvimento

#### Opção 1: Usando arquivo .env (Recomendado)

O projeto inclui um arquivo `.env` que configura automaticamente `NODE_OPTIONS=--openssl-legacy-provider`.

```bash
# Na pasta cbpi5ui/
npm start
```

#### Opção 2: Scripts específicos do sistema

**Windows (PowerShell):**
```bash
npm run start:win
# OU
.\scripts\start.ps1
```

**Linux/Mac:**
```bash
npm run start:unix
# OU
bash ./scripts/start.sh
```

#### Opção 3: Manualmente (se as opções acima não funcionarem)

**Windows (PowerShell):**
```powershell
$env:NODE_OPTIONS="--openssl-legacy-provider"
npm start
```

**Linux/Mac:**
```bash
NODE_OPTIONS=--openssl-legacy-provider npm start
```

**O que acontece:**
- ✅ Compila o código React
- ✅ Inicia servidor de desenvolvimento na porta 3000
- ✅ Abre automaticamente no navegador (geralmente)
- ✅ Hot reload ativado (mudanças aparecem automaticamente)

**Nota:** A flag `--openssl-legacy-provider` é necessária para compatibilidade com Node.js 17+ devido a mudanças no OpenSSL.

### Acessar a Aplicação

Após iniciar, a aplicação estará disponível em:

```
http://localhost:3000
```

### Configuração do Proxy

O projeto está configurado para fazer proxy das requisições API para:

```
http://localhost:8000
```

Isso significa que:
- O frontend roda na porta **3000**
- As APIs do backend devem estar na porta **8000**
- O proxy redireciona automaticamente requisições `/api/*` para `http://localhost:8000/api/*`

**Configuração no `package.json`:**
```json
{
  "proxy": "http://localhost:8000"
}
```

### Parar o Servidor

Pressione `Ctrl + C` no terminal onde o servidor está rodando.

---

## 🏗️ Build para Produção

### Fazer o Build

#### Opção 1: Usando arquivo .env (Recomendado)

```bash
# Na pasta cbpi5ui/
npm run build
```

#### Opção 2: Scripts específicos do sistema

**Windows (PowerShell):**
```bash
npm run build:win
# OU
.\scripts\build.ps1
```

**Linux/Mac:**
```bash
npm run build:unix
# OU
bash ./scripts/build.sh
```

#### Opção 3: Manualmente (se as opções acima não funcionarem)

**Windows (PowerShell):**
```powershell
$env:NODE_OPTIONS="--openssl-legacy-provider"
npm run build
```

**Linux/Mac:**
```bash
NODE_OPTIONS=--openssl-legacy-provider npm run build
```

**O que acontece:**
- ✅ Compila e otimiza todo o código
- ✅ Minifica JavaScript e CSS
- ✅ Gera arquivos estáticos otimizados
- ✅ Cria a pasta `build/` com os arquivos prontos para produção

**Tempo estimado:** 2-5 minutos

**Nota:** A flag `--openssl-legacy-provider` é necessária para compatibilidade com Node.js 17+.

### Estrutura do Build

Após o build, a pasta `build/` conterá:

```
build/
├── index.html              ← Página principal
├── static/
│   ├── css/
│   │   └── main.[hash].chunk.css    ← CSS minificado
│   ├── js/
│   │   ├── main.[hash].chunk.js     ← JavaScript principal
│   │   ├── 2.[hash].chunk.js        ← Chunks adicionais
│   │   └── runtime-main.[hash].js   ← Runtime
│   └── media/                        ← Imagens e assets
└── manifest.json                     ← Manifest PWA
```

### Verificar o Build Localmente

Para testar o build localmente antes de publicar:

```bash
# Instalar servidor HTTP simples (se não tiver)
npm install -g serve

# Servir a pasta build
serve -s build

# OU usar Python
cd build
python3 -m http.server 8080
```

Acesse: `http://localhost:8080` ou `http://localhost:3000`

---

## 🐍 Instalação como Plugin Python

O CraftBeerPi 5 UI pode ser instalado como um plugin Python no sistema CraftBeerPi.

### Instalação para Desenvolvimento

```bash
# Na pasta raiz craftbeerpi5-ui/
python3 setup.py develop
```

**O que faz:**
- Instala o pacote em modo desenvolvimento
- Cria links simbólicos (não copia arquivos)
- Mudanças no código são refletidas imediatamente
- Não precisa reinstalar após mudanças

### Instalação Normal

```bash
# Na pasta raiz craftbeerpi5-ui/
python3 setup.py install
```

**O que faz:**
- Instala o pacote normalmente
- Copia arquivos para o site-packages do Python
- Mudanças requerem reinstalação

### Verificar Instalação

```bash
# Verificar se o pacote está instalado
pip list | grep cbpi5ui

# Deve mostrar algo como:
# cbpi5ui    0.2.2.a3
```

### Desinstalar

```bash
pip uninstall cbpi5ui
```

---

## 📦 Empacotamento

### Criar Pacote de Distribuição

```bash
# Na pasta raiz craftbeerpi5-ui/
python3 setup.py sdist
```

**O que faz:**
- Cria um pacote source distribution
- Gera arquivo `.tar.gz` na pasta `dist/`
- Arquivo pode ser instalado com `pip install`

### Localização do Pacote

Após o comando, o pacote estará em:

```
craftbeerpi5-ui/dist/cbpi5ui-0.2.2.a3.tar.gz
```

### Instalar o Pacote

```bash
# Instalar de um arquivo local
pip install dist/cbpi5ui-0.2.2.a3.tar.gz

# OU instalar diretamente
pip install .
```

---

## 🔄 Fluxo de Trabalho Completo

### Desenvolvimento

```bash
# 1. Instalar dependências (primeira vez)
cd craftbeerpi5-ui/cbpi5ui
npm install

# 2. Iniciar servidor de desenvolvimento
npm start

# 3. Fazer alterações no código
# (Hot reload atualiza automaticamente)

# 4. Testar no navegador
# http://localhost:3000
```

### Preparar para Produção

```bash
# 1. Fazer build
cd craftbeerpi5-ui/cbpi5ui
npm run build

# 2. Verificar build localmente (opcional)
serve -s build

# 3. Criar pacote Python
cd ..
python3 setup.py sdist

# 4. O pacote está pronto em dist/
```

### Publicar/Instalar

```bash
# Opção 1: Instalar localmente
pip install dist/cbpi5ui-0.2.2.a3.tar.gz

# Opção 2: Publicar no PyPI (se tiver acesso)
twine upload dist/cbpi5ui-0.2.2.a3.tar.gz
```

---

## 🐛 Troubleshooting

### Problema: `npm install` falha com conflito de dependências

**Erro comum:**
```
npm error ERESOLVE could not resolve
npm error Conflicting peer dependency: @material-ui/icons@...
```

**Solução 1: Usar --legacy-peer-deps (Recomendado)**
```bash
npm install --legacy-peer-deps
```

**Solução 2: Arquivo .npmrc (Automático)**
O projeto já inclui um arquivo `.npmrc` que configura `legacy-peer-deps=true` automaticamente.
Apenas execute:
```bash
npm install
```

**Solução 3: Limpar e reinstalar**
```bash
# Limpar cache do npm
npm cache clean --force

# Deletar node_modules e package-lock.json
rm -rf node_modules package-lock.json

# Reinstalar com legacy-peer-deps
npm install --legacy-peer-deps
```

**Nota:** O uso de `--legacy-peer-deps` é necessário devido a conflitos entre Material-UI v4 e algumas dependências. Isso não afeta a funcionalidade do projeto.

### Problema: Porta 3000 já em uso

**Solução:**
```bash
# Linux/Mac: Encontrar processo usando a porta
lsof -ti:3000 | xargs kill -9

# Windows: Encontrar processo
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# OU usar outra porta
PORT=3001 npm start
```

### Problema: Erro `error:0308010C:digital envelope routines::unsupported`

**Causa:**
Este erro ocorre com Node.js 17+ devido a mudanças no OpenSSL. O webpack 4 (usado pelo react-scripts 4) não é compatível com as novas versões do Node.js.

**Soluções (em ordem de preferência):**

#### Solução 1: Arquivo .env (Mais Simples) ✅

O projeto inclui um arquivo `.env` na pasta `cbpi5ui/` que configura automaticamente:
```
NODE_OPTIONS=--openssl-legacy-provider
```

Apenas execute:
```bash
npm start
npm run build
```

#### Solução 2: Scripts Específicos do Sistema

**Windows:**
```bash
npm run start:win
# OU
.\scripts\start.ps1
```

**Linux/Mac:**
```bash
npm run start:unix
# OU
bash ./scripts/start.sh
```

#### Solução 3: Manualmente

**Windows PowerShell:**
```powershell
$env:NODE_OPTIONS="--openssl-legacy-provider"
npm start
```

**Linux/Mac:**
```bash
NODE_OPTIONS=--openssl-legacy-provider npm start
```

**Nota:** O arquivo `.env` é a solução mais simples e funciona automaticamente. Se ainda tiver problemas, use os scripts específicos do sistema.

### Problema: Build falha por falta de memória

**Solução:**
O `package.json` já está configurado com:
```json
"build": "react-scripts --expose-gc --max-old-space-size=4096 build"
```

Se ainda falhar, aumente a memória:
```bash
# Linux/Mac
NODE_OPTIONS="--max-old-space-size=8192 --openssl-legacy-provider" npm run build

# Windows (PowerShell)
$env:NODE_OPTIONS="--max-old-space-size=8192 --openssl-legacy-provider"; npm run build
```

### Problema: Proxy não funciona (API não conecta)

**Verificar:**
1. Backend CraftBeerPi está rodando na porta 8000?
2. Configuração do proxy no `package.json` está correta?
3. CORS está habilitado no backend?

**Testar conexão:**
```bash
# Verificar se backend está respondendo
curl http://localhost:8000/api/system/
```

### Problema: Mudanças não aparecem

**Solução:**
```bash
# Limpar cache do navegador
# Chrome: Ctrl+Shift+Delete
# Ou usar modo anônimo

# Limpar cache do build
rm -rf build
npm run build
```

### Problema: Erro de módulo não encontrado

**Solução:**
```bash
# Reinstalar dependências
rm -rf node_modules package-lock.json
npm install
```

---

## 📁 Estrutura de Arquivos

```
craftbeerpi5-ui/
├── cbpi5ui/                    ← Pasta principal do projeto
│   ├── src/                     ← Código fonte React
│   │   ├── App.js              ← Componente principal
│   │   ├── components/         ← Componentes React
│   │   ├── config/             ← Configurações (rotas, etc)
│   │   └── docs/               ← Documentação
│   ├── public/                  ← Arquivos públicos (HTML, imagens)
│   ├── build/                   ← Build de produção (gerado)
│   ├── node_modules/            ← Dependências (gerado)
│   ├── package.json             ← Configuração npm
│   ├── package-lock.json        ← Lock de versões
│   └── version.py               ← Versão do pacote
├── setup.py                     ← Setup Python
├── MANIFEST.in                  ← Arquivos a incluir no pacote
└── README.md                    ← README do projeto
```

### Arquivos Importantes

| Arquivo | Descrição |
|---------|-----------|
| `package.json` | Configuração npm, scripts, dependências |
| `setup.py` | Configuração do pacote Python |
| `cbpi5ui/version.py` | Versão do pacote |
| `cbpi5ui/src/App.js` | Componente principal React |
| `cbpi5ui/src/config/routes.js` | Configuração de rotas |

---

## 📝 Scripts Disponíveis

### Scripts npm (em `cbpi5ui/`)

```bash
# Desenvolvimento
npm start              # Inicia servidor de desenvolvimento

# Build
npm run build          # Cria build de produção

# Testes
npm test               # Executa testes

# Eject (não recomendado)
npm run eject          # Ejetar configuração do Create React App
```

### Scripts Python (em raiz `craftbeerpi5-ui/`)

```bash
# Instalação
python3 setup.py develop    # Instala em modo desenvolvimento
python3 setup.py install    # Instala normalmente

# Empacotamento
python3 setup.py sdist      # Cria pacote source distribution
python3 setup.py bdist_wheel # Cria wheel (se configurado)
```

---

## 🔍 Verificações Pós-Build

### Verificar Build

```bash
# 1. Verificar se pasta build foi criada
ls -la cbpi5ui/build/

# 2. Verificar tamanho dos arquivos
du -sh cbpi5ui/build/

# 3. Verificar se index.html existe
cat cbpi5ui/build/index.html | head -20

# 4. Testar servindo localmente
cd cbpi5ui/build
python3 -m http.server 8080
# Acessar http://localhost:8080
```

### Verificar Instalação Python

```bash
# Verificar se pacote está instalado
pip show cbpi5ui

# Verificar localização dos arquivos
python3 -c "import cbpi5ui; print(cbpi5ui.__file__)"

# Verificar versão
python3 -c "import cbpi5ui; print(cbpi5ui.__version__)"
```

---

## 🚀 Deploy

### Opção 1: Servir Arquivos Estáticos

Após o build, os arquivos em `build/` podem ser servidos por qualquer servidor web:

- **Nginx:**
```nginx
server {
    listen 80;
    server_name seu-dominio.com;
    root /caminho/para/craftbeerpi5-ui/cbpi5ui/build;
    
    location / {
        try_files $uri /index.html;
    }
}
```

- **Apache:**
```apache
<VirtualHost *:80>
    ServerName seu-dominio.com
    DocumentRoot /caminho/para/craftbeerpi5-ui/cbpi5ui/build
    
    <Directory /caminho/para/craftbeerpi5-ui/cbpi5ui/build>
        Options -Indexes +FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>
</VirtualHost>
```

### Opção 2: Integração com CraftBeerPi Backend

O CraftBeerPi backend serve automaticamente os arquivos do pacote `cbpi5ui` instalado.

Após instalar:
```bash
pip install dist/cbpi5ui-0.2.2.a3.tar.gz
```

O backend servirá a UI em:
```
http://localhost:8000/cbpi_ui/static/index.html
```

---

## 📚 Recursos Adicionais

### Documentação Relacionada

- [CHANGELOG_V4_TO_V5.md](./CHANGELOG_V4_TO_V5.md) - Mudanças e melhorias
- [ADICIONAR_PAGINAS.md](./ADICIONAR_PAGINAS.md) - Como criar páginas

### Links Úteis

- [React Documentation](https://react.dev/)
- [Create React App](https://create-react-app.dev/)
- [Material-UI v4](https://v4.mui.com/)
- [Python Packaging](https://packaging.python.org/)

---

## ✅ Checklist de Deploy

Antes de fazer deploy, verifique:

- [ ] Build executado com sucesso (`npm run build`)
- [ ] Pasta `build/` contém todos os arquivos
- [ ] Testado localmente (`serve -s build`)
- [ ] Versão atualizada em `version.py` (se necessário)
- [ ] Pacote Python criado (`python3 setup.py sdist`)
- [ ] Testado instalação do pacote localmente
- [ ] Documentação atualizada (se necessário)

---

**Última atualização:** 2024  
**Versão:** CraftBeerPi 5.0

