import { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (recommendedPlan: string) => void;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: {
    id: string;
    text: string;
    value: number;
  }[];
}

export const QuizModal = ({ isOpen, onClose, onComplete }: QuizModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  
  // Reset state when modal is opened
  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setAnswers({});
      setEmail('');
      setName('');
      setResult(null);
      setLoading(false);
    }
  }, [isOpen]);
  
  const questions: QuizQuestion[] = [
    {
      id: 'faturamento',
      question: 'Qual é o faturamento mensal aproximado da sua empresa?',
      options: [
        { id: 'fat1', text: 'Entre R$20 mil e R$50 mil', value: 1 },
        { id: 'fat2', text: 'Entre R$50 mil e R$100 mil', value: 2 },
        { id: 'fat3', text: 'Entre R$100 mil e R$500 mil', value: 3 },
        { id: 'fat4', text: 'Acima de R$500 mil', value: 4 }
      ]
    },
    {
      id: 'experiencia',
      question: 'Você já investiu em marketing digital antes?',
      options: [
        { id: 'exp1', text: 'Nunca investi', value: 1 },
        { id: 'exp2', text: 'Investi pouco, sem resultados significativos', value: 2 },
        { id: 'exp3', text: 'Invisto regularmente, com resultados moderados', value: 3 },
        { id: 'exp4', text: 'Invisto bastante, mas quero otimizar resultados', value: 4 }
      ]
    },
    {
      id: 'funcionarios',
      question: 'Quantos funcionários sua empresa possui?',
      options: [
        { id: 'func1', text: 'Até 5 funcionários', value: 1 },
        { id: 'func2', text: 'Entre 6 e 15 funcionários', value: 2 },
        { id: 'func3', text: 'Entre 16 e 50 funcionários', value: 3 },
        { id: 'func4', text: 'Mais de 50 funcionários', value: 4 }
      ]
    },
    {
      id: 'redes',
      question: 'Sua empresa está presente em quais redes sociais?',
      options: [
        { id: 'rede1', text: 'Nenhuma ou apenas uma rede social', value: 1 },
        { id: 'rede2', text: 'Duas ou três redes sociais', value: 2 },
        { id: 'rede3', text: 'Várias redes, mas com pouca estratégia', value: 3 },
        { id: 'rede4', text: 'Várias redes, com estratégia definida', value: 4 }
      ]
    },
    {
      id: 'objetivo',
      question: 'Qual é o principal objetivo da sua empresa com marketing digital?',
      options: [
        { id: 'obj1', text: 'Aumentar visibilidade da marca', value: 1 },
        { id: 'obj2', text: 'Gerar mais leads qualificados', value: 2 },
        { id: 'obj3', text: 'Aumentar vendas diretas', value: 3 },
        { id: 'obj4', text: 'Estratégia completa de crescimento', value: 4 }
      ]
    }
  ];
  
  const handleSelectOption = (questionId: string, value: number) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: value
    }));
    
    // Move to next question or show result
    if (currentStep < questions.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      // Last question answered, move to contact info
      setCurrentStep(questions.length);
    }
  };
  
  const handleSubmitContactInfo = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Calculate result based on answers
    setTimeout(() => {
      const totalScore = Object.values(answers).reduce((sum, value) => sum + value, 0);
      const averageScore = totalScore / questions.length;
      
      let recommendedPlan = '';
      
      if (averageScore <= 2) {
        recommendedPlan = 'Starter';
      } else if (averageScore <= 3) {
        recommendedPlan = 'Aceleração';
      } else {
        recommendedPlan = 'Crescimento Exponencial';
      }
      
      setResult(recommendedPlan);
      setLoading(false);
      
      // Optional: track quiz completion
      if (typeof window !== 'undefined') {
        // Analytics tracking would go here
      }
    }, 1500);
  };
  
  const handleComplete = () => {
    if (result) {
      onComplete(result);
      onClose();
    }
  };
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-primary">
              {result ? 'Seu Resultado' : 'Descubra o Plano Ideal'}
            </h3>
            <button 
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
              aria-label="Fechar"
            >
              <FaTimes />
            </button>
          </div>
          
          {/* Progress bar */}
          {!result && (
            <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6 dark:bg-gray-700">
              <div 
                className="bg-primary h-2.5 rounded-full transition-all duration-300" 
                style={{ 
                  width: `${currentStep >= questions.length 
                    ? 100 
                    : (currentStep / questions.length) * 100}%` 
                }}
              ></div>
            </div>
          )}
          
          {/* Questions */}
          {currentStep < questions.length && (
            <div className="mb-6">
              <h4 className="text-lg font-medium mb-4">{questions[currentStep].question}</h4>
              <div className="space-y-3">
                {questions[currentStep].options.map(option => (
                  <button
                    key={option.id}
                    onClick={() => handleSelectOption(questions[currentStep].id, option.value)}
                    className={`w-full text-left p-3 border rounded-lg transition-colors ${
                      answers[questions[currentStep].id] === option.value
                        ? 'bg-primary text-white border-primary'
                        : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    {option.text}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Contact info form */}
          {currentStep === questions.length && !result && (
            <form onSubmit={handleSubmitContactInfo} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="quiz-name">
                  Nome
                </label>
                <input
                  id="quiz-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 focus:ring-primary focus:border-primary"
                  required
                  placeholder="Seu nome"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="quiz-email">
                  Email
                </label>
                <input
                  id="quiz-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border rounded dark:bg-gray-700 dark:border-gray-600 focus:ring-primary focus:border-primary"
                  required
                  placeholder="seu@email.com"
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary hover:bg-opacity-90 text-white py-3 px-4 rounded font-medium transition-colors disabled:opacity-70"
              >
                {loading ? 'Analisando respostas...' : 'Ver meu plano recomendado'}
              </button>
              
              <p className="text-xs text-center text-gray-500 dark:text-gray-400">
                Seus dados estão seguros e não serão compartilhados com terceiros.
              </p>
            </form>
          )}
          
          {/* Result */}
          {result && (
            <div className="text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h4 className="text-xl font-bold mb-2">Plano Recomendado: {result}</h4>
              
              <p className="mb-6 text-gray-600 dark:text-gray-300">
                Com base nas suas respostas, identificamos que o plano {result} é o mais adequado para as necessidades da sua empresa.
              </p>
              
              {result === 'Starter' && (
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6 text-left">
                  <h5 className="font-semibold mb-2">Por que o plano Starter é ideal para você:</h5>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Perfeito para empresas que estão começando no marketing digital</li>
                    <li>Foco em uma campanha direcionada para resultados rápidos</li>
                    <li>Investimento inicial acessível com alto retorno</li>
                    <li>Acompanhamento personalizado para primeiros passos</li>
                  </ul>
                </div>
              )}
              
              {result === 'Aceleração' && (
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6 text-left">
                  <h5 className="font-semibold mb-2">Por que o plano Aceleração é ideal para você:</h5>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Ideal para empresas que já têm experiência com marketing digital</li>
                    <li>Estratégias avançadas para dobrar seu ROI atual</li>
                    <li>Landing pages otimizadas para alta conversão</li>
                    <li>Análise detalhada de dados para otimização contínua</li>
                  </ul>
                </div>
              )}
              
              {result === 'Crescimento Exponencial' && (
                <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg mb-6 text-left">
                  <h5 className="font-semibold mb-2">Por que o plano Crescimento Exponencial é ideal para você:</h5>
                  <ul className="list-disc pl-5 space-y-1 text-sm">
                    <li>Perfeito para empresas que buscam escalar rapidamente</li>
                    <li>Estratégia omnichannel para maximizar alcance e conversão</li>
                    <li>Otimização contínua baseada em dados avançados</li>
                    <li>Acompanhamento estratégico com especialistas dedicados</li>
                  </ul>
                </div>
              )}
              
              <button
                onClick={handleComplete}
                className="w-full bg-primary hover:bg-opacity-90 text-white py-3 px-4 rounded font-medium transition-colors"
              >
                Contratar Plano {result}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
