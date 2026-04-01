"use client"

import Image from "next/image"
import { useState, useEffect } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface BarDataItem {
  mes: string
  total: number
}

interface FilterOption {
  label: string
  options: string[]
}

interface CustomBarChartProps {
  title?: string
  tooltipLabel?: string
  data: BarDataItem[]
  filters?: FilterOption[]
}

export default function CustomBarChart({ title = "Análise em meses", tooltipLabel = "Total", data, filters = [] }: CustomBarChartProps) {

  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth)
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const isMobile = windowWidth < 768
  const currentBarSize = isMobile ? 20 : 40

  return (
    <div className="w-full rounded-2xl border-2 border-line-gray p-4 lg:p-6 shadow-md flex flex-col gap-6 xl:h-full">
      
      {/* CABEÇALHO DO GRÁFICO */}
      <div className="flex flex-col justify-center items-center gap-4 lg:flex-row lg:justify-between flex-shrink-0">
        <h2 className="text-primary-color-green font-bold text-xl">{title}</h2>
        
        {/* FILTROS DINÂMICOS */}
        <div className="flex flex-wrap items-center justify-center gap-3 w-full lg:w-auto">
          {filters.map((filter, index) => (
            <div key={`filter-${index}`} className="relative">
              <select className="appearance-none border border-line-gray text-primary-color-green font-semibold rounded-xl px-4 py-2 pr-8 outline-none cursor-pointer w-full focus:border-primary-color transition-colors text-sm">
                <option>{filter.label}</option>
                {filter.options.map((opt, i) => (
                  <option key={i}>{opt}</option>
                ))}
              </select>
              <Image src="/img-arrow-down.png" alt="Seta" width={12} height={12} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          ))}
        </div>
      </div>

      {/* ÁREA DO GRÁFICO */}
      <div className="w-full overflow-x-auto custom-scrollbar xl:flex-1 xl:min-h-0">
        <div className="h-75 xl:h-full min-w-125 md:min-w-full pr-4">
          <ResponsiveContainer width="100%" height="100%">
            
            <BarChart data={data} margin={{ top: 20, right: 0, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EDEDEF" />
              <XAxis dataKey="mes" axisLine={false} tickLine={false} tick={{ fill: '#898989', fontSize: 12 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#898989', fontSize: 10 }} tickFormatter={(value) => `R$${value}`} />
              
              <Tooltip 
                cursor={{ fill: '#f4f4f5' }} 
                contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '4px 4px 8px -1px rgb(0 0 0 / 0.1)' }}
                formatter={(value: any) => [`R$ ${value}`, tooltipLabel]} // Tooltip dinâmico!
              />
              
              <Bar dataKey="total" fill="#1F4842" radius={[8, 8, 8, 8]} maxBarSize={currentBarSize} />
            </BarChart>

          </ResponsiveContainer>
        </div>
      </div>

    </div>
  )
}