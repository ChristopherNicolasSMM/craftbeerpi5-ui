# Build Windows - CraftBeerPi UI

Este documento descreve como compilar e gerar o build da interface `cbpi5ui` no Windows, além de onde ficam as configurações de estilo e como alterá-las.

## Requisitos
- Node.js LTS (recomendado 16.x ou 18.x)
- npm ou yarn
- PowerShell (Windows)
- Python venv apenas para instalar o pacote Python (se aplica)

## Passos para desenvolvimento (Windows)
1. Abra o PowerShell e ative o ambiente virtual Python, caso esteja usando:

```powershell
python -m venv venvCraftbeerPi
.\venvCraftbeerPi\Scripts\Activate.ps1
```

2. Navegue para a pasta do frontend:

```powershell
cd .\craftbeerpi5-ui\cbpi5ui
```

3. Instale dependências:

```powershell
npm install
```

> Nota: O projeto contém pacotes MUI v5 e v4 (compat). Para garantir compatibilidade, usamos `@mui/styles` (v5 compatível) e um _ThemeProvider_ centralizado.

4. Rodar em modo dev (Windows):

```powershell
npm run start:win
# Ou
.\scripts\start.ps1
```

5. Build para produção (Windows):

```powershell
npm run build:win
# Ou
.\scripts\build.ps1
```

Os artefatos gerados ficarão em `cbpi5ui/build/` e são incorporados no pacote Python do plugin (via setup.py). Ajuste `setup.py` caso queira embutir ou excluir arquivos estáticos.

## Localização das configurações de estilo / tema
- Arquivo principal do tema: `cbpi5ui/src/theme/index.js` — aqui é onde centralizamos a configuração de `palette`, `typography` e outras customizações globais.
- Uso: `src/index.js` encapsula toda a aplicação com `CustomThemeProvider`, portanto qualquer alteração em `src/theme/index.js` se refletirá em toda a aplicação.
- Estilos locais: muitos componentes ainda utilizam `makeStyles` (compat via `@mui/styles`) ou estilos em CSS em `src/App.css`.
- Ícones: `@mui/icons-material` (v5) e alguns ainda usam `@material-ui/icons` (v4). Preferível padronizar para `@mui/icons-material`.

## Como alterar o tema (modo escuro / claro)
- Abra `cbpi5ui/src/theme/index.js` e ajuste `primary`, `secondary` e `mode`. O tema exporta `CustomThemeProvider` e o hook `useThemeMode` para alternar o modo em runtime.

Exemplo rápido para alternar programaticamente:

```javascript
import { useThemeMode } from '../theme';

const MyComponent = () => {
  const { mode, toggleMode } = useThemeMode();
  return <button onClick={toggleMode}>{mode}</button>;
}
```

## Observações e próximos passos
- Atualmente, o projeto mistura MUI v4 e v5. O `CustomThemeProvider` provê o tema com MUI v5, e `@mui/styles` é usado para compatibilidade com `makeStyles` antigas.
- Para uma migração completa, converta todos imports de `@material-ui/*` para `@mui/*` e substitua `makeStyles` por `styled` ou `sx` quando possível.
- Caso precise de ajuda para migrar mais componentes, crie um PR incremental: altere os imports, atualize as utilizações e rode `npm run build`.

---

Documentação criada automaticamente pelo revisor do repositório.
