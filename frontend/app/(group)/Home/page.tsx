"use client"

import { useState } from "react"
import Image from "next/image"
import CardFinance from "@/components/CardFinance"
import TransactionsTable from "@/components/TransactionsTable"
import TransactionModal from "@/components/TransactionModal"

export default function Home() {

  // Controle do Modal
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<"receita-mes" | "transacao-geral">("transacao-geral")

  // Funções para abrir o modal com o tipo correto
  const openRevenueModal = () => {
    setModalType("receita-mes")
    setIsModalOpen(true)
  }

  const openTransactionModal = () => {
    setModalType("transacao-geral")
    setIsModalOpen(true)
  }

  return (
    <div className="w-full p-4 flex flex-col gap-6 md:p-8 xl:h-full">
      
      <header className="flex flex-col justify-between items-start gap-4 bg-tertiary-color-green p-5 rounded-2xl w-full shadow-md md:flex-row md:items-center md:p-6">
        <div className="flex flex-col gap-1 md:w-3/6">
          <span className="text-primary-color-green font-semibold text-xl md:text-2xl my-2">
            Bem-vindo, <span className="text-secondary-color-green">Guilherme</span>.
          </span>
          <span className="flex gap-2 items-center text-primary-color-green font-semibold text-sm md:text-base">
            Receita do mês: R$ 3.937,11
            {/* <Image
              src="/img-edit-green.png"
              alt="Ícone editar"
              title="Clique aqui para editar a receita do mês"
              width={18}
              height={18}
              className="cursor-pointer hover:opacity-70 transition-opacity"
            /> */}
          </span>
        </div>

        <div onClick={openTransactionModal} className="flex flex-col gap-4 w-full md:w-3/6 xl:flex-row xl:justify-end">
          <button onClick={openRevenueModal} className="bg-primary-color-green p-3 md:px-6 rounded-xl flex items-center justify-center gap-3 text-secondary-color-green font-semibold text-sm w-full md:w-auto hover:opacity-90 transition-opacity cursor-pointer">
          <Image
            src="/img-add.png"
            alt="Ícone nova transação"
            title="Clique aqui para colocar uma nova transação"
            height={20}
            width={20}
          />
          Nova receita do mês
        </button>
        <button className="bg-primary-color-green p-3 md:px-6 rounded-xl flex items-center justify-center gap-3 text-secondary-color-green font-semibold text-sm w-full md:w-auto hover:opacity-90 transition-opacity cursor-pointer">
          <Image
            src="/img-add.png"
            alt="Ícone nova transação"
            title="Clique aqui para colocar uma nova transação"
            height={20}
            width={20}
          />
          Nova transação
        </button>
        </div>
      </header>
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {/* <CardFinance 
          title="Patrimônio total" 
          value="R$ 15.430,00" 
          icon="/img-dolar-card.png" 
          bgColor="bg-primary-color-green"
          textColor="text-white"
          bgIcon="bg-secondary-color-green"
          editButton={false} 
        /> */}
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
      <TransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        initialType={modalType} 
      />
    </div>
  )
}