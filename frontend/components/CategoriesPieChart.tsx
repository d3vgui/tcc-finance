"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

const data = [
  { name: 'Gastos diversos', value: 450 },
  { name: 'Cartão de crédito', value: 1200 },
  { name: 'Gastos mensais', value: 850 },
]

const colors = ['#00927D', '#1F4842', '#B8F59D'];

export default function CategoriesPieChart() {
  return (
    <div className="w-full h-87.5 xl:h-full rounded-2xl border-2 border-line-gray p-4 lg:p-6 shadow-md flex flex-col gap-4">
      <div className="flex flex-col justify-between items-center md:flex-row">
        <h2 className="text-primary-color-green font-bold text-lg lg:text-xl">Gastos por categoria</h2>
        <span className="text-sm font-semibold text-text-login">Março 2026</span>
      </div>

      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={40}
              outerRadius={90}
              paddingAngle={0} // ESPAÇO ENTRE AS FATIAS
              dataKey="value"
              stroke="none" // TIRA A BORDA BRANCA PADRÃO DAS FATIAS
            >
              {/* Esse map pinta cada fatia com as cores do array colors */}
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            
            <Tooltip 
              contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '4px 4px 8px -1px rgb(0 0 0 / 0.1)' }}
              formatter={(value: any) => [`R$ ${value}`, 'Total']} 
            />
            
            {/* A LEGENDA DO GRÁFICO */}
            <Legend 
              verticalAlign="bottom" 
              height={36}
              iconType="circle" // A BOLINHA DA LEGENDA
              wrapperStyle={{ fontSize: '12px', fontWeight: '500', color: '#1F4842' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  )
}