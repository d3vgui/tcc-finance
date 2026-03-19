import Image from "next/image"

export default function Home(){
  return (
    <div className="min-h-dvh w-full p-6 mt-2">
      <header className="flex justify-between gap-3 flex-wrap items-center w-full">
      <div>
        <span className="text-primary-color-green font-semibold text-lg">Bem-vindo, <span className="text-secondary-color-green">Guilherme</span>.</span>
        <span className="flex gap-2 items-center text-primary-color-green mt-3 font-semibold text-md">
          Receita do mês: R$ 3.991,30
          <Image
            src="/img-edit-green.png"
            alt="Ícone editar"
            title="Clique aqui para editar a receita do mês"
            width={22}
            height={22}
          />
        </span>
      </div>
        <button className="bg-primary-color-green p-3 rounded-lg flex items-center gap-4 text-secondary-color-green font-semibold text-sm w-full justify-center mt-2">
          <Image
            src="/img-add.png"
            alt="Ícone adicionar gasto"
            title="Clique aqui para adicionar gasto"
            height={24}
            width={24}
          />
          Adicionar gasto
        </button>
      </header>
    </div>
  )
}