#!/bin/bash
# Script Bash para fazer build de produção
# Compatível com Node.js 17+

export NODE_OPTIONS="--openssl-legacy-provider"
npm run build

