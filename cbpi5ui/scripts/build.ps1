# Script PowerShell para fazer build de produção
# Compatível com Node.js 17+

$env:NODE_OPTIONS = "--openssl-legacy-provider"
npm run build

