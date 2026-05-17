"use client"
import { useState, useEffect } from "react"
import CustomBarChart from "@/components/CustomBarChart"
import CustomPieChart from "@/components/CustomPieChart"
import GrowthAreaChart from "@/components/GrowthAreaChart"
import Image from "next/image"
import api from '../../../api'

const NAME_MONTHS = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

export default function Dashboard() {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [filtroAno, setFiltroAno] = useState(new Date().getFullYear().toString());
  const [isLoading, setIsLoading] = useState(true);

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      const res = await api.get('/api/transactions/list');
      setTransactions(res.data);
    } catch (error) {
      console.error("Erro ao carregar dashboard:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // FILTRAGEM POR AGRUPAMENTO

  // lista de anos disponíveis para o filtro
  const anosDisponiveis = Array.from(new Set(transactions.map(t => new Date(t.transaction_date).getUTCFullYear()))).sort((a, b) => b - a)

  // gráfico de barras
  const dadosMensais = NAME_MONTHS.map((nome, index) => {
    const totalDespesa = transactions
      .filter(t => t.type === 'despesa' && new Date(t.transaction_date).getUTCFullYear().toString() === filtroAno && new Date(t.transaction_date).getUTCMonth() === index)
      .reduce((acc, curr) => acc + curr.value, 0);

    const totalReceita = transactions
      .filter(t => t.type === 'receita' && new Date(t.transaction_date).getUTCFullYear().toString() === filtroAno && new Date(t.transaction_date).getUTCMonth() === index)
      .reduce((acc, curr) => acc + curr.value, 0);

    return { mes: nome, total: totalDespesa, receita: totalReceita };
  })

  // gráfico de rosca
  const agruparPorCategoria = (tipo: 'receita' | 'despesa') => {
    const categoriasMap: { [key: string]: { name: string, value: number, fill: string } } = {};

    transactions
      .filter(t => t.type === tipo && new Date(t.transaction_date).getUTCFullYear().toString() === filtroAno)
      .forEach(t => {
        const catName = t.category_id?.category_name || "Sem categoria";
        const catColor = t.category_id?.cor_hex || "#CCCCCC";
        
        if (categoriasMap[catName]) {
          categoriasMap[catName].value += t.value;
        } else {
          categoriasMap[catName] = { name: catName, value: t.value, fill: catColor };
        }
      });

    return Object.values(categoriasMap);
  }

  const spendingData = agruparPorCategoria('despesa');
  const revenueData = agruparPorCategoria('receita');

  return (
   <div className="w-full p-4 md:p-8 flex flex-col gap-6">
      
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-4 lg:mt-0">
        <div>
          <h2 className="text-primary-color-green font-bold text-2xl md:text-3xl">Dashboard</h2>
          <p className="text-zinc-500 mt-1">Análise detalhada das suas finanças em {filtroAno}.</p>
        </div>

        {/* FILTRO DE ANO GLOBAL */}
        <div className="relative min-w-[150px]">
          <select 
            value={filtroAno} 
            onChange={(e) => setFiltroAno(e.target.value)}
            className="appearance-none w-full bg-white border border-line-gray text-primary-color-green font-semibold rounded-xl px-4 py-2 pr-10 outline-none shadow-sm focus:ring-1 focus:ring-primary-color-green"
          >
            {anosDisponiveis.length > 0 ? (
              anosDisponiveis.map(ano => <option key={ano} value={ano}>{ano}</option>)
            ) : (
              <option value={new Date().getFullYear()}>{new Date().getFullYear()}</option>
            )}
          </select>
          <Image src="/img-arrow-down.png" alt="Seta" width={12} height={12} className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </header>

      <section className="flex flex-col gap-6 pb-8">
        
        {/* GRÁFICO DE BARRAS: DESPESAS POR MÊS */}
        <div className="w-full xl:h-[400px]">
          <CustomBarChart 
            title="Análise de Despesas por Mês"
            tooltipLabel="Total Gasto"
            data={dadosMensais} 
          />
        </div>

        {/* GRÁFICOS DE ROSCA */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 xl:h-[350px]">
          <CustomPieChart
            title="Despesas por Categoria"
            subtitle={`Total acumulado em ${filtroAno}`}
            data={spendingData}
          />
          <CustomPieChart
            title="Receitas por Categoria"
            subtitle={`Total acumulado em ${filtroAno}`}
            data={revenueData}
          />
        </div>

        {/* GRÁFICO DE ÁREA: CRESCIMENTO (RECEITA) */}
        <div className="w-full xl:h-[400px]">
           <GrowthAreaChart 
            title="Crescimento Patrimonial (Receitas)"
            data={dadosMensais}
           />
        </div>
        
      </section>
    </div>
  )
}