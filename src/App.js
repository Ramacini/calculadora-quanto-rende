import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Calculator, TrendingUp, Mail, Phone, User, DollarSign } from 'lucide-react';

const CalculadoraQuantoRende = () => {
  const [valorInicial, setValorInicial] = useState(10000);
  const [taxaJuros, setTaxaJuros] = useState(12);
  const [periodo, setPeriodo] = useState(5);
  const [investimentoMensal, setInvestimentoMensal] = useState(500);
  const [resultados, setResultados] = useState(null);
  const [dadosGrafico, setDadosGrafico] = useState([]);
  const [pessoasHoje, setPessoasHoje] = useState(0);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  const [leadCapturado, setLeadCapturado] = useState(false);
  const [emailEnviado, setEmailEnviado] = useState(false);
  
  // Estados do formulário
  const [nome, setNome] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [investimentoAtual, setInvestimentoAtual] = useState('');
  const [aporteMensal, setAporteMensal] = useState('');
  const [aceitaTermos, setAceitaTermos] = useState(false);

  // Simular contador de pessoas que usaram hoje
  useEffect(() => {
    const baseCount = 43;
    const variacao = Math.floor(Math.random() * 15) + 1;
    setPessoasHoje(baseCount + variacao);
  }, []);

  // Função para calcular juros compostos
  const calcularJurosCompostos = () => {
    const taxaMensal = taxaJuros / 100 / 12;
    const taxaPoupanca = 0.5 / 100; // 0.5% ao mês (aproximadamente 6.17% ao ano)
    const meses = periodo * 12;
    
    let saldo = valorInicial;
    let saldoPoupanca = valorInicial;
    const evolucao = [];
    
    for (let mes = 0; mes <= meses; mes++) {
      if (mes > 0) {
        saldo = saldo * (1 + taxaMensal) + investimentoMensal;
        saldoPoupanca = saldoPoupanca * (1 + taxaPoupanca) + investimentoMensal;
      }
      
      if (mes % 6 === 0) { // Adiciona ponto a cada 6 meses
        evolucao.push({
          mes: mes / 12,
          valor: Math.round(saldo),
          poupanca: Math.round(saldoPoupanca),
          investido: valorInicial + (investimentoMensal * mes),
          contaCorrente: valorInicial + (investimentoMensal * mes) // Sem rendimento
        });
      }
    }
    
    const valorFinal = saldo;
    const valorFinalPoupanca = saldoPoupanca;
    const totalInvestido = valorInicial + (investimentoMensal * meses);
    const totalRendimentos = valorFinal - totalInvestido;
    const totalRendimentosPoupanca = valorFinalPoupanca - totalInvestido;
    const percentualGanho = ((valorFinal - totalInvestido) / totalInvestido) * 100;
    const diferencaPoupanca = valorFinal - valorFinalPoupanca;
    const diferencaContaCorrente = valorFinal - totalInvestido;
    
    setResultados({
      valorFinal: Math.round(valorFinal),
      valorFinalPoupanca: Math.round(valorFinalPoupanca),
      totalInvestido: Math.round(totalInvestido),
      totalRendimentos: Math.round(totalRendimentos),
      totalRendimentosPoupanca: Math.round(totalRendimentosPoupanca),
      percentualGanho: Math.round(percentualGanho * 100) / 100,
      diferencaPoupanca: Math.round(diferencaPoupanca),
      diferencaContaCorrente: Math.round(diferencaContaCorrente)
    });
    
    setDadosGrafico(evolucao);
  };

  useEffect(() => {
    calcularJurosCompostos();
  }, [valorInicial, taxaJuros, periodo, investimentoMensal]);

  const formatarMoeda = (valor) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  const handleVerResultados = () => {
    setMostrarFormulario(true);
  };

  const handleEnviarFormulario = () => {
    if (!nome || !whatsapp || !email || !investimentoAtual || !aporteMensal || !aceitaTermos) {
      alert('Por favor, preencha todos os campos e aceite os termos.');
      return;
    }
    
    // Capturar lead e liberar resultados
    setLeadCapturado(true);
    setMostrarFormulario(false);
    setEmailEnviado(true);
    
    // Esconder mensagem de email enviado após 3 segundos
    setTimeout(() => {
      setEmailEnviado(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-6 lg:py-8 px-3 lg:px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-6 lg:mb-8">
          <div className="flex items-center justify-center gap-2 lg:gap-3 mb-3 lg:mb-4">
            <Calculator className="text-blue-600" size={32} />
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800">Quanto Rende</h1>
          </div>
          <p className="text-base lg:text-lg text-gray-600 mb-3 lg:mb-4 px-2">Descubra o poder dos juros compostos nos seus investimentos</p>
          
          {/* Elementos de Urgência */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg p-3 lg:p-4 max-w-sm lg:max-w-md mx-auto">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-green-800 font-semibold text-xs lg:text-sm">✅ Análise gratuita por tempo limitado</p>
            </div>
            <p className="text-green-700 text-xs lg:text-sm">
              <strong>{pessoasHoje} pessoas</strong> já descobriram seu potencial de rendimentos hoje
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Calculadora */}
          <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4 lg:mb-6 flex items-center gap-2">
              <DollarSign className="text-green-600" size={24} />
              Seus Dados de Investimento
            </h2>
            
            <div className="space-y-4 lg:space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Valor Inicial (R$)
                </label>
                <input
                  type="number"
                  value={valorInicial}
                  onChange={(e) => setValorInicial(Number(e.target.value))}
                  className="w-full px-3 py-3 lg:px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                  placeholder="10.000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Taxa de Juros Anual (%)
                </label>
                <input
                  type="number"
                  value={taxaJuros}
                  onChange={(e) => setTaxaJuros(Number(e.target.value))}
                  step="0.1"
                  className="w-full px-3 py-3 lg:px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                  placeholder="12"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Período (anos)
                </label>
                <input
                  type="number"
                  value={periodo}
                  onChange={(e) => setPeriodo(Number(e.target.value))}
                  className="w-full px-3 py-3 lg:px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                  placeholder="5"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Investimento Mensal (R$)
                </label>
                <input
                  type="number"
                  value={investimentoMensal}
                  onChange={(e) => setInvestimentoMensal(Number(e.target.value))}
                  className="w-full px-3 py-3 lg:px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                  placeholder="500"
                />
              </div>

              <button
                onClick={handleVerResultados}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 lg:py-4 px-6 rounded-lg font-semibold text-base lg:text-lg hover:from-blue-700 hover:to-indigo-700 transition duration-300 flex items-center justify-center gap-2"
              >
                <Calculator size={20} />
                Calcular Rendimento
              </button>
            </div>
          </div>

          {/* Área de Resultados */}
          <div className="bg-white rounded-2xl shadow-xl p-6 lg:p-8">
            {!leadCapturado ? (
              // Área bloqueada antes do formulário
              <div className="flex flex-col items-center justify-center h-full text-center py-8 lg:py-12">
                <div className="w-16 lg:w-20 h-16 lg:h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4 lg:mb-6">
                  <Calculator className="text-blue-600" size={32} />
                </div>
                <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-3 lg:mb-4">
                  Quase lá! Vamos calcular seus rendimentos
                </h3>
                <p className="text-gray-600 mb-4 lg:mb-6 max-w-sm text-sm lg:text-base">
                  Para gerar sua simulação personalizada, precisamos de alguns dados básicos. É rápido e você verá os resultados na hora!
                </p>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 lg:p-4 rounded-lg mb-4 lg:mb-6 border border-blue-200 w-full max-w-sm">
                  <p className="text-xs lg:text-sm text-blue-800 font-medium">✨ Sua simulação incluirá:</p>
                  <ul className="text-xs lg:text-sm text-blue-700 mt-2 space-y-1">
                    <li>• Valor final do seu investimento</li>
                    <li>• Gráfico de evolução mês a mês</li>
                    <li>• Comparativo com poupança e conta corrente</li>
                    <li>• Análise do crescimento percentual</li>
                  </ul>
                </div>
                <button
                  onClick={handleVerResultados}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-6 lg:px-8 rounded-lg font-semibold text-sm lg:text-base hover:from-blue-700 hover:to-indigo-700 transition duration-300 flex items-center gap-2"
                >
                  <Calculator size={18} />
                  Gerar Minha Simulação
                </button>
              </div>
            ) : (
              // Resultados liberados após formulário
              <div>
                <h2 className="text-xl lg:text-2xl font-bold text-gray-800 mb-4 lg:mb-6 flex items-center gap-2">
                  <TrendingUp className="text-green-600" size={24} />
                  Seus Resultados, {nome}!
                </h2>
                
                {resultados && (
                  <div className="space-y-4 lg:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
                      <div className="bg-blue-50 p-3 lg:p-4 rounded-lg">
                        <p className="text-xs lg:text-sm text-blue-600 font-medium">Valor Final</p>
                        <p className="text-lg lg:text-2xl font-bold text-blue-800">
                          {formatarMoeda(resultados.valorFinal)}
                        </p>
                      </div>
                      
                      <div className="bg-green-50 p-3 lg:p-4 rounded-lg">
                        <p className="text-xs lg:text-sm text-green-600 font-medium">Rendimentos</p>
                        <p className="text-lg lg:text-2xl font-bold text-green-800">
                          {formatarMoeda(resultados.totalRendimentos)}
                        </p>
                      </div>
                    </div>

                    {/* Comparativos Visuais */}
                    <div className="bg-gradient-to-r from-red-50 to-orange-50 border border-red-200 p-3 lg:p-4 rounded-lg">
                      <h4 className="font-semibold text-red-800 mb-2 lg:mb-3 text-sm lg:text-base">💰 Comparativo: Você perderia...</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4 text-sm">
                        <div>
                          <p className="text-red-600 font-medium text-xs lg:text-sm">vs. Poupança:</p>
                          <p className="text-lg lg:text-xl font-bold text-red-700">
                            {formatarMoeda(resultados.diferencaPoupanca)}
                          </p>
                        </div>
                        <div>
                          <p className="text-red-600 font-medium text-xs lg:text-sm">vs. Conta Corrente:</p>
                          <p className="text-lg lg:text-xl font-bold text-red-700">
                            {formatarMoeda(resultados.diferencaContaCorrente)}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 p-3 lg:p-4 rounded-lg">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs lg:text-sm text-gray-600">
                        <div>
                          <span className="font-medium">Total Investido:</span>
                          <div className="font-semibold">{formatarMoeda(resultados.totalInvestido)}</div>
                        </div>
                        <div>
                          <span className="font-medium">Crescimento:</span>
                          <div className="font-semibold">{resultados.percentualGanho}%</div>
                        </div>
                        <div>
                          <span className="font-medium">Na Poupança seria:</span>
                          <div className="font-semibold text-blue-600">{formatarMoeda(resultados.valorFinalPoupanca)}</div>
                        </div>
                      </div>
                    </div>

                    {/* Gráfico */}
                    <div className="h-48 lg:h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={dadosGrafico}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="mes" 
                            tick={{fontSize: 12}}
                          />
                          <YAxis 
                            tickFormatter={(value) => `R$ ${(value/1000).toFixed(0)}k`}
                            tick={{fontSize: 12}}
                          />
                          <Tooltip 
                            formatter={(value, name) => {
                              const labels = {
                                valor: 'Seu Investimento',
                                poupanca: 'Na Poupança',
                                contaCorrente: 'Conta Corrente',
                                investido: 'Total Investido'
                              };
                              return [formatarMoeda(value), labels[name] || name];
                            }}
                            labelStyle={{fontSize: '12px'}}
                            contentStyle={{fontSize: '12px'}}
                          />
                          <Line type="monotone" dataKey="valor" stroke="#2563eb" strokeWidth={3} name="valor" />
                          <Line type="monotone" dataKey="poupanca" stroke="#f59e0b" strokeWidth={2} strokeDasharray="8 5" name="poupanca" />
                          <Line type="monotone" dataKey="contaCorrente" stroke="#ef4444" strokeWidth={2} strokeDasharray="3 3" name="contaCorrente" />
                          <Line type="monotone" dataKey="investido" stroke="#64748b" strokeWidth={1} strokeDasharray="5 5" name="investido" />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>

                    {/* Legenda do Gráfico */}
                    <div className="bg-white border border-gray-200 p-3 rounded-lg">
                      <p className="text-xs font-medium text-gray-700 mb-2">Legenda do Gráfico:</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-0.5 bg-blue-600"></div>
                          <span className="text-blue-700">Seu Investimento</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-0.5 bg-amber-500" style={{backgroundImage: 'repeating-linear-gradient(90deg, #f59e0b 0, #f59e0b 8px, transparent 8px, transparent 13px)'}}></div>
                          <span className="text-amber-700">Na Poupança</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-0.5 bg-red-500" style={{backgroundImage: 'repeating-linear-gradient(90deg, #ef4444 0, #ef4444 3px, transparent 3px, transparent 6px)'}}></div>
                          <span className="text-red-700">Conta Corrente</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-0.5 bg-gray-500" style={{backgroundImage: 'repeating-linear-gradient(90deg, #64748b 0, #64748b 5px, transparent 5px, transparent 10px)'}}></div>
                          <span className="text-gray-700">Total Investido</span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 border border-green-200 p-3 lg:p-4 rounded-lg">
                      <p className="text-green-800 font-medium text-sm lg:text-base">✅ Simulação gerada com sucesso, {nome}!</p>
                      <p className="text-green-700 text-xs lg:text-sm mt-1">Experimente alterar os valores ao lado para testar diferentes cenários.</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Modal do Formulário */}
        {mostrarFormulario && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 lg:p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[95vh] overflow-y-auto p-4 lg:p-6">
              <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2 text-center">
                Alguns dados para gerar sua simulação
              </h3>
              <p className="text-gray-600 text-center mb-3 lg:mb-4 text-sm lg:text-base">
                Preencha rapidamente para ver seus resultados na tela
              </p>
              <div className="bg-blue-50 border border-blue-200 p-2 lg:p-3 rounded-lg mb-4 lg:mb-6 text-center">
                <p className="text-blue-800 text-xs lg:text-sm font-medium">
                  🔥 <strong>{pessoasHoje}</strong> pessoas já fizeram a simulação hoje
                </p>
              </div>
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 lg:p-4 rounded-lg mb-3 lg:mb-6 border border-blue-200">
                <p className="text-xs lg:text-sm text-blue-800 font-medium">✨ Sua simulação incluirá:</p>
                <ul className="text-xs lg:text-sm text-blue-700 mt-2 space-y-1">
                  <li>• Valor final do seu investimento</li>
                  <li>• Gráfico de evolução mês a mês</li>
                  <li>• Comparativo com poupança e conta corrente</li>
                  <li>• Análise do crescimento percentual</li>
                </ul>
              </div>
              <div className="bg-amber-50 border border-amber-200 p-2 lg:p-3 rounded-lg mb-4 lg:mb-6 text-center">
                <p className="text-amber-800 text-xs lg:text-sm font-medium">
                  ⏰ Análise gratuita disponível por tempo limitado
                </p>
              </div>
              
              <div className="space-y-3 lg:space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                  <input
                    type="text"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="w-full px-3 py-3 lg:px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                    placeholder="Seu nome completo"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">WhatsApp</label>
                  <input
                    type="tel"
                    value={whatsapp}
                    onChange={(e) => setWhatsapp(e.target.value)}
                    className="w-full px-3 py-3 lg:px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                    placeholder="(11) 99999-9999"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-3 lg:px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                    placeholder="seu@email.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quanto você investe hoje?</label>
                  <select
                    value={investimentoAtual}
                    onChange={(e) => setInvestimentoAtual(e.target.value)}
                    className="w-full px-3 py-3 lg:px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                    required
                  >
                    <option value="">Selecione uma opção</option>
                    <option value="ate-150k">Até R$ 150 mil</option>
                    <option value="150k-500k">R$ 150 mil a R$ 500 mil</option>
                    <option value="500k-1m">R$ 500 mil a R$ 1 Milhão</option>
                    <option value="acima-1m">Acima de R$ 1 Milhão</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Qual valor de aporte mensal você costuma fazer?</label>
                  <select
                    value={aporteMensal}
                    onChange={(e) => setAporteMensal(e.target.value)}
                    className="w-full px-3 py-3 lg:px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
                    required
                  >
                    <option value="">Selecione uma opção</option>
                    <option value="ate-3k">Até R$ 3 mil</option>
                    <option value="3k-10k">De R$ 3 a R$ 10 mil</option>
                    <option value="acima-10k">Acima de R$ 10 mil</option>
                  </select>
                </div>

                <div className="flex items-start gap-2">
                  <input
                    type="checkbox"
                    id="termos"
                    checked={aceitaTermos}
                    onChange={(e) => setAceitaTermos(e.target.checked)}
                    className="mt-1 min-w-[16px]"
                    required
                  />
                  <label htmlFor="termos" className="text-xs lg:text-sm text-gray-600">
                    Aceito receber comunicações por email e WhatsApp sobre investimentos e concordo com os termos de uso.
                  </label>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-2 lg:pt-4">
                  <button
                    onClick={() => setMostrarFormulario(false)}
                    className="flex-1 py-3 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition duration-300 text-sm lg:text-base"
                  >
                    Cancelar
                  </button>
                  <button
                    onClick={handleEnviarFormulario}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition duration-300 font-semibold text-sm lg:text-base"
                  >
                    Gerar Simulação
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Confirmação de Email Enviado */}
        {emailEnviado && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 lg:p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 lg:p-8 text-center">
              <div className="w-12 lg:w-16 h-12 lg:h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3 lg:mb-4">
                <TrendingUp className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-2">Simulação Gerada!</h3>
              <p className="text-gray-600 mb-3 lg:mb-4 text-sm lg:text-base">
                Sua análise personalizada está pronta, <strong>{nome}</strong>
              </p>
              <p className="text-xs lg:text-sm text-gray-500">
                Agora você pode explorar diferentes cenários alterando os valores da calculadora e nossa equipe entrará em contato em breve.
              </p>
            </div>
          </div>
        )}

        {/* Explicação sobre Juros Compostos */}
        <div className="mt-8 lg:mt-12 bg-white rounded-2xl shadow-xl p-6 lg:p-8">
          <h3 className="text-xl lg:text-2xl font-bold text-gray-800 mb-3 lg:mb-4">Por que investir ao invés de deixar na poupança?</h3>
          <p className="text-gray-600 mb-4 lg:mb-6 text-sm lg:text-base">
            Nossa calculadora compara automaticamente seu investimento com a poupança e conta corrente. Veja a diferença que uma boa estratégia de investimento pode fazer no seu patrimônio ao longo do tempo.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 lg:gap-6">
            <div className="bg-blue-50 p-4 lg:p-6 rounded-lg">
              <h4 className="font-semibold text-blue-800 mb-2 text-sm lg:text-base">💰 Investimento Inteligente</h4>
              <p className="text-xs lg:text-sm text-blue-600">Com juros compostos, você ganha rendimentos sobre seus rendimentos anteriores, criando um efeito "bola de neve".</p>
            </div>
            <div className="bg-amber-50 p-4 lg:p-6 rounded-lg">
              <h4 className="font-semibold text-amber-800 mb-2 text-sm lg:text-base">📊 Poupança (6% ao ano)</h4>
              <p className="text-xs lg:text-sm text-amber-600">Segura, mas com rendimento baixo que mal acompanha a inflação ao longo do tempo.</p>
            </div>
            <div className="bg-red-50 p-4 lg:p-6 rounded-lg">
              <h4 className="font-semibold text-red-800 mb-2 text-sm lg:text-base">😰 Conta Corrente (0%)</h4>
              <p className="text-xs lg:text-sm text-red-600">Seu dinheiro perde valor real devido à inflação. É literalmente jogar dinheiro fora!</p>
            </div>
          </div>
          
          <div className="mt-4 lg:mt-6 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 p-3 lg:p-4 rounded-lg text-center">
            <p className="text-green-800 font-semibold text-sm lg:text-base">
              💡 A diferença pode ser de centenas de milhares de reais ao longo dos anos!
            </p>
          </div>
          
          {/* Footer com branding */}
          <div className="mt-6 lg:mt-8 pt-4 lg:pt-6 border-t border-gray-200 text-center">
            <p className="text-blue-600 font-semibold text-sm lg:text-base mb-1">
              www.quantorende.com.br
            </p>
            <p className="text-gray-500 text-xs lg:text-sm">
              Calculadora gratuita de rendimentos de investimentos
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculadoraQuantoRende;