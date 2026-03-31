"use client"

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

interface DataItem{
  name: string
  value: number
}

interface CustomPieChartProps {
  title?: string
  subtitle?: string
  data: DataItem[]
  colors?: string[]
}

const defaultColors = ['#00927D', '#1F4842', '#B8F59D', '#03B99E'];

export default function CustomPieChart({ title, subtitle, data, colors = defaultColors }: CustomPieChartProps) {
  return (
    <div className="w-full h-87.5 xl:h-full rounded-2xl border-2 border-line-gray p-6 shadow-md flex flex-col">
      
      <div className="flex flex-col justify-between items-center md:flex-row shrink-0">
        <h2 className="text-primary-color-green font-bold text-lg lg:text-xl">{title}</h2>
        <span className="text-sm font-semibold text-text-login">{subtitle}</span>
      </div>

      <div className="flex-1 w-full min-h-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={30}
              outerRadius={70}
              paddingAngle={0}
              dataKey="value"
              stroke="none"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
              ))}
            </Pie>
            
            <Tooltip 
              contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '4px 4px 8px -1px rgb(0 0 0 / 0.1)' }}
              formatter={(value: any) => [`R$ ${value}`, 'Total']} 
            />
            
            <Legend 
              verticalAlign="bottom" 
              height={36}
              iconType="circle"
              wrapperStyle={{ fontSize: '12px', fontWeight: '500', color: '#1F4842' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

    </div>
  )
}