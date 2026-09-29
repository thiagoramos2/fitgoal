import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { supabase } from '../lib/supabase';

const cadastroSchema = z.object({
  nome: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  email: z.string().email('Email inválido'),
  senha: z.string().min(8, 'Senha deve ter pelo menos 8 caracteres'),
  confirmarSenha: z.string(),
  dataNascimento: z.string().refine((data) => {
    const hoje = new Date();
    const nascimento = new Date(data);
    const idade = hoje.getFullYear() - nascimento.getFullYear();
    return idade >= 14;
  }, 'Você deve ter pelo menos 14 anos'),
  termos: z.boolean().refine((value) => value === true, 'Você deve aceitar os termos de uso')
}).refine((data) => data.senha === data.confirmarSenha, {
  message: "As senhas não coincidem",
  path: ["confirmarSenha"],
});

type CadastroForm = z.infer<typeof cadastroSchema>;

export default function Cadastro() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CadastroForm>({
    resolver: zodResolver(cadastroSchema)
  });

  const onSubmit = async (data: CadastroForm) => {
    try {
      setError(null);
      
      const { error: signUpError } = await supabase.auth.signUp({
        email: data.email,
        password: data.senha,
        options: {
          data: {
            nome: data.nome,
            data_nascimento: data.dataNascimento
          }
        }
      });

      if (signUpError) throw signUpError;

      // Redireciona para a página de avaliação
      navigate('/avaliacao');
    } catch (err) {
      console.error('Erro no cadastro:', err);
      setError(err instanceof Error ? err.message : 'Erro ao criar conta. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-8">
            Criar sua conta FitGoal
          </h2>
          
          {error && (
            <div className="mb-4 p-4 text-sm text-red-700 bg-red-100 rounded-lg">
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-gray-700">
                Nome completo
              </label>
              <input
                type="text"
                id="nome"
                {...register('nome')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              {errors.nome && (
                <p className="mt-1 text-sm text-red-600">{errors.nome.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register('email')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="dataNascimento" className="block text-sm font-medium text-gray-700">
                Data de Nascimento
              </label>
              <input
                type="date"
                id="dataNascimento"
                {...register('dataNascimento')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              {errors.dataNascimento && (
                <p className="mt-1 text-sm text-red-600">{errors.dataNascimento.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="senha" className="block text-sm font-medium text-gray-700">
                Senha
              </label>
              <input
                type="password"
                id="senha"
                {...register('senha')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              {errors.senha && (
                <p className="mt-1 text-sm text-red-600">{errors.senha.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="confirmarSenha" className="block text-sm font-medium text-gray-700">
                Confirmar Senha
              </label>
              <input
                type="password"
                id="confirmarSenha"
                {...register('confirmarSenha')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
              {errors.confirmarSenha && (
                <p className="mt-1 text-sm text-red-600">{errors.confirmarSenha.message}</p>
              )}
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="termos"
                {...register('termos')}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="termos" className="ml-2 block text-sm text-gray-900">
                Eu aceito os <a href="#" className="text-blue-600 hover:text-blue-500">termos de uso</a>
              </label>
            </div>
            {errors.termos && (
              <p className="text-sm text-red-600">{errors.termos.message}</p>
            )}

            <div>
              <Button 
                type="submit" 
                className="w-full justify-center"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Criando conta...' : 'Criar conta'}
              </Button>
            </div>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Já tem uma conta?{' '}
            <a href="/login" className="font-medium text-blue-600 hover:text-blue-500">
              Faça login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}