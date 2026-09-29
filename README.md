# FitGoal

Landing page e cadastro de um personal trainer digital. A proposta é gerar planos de treino e nutrição com inteligência artificial, acompanhar evolução e responder dúvidas em um chat.

O que está implementado hoje:

- página inicial com a proposta do produto
- formulário de cadastro com validação (nome, e-mail, idade mínima de 14 anos, senha e termos)
- criação de conta via Supabase Auth

Ainda não existem as telas de login, avaliação física, planos, progresso e chat. Os botões dessas áreas apontam para rotas que ainda não foram criadas.

## Stack

React 18, TypeScript, Vite, Tailwind CSS, React Router, React Hook Form, Zod e Supabase.

## Como rodar

```bash
npm install
cp .env.example .env
npm run dev
```

No `.env`, preencha `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` com os dados do projeto no [Supabase](https://supabase.com). Use a chave pública (`anon`). Não commite o arquivo `.env`.
