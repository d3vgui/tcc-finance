import CustomBarChart from "@/components/CustomBarChart"
import CustomPieChart from "@/components/CustomPieChart"
import GrowthAreaChart from "@/components/GrowthAreaChart"

const spendingData = [
  { name: "Gastos diversos", value: 450 },
  { name: "Cartão de crédito", value: 1200 },
  { name: "Gastos mensais", value: 850 },
]

const assetData = [
  { mes: 'Jan', total: 4000 },
  { mes: 'Fev', total: 3000 },
  { mes: 'Mar', total: 2000 },
  { mes: 'Abr', total: 2780 },
  { mes: 'Mai', total: 1890 },
  { mes: 'Jun', total: 2390 },
  { mes: 'Jul', total: 3490 },
  { mes: 'Ago', total: 4300 },
  { mes: 'Set', total: 3100 },
  { mes: 'Out', total: 2500 },
  { mes: 'Nov', total: 3800 },
  { mes: 'Dez', total: 4800 },
]

export default function Dashboard() {
  return (
    <div className="w-full p-4 md:p-8 flex flex-col gap-6 xl:h-full xl:overflow-hidden overflow-y-auto">
      <header className="mt-4 lg:mt-0 shrink-0">
        <h2 className="text-primary-color-green font-bold text-2xl md:text-3xl">
          Dashboard
        </h2>
        <p className="text-zinc-500 mt-1">
          Análise detalhada das suas finanças.
        </p>
      </header>

      <section className="flex flex-col gap-6 pb-8 xl:pb-0 xl:flex-1 xl:min-h-0">
        <div className="xl:flex-1 xl:min-h-0">
          <CustomBarChart 
            title="Análise em meses"
            tooltipLabel="Total Gasto"
            data={assetData} // Os dados de gastos
            filters={[
              { label: 'Ano', options: ['2026', '2025'] },
              { label: 'Categoria', options: ['Todas', 'Gastos diversos', 'Cartão de crédito', 'Gastos mensais'] }
            ]}
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:flex-1 xl:min-h-0">
          <CustomPieChart
            title="Gastos por categoria"
            subtitle="Março 2026"
            data={spendingData}
          />
          <GrowthAreaChart />
        </div>
      </section>
    </div>
  )
}
