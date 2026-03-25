import Image from "next/image"
import CardFinance from "@/components/CardFinance"
import TransactionsTable from "@/components/TransactionsTable"

export default function Home() {
  return (
    <div className="w-full xl:h-full p-4 md:p-8 flex flex-col gap-8">
      
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-tertiary-color-green p-5 md:p-6 rounded-2xl w-full shadow-sm">
        <div className="flex flex-col gap-1">
          <span className="text-primary-color-green font-semibold text-xl md:text-2xl my-2">
            Bem-vindo, <span className="text-secondary-color-green">Guilherme</span>.
          </span>
          <span className="flex gap-2 items-center text-primary-color-green font-semibold text-sm md:text-base">
            Receita do mês: R$ 3.991,30
            <Image
              src="/img-edit-green.png"
              alt="Ícone editar"
              title="Clique aqui para editar a receita do mês"
              width={18}
              height={18}
              className="cursor-pointer hover:opacity-70 transition-opacity"
            />
          </span>
        </div>

        <button className="bg-primary-color-green p-3 md:px-6 rounded-xl flex items-center justify-center gap-3 text-secondary-color-green font-semibold text-sm w-full md:w-auto hover:opacity-90 transition-opacity cursor-pointer">
          <Image
            src="/img-add.png"
            alt="Ícone adicionar gasto"
            title="Clique aqui para adicionar gasto"
            height={20}
            width={20}
          />
          Adicionar gasto
        </button>
      </header>
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 md:gap-6">
        <CardFinance 
          title="Patrimônio total" 
          value="R$ 15.430,00" 
          icon="/img-dolar-card.png" 
          bgColor="bg-primary-color-green"
          textColor="text-white"
          bgIcon="bg-secondary-color-green"
          editButton={true} 
        />
        <CardFinance 
          title="Saldo em conta" 
          value="R$ 3.203,67"
          border={true}
          icon="/img-coin-card.png" 
          bgColor="bg-white"
          textColor="text-primary-color-green"
          bgIcon="bg-tertiary-color-green"
          editButton={false} 
        />
        <CardFinance 
          title="Taxa de utilização" 
          value="57%"
          border={true}
          icon="/img-percent-card.png" 
          bgColor="bg-white"
          textColor="text-primary-color-green"
          bgIcon="bg-tertiary-color-green"
          editButton={false}
          usageFee={57}
        />
        <CardFinance 
          title="Soma de gastos" 
          value="R$ 2.630,00"
          border={true}
          icon="/img-down.png" 
          bgColor="bg-white"
          textColor="text-primary-color-green"
          bgIcon="bg-tertiary-color-green"
          editButton={false} 
        />
      </section>
      <section className="flex-1 min-h-0 flex flex-col">
        <TransactionsTable/>
      </section>
    </div>
  )
}