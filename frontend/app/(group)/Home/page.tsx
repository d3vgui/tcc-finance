"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import CardFinance from "@/components/CardFinance"
import TransactionsTable from "@/components/TransactionsTable"
import TransactionModal from "@/components/TransactionModal"
import api from '../../../api'

export default function Home() {

  const [userName, setUserName] = useState('Carregando...')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [modalType, setModalType] = useState<"receita-mes" | "transacao-geral">("transacao-geral")

  useEffect(() => {
    const loadProfile = async() => {

      try {
      const response = await api.get('/api/users/me')

      setUserName(response.data.name); 
    }
    catch (error) {
      console.log('Erro ao carregar o perfil: ', error)
      setUserName("Usuário")
    }
    }
    loadProfile()
  }, [])

  const openRevenueModal = () => {
    setModalType("receita-mes")
    setIsModalOpen(true)
  }

  const openTransactionModal = () => {
    setModalType("transacao-geral")
    setIsModalOpen(true)
  }

  return (
    <div className="w-full p-4 flex flex-col gap-6 md:p-8">
      
      <header className="flex flex-col justify-between items-start gap-4 bg-tertiary-color-green p-5 rounded-2xl w-full shadow-md md:flex-row md:items-center md:p-6">
        <div className="flex flex-col gap-1 md:w-3/6">
          <span className="text-primary-color-green font-semibold text-xl md:text-2xl my-2">
            Bem-vindo, <span className="text-secondary-color-green">{userName.toUpperCase()}</span>.
          </span>
          <span className="flex gap-2 items-center text-primary-color-green font-semibold text-sm md:text-base">
            Receita do mês: R$ 3.937,11
          </span>
        </div>

        <div className="flex flex-col gap-4 w-full md:w-3/6 xl:flex-row xl:justify-end">
          
          {/* <button 
            onClick={openRevenueModal} 
            className="bg-primary-color-green p-3 md:px-6 rounded-xl flex items-center justify-center gap-3 text-secondary-color-green font-semibold text-sm w-full md:w-auto hover:opacity-90 transition-opacity cursor-pointer"
          >
            <Image src="/img-add.png" alt="Ícone nova transação" height={20} width={20} />
            Nova receita do mês
          </button> */}
          
          <button 
            onClick={openTransactionModal} 
            className="bg-primary-color-green p-3 md:px-6 rounded-xl flex items-center justify-center gap-3 text-secondary-color-green font-semibold text-sm w-full md:w-auto hover:opacity-90 transition-opacity cursor-pointer"
          >
            <Image src="/img-add.png" alt="Ícone nova transação" height={20} width={20} />
            Nova transação
          </button>
        </div>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
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

      <section className="flex flex-col">
        <TransactionsTable/>
      </section>

      <TransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
      
    </div>
  )
}