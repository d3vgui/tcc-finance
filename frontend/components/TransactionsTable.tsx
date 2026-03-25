import Image from "next/image";

const transactions = [
  /* Seus dados continuam iguais */
  { id: 1, nome: "Mercado Atacadão", data: "02/03/2026", preco: "R$ 850,00", comentario: "Compra do mês", tipo: "Gastos mensais", status: "Pago" },
  { id: 2, nome: "Uber", data: "05/03/2026", preco: "R$ 45,50", comentario: "Volta da faculdade", tipo: "Gastos diversos", status: "Pago" },
  { id: 3, nome: "Fatura Nubank", data: "10/03/2026", preco: "R$ 1.200,00", comentario: "Parcela do notebook", tipo: "Cartão de crédito", status: "Não pago" },
  { id: 4, nome: "Conta de Luz", data: "12/03/2026", preco: "R$ 180,00", comentario: "Enel", tipo: "Gastos mensais", status: "Pago" },
  { id: 5, nome: "Ifood", data: "15/03/2026", preco: "R$ 65,00", comentario: "Pizza com a galera", tipo: "Gastos diversos", status: "Pago" },
  { id: 6, nome: "Mensalidade Academia", data: "18/03/2026", preco: "R$ 110,00", comentario: "Plano anual", tipo: "Gastos mensais", status: "Não pago" },
  { id: 7, nome: "Gasolina", data: "20/03/2026", preco: "R$ 200,00", comentario: "Tanque cheio", tipo: "Gastos diversos", status: "Pago" },
  { id: 8, nome: "Internet", data: "22/03/2026", preco: "R$ 99,90", comentario: "Claro Fibra", tipo: "Gastos mensais", status: "Não pago" },
  { id: 9, nome: "Fatura Itaú", data: "25/03/2026", preco: "R$ 450,00", comentario: "Roupas e tênis", tipo: "Cartão de crédito", status: "Não pago" }
]

export default function TransactionsTable(){
  return (
    <div className="w-full bg-white rounded-2xl border-2 border-line-gray p-4 shadow-md flex flex-col gap-6 md:p-6  xl:h-full">
      
      {/* CABEÇALHO */}
      <div className="flex flex-col justify-center items-center gap-4 lg:flex-row lg:justify-between xl:items-center">
        <h2 className="text-primary-color-green font-bold text-xl md:text-2xl">Últimos gastos</h2>
        
        <div className="flex flex-wrap items-center justify-center gap-3">
          {/* Filtro: Ano */}
          <div className="relative">
            <select className="appearance-none border border-line-gray text-primary-color-green font-semibold rounded-xl px-4 py-2 pr-7 outline-none cursor-pointer w-full focus:border-primary-color transition-colors text-sm">
              <option>Ano</option><option>2026</option><option>2025</option>
            </select>
            <Image src="/img-arrow-down.png" alt="Seta" width={12} height={12} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Filtro: Mês */}
          <div className="relative">
            <select className="appearance-none border border-line-gray text-primary-color-green font-semibold rounded-lg px-4 py-2 pr-7 bg-transparent outline-none cursor-pointer w-full focus:border-primary-color transition-colors text-sm">
              <option>Mês</option><option>Março</option><option>Abril</option>
            </select>
            <Image src="/img-arrow-down.png" alt="Seta" width={12} height={12} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>

          {/* Filtro: Categoria */}
          <div className="relative">
            <select className="appearance-none border border-line-gray text-primary-color-green font-semibold rounded-lg px-4 py-2 pr-7 bg-transparent outline-none cursor-pointer w-full focus:border-primary-color transition-colors text-sm">
              <option>Categoria</option><option>Gastos diversos</option><option>Cartão de crédito</option><option>Gastos mensais</option>
            </select>
            <Image src="/img-arrow-down.png" alt="Seta" width={12} height={12} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
        </div>
      </div>

      {/* 2. ÁREA DA TABELA */}

      <div className="flex-1 min-h-0 overflow-auto w-full border-2 border-solid border-line-gray px-4 pb-4 rounded-2xl">
        <table className="w-full text-left min-w-175 relative">
          
          {/* Cabeçalho da Tabela */}
          <thead className="sticky top-0 bg-white z-10">
            <tr className="border-b border-line-gray">
              <th className="py-4 px-2 text-primary-color-green font-semibold text-sm">Nome</th>
              <th className="py-4 px-2 text-primary-color-green font-semibold text-sm">Data da compra</th>
              <th className="py-4 px-2 text-primary-color-green font-semibold text-sm">Preço</th>
              <th className="py-4 px-2 text-primary-color-green font-semibold text-sm">Comentário</th>
              <th className="py-4 px-2 text-primary-color-green font-semibold text-sm">Tipo</th>
              <th className="py-4 px-2 text-primary-color-green font-semibold text-sm">Status</th>
            </tr>
          </thead>

          {/* Corpo da Tabela */}
          <tbody>
            {transactions.map((item) => (
              <tr key={item.id} className="border-b border-line-gray last:border-0 hover:bg-zinc-50 transition-colors">
                <td className="py-4 px-2 text-text-login font-medium text-sm">{item.nome}</td>
                <td className="py-4 px-2 text-text-login font-medium text-sm">{item.data}</td>
                <td className="py-4 px-2 text-text-login font-medium text-sm">{item.preco}</td>
                <td className="py-4 px-2 text-text-login font-medium text-sm">{item.comentario}</td>
                <td className="py-4 px-2 text-text-login font-medium text-sm">{item.tipo}</td>
                <td className="py-4 px-2 font-medium text-sm">
                   <span className={item.status === "Pago" ? "text-gradient-green" : "text-red-700"}>
                     {item.status}
                   </span>
                </td>
              </tr>
            ))}
          </tbody>
  
        </table>
      </div>

    </div>
  )
}