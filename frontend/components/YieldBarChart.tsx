"use client"

import Image from "next/image"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'

// 1. O SEGREDO ESTÁ AQUI: Agrupamos os dois valores em um único objeto!
const data = [
  { name: 'Resumo', Aportes: 12500, Rendimento: 3250 },
]

const chartConfig = [
  { key: 'Aportes', color: '#1F4842' },
  { key: 'Rendimento', color: '#B8F59D' }
]

export default function YieldBarChart() {
  const renderCustomLegend = () => {
    return (
      <div className="flex justify-center items-center gap-6 mt-2">
        {chartConfig.map((item, index) => (
          <div key={`legend-${index}`} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: item.color }}
            />
            <span className="text-[12px] font-medium text-primary-color-green">
              {item.key}
            </span>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="w-full h-87.5 xl:h-full rounded-2xl border-2 border-line-gray p-6 shadow-md flex flex-col gap-4">
      
      <div className="flex flex-col justify-between items-center md:flex-row shrink-0 gap-4">
        <h2 className="text-primary-color-green font-bold text-lg lg:text-xl">Aportes x Rendimento</h2>
        
        <div className="relative w-full md:w-auto">
          <select className="appearance-none border border-line-gray text-primary-color-green font-semibold rounded-xl px-4 py-2 pr-7 outline-none cursor-pointer w-full focus:border-primary-color transition-colors text-sm">
            <option>Plataforma</option>
            <option>Nubank</option>
            <option>XP Investimentos</option>
            <option>Rico</option>
            <option>Binance</option>
          </select>
          <Image src="/img-arrow-down.png" alt="Seta" width={12} height={12} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          
          <BarChart data={data} layout="vertical" barGap={12} margin={{ top: 0, right: 20, left: 0, bottom: 0 }}>
            
            <CartesianGrid strokeDasharray="3 3" horizontal={false} vertical={true} stroke="#EDEDEF" />
            <XAxis type="number" axisLine={false} tickLine={false} tick={{ fill: '#898989', fontSize: 10 }} tickFormatter={(val) => `R$${val}`} />
            <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={false} width={10} />
            
            <Tooltip 
              cursor={{ fill: '#f4f4f5' }} 
              contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '4px 4px 8px -1px rgb(0 0 0 / 0.1)' }}
              formatter={(value: any, name: any) => [`R$ ${value}`, name]} 
            />
            
            <Legend 
              verticalAlign="bottom" 
              content={renderCustomLegend} 
            />
            
            <Bar dataKey="Aportes" fill="#1F4842" radius={[8, 8, 8, 8]} barSize={40} />
            <Bar dataKey="Rendimento" fill="#B8F59D" radius={[8, 8, 8, 8]} barSize={40} />
            
          </BarChart>
          
        </ResponsiveContainer>
      </div>

    </div>
  )
}