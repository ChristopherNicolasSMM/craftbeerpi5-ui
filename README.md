# CraftBeerPi 5 UI

Interface web moderna para o CraftBeerPi 5, construída com React e Material-UI.

## 🚀 Início Rápido

### Pré-requisitos
- Node.js 14+ e npm (testado com Node.js 17, 18, 19, 20, 21, 22)
- Python 3.9+ (para instalação como plugin)

**Nota:** O projeto está configurado para funcionar com Node.js 17+ usando `--openssl-legacy-provider` automaticamente.

### Desenvolvimento

```bash
# 1. Navegar para a pasta do projeto
cd cbpi5ui

# 2. Instalar dependências
npm install
# Nota: O projeto usa --legacy-peer-deps automaticamente via .npmrc
# Se tiver problemas, use: npm install --legacy-peer-deps

# 3. Iniciar servidor de desenvolvimento

# Windows (PowerShell) - Recomendado:
npm run start:win
# OU
.\scripts\start.ps1

# Linux/Mac:
npm run start:unix
# OU
npm start  # Se o arquivo .env estiver configurado
```

A aplicação estará disponível em: `http://localhost:3000`

**Notas importantes:**
- **Node.js 17+:** Use `npm run start:win` (Windows) ou `npm run start:unix` (Linux/Mac) para compatibilidade automática
- O projeto inclui scripts PowerShell e Bash que configuram `--openssl-legacy-provider` automaticamente
- O arquivo `.npmrc` configura `legacy-peer-deps=true` para resolver conflitos de dependências
- Isso é normal e não afeta a funcionalidade do projeto

### Build para Produção

```bash
# Na pasta cbpi5ui/

# Windows (PowerShell) - Recomendado:
npm run build:win
# OU
.\scripts\build.ps1

# Linux/Mac:
npm run build:unix
# OU
npm run build  # Se o arquivo .env estiver configurado
```

Os arquivos otimizados estarão em `cbpi5ui/build/`

### Instalação como Plugin Python

```bash
# Na pasta raiz craftbeerpi5-ui/
python3 setup.py develop  # Modo desenvolvimento
# OU
python3 setup.py install  # Instalação normal
```

### Empacotamento

```bash
# Criar pacote de distribuição
python3 setup.py sdist
```

## 📚 Documentação Completa

Para instruções detalhadas, consulte:
- [Guia de Execução e Build](./cbpi5ui/src/docs/GUIA_EXECUCAO_BUILD.md) - Guia completo
- [Changelog V4 para V5](./cbpi5ui/src/docs/CHANGELOG_V4_TO_V5.md) - Mudanças e melhorias
- [Como Adicionar Páginas](./cbpi5ui/src/docs/ADICIONAR_PAGINAS.md) - Guia de desenvolvimento

## 🌐 Acesso

Após instalação, a UI estará disponível em:
- **Desenvolvimento:** http://localhost:3000
- **Produção (via backend):** http://localhost:8000/cbpi_ui/static/index.html

## 📦 Estrutura

```
craftbeerpi5-ui/
├── cbpi5ui/          # Projeto React
│   ├── src/          # Código fonte
│   ├── build/        # Build de produção (gerado)
│   └── public/       # Arquivos públicos
├── setup.py          # Setup Python
└── README.md         # Este arquivo
```

## 🔧 Scripts Disponíveis

### Desenvolvimento
- `npm run start:win` - Servidor de desenvolvimento (Windows PowerShell)
- `npm run start:unix` - Servidor de desenvolvimento (Linux/Mac)
- `npm start` - Servidor de desenvolvimento (requer .env configurado)

### Build
- `npm run build:win` - Build de produção (Windows PowerShell)
- `npm run build:unix` - Build de produção (Linux/Mac)
- `npm run build` - Build de produção (requer .env configurado)

### Outros
- `npm test` - Executar testes
- `python3 setup.py develop` - Instalar em modo desenvolvimento
- `python3 setup.py sdist` - Criar pacote de distribuição

**Nota:** Para Node.js 17+, use os scripts `:win` ou `:unix` que configuram automaticamente a compatibilidade OpenSSL.

## 📝 Versão

Versão atual: 0.2.2.a3 (ver `cbpi5ui/version.py`)

## 🤝 Contribuindo

Consulte a documentação em `cbpi5ui/src/docs/` para guias de desenvolvimento.