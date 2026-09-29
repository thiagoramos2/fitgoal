import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Dumbbell } from 'lucide-react';
import Button from './components/Button';
import Cadastro from './pages/Cadastro';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Dumbbell className="h-8 w-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">FitGoal</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="outline">Entrar</Button>
              </Link>
              <Link to="/cadastro">
                <Button>Cadastrar</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl md:text-6xl">
            Seu Personal Trainer
            <span className="text-blue-600"> com Inteligência Artificial</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Alcance seus objetivos fitness com planos de treino e nutrição personalizados, desenvolvidos com inteligência artificial.
          </p>
          <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
            <div className="rounded-md shadow">
              <Link to="/cadastro">
                <Button size="lg">
                  Começar Agora
                </Button>
              </Link>
            </div>
            <div className="mt-3 sm:mt-0 sm:ml-3">
              <Button variant="outline" size="lg">
                Saiba Mais
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {[
            {
              title: 'Planos Personalizados',
              description: 'Receba planos de treino e nutrição gerados por IA, adaptados aos seus objetivos e nível de condicionamento.',
              image: 'https://images.unsplash.com/photo-1594737625785-a6cbdabd333c?auto=format&fit=crop&q=80&w=400'
            },
            {
              title: 'Acompanhamento de Progresso',
              description: 'Acompanhe suas medidas, peso e fotos para visualizar sua evolução ao longo do tempo.',
              image: 'https://images.unsplash.com/photo-1576678927484-cc907957088c?auto=format&fit=crop&q=80&w=400'
            },
            {
              title: 'Chat com IA',
              description: 'Tire suas dúvidas sobre treino e nutrição instantaneamente com nosso coach virtual.',
              image: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?auto=format&fit=crop&q=80&w=400'
            }
          ].map((feature, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <img className="h-48 w-full object-cover" src={feature.image} alt={feature.title} />
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-base text-gray-500">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </Router>
  );
}

export default App;