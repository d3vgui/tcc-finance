"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface TransactionModalProps {
  isOpen: boolean
  onClose: () => void
  initialType: "receita-mes" | "transacao-geral"
}

interface FormErrors {
  nome?: boolean
  data?: boolean
  valor?: boolean
  qtdParcelas?: boolean
}

export default function TransactionModal({ isOpen, onClose, initialType }: TransactionModalProps) {
  const [tipoGeral, setTipoGeral] = useState<"Receita" | "Despesa">("Despesa")
  const [tipoDespesa, setTipoDespesa] = useState("Gastos diversos")
  const [tipoPagamento, setTipoPagamento] = useState("À vista")
  
  const [nome, setNome] = useState("")
  const [data, setData] = useState("")
  const [valor, setValor] = useState("")
  const [comentario, setComentario] = useState("")
  const [qtdParcelas, setQtdParcelas] = useState("")
  
  const [errors, setErrors] = useState<FormErrors>({})

  // Efeito para resetar os campos sempre que o modal abrir
  useEffect(() => {
    if (isOpen) {
      setTipoGeral(initialType === "receita-mes" ? "Receita" : "Despesa")
      setTipoDespesa("Gastos diversos")
      setTipoPagamento("À vista")
      setNome("")
      setData("")
      setValor("")
      setComentario("")
      setQtdParcelas("")
      setErrors({})
    }
  }, [isOpen, initialType])

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, "")
    if (value === "") {
      setValor("")
      return
    }
    const numericValue = parseInt(value, 10) / 100
    setValor(new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(numericValue))
  }

  // Calcula o valor total se for parcelado
  const calcularTotalParcelado = () => {
    if (!valor || !qtdParcelas) return "R$ 0,00"
    const numericValor = parseFloat(valor.replace("R$", "").replace(".", "").replace(",", "."))
    const total = numericValor * parseInt(qtdParcelas, 10)
    return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(total)
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: FormErrors = {}

    if (!nome.trim()) newErrors.nome = true
    if (!data.trim()) newErrors.data = true
    if (!valor.trim() || valor === "R$ 0,00") newErrors.valor = true
    
    if (tipoGeral === "Despesa" && tipoDespesa === "Cartão de crédito" && tipoPagamento === "Parcelado") {
      if (!qtdParcelas.trim() || parseInt(qtdParcelas) <= 0) newErrors.qtdParcelas = true
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      console.log("Salvo com sucesso!", { tipoGeral, tipoDespesa, tipoPagamento, nome, data, valor, comentario, qtdParcelas })
      onClose() // Fecha o modal após salvar
    }
  }

  // Se não estiver aberto, não renderiza nada
  if (!isOpen) return null

  return (
    // Fundo escurecido
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-fade-in">

      <div className="bg-white w-full max-w-125 rounded-3xl p-6 md:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto custom-scrollbar">
        
        {/* Botão de Fechar */}
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors text-xl font-bold cursor-pointer">
          ✕
        </button>

        {/* Título Dinâmico */}
        <h2 className="text-2xl font-bold text-primary-color-green mb-6">
          {initialType === "receita-mes" ? "Nova Receita do Mês" : "Nova Transação"}
        </h2>

        <form className="flex flex-col gap-5 p-2">
          
          {/* Se for "Transação Geral", escolhe se é Receita ou Despesa */}
          {initialType === "transacao-geral" && (
            <div className="flex gap-4 p-1 bg-line-gray rounded-xl">
              <button 
                type="button"
                onClick={() => setTipoGeral("Despesa")}
                className={`flex-1 py-2 rounded-lg font-semibold text-sm transition-all ${tipoGeral === "Despesa" ? "bg-white text-primary-color-green shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
              >
                Despesa
              </button>
              <button 
                type="button"
                onClick={() => setTipoGeral("Receita")}
                className={`flex-1 py-2 rounded-lg font-semibold text-sm transition-all ${tipoGeral === "Receita" ? "bg-white text-primary-color-green shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
              >
                Receita
              </button>
            </div>
          )}

          {/* Se for Despesa, mostra as categorias */}
          {tipoGeral === "Despesa" && (
            <div className="flex flex-col gap-2">
              <label className="text-primary-color-green font-semibold text-sm">Tipo de Despesa</label>
              <select 
                value={tipoDespesa}
                onChange={(e) => setTipoDespesa(e.target.value)}
                className="bg-line-gray border-none rounded-xl p-3.5 outline-none focus:ring-1 focus:ring-primary-color-green text-sm text-primary-color-green font-medium cursor-pointer"
              >
                <option>Gastos diversos</option>
                <option>Gastos mensais</option>
                <option>Cartão de crédito</option>
              </select>
            </div>
          )}

          {/* Se for Cartão de Crédito, mostra opção À Vista / Parcelado */}
          {tipoGeral === "Despesa" && tipoDespesa === "Cartão de crédito" && (
            <div className="flex gap-4 p-1 bg-line-gray rounded-xl mt-2">
              <button 
                type="button"
                onClick={() => setTipoPagamento("À vista")}
                className={`flex-1 py-2 rounded-lg font-semibold text-sm transition-all ${tipoPagamento === "À vista" ? "bg-white text-primary-color-green shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
              >
                À vista
              </button>
              <button 
                type="button"
                onClick={() => setTipoPagamento("Parcelado")}
                className={`flex-1 py-2 rounded-lg font-semibold text-sm transition-all ${tipoPagamento === "Parcelado" ? "bg-white text-primary-color-green shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
              >
                Parcelado
              </button>
            </div>
          )}

          {/* LINHA: Valor e Data (Lado a lado em telas maiores) */}
          <div className="flex flex-col md:flex-row gap-5">
            <div className="flex flex-col gap-2 w-full">
              <label className="text-primary-color-green font-semibold text-sm">
                {tipoPagamento === "Parcelado" && tipoGeral === "Despesa" && tipoDespesa === "Cartão de crédito" ? "Valor da Parcela" : "Valor"}
              </label>
              <input
                type="text"
                value={valor}
                onChange={handleCurrencyChange}
                placeholder="R$ 0,00"
                className={`bg-line-gray border rounded-xl p-3.5 outline-none transition-all focus:ring-1 focus:ring-primary-color-green w-full text-sm font-semibold text-primary-color-green
                  ${errors.valor ? 'border-red-500 ring-1 ring-red-500' : 'border-line-gray'}`}
              />
            </div>
            
            <div className="flex flex-col gap-2 w-full">
              <label className="text-primary-color-green font-semibold text-sm">Data</label>
              <input
                type="date"
                value={data}
                onChange={(e) => setData(e.target.value)}
                className={`bg-line-gray border rounded-xl p-3.5 outline-none transition-all focus:ring-1 focus:ring-primary-color-green w-full text-sm font-medium text-primary-color-green
                  ${errors.data ? 'border-red-500 ring-1 ring-red-500' : 'border-line-gray'}`}
              />
            </div>
          </div>

          {/* Qtd Parcelas e Valor Total */}
          {tipoGeral === "Despesa" && tipoDespesa === "Cartão de crédito" && tipoPagamento === "Parcelado" && (
            <div className="flex flex-col md:flex-row gap-5 bg-[#E2F7D8] p-4 rounded-xl border border-secondary-color-green">
              <div className="flex flex-col gap-2 w-full">
                <label className="text-primary-color-green font-semibold text-sm">Qtd. Parcelas</label>
                <input
                  type="number"
                  value={qtdParcelas}
                  onChange={(e) => setQtdParcelas(e.target.value)}
                  placeholder="Ex: 12"
                  className={`bg-white border rounded-xl p-3 outline-none transition-all focus:ring-1 focus:ring-primary-color-green w-full text-sm
                    ${errors.qtdParcelas ? 'border-red-500 ring-1 ring-red-500' : 'border-transparent'}`}
                />
              </div>
              <div className="flex flex-col gap-2 w-full justify-center">
                <label className="text-primary-color-green font-semibold text-sm">Valor Total</label>
                <span className="text-lg font-bold text-primary-color-green">
                  {calcularTotalParcelado()}
                </span>
              </div>
            </div>
          )}

          {/* Campo Nome */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-primary-color-green font-semibold text-sm">Nome / Descrição</label>
            <input
              type="text"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Ex: Salário, Conta de Luz..."
              className={`bg-line-gray border rounded-xl p-3.5 outline-none transition-all focus:ring-1 focus:ring-primary-color-green w-full text-sm
                ${errors.nome ? 'border-red-500 ring-1 ring-red-500' : 'border-line-gray'}`}
            />
          </div>

          {/* Campo Comentário */}
          <div className="flex flex-col gap-2 w-full">
            <label className="text-primary-color-green font-semibold text-sm">Comentário <span className="text-gray-400 font-normal">(Opcional)</span></label>
            <textarea
              value={comentario}
              onChange={(e) => setComentario(e.target.value)}
              placeholder="Adicione um detalhe..."
              rows={2}
              className="bg-line-gray border border-line-gray rounded-xl p-3.5 outline-none transition-all focus:ring-1 focus:ring-primary-color-green w-full text-sm resize-none custom-scrollbar"
            />
          </div>

          {/* Botão Salvar */}
          <button 
            onClick={handleSave}
            className="bg-primary-color-green text-secondary-color-green font-bold text-base py-3.5 w-full rounded-xl hover:opacity-95 transition-all shadow-md mt-2 cursor-pointer"
          >
            Salvar Lançamento
          </button>
        </form>

      </div>
    </div>
  )
}