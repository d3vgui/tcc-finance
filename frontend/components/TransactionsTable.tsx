"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import axios from "axios";

interface Categoria {
  _id: string;
  category_name: string;
  cor_hex: string;
}

interface TransactionFromDB {
  _id: string;
  type: string;
  value: number;
  transaction_date: string;
  descript: string;
  category_id: Categoria; 
}

const NOMES_MESES = [
  "Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
  "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"
];

export default function TransactionsTable() {
  const [transactions, setTransactions] = useState<TransactionFromDB[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [filtroCategoria, setFiltroCategoria] = useState("");
  const [filtroAno, setFiltroAno] = useState("");
  const [filtroMes, setFiltroMes] = useState("");

  const fetchData = async () => {
    try {
      const [transRes, catRes] = await Promise.all([
        axios.get("http://localhost:3001/api/transactions/list", { withCredentials: true }),
        axios.get("http://localhost:3001/api/categories/list", { withCredentials: true })
      ]);
      
      setTransactions(transRes.data);
      setCategorias(catRes.data);
    } catch (error) {
      console.error("Erro ao buscar dados:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const anosDisponiveis = Array.from(
    new Set(transactions.map(t => new Date(t.transaction_date).getUTCFullYear()))
  ).sort((a, b) => b - a);

  const mesesDisponiveis = Array.from(
    new Set(transactions.map(t => new Date(t.transaction_date).getUTCMonth()))
  ).sort((a, b) => a - b);

  const transacoesFiltradas = transactions.filter((t) => {
    const dataTransacao = new Date(t.transaction_date);
    
    const bateCategoria = filtroCategoria ? t.category_id?._id === filtroCategoria : true;
    const bateAno = filtroAno ? dataTransacao.getUTCFullYear().toString() === filtroAno : true;
    const bateMes = filtroMes ? dataTransacao.getUTCMonth().toString() === filtroMes : true;

    return bateCategoria && bateAno && bateMes;
  });

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  };

  const formatarData = (dataIso: string) => {
    const data = new Date(dataIso);
    return data.toLocaleDateString("pt-BR", { timeZone: "UTC" });
  };

return (
    <div className="w-full bg-white rounded-2xl border-2 border-line-gray p-4 shadow-md flex flex-col gap-6 md:p-6 xl:h-full">
      
      {/* CABEÇALHO */}
      <div className="flex flex-col justify-center items-center gap-4 lg:flex-row lg:justify-between xl:items-center">
        <h2 className="text-primary-color-green font-bold text-xl md:text-2xl">Últimos gastos</h2>
        
        <div className="flex flex-wrap items-center justify-center gap-3">
          
          {/* Filtro Dinâmico: Ano */}
          <div className="relative">
            <select 
              value={filtroAno}
              onChange={(e) => setFiltroAno(e.target.value)}
              className="appearance-none border border-line-gray text-primary-color-green font-semibold rounded-xl px-4 py-2 pr-7 outline-none cursor-pointer w-full focus:border-primary-color transition-colors text-sm"
            >
              <option value="">Todos os Anos</option>
              {anosDisponiveis.map(ano => (
                <option key={ano} value={ano}>{ano}</option>
              ))}
            </select>
            <Image src="/img-arrow-down.png" alt="Seta" width={12} height={12} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Filtro Dinâmico: Mês */}
          <div className="relative">
            <select 
              value={filtroMes}
              onChange={(e) => setFiltroMes(e.target.value)}
              className="appearance-none border border-line-gray text-primary-color-green font-semibold rounded-lg px-4 py-2 pr-7 bg-transparent outline-none cursor-pointer w-full focus:border-primary-color transition-colors text-sm"
            >
              <option value="">Todos os Meses</option>
              {mesesDisponiveis.map(mesIndex => (
                <option key={mesIndex} value={mesIndex}>
                  {NOMES_MESES[mesIndex]}
                </option>
              ))}
            </select>
            <Image src="/img-arrow-down.png" alt="Seta" width={12} height={12} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Filtro Dinâmico: Categoria */}
          <div className="relative">
            <select 
              value={filtroCategoria}
              onChange={(e) => setFiltroCategoria(e.target.value)}
              className="appearance-none border border-line-gray text-primary-color-green font-semibold rounded-lg px-4 py-2 pr-7 bg-transparent outline-none cursor-pointer w-full focus:border-primary-color transition-colors text-sm"
            >
              <option value="">Todas as Categorias</option>
              {categorias.map(cat => (
                <option key={cat._id} value={cat._id}>{cat.category_name}</option>
              ))}
            </select>
            <Image src="/img-arrow-down.png" alt="Seta" width={12} height={12} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* TABELA */}
      <div className="flex-1 min-h-0 overflow-auto w-full border-2 border-solid border-line-gray px-4 pb-4 rounded-2xl custom-scrollbar">
        <table className="w-full text-left min-w-175 relative">
          <thead className="sticky top-0 bg-white z-10">
            <tr className="border-b border-line-gray">
              <th className="py-4 px-2 text-primary-color-green font-semibold text-sm">Nome</th>
              <th className="py-4 px-2 text-primary-color-green font-semibold text-sm">Data</th>
              <th className="py-4 px-2 text-primary-color-green font-semibold text-sm">Valor</th>
              <th className="py-4 px-2 text-primary-color-green font-semibold text-sm">Comentário</th>
              <th className="py-4 px-2 text-primary-color-green font-semibold text-sm">Categoria</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              <tr><td colSpan={5} className="text-center py-8 text-gray-500 font-medium">Carregando dados...</td></tr>
            ) : transacoesFiltradas.length === 0 ? (
              <tr><td colSpan={5} className="text-center py-8 text-gray-500 font-medium">Nenhum lançamento encontrado para esses filtros.</td></tr>
            ) : (
              transacoesFiltradas.map((item) => {
                const partesTexto = item.descript ? item.descript.split(" - ") : ["Sem nome"];
                return (
                  <tr key={item._id} className="border-b border-line-gray last:border-0 hover:bg-zinc-50 transition-colors">
                    <td className="py-4 px-2 text-text-login font-bold text-sm">{partesTexto[0]}</td>
                    <td className="py-4 px-2 text-text-login font-medium text-sm">{formatarData(item.transaction_date)}</td>
                    <td className={`py-4 px-2 font-bold text-sm ${item.type === 'receita' ? 'text-primary-color-green' : 'text-text-login'}`}>
                      {item.type === 'receita' ? '+' : ''} {formatarMoeda(item.value)}
                    </td>
                    <td className="py-4 px-2 text-text-login font-medium text-sm text-gray-500">{partesTexto[1] || "-"}</td>
                    <td className="py-4 px-2 font-medium text-sm">
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full" style={{ backgroundColor: item.category_id?.cor_hex || '#CCC' }}></span>
                        <span className="text-text-login">{item.category_id?.category_name || "Sem categoria"}</span>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}