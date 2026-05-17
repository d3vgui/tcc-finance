"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface DataItem {
  mes: string
  receita: number
  [key: string]: any
}

interface GrowthAreaChartProps {
  title?: string
  data?: DataItem[]
}

export default function GrowthAreaChart({ title = "Crescimento patrimonial", data = [] }: GrowthAreaChartProps) {
  
  // LÓGICA PARA REMOVER MESES INICIAIS ZERADOS
  // Encontramos o índice do primeiro mês que teve receita > 0
  const primeiroMesComDadosIndex = data.findIndex(item => item.receita > 0);
  
  const dadosFiltrados = primeiroMesComDadosIndex !== -1 
    ? data.slice(primeiroMesComDadosIndex) 
    : [];

  // LÓGICA DO CRESCIMENTO PERCENTUAL
  let percentualCrescimento = 0;
  if (dadosFiltrados.length >= 2) {
    const valorInicial = dadosFiltrados[0].receita;
    const valorFinal = dadosFiltrados[dadosFiltrados.length - 1].receita;
    percentualCrescimento = ((valorFinal - valorInicial) / valorInicial) * 100;
  } else if (dadosFiltrados.length === 1) {
    percentualCrescimento = 100;
  }

  const isPositive = percentualCrescimento >= 0;

  return (
    <div className="w-full h-87.5 xl:h-full rounded-2xl border-2 border-line-gray p-4 lg:p-6 shadow-md flex flex-col gap-4">
      
      <div className="flex flex-col justify-between items-center md:flex-row">
        <h2 className="text-primary-color-green font-bold text-lg lg:text-xl">{title}</h2>
        {dadosFiltrados.length > 0 && (
          <span className={`text-sm font-semibold ${isPositive ? 'text-secondary-color-green' : 'text-red-500'}`}>
            {isPositive ? '+' : ''}{percentualCrescimento.toFixed(1)}%
          </span>
        )}
      </div>

      <div className="flex-1 w-full min-h-0 pr-4 overflow-x-auto custom-scrollbar xl:h-full">
        <div className="h-full min-w-125 md:min-w-full pt-2">
          
          {/* VERIFICAÇÃO DE DADOS EXISTENTES */}
          {dadosFiltrados.length === 0 ? (
            <div className="w-full h-full flex items-center justify-center text-gray-400 font-medium">
              Nenhuma receita registrada para gerar o gráfico.
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dadosFiltrados} margin={{ top: 10, right: 0, left: 5, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorReceita" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1F4842" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#1F4842" stopOpacity={0}/>
                  </linearGradient>
                </defs>

                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EDEDEF" />
                <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fill: '#898989', fontSize: 10 }} dy={12} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#898989', fontSize: 10 }} tickFormatter={(value) => `R$${value}`} />
                
                <Tooltip 
                  cursor={{ stroke: '#898989', strokeWidth: 1, strokeDasharray: '3 3' }} 
                  contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '4px 4px 8px -1px rgb(0 0 0 / 0.1)' }}
                  formatter={(value: any) => [`R$ ${value}`, 'Receita']} 
                />
                
                <Area 
                  type="monotone"
                  dataKey="receita" 
                  stroke="#1F4842" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorReceita)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>
    </div>
  );
}