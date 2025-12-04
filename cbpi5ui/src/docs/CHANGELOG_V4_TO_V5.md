# Changelog: Atualizações CraftBeerPi 4 → CraftBeerPi 5

Este documento contém todas as mudanças, melhorias e guias de uso para a migração e desenvolvimento no CraftBeerPi 5.

**Última atualização:** 2024  
**Versão:** CraftBeerPi 5.0

---

## 📋 Índice

1. [Mudanças Principais](#mudanças-principais)
2. [Sistema de Navegação](#sistema-de-navegação)
3. [Como Criar Novas Páginas](#como-criar-novas-páginas)
4. [Como Criar Novos Componentes](#como-criar-novos-componentes)
5. [Como Adicionar Funcionalidades](#como-adicionar-funcionalidades)
6. [Melhorias na Página de Settings](#melhorias-na-página-de-settings)
7. [Estrutura do Projeto](#estrutura-do-projeto)
8. [Boas Práticas](#boas-práticas)
9. [Histórico de Atualizações](#histórico-de-atualizações)

---

## 🔄 Mudanças Principais

### Atualizações de Nomenclatura

#### Referências Atualizadas
- ✅ Todas as referências de "CraftBeerPi 4" foram atualizadas para "CraftBeerPi 5"
- ✅ `cbpi4ui` → `cbpi5ui` em todos os arquivos de configuração
- ✅ URLs e links atualizados para versão 5
- ✅ Documentação atualizada

#### Arquivos Modificados
- `setup.py` - Nome do pacote atualizado
- `release.py` - Caminhos atualizados
- `MANIFEST.in` - Referências atualizadas
- `workspace.code-workspace` - Caminhos atualizados
- `requirements.txt` - Dependências atualizadas
- Componentes React - Títulos e referências atualizados

### Sistema de Rotas Centralizado

**ANTES (CraftBeerPi 4):**
```javascript
// Rotas hardcoded no App.js
<Route path="/settings">
  <Settings />
</Route>
<Route path="/plugins">
  <Plugins />
</Route>
// ... muitas rotas espalhadas
```

**AGORA (CraftBeerPi 5):**
```javascript
// Configuração centralizada em src/config/routes.js
export const routes = [
  {
    path: '/settings',
    component: Settings,
    menuItem: true,
    menuLabel: 'Settings',
    menuIcon: SettingsIcon,
    menuOrder: 5,
  },
  // ... todas as rotas em um único lugar
];
```

**Benefícios:**
- ✅ Fácil adicionar novas páginas
- ✅ Configuração em um único arquivo
- ✅ Menu gerado automaticamente
- ✅ Manutenção simplificada

---

## 🧭 Sistema de Navegação

### Arquivo de Configuração: `src/config/routes.js`

Este é o arquivo central que gerencia todas as rotas e itens do menu.

#### Estrutura de uma Rota

```javascript
{
  path: '/caminho-da-url',        // Caminho da URL (obrigatório)
  component: MeuComponente,        // Componente React (obrigatório)
  exact: true,                     // Rota exata? (padrão: false)
  menuItem: true,                  // Aparece no menu? (padrão: false)
  menuLabel: 'Nome no Menu',       // Label no menu (se menuItem: true)
  menuIcon: MeuIcone,             // Ícone Material-UI (se menuItem: true)
  menuOrder: 5,                    // Ordem no menu (menor = mais acima)
}
```

#### Exemplo Completo

```javascript
import MinhaPagina from '../components/minha-pagina';
import HomeIcon from '@material-ui/icons/Home';

export const routes = [
  {
    path: '/minha-pagina',
    component: MinhaPagina,
    exact: true,
    menuItem: true,
    menuLabel: 'Minha Página',
    menuIcon: HomeIcon,
    menuOrder: 3,
  },
];
```

### Menu Lateral Automático

O menu lateral (`src/components/util/Menu.js`) agora é gerado automaticamente a partir da configuração:

```javascript
// Menu.js - Código simplificado
import { menuItems } from '../../config/routes';

const Menu = ({ onClose }) => {
  return (
    <List>
      {menuItems.map((route) => (
        <MenuItem
          key={route.path}
          label={route.menuLabel}
          path={route.path}
          icon={route.menuIcon}
        />
      ))}
    </List>
  );
};
```

**Vantagens:**
- ✅ Não precisa editar Menu.js para adicionar itens
- ✅ Ordenação automática por `menuOrder`
- ✅ Consistência garantida

---

## 📄 Como Criar Novas Páginas

### Passo 1: Criar o Componente

Crie uma nova pasta em `src/components/`:

```
src/components/minha-pagina/
└── index.js
```

**Exemplo básico:**

```javascript
import React from 'react';
import { Typography, Paper, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
}));

const MinhaPagina = () => {
  const classes = useStyles();

  return (
    <Paper className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Minha Nova Página
      </Typography>
      <Typography variant="body1">
        Conteúdo da página...
      </Typography>
    </Paper>
  );
};

export default MinhaPagina;
```

### Passo 2: Adicionar ao `routes.js`

Abra `src/config/routes.js` e adicione:

```javascript
// 1. Importe o componente
import MinhaPagina from '../components/minha-pagina';

// 2. Importe um ícone (opcional)
import HomeIcon from '@material-ui/icons/Home';

// 3. Adicione no array routes
export const routes = [
  // ... rotas existentes ...
  {
    path: '/minha-pagina',
    component: MinhaPagina,
    exact: true,
    menuItem: true,
    menuLabel: 'Minha Página',
    menuIcon: HomeIcon,
    menuOrder: 5,
  },
];
```

### Passo 3: Pronto! ✅

Sua página está:
- ✅ Acessível via `#/minha-pagina`
- ✅ No menu lateral automaticamente
- ✅ Roteamento configurado

### Exemplo Avançado: Página com Dados do Sistema

```javascript
import React, { useState, useEffect } from 'react';
import { Typography, Grid, Card, CardContent, makeStyles } from '@material-ui/core';
import { useCBPi } from '../data';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  card: {
    height: '100%',
  },
}));

const Estatisticas = () => {
  const classes = useStyles();
  const { state } = useCBPi();
  const [stats, setStats] = useState({
    atuadores: 0,
    sensores: 0,
    panelas: 0,
  });

  useEffect(() => {
    if (state) {
      setStats({
        atuadores: state.actor?.length || 0,
        sensores: state.sensor?.length || 0,
        panelas: state.kettle?.length || 0,
      });
    }
  }, [state]);

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Estatísticas
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4}>
          <Card className={classes.card}>
            <CardContent>
              <Typography variant="h6">Atuadores</Typography>
              <Typography variant="h3">{stats.atuadores}</Typography>
            </CardContent>
          </Card>
        </Grid>
        {/* Mais cards... */}
      </Grid>
    </div>
  );
};

export default Estatisticas;
```

---

## 🧩 Como Criar Novos Componentes

### Componente Reutilizável

Crie em `src/components/util/` ou em uma pasta específica:

```javascript
// src/components/util/MeuComponente.js
import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    // estilos
  },
}));

const MeuComponente = ({ prop1, prop2, children }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      {/* Conteúdo do componente */}
      {children}
    </div>
  );
};

export default MeuComponente;
```

### Componente com API

```javascript
import React, { useState, useEffect } from 'react';
import { useCBPi } from '../data';
import { actorapi } from '../data/actorapi';

const MeuComponenteComAPI = () => {
  const [data, setData] = useState([]);
  const { state } = useCBPi();

  useEffect(() => {
    // Buscar dados da API
    actorapi.get().then(setData);
  }, []);

  return (
    <div>
      {/* Renderizar dados */}
    </div>
  );
};

export default MeuComponenteComAPI;
```

---

## ⚙️ Como Adicionar Funcionalidades

### 1. Adicionar Nova API

Crie em `src/components/data/`:

```javascript
// src/components/data/minhaapi.js
import axios from "axios";

const criar = (data, callback_success, callback_failed) => {
  axios
    .post("/minha-rota", data)
    .then((response) => callback_success(response.data))
    .catch((error) => callback_failed(error));
};

const listar = (callback_success, callback_failed) => {
  axios
    .get("/minha-rota")
    .then((response) => callback_success(response.data))
    .catch((error) => callback_failed(error));
};

export const minhaapi = {
  criar,
  listar,
};
```

### 2. Adicionar ao Contexto Global

Se necessário, adicione ao `src/components/data/index.js`:

```javascript
// Adicionar ao estado global se necessário
const [minhaData, setMinhaData] = useState([]);
```

### 3. Usar na Interface

```javascript
import { minhaapi } from '../data/minhaapi';

const MinhaPagina = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    minhaapi.listar(
      (data) => setItems(data),
      (error) => console.error(error)
    );
  }, []);

  return <div>{/* Renderizar items */}</div>;
};
```

---

## 🎨 Melhorias na Página de Settings

### Antes (CraftBeerPi 4)

- Layout básico em tabela
- Busca simples
- Sem indicadores visuais de mudanças
- Feedback limitado

### Agora (CraftBeerPi 5)

#### Melhorias Implementadas:

1. **Layout Modernizado**
   - Design mais limpo e organizado
   - Melhor uso do espaço
   - Cards e seções bem definidas

2. **Busca Aprimorada**
   - Busca por nome do parâmetro
   - Busca também na descrição
   - Feedback visual imediato

3. **Indicadores Visuais**
   - Chips mostrando alterações pendentes
   - Contador de configurações alteradas
   - Destaque visual em linhas modificadas

4. **Estatísticas**
   - Total de configurações
   - Configurações filtradas
   - Alterações pendentes

5. **Feedback Melhorado**
   - Mensagens de sucesso/erro
   - Tooltips nos botões
   - Estados desabilitados quando apropriado

#### Código da Nova Settings

```javascript
// Principais melhorias:
- useStyles modernizado
- Grid layout responsivo
- Chips para indicadores
- Tooltips informativos
- Estados vazios tratados
- Feedback com alertas
```

---

## 📁 Estrutura do Projeto

```
craftbeerpi5-ui/
└── cbpi5ui/
    └── src/
        ├── config/
        │   └── routes.js              ← ✨ NOVO: Configuração centralizada
        ├── components/
        │   ├── about/
        │   ├── dashboard/
        │   ├── hardware/
        │   ├── settings/              ← ✨ MELHORADO: Layout modernizado
        │   ├── system/
        │   ├── util/
        │   │   └── Menu.js            ← ✨ ATUALIZADO: Usa routes.js
        │   └── ... (outros componentes)
        ├── docs/
        │   ├── ADICIONAR_PAGINAS.md   ← ✨ NOVO: Guia de páginas
        │   └── CHANGELOG_V4_TO_V5.md  ← ✨ NOVO: Este arquivo
        ├── App.js                     ← ✨ MODERNIZADO: Layout melhorado
        └── index.js
```

### Arquivos Principais

| Arquivo | Status | Descrição |
|---------|--------|-----------|
| `config/routes.js` | ✨ Novo | Configuração centralizada de rotas |
| `App.js` | 🔄 Modernizado | Layout e estrutura melhorados |
| `components/util/Menu.js` | 🔄 Atualizado | Menu gerado automaticamente |
| `components/settings/index.js` | 🔄 Melhorado | Interface moderna e funcional |
| `docs/ADICIONAR_PAGINAS.md` | ✨ Novo | Guia completo de criação de páginas |

---

## 💡 Boas Práticas

### 1. Organização de Código

```javascript
// ✅ BOM: Componente bem organizado
import React, { useState, useEffect } from 'react';
import { Typography, Paper, makeStyles } from '@material-ui/core';
import { useCBPi } from '../data';

const useStyles = makeStyles((theme) => ({
  // estilos
}));

const MeuComponente = () => {
  const classes = useStyles();
  const { state } = useCBPi();
  
  // lógica
  
  return (
    // JSX
  );
};

export default MeuComponente;
```

### 2. Nomenclatura

- ✅ Componentes: PascalCase (`MinhaPagina`)
- ✅ Arquivos: camelCase (`minhaPagina.js`) ou kebab-case (`minha-pagina.js`)
- ✅ Pastas: kebab-case (`minha-pagina/`)
- ✅ Hooks: camelCase começando com `use` (`useMeuHook`)

### 3. Estrutura de Componentes

```javascript
// 1. Imports
// 2. Estilos (makeStyles)
// 3. Componente principal
// 4. Hooks e lógica
// 5. Render
// 6. Export
```

### 4. Acessando Dados

```javascript
// ✅ Use o hook useCBPi()
import { useCBPi } from '../data';

const { state } = useCBPi();
// state.actor - atuadores
// state.sensor - sensores
// state.kettle - panelas
// state.config - configurações
```

### 5. Navegação

```javascript
// ✅ Use useHistory do react-router-dom
import { useHistory } from 'react-router-dom';

const history = useHistory();
history.push('/nova-pagina');
```

---

## 📝 Histórico de Atualizações

### 2024-12-04 - Correção de Compatibilidade Node.js

#### Mudanças
- ✅ Criados scripts PowerShell e Bash para Windows e Linux/Mac
- ✅ Configurado `--openssl-legacy-provider` para compatibilidade com Node.js 17+
- ✅ Resolvido erro `error:0308010C:digital envelope routines::unsupported`
- ✅ Removida dependência não utilizada `@material-ui/x-grid-data-generator`
- ✅ Criado arquivo `.npmrc` com `legacy-peer-deps=true`
- ✅ Adicionado `cross-env` como dependência de desenvolvimento

#### Arquivos Criados
- `scripts/start.ps1` - Script PowerShell para Windows
- `scripts/build.ps1` - Script PowerShell para build no Windows
- `scripts/start.sh` - Script Bash para Linux/Mac
- `scripts/build.sh` - Script Bash para build no Linux/Mac
- `.npmrc` - Configuração automática de legacy-peer-deps

#### Arquivos Modificados
- `package.json` - Scripts adicionados: `start:win`, `start:unix`, `build:win`, `build:unix`
- `src/docs/GUIA_EXECUCAO_BUILD.md` - Documentação completa atualizada
- `README.md` - Instruções atualizadas

#### Como Usar

**Windows (PowerShell):**
```bash
npm run start:win   # Inicia servidor de desenvolvimento
npm run build:win   # Faz build de produção
```

**Linux/Mac:**
```bash
npm run start:unix  # Inicia servidor de desenvolvimento
npm run build:unix  # Faz build de produção
```

**Nota:** O projeto agora é totalmente compatível com Node.js 17, 18, 19, 20, 21 e 22. Use os scripts específicos do seu sistema operacional para garantir compatibilidade.

### 2024 - Migração CraftBeerPi 4 → 5

#### Atualizações de Nomenclatura
- ✅ Todas as referências atualizadas de CBPI4 para CBPI5
- ✅ `cbpi4ui` → `cbpi5ui` em todos os arquivos
- ✅ Títulos e labels atualizados para "CraftBeerPi 5.0"

#### Sistema de Navegação
- ✅ Criado `src/config/routes.js` - Configuração centralizada
- ✅ `Menu.js` atualizado para usar configuração centralizada
- ✅ Menu gerado automaticamente a partir das rotas
- ✅ Sistema de ordenação por `menuOrder`

#### Layout e UI
- ✅ `App.js` modernizado com layout melhorado
- ✅ Drawer persistente com melhor UX
- ✅ Estilos atualizados e mais modernos
- ✅ Página de Settings completamente reformulada

#### Documentação
- ✅ Criado `docs/ADICIONAR_PAGINAS.md` - Guia completo
- ✅ Criado `docs/CHANGELOG_V4_TO_V5.md` - Este arquivo
- ✅ Comentários adicionados em arquivos principais

#### Funcionalidades Preservadas
- ✅ Todas as rotas existentes funcionando
- ✅ Todas as funcionalidades mantidas
- ✅ Compatibilidade total com código existente
- ✅ Nenhuma funcionalidade removida

---

## 🔮 Próximas Melhorias Sugeridas

### Curto Prazo
- [ ] Adicionar mais exemplos de componentes
- [ ] Criar template de página padrão
- [ ] Melhorar documentação de APIs

### Médio Prazo
- [ ] Sistema de temas customizável
- [ ] Mais componentes reutilizáveis
- [ ] Testes automatizados

### Longo Prazo
- [ ] Migração completa para MUI v5 (atualmente usando v4)
- [ ] TypeScript (opcional)
- [ ] Storybook para documentação de componentes

---

## 📚 Recursos Úteis

### Documentação
- [Material-UI v4](https://v4.mui.com/) - Biblioteca de componentes
- [React Router v5](https://v5.reactrouter.com/) - Roteamento
- [React Hooks](https://react.dev/reference/react) - Hooks do React

### Ícones
- [Material Icons](https://mui.com/material-ui/material-icons/) - Biblioteca de ícones

### APIs Disponíveis
- `actorapi` - Gerenciamento de atuadores
- `sensorapi` - Gerenciamento de sensores
- `kettleapi` - Gerenciamento de panelas
- `configapi` - Configurações do sistema
- `systemapi` - Operações do sistema
- E mais... (ver `src/components/data/`)

---

## ❓ FAQ

### Como adicionar uma página que não aparece no menu?

```javascript
{
  path: '/pagina-interna',
  component: MinhaPagina,
  menuItem: false,  // ← Não aparece no menu
}
```

### Como mudar a ordem dos itens no menu?

Ajuste o `menuOrder` em `routes.js`. Menor número = mais acima.

### Como criar uma rota com parâmetros?

```javascript
{
  path: '/item/:id',
  component: ItemDetail,
  exact: true,
}
```

Acesse o parâmetro com `useParams()`:
```javascript
const { id } = useParams();
```

### Como acessar dados do sistema?

```javascript
import { useCBPi } from '../data';

const { state } = useCBPi();
// state.actor, state.sensor, etc.
```

---

## 🔧 Troubleshooting

### Problema: `react-scripts` não é reconhecido como comando

**Sintoma:**
```
'react-scripts' não é reconhecido como um comando interno
ou externo, um programa operável ou um arquivo em lotes.
```

**Causa:**
- O `react-scripts` não está instalado ou a versão no `package.json` está incorreta
- As dependências não foram instaladas corretamente

**Solução:**
1. Verifique se a versão do `react-scripts` no `package.json` está correta:
   ```json
   "react-scripts": "^4.0.3"
   ```
   ⚠️ **NÃO** use `^0.0.0` ou versões inválidas.

2. Reinstale as dependências:
   ```bash
   npm install --legacy-peer-deps
   ```

3. Se o problema persistir, limpe o cache e reinstale:
   ```bash
   rm -rf node_modules package-lock.json
   npm install --legacy-peer-deps
   ```

### Problema: Erro OpenSSL com Node.js 17+

**Sintoma:**
```
Error: error:0308010C:digital envelope routines::unsupported
```

**Solução:**
Use os scripts fornecidos que configuram automaticamente o `NODE_OPTIONS`:
- Windows: `npm run start:win` ou `npm run build:win`
- Linux/Mac: `npm run start:unix` ou `npm run build:unix`

Ou configure manualmente:
```bash
# Windows PowerShell
$env:NODE_OPTIONS="--openssl-legacy-provider"
npm start

# Linux/Mac
export NODE_OPTIONS=--openssl-legacy-provider
npm start
```

### Problema: Conflitos de dependências peer

**Sintoma:**
```
npm error code ERESOLVE
npm error peer dep missing
```

**Solução:**
O arquivo `.npmrc` já está configurado com `legacy-peer-deps=true`. Se ainda houver problemas:
```bash
npm install --legacy-peer-deps
```

### Problema: Erro de compilação com `plotly.js` - "Unexpected token"

**Sintoma:**
```
Failed to compile.
./node_modules/plotly.js/src/components/fx/hover.js 1401:14
Module parse failed: Unexpected token (1401:14)
>   if (d.trace?.hoverlabel?.split) d.hovertemplate = '';
```

**Causa:**
- O `plotly.js` foi atualizado para uma versão muito nova (3.x) que usa sintaxe moderna (operador de encadeamento opcional `?.`)
- O `react-scripts 4.0.3` usa uma versão antiga do Babel que não suporta essa sintaxe
- Incompatibilidade entre versões modernas de bibliotecas e o build system antigo

**Solução:**
1. **Mantenha as versões originais compatíveis:**
   ```json
   "plotly.js": "^1.58.5",
   "axios": "^0.21.1",
   "react-scripts": "^4.0.3"
   ```

2. **⚠️ IMPORTANTE:** Não atualize essas dependências sem atualizar também o `react-scripts`:
   - `plotly.js` 3.x requer Babel moderno (react-scripts 5+)
   - `axios` 1.x pode ter breaking changes
   - Atualizar apenas uma dependência pode quebrar a compilação

3. Se precisar atualizar, faça uma atualização completa:
   - Atualize `react-scripts` para versão 5.x
   - Atualize todas as dependências relacionadas
   - Teste cuidadosamente todas as funcionalidades

4. Para reverter versões atualizadas incorretamente:
   ```bash
   # Edite o package.json e reverta as versões
   # Depois reinstale:
   npm install --legacy-peer-deps
   ```

**Versões Testadas e Compatíveis:**
- ✅ `react-scripts`: `^4.0.3`
- ✅ `plotly.js`: `^1.58.5`
- ✅ `axios`: `^0.21.1`
- ✅ `react`: `^17.0.2`
- ✅ `react-dom`: `^17.0.1`

---

## 📞 Suporte

Para dúvidas ou problemas:
1. Consulte `docs/ADICIONAR_PAGINAS.md` para guias detalhados
2. Verifique os componentes existentes como referência
3. Consulte a documentação do Material-UI
4. Verifique a seção [Troubleshooting](#-troubleshooting) acima

---

**Mantido por:** Equipe CraftBeerPi 5  
**Versão do Documento:** 1.1  
**Última Revisão:** 2024

