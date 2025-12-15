# Migração MUI v4 -> MUI v5 (Guia Rápido)

Este documento descreve passos práticos para migrar componentes do projeto de `@material-ui/*` (v4) para `@mui/*` (v5). O projeto hoje contém uma mistura — recomendamos migrar por etapas e centralizar o tema em `cbpi5ui/src/theme/index.js`.

## Objetivo
- Padronizar os imports para `@mui/*` (v5)
- Usar `CustomThemeProvider` (v5) para o tema global
- Diminuir dependências duplicadas e evitar conflito de propriedades (ex. `palette.mode` vs `palette.type`)

## Passos sugeridos para migrar um componente

1. Substitua os imports de componentes:
   - Antes: `import { Button, Grid } from '@material-ui/core'`
   - Depois: `import { Button, Grid } from '@mui/material'`

2. Substitua os imports de ícones:
   - Antes: `import MenuIcon from '@material-ui/icons/Menu'`
   - Depois: `import MenuIcon from '@mui/icons-material/Menu'`

3. Troque `makeStyles` por `@mui/styles` (compat) ou preferencialmente `sx` / `styled` do `@mui/material`.
   - Temporário (compat): `import { makeStyles } from '@mui/styles';`
   - Ideal: Substituir por `styled` (emotion) ou `sx`:

```javascript
// Exemplo com sx
<Box sx={{ backgroundColor: 'primary.main', p: 2 }} />
```

4. Atualize quaisquer referências a `theme.palette.type` para `theme.palette.mode`.

5. Teste o componente no modo dev e observe diferenças visuais.

6. Atualize `package.json` removendo `@material-ui/*` quando todos os componentes estiverem migrados.

## Dicas
- Adicione `@mui/styles` temporariamente para compatibilidade com `makeStyles` enquanto migra.
- Quando estiver migrando uma rota ou tela inteira, migre todos os componentes sob essa rota para manter visual consistente.
- Use `yarn` com `resolutions` ou `npm` com `--legacy-peer-deps` para evitar conflitos temporários.
- Ferramentas úteis:
  - `@mui/material` `migration guide` (docs oficiais)

## Checklist para um PR de migração
- [ ] Todos os imports atualizados para `@mui/*`
- [ ] Nenhuma referência a `palette.type`
- [ ] Todos `makeStyles` substituídos por `sx`/`styled` ou pelo menos por `@mui/styles`
- [ ] Mudanças visuais verificadas (modo escuro/claro)
- [ ] Build e testes passados

---

A migração pode ser incremental; esta estratégia ajuda a minimizar riscos nos PRs e garantir conformidade do tema via o novo `CustomThemeProvider`.
