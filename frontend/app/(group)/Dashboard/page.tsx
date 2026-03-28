import ExpensesBarChart from "@/components/ExpensesBarChart"
import CategoriesPieChart from "@/components/CategoriesPieChart"
import GrowthAreaChart from "@/components/GrowthAreaChart"

export default function Dashboard() {
  return (
    // 1. xl:overflow-hidden garante que a tela "trave" e não crie scroll no PC.
    <div className="w-full p-4 md:p-8 flex flex-col gap-6 xl:h-full xl:overflow-hidden overflow-y-auto">
      
      {/* 2. flex-shrink-0 avisa o Flexbox: "Não esmague o meu cabeçalho!" */}
      <header className="mt-4 lg:mt-0 flex-shrink-0">
        <h2 className="text-primary-color-green font-bold text-2xl md:text-3xl">Dashboard</h2>
        <p className="text-zinc-500 mt-1">Análise detalhada das suas finanças.</p>
      </header>

      {/* 3. xl:flex-1 xl:min-h-0 faz a section ocupar exatamente o resto da tela */}
      <section className="flex flex-col gap-6 pb-8 xl:pb-0 xl:flex-1 xl:min-h-0">
        
        {/* Envolvemos o gráfico de barras numa div para ele pegar 50% da altura no PC */}
        <div className="xl:flex-1 xl:min-h-0">
          <ExpensesBarChart />
        </div>

        {/* A grade de baixo também ganha flex-1 para pegar os outros 50% */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:flex-1 xl:min-h-0">
           <CategoriesPieChart />
           <GrowthAreaChart />
        </div>

      </section>
    </div>
  )
}