"use client"

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { mes: 'Jan', patrimonio: 9200 },
  { mes: 'Fev', patrimonio: 9500 },
  { mes: 'Mar', patrimonio: 10100 },
  { mes: 'Abr', patrimonio: 10800 },
  { mes: 'Mai', patrimonio: 11200 },
  { mes: 'Jun', patrimonio: 11000 },
  { mes: 'Jul', patrimonio: 12500 },
  { mes: 'Ago', patrimonio: 13800 },
  { mes: 'Set', patrimonio: 14200 },
  { mes: 'Out', patrimonio: 14000 },
  { mes: 'Nov', patrimonio: 14800 },
  { mes: 'Dez', patrimonio: 15430 },
]

export default function GrowthAreaChart() {
  return (
    <div className="w-full h-87.5 xl:h-full rounded-2xl border-2 border-line-gray p-4 lg:p-6 shadow-md flex flex-col gap-4">
      
      <div className="flex flex-col justify-between items-center md:flex-row">
        <h2 className="text-primary-color-green font-bold text-lg lg:text-xl">Crescimento patrimonial</h2>
        <span className="text-sm font-semibold text-secondary-color-green">+46.9%</span>
      </div>

      <div className="flex-1 w-full min-h-0 pr-4 overflow-x-auto custom-scrollbar xl:h-full">
        <div className="h-full min-w-125 md:min-w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
          
          <AreaChart data={data} margin={{ top: 10, right: 0, left: 5, bottom: 0 }}>
            <defs>
              <linearGradient id="colorPatrimonio" x1="0" y1="0" x2="0" y2="1">
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
              formatter={(value: any) => [`R$ ${value}`, 'Patrimônio']} 
            />
            
            <Area 
              type="monotone"
              dataKey="patrimonio" 
              stroke="#1F4842" 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorPatrimonio)" 
            />
          </AreaChart>
          
        </ResponsiveContainer>
        </div>
      </div>

    </div>
  )
}