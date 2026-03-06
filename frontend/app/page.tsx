import Image from "next/image"

export default function Home() {
  return (
    <div className="flex flex-col lg:flex-row min-h-dvh w-full bg-linear-to-bl from-primary-color-green to-gradient-green px-6 lg:px-16 gap-7">
        <div className="mt-16 h-fit border-1 border-red-800 lg:w-3/5">
            <div className="flex justify-center items-center gap-3">
              <h1 className="text-3xl lg:text-6xl text-center text-secondary-color-green font-semibold">Finance<span className="text-white">AI</span></h1>
              <Image
                src="/img-logo.png"
                alt="Logo FinanceAI"
                width={30}
                height={30}
                quality={100}
              />
            </div>
            <p className=" mt-4 text-xl text-white font-semibold text-center">Controlar suas finanças nunca foi tão fácil.</p>

        </div>
        <div className="flex flex-col items-center bg-white p-4 rounded-2xl h-fit w-full lg:w-2/5">
            <span className="text-2xl text-primary-color-green font-bold">Bem-vindo!</span>
            <span className="mt-3 text-text-login">Faça o login ou crie uma conta</span>
        </div>
    </div>
  )
}