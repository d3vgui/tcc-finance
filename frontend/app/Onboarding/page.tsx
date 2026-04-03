"use client"

import { useState } from "react"
import Image from "next/image"

interface FormErrors {
  nome?: boolean
  receita?: boolean
  saldo?: boolean
  patrimonio?: boolean
}

export default function Onboarding() {
  const [step, setStep] = useState(1)

  const [nome, setNome] = useState("")
  const [receita, setReceita] = useState("")
  const [saldo, setSaldo] = useState("")
  const [patrimonio, setPatrimonio] = useState("")

  const [errors, setErrors] = useState<FormErrors>({})

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const newErrors: FormErrors = {}

    if (!nome.trim()) newErrors.nome = true
    if (!receita.trim()) newErrors.receita = true
    if (!saldo.trim()) newErrors.saldo = true
    if (!patrimonio.trim()) newErrors.patrimonio = true

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      // Futuramente aqui chamaremos a API
      console.log("Dados salvos com sucesso, indo pra home...")
      alert("Tudo certo! Redirecionando...")
    }
  }

  const InfoTooltip = ({ text }: { text: string }) => (
    <div className="relative group cursor-help ml-2 flex items-center">
      <Image
        src="/img-info.png"
        alt="Ícone de informação"
        width={18}
        height={18}
        quality={100}
        className="w-4.5 h-4.5 transition-opacity hover:opacity-80"
      />
      <div className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-70 md:w-87.5 p-4 bg-white rounded-2xl shadow-xl border border-line-gray text-text-login text-xs font-medium leading-relaxed opacity-0 group-hover:opacity-100 scale-95 group-hover:scale-100 transition-all duration-300 pointer-events-none z-50">
        <p className="text-primary-color-green font-bold mb-1.5 text-sm">O que é isso?</p>
        {text}
        <div className="absolute top-full left-1/2 -translate-x-1/2 w-4 h-4 bg-white border-b border-r border-line-gray rotate-45 -mt-2"></div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen w-full bg-primary-color-green flex items-center justify-center p-4">
      <div className="bg-white h-fit w-full max-w-150 rounded-3xl p-8 flex flex-col items-center transition-all duration-500 ease-in-out md:p-12">
        
        <div className="flex items-center gap-2 mb-8">
          <h1 className="text-2xl font-semibold text-primary-color-green lg:text-3xl">
            Finance<span className="text-secondary-color-green">AI</span>
          </h1>
          <Image
            src="/img-logo.png"
            alt="Logo FinanceAI"
            title="Logo FinanceAI"
            width={12}
            height={12}
            quality={100}
            className="w-8 h-8 lg:w-10 lg:h-10"
          />
        </div>

        {step === 1 && (
          <div className="flex flex-col gap-8 items-center text-center justify-center animate-fade-in">
            <h2 className="text-2xl font-semibold text-primary-color-green md:text-3xl lg:text-4xl leading-snug">
              Que bom ter você por aqui!
            </h2>

            <p className="text-primary-color-green font-semibold text-md">
              Você está dando um grande passo para
              <br/>
              ter controle total das suas finanças.
            </p>

            <p className="text-primary-color-green font-semibold text-md">
              Agora, precisamos colher algumas
              <br /> 
              informações, ok?
            </p>

            <button
              onClick={() => setStep(2)}
              className="bg-primary-color-green text-secondary-color-green font-semibold py-3 px-12 rounded-2xl hover:opacity-95 transition-all mt-6 cursor-pointer">
              Vamos lá!
            </button>
          </div>
        )}

        {step === 2 && (
          <form className="flex flex-col gap-5 w-full mt-2 animate-fade-in">
          
            <div className="flex flex-col gap-1.5 w-full">
              <label className="text-primary-color-green font-semibold text-sm">
                Nome completo
              </label>
              <input
                type="text"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Ex: João da Silva"
                className={`bg-line-gray shadow-lg rounded-xl p-3 mt-1 placeholder:text-text-login placeholder:text-sm outline-none transition-all focus:ring-2 focus:ring-primary-color-green w-full
                   ${errors.nome ? 'border-red-500 ring-1 ring-red-500' : 'border-none'}`}
              />
            </div>

            <div className="flex flex-col gap-1.5 w-full">
              <div className="flex items-center">
                <label className="text-primary-color-green font-semibold text-sm">
                  Receita mensal atual
                </label>
                <InfoTooltip text="Total que você recebe livre de impostos todo mês, somando todas as suas fontes de renda." />
              </div>
              <input
                type="number"
                value={receita}
                onChange={(e) => setReceita(e.target.value)}
                placeholder="R$ 0,00"
                className={`bg-line-gray shadow-lg rounded-xl p-3 mt-1 placeholder:text-text-login placeholder:text-sm outline-none transition-all focus:ring-2 focus:ring-primary-color-green w-full
                ${errors.receita ? 'border-red-500 ring-1 ring-red-500' : 'border-none'}`}
              />
            </div>

            {/* Campo: Saldo atual disponível */}
            <div className="flex flex-col gap-1.5 w-full">
              <div className="flex items-center">
                <label className="text-primary-color-green font-semibold text-sm">
                  Saldo atual disponível em conta
                </label>
                <InfoTooltip text="Soma de todo dinheiro livre que você tem hoje em contas correntes, poupanças e dinheiro vivo." />
              </div>
              <input
                type="number"
                value={saldo}
                onChange={(e) => setSaldo(e.target.value)}
                placeholder="R$ 0,00"
                className={`bg-line-gray shadow-lg rounded-xl p-3 mt-1 placeholder:text-text-login placeholder:text-sm outline-none transition-all focus:ring-2 focus:ring-primary-color-green w-full
                  ${errors.saldo ? 'border-red-500 ring-1 ring-red-500' : 'border-none'}`}
              />
            </div>

            <div className="flex flex-col gap-1.5 w-full">
              <div className="flex items-center">
                <label className="text-primary-color-green font-semibold text-sm">
                  Patrimônio total
                </label>
                <InfoTooltip text="Soma do saldo disponível (que você informou acima) + valor de todos os seus investimentos/poupança." />
              </div>
              <input
                type="number"
                value={patrimonio}
                onChange={(e) => setPatrimonio(e.target.value)}
                placeholder="R$ 0,00"
                className={`bg-line-gray shadow-lg rounded-xl p-3 mt-1 placeholder:text-text-login placeholder:text-sm outline-none transition-all focus:ring-2 focus:ring-primary-color-green w-full
                  ${errors.patrimonio ? 'border-red-500 ring-1 ring-red-500' : 'border-none'}`}
              />
            </div>

            <button 
              onClick={handleFinalSubmit}
              className="bg-primary-color-green text-secondary-color-green font-semibold py-3 px-12 rounded-2xl hover:opacity-95 transition-all mt-10 self-center cursor-pointer">
              Tudo certo!
            </button>
          </form>
        )}
      </div>
    </div>
  )
}