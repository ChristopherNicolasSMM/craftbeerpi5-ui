# Documentação CraftBeerPi 5 UI

Bem-vindo à documentação do CraftBeerPi 5 UI. Esta pasta contém toda a documentação necessária para desenvolvimento e manutenção do projeto.

## 📚 Documentos Disponíveis

### 1. [GUIA_EXECUCAO_BUILD.md](./GUIA_EXECUCAO_BUILD.md) ⭐ **NOVO**
**Guia completo de execução e build**

Este guia contém:
- ✅ Como instalar e configurar o ambiente
- ✅ Como executar em modo desenvolvimento
- ✅ Como fazer build para produção
- ✅ Como instalar como plugin Python
- ✅ Como empacotar para distribuição
- ✅ Troubleshooting completo
- ✅ Checklist de deploy

**👉 Comece por aqui se é sua primeira vez no projeto!**

### 2. [CHANGELOG_V4_TO_V5.md](./CHANGELOG_V4_TO_V5.md)
**Documento principal de atualizações e mudanças**

Este é o documento principal que contém:
- ✅ Todas as mudanças da versão 4 para 5
- ✅ Guias completos de como criar páginas
- ✅ Guias de como criar componentes
- ✅ Guias de como adicionar funcionalidades
- ✅ Histórico de atualizações
- ✅ Boas práticas e exemplos

**👉 Este documento é atualizado a cada nova mudança ou melhoria no projeto.**

### 3. [ADICIONAR_PAGINAS.md](./ADICIONAR_PAGINAS.md)
**Guia rápido para adicionar novas páginas**

Guia passo a passo focado especificamente em:
- Como criar uma nova página
- Como adicionar ao menu
- Exemplos práticos
- Troubleshooting

---

## 🚀 Início Rápido

### Para Desenvolvedores Novos

1. **Primeiro passo:** Leia [GUIA_EXECUCAO_BUILD.md](./GUIA_EXECUCAO_BUILD.md) para configurar o ambiente
2. **Segundo passo:** Leia [CHANGELOG_V4_TO_V5.md](./CHANGELOG_V4_TO_V5.md) para entender as mudanças
3. **Terceiro passo:** Consulte [ADICIONAR_PAGINAS.md](./ADICIONAR_PAGINAS.md) para criar sua primeira página
4. Use os componentes existentes como referência

### Para Adicionar uma Nova Página

1. Crie o componente em `src/components/sua-pagina/`
2. Adicione a rota em `src/config/routes.js`
3. Pronto! A página estará disponível

Veja o guia completo em [ADICIONAR_PAGINAS.md](./ADICIONAR_PAGINAS.md)

### Para Executar o Projeto

1. Instale as dependências: `npm install` (na pasta `cbpi5ui/`)
2. Execute em desenvolvimento: `npm start`
3. Acesse: `http://localhost:3000`

Veja o guia completo em [GUIA_EXECUCAO_BUILD.md](./GUIA_EXECUCAO_BUILD.md)

### Para Adicionar uma Nova Funcionalidade

1. Crie a API em `src/components/data/` se necessário
2. Crie os componentes necessários
3. Adicione as rotas em `src/config/routes.js`
4. Documente no [CHANGELOG_V4_TO_V5.md](./CHANGELOG_V4_TO_V5.md)

---

## 📝 Como Atualizar a Documentação

### Quando Fazer Atualizações

Atualize o `CHANGELOG_V4_TO_V5.md` sempre que:
- ✅ Adicionar uma nova funcionalidade
- ✅ Modificar comportamento existente
- ✅ Criar novos componentes reutilizáveis
- ✅ Mudar estrutura de arquivos
- ✅ Adicionar novas APIs
- ✅ Melhorar interfaces existentes

### Formato de Atualização

Adicione uma nova seção no histórico:

```markdown
### [Data] - [Título da Mudança]

#### Mudanças
- ✅ O que foi feito
- ✅ O que foi melhorado
- ✅ O que foi adicionado

#### Arquivos Modificados
- `caminho/do/arquivo.js` - Descrição da mudança
- `outro/arquivo.js` - Outra mudança

#### Como Usar
[Instruções de como usar a nova funcionalidade]
```

---

## 🔍 Estrutura do Projeto

```
craftbeerpi5-ui/
└── cbpi5ui/
    └── src/
        ├── config/
        │   └── routes.js          ← Configuração de rotas
        ├── components/            ← Componentes React
        ├── docs/                  ← 📚 Esta documentação
        │   ├── README.md          ← Este arquivo
        │   ├── CHANGELOG_V4_TO_V5.md  ← Documento principal
        │   └── ADICIONAR_PAGINAS.md   ← Guia de páginas
        └── App.js                 ← App principal
```

---

## 📖 Recursos Adicionais

### Documentação Externa
- [Material-UI v4](https://v4.mui.com/) - Biblioteca de componentes
- [React Router v5](https://v5.reactrouter.com/) - Roteamento
- [React Hooks](https://react.dev/reference/react) - Documentação oficial

### APIs Disponíveis
Todas as APIs estão em `src/components/data/`:
- `actorapi.js` - Atuadores
- `sensorapi.js` - Sensores
- `kettleapi.js` - Panelas
- `configapi.js` - Configurações
- `systemapi.js` - Sistema
- E mais...

---

## 💡 Dicas

1. **Sempre consulte o CHANGELOG primeiro** - Ele contém todas as informações importantes
2. **Use os componentes existentes como referência** - Eles mostram padrões do projeto
3. **Mantenha a documentação atualizada** - Ajude outros desenvolvedores
4. **Siga as boas práticas** - Documentadas no CHANGELOG

---

## 📞 Suporte

Para dúvidas:
1. Consulte a documentação nesta pasta
2. Verifique os componentes existentes
3. Consulte a documentação do Material-UI

---

**Última atualização:** 2024  
**Versão:** CraftBeerPi 5.0

