# Como Adicionar Novas Páginas ao CraftBeerPi 5 UI

Este guia explica como adicionar novas páginas ao sistema de forma simples e organizada.

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Passo a Passo](#passo-a-passo)
3. [Exemplo Completo](#exemplo-completo)
4. [Dicas e Boas Práticas](#dicas-e-boas-práticas)

---

## 🎯 Visão Geral

O sistema de navegação do CraftBeerPi 5 UI foi modernizado para facilitar a adição de novas páginas. Todas as rotas e itens do menu são configurados em um único arquivo: `src/config/routes.js`.

### Estrutura

```
craftbeerpi5-ui/
└── cbpi5ui/
    └── src/
        ├── config/
        │   └── routes.js          ← Configuração centralizada de rotas
        ├── components/
        │   └── sua-pagina/        ← Seu novo componente
        │       └── index.js
        ├── App.js                  ← App principal (já configurado)
        └── components/util/
            └── Menu.js             ← Menu lateral (já configurado)
```

---

## 📝 Passo a Passo

### 1. Criar o Componente da Página

Crie uma nova pasta em `src/components/` com o nome da sua página:

```bash
src/components/minha-pagina/
└── index.js
```

**Exemplo básico de componente:**

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
        Conteúdo da página aqui...
      </Typography>
    </Paper>
  );
};

export default MinhaPagina;
```

### 2. Adicionar a Rota em `routes.js`

Abra o arquivo `src/config/routes.js` e adicione sua rota:

```javascript
// 1. Importe seu componente no topo do arquivo
import MinhaPagina from '../components/minha-pagina';

// 2. Importe um ícone do Material-UI (opcional, se quiser no menu)
import HomeIcon from '@material-ui/icons/Home';

// 3. Adicione a rota no array routes
export const routes = [
  // ... outras rotas existentes ...
  
  {
    path: '/minha-pagina',
    component: MinhaPagina,
    exact: true,
    menuItem: true,              // true = aparece no menu lateral
    menuLabel: 'Minha Página',   // Nome no menu
    menuIcon: HomeIcon,          // Ícone no menu
    menuOrder: 5,                // Ordem no menu (menor = mais acima)
  },
];
```

### 3. Pronto! 🎉

Sua página já está disponível:
- ✅ Acessível via URL: `#/minha-pagina`
- ✅ Aparece no menu lateral (se `menuItem: true`)
- ✅ Roteamento automático configurado

---

## 📚 Exemplo Completo

Vamos criar uma página de "Estatísticas" como exemplo:

### 1. Criar o Componente

**`src/components/statistics/index.js`:**

```javascript
import React, { useState, useEffect } from 'react';
import {
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  makeStyles,
} from '@material-ui/core';
import { useCBPi } from '../data';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(3),
  },
  card: {
    height: '100%',
  },
  statValue: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: theme.palette.primary.main,
  },
}));

const Statistics = () => {
  const classes = useStyles();
  const { state } = useCBPi();
  const [stats, setStats] = useState({
    totalActors: 0,
    totalSensors: 0,
    totalKettles: 0,
  });

  useEffect(() => {
    // Calcular estatísticas
    if (state) {
      setStats({
        totalActors: state.actor?.length || 0,
        totalSensors: state.sensor?.length || 0,
        totalKettles: state.kettle?.length || 0,
      });
    }
  }, [state]);

  return (
    <div className={classes.root}>
      <Typography variant="h4" gutterBottom>
        Estatísticas do Sistema
      </Typography>
      
      <Grid container spacing={3} style={{ marginTop: 16 }}>
        <Grid item xs={12} sm={4}>
          <Card className={classes.card}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total de Atuadores
              </Typography>
              <Typography className={classes.statValue}>
                {stats.totalActors}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={4}>
          <Card className={classes.card}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total de Sensores
              </Typography>
              <Typography className={classes.statValue}>
                {stats.totalSensors}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={4}>
          <Card className={classes.card}>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Total de Panelas
              </Typography>
              <Typography className={classes.statValue}>
                {stats.totalKettles}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Statistics;
```

### 2. Adicionar ao `routes.js`

**`src/config/routes.js`:**

```javascript
// ... imports existentes ...
import Statistics from '../components/statistics';
import BarChartIcon from '@material-ui/icons/BarChart';

export const routes = [
  // ... rotas existentes ...
  
  {
    path: '/statistics',
    component: Statistics,
    exact: true,
    menuItem: true,
    menuLabel: 'Estatísticas',
    menuIcon: BarChartIcon,
    menuOrder: 6,
  },
];
```

### 3. Resultado

- ✅ Página criada e funcional
- ✅ Aparece no menu lateral como "Estatísticas"
- ✅ Acessível via `#/statistics`

---

## 💡 Dicas e Boas Práticas

### Escolhendo Ícones

Use ícones do Material-UI Icons. Exemplos comuns:

```javascript
import DashboardIcon from '@material-ui/icons/Dashboard';
import SettingsIcon from '@material-ui/icons/Settings';
import BarChartIcon from '@material-ui/icons/BarChart';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import PowerIcon from '@material-ui/icons/Power';
```

Veja todos os ícones disponíveis: https://material-ui.com/components/material-icons/

### Ordenação do Menu

O `menuOrder` determina a posição no menu:
- Menor número = mais acima
- Exemplo: `menuOrder: 1` aparece antes de `menuOrder: 10`

### Rotas sem Menu

Se você não quiser que a página apareça no menu, use:

```javascript
{
  path: '/pagina-interna',
  component: MinhaPagina,
  exact: true,
  menuItem: false,  // Não aparece no menu
}
```

### Rotas com Parâmetros

Para rotas dinâmicas (com parâmetros):

```javascript
{
  path: '/item/:id',
  component: ItemDetail,
  exact: true,
  menuItem: false,  // Geralmente rotas com parâmetros não vão no menu
}
```

### Acessando Dados do Sistema

Use o hook `useCBPi()` para acessar dados:

```javascript
import { useCBPi } from '../data';

const MinhaPagina = () => {
  const { state } = useCBPi();
  
  // state.actor - lista de atuadores
  // state.sensor - lista de sensores
  // state.kettle - lista de panelas
  // state.config - configurações
  // etc.
  
  return <div>...</div>;
};
```

### Navegação Programática

Para navegar entre páginas no código:

```javascript
import { useHistory } from 'react-router-dom';

const MinhaPagina = () => {
  const history = useHistory();
  
  const handleClick = () => {
    history.push('/outra-pagina');
  };
  
  return <button onClick={handleClick}>Ir para outra página</button>;
};
```

---

## 🔍 Estrutura de Rotas Atual

As rotas principais do sistema são:

1. **Dashboard** (`/`) - Página inicial
2. **Mash Profile** (`/mashprofile`) - Perfis de brassagem
3. **Fermenter Profile** (`/fermenterprofile`) - Perfis de fermentação
4. **Hardware** (`/hardware`) - Gerenciamento de hardware
5. **Settings** (`/settings`) - Configurações do sistema
6. **Analytics** (`/charting`) - Análises e gráficos
7. **Plugins** (`/plugins`) - Gerenciamento de plugins
8. **Recipe Upload** (`/upload`) - Upload de receitas
9. **System** (`/system`) - Informações do sistema
10. **About** (`/about`) - Sobre o CraftBeerPi

---

## ❓ Problemas Comuns

### Página não aparece no menu

- Verifique se `menuItem: true` está configurado
- Verifique se o `menuOrder` está definido
- Verifique se o componente foi importado corretamente

### Rota não funciona

- Verifique se o `path` está correto (começa com `/`)
- Verifique se `exact: true` está configurado se necessário
- Verifique se o componente foi exportado corretamente

### Erro de importação

- Verifique se o caminho do import está correto
- Verifique se o componente tem `export default`

---

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique a documentação do Material-UI: https://material-ui.com/
2. Verifique a documentação do React Router: https://reactrouter.com/
3. Consulte os componentes existentes como referência

---

**Última atualização:** 2024
**Versão:** CraftBeerPi 5.0

