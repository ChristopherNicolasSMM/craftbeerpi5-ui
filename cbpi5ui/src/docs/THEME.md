## Tema e cores centrais (CBPi UI)

Este documento explica como alterar as cores do projeto utilizando **hex** (conforme solicitado) e quais arquivos devem ser ajustados.

Resumo rápido: para alterações globais, atualize o tema central em `src/theme/index.js`. Para ajustes locais, edite o CSS ou o componente específico.

1) Arquivo principal (recomendado)

- **`src/theme/index.js`** — edite o objeto `palette` e coloque os hex que você deseja usar. Exemplo:

```js
// src/theme/index.js
createTheme({
   palette: {
      mode,
      primary: { main: '#00FF00' },     // ALTERE AQUI (hex)
      secondary: { main: '#ff4081' },
      background: { default: '#121212', paper: '#1e1e1e' },
      text: { primary: '#ffffff' },
   },
});
```

Ao alterar o `palette` o `CustomThemeProvider` injeta variáveis CSS em `:root` automaticamente (ex.: `--cbpi-primary`, `--cbpi-bg`, `--cbpi-text`). Essas variáveis podem ser usadas em arquivos `.css` ou SVGs.

2) CSS global (não-MUI)

- **`src/index.css`**, **`src/App.css`**, **`src/led.css`** — altere os hex diretamente nesses arquivos quando preferir uma mudança pontual de CSS. Exemplo:

```css
/* src/index.css */
body { background-color: #272227; color: #ffffff; }

/* src/App.css */
.App-link { color: #61dafb; }
```

3) Componentes com hex embutido (onde olhar primeiro)

- Exemplos importantes onde encontrámos hex hard-coded:
   - `src/components/dashboard/widgets/KettleControl.js` (`#00FF00`)
   - `src/components/dashboard/widgets/FermenterControl.js` (`#00FF00`)
   - `src/components/dashboard/widgets/Chart.js` (default: `#00FF00`)
   - `src/components/dashboard/DashboardLayer.js` (`#2c282e`)
   - `src/components/dashboard/DashboardContext.js` (`#272227`)
   - `src/components/dashboard/widgets/Steps.js` / `FermenterSteps.js` (`#2c282e`)

Para cada um você pode substituir o hex por outro hex diretamente ou refatorar para usar `theme.palette`.

4) SVGs

- Muitos SVGs contêm `fill="#..."` ou `stop-color`. Opções:
   - Edite o SVG e substitua o hex, ou
   - Use `currentColor` no SVG e controle a cor via CSS `color: #...` no componente pai.

5) Como localizar todos os hex no projeto (PowerShell)

```powershell
Select-String -Path .\src\**\*.{js,jsx,css,svg} -Pattern "#[0-9A-Fa-f]{3,6}" -AllMatches | Select-Object Path,LineNumber,Line
```

6) Teste e validação

```powershell
cd C:\CraftbeerPi\craftbeerpi5-ui\cbpi5ui
npm run build:win   # build de produção
# ou
npm start           # desenvolvimento
```

7) Boas práticas

- Se a alteração for global, altere o `theme` primeiro — economiza trabalho e mantém consistência.
- Se for uma exceção de visual, mude apenas o componente ou o CSS local.
- Para SVGs, prefira `currentColor` quando fizer sentido.

8) Checklist antes de mesclar

- [ ] Atualizar `src/theme/index.js` com os hex desejados (primary/background/text)
- [ ] Buscar ocorrências de hex e revisar as mudanças locais (PowerShell command acima)
- [ ] Rodar `npm run build:win` e testar visualmente

9) Quer que eu aplique isso automaticamente?

- Posso rodar uma substituição conservadora para os hex mais óbvios (ex.: `#272227`, `#2c282e`, `#00FF00`) e abrir um Pull Request com as mudanças para sua revisão.
- Informe **qual hex** deseja para **primary** e **background** e eu faço a alteração e um build de verificação.

---
Atualize este documento conforme necessário — posso também criar uma tarefa para revisar todos os widgets mais críticos e deixá-los seguindo o novo padrão.
