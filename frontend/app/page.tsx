import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex flex-col justify-center lg:flex-row min-h-dvh w-full bg-linear-to-bl from-primary-color-green to-gradient-green px-6 lg:px-16 gap-7">
        <div className="h-fit lg:w-3/5">
            <div className="flex justify-center items-center gap-3">
              <h1 className="text-3xl lg:text-6xl text-center text-secondary-color-green font-semibold">Finance<span className="text-white">AI</span></h1>
              <Image
                src="/img-logo.png"
                alt="Logo FinanceAI"
                title="Logo FinanceAI"
                width={30}
                height={30}
                quality={100}
              />
            </div>
            <p className=" mt-4 text-xl text-white font-semibold text-center">Controlar suas finanças nunca foi tão fácil.</p>
            <p className="text-center text-white mt-4 text-lg font-semibold">Controle de gastos.<span className="text-secondary-color-green">|</span></p>

        </div>
        <div className="flex flex-col items-center justify-center bg-white p-6 rounded-2xl h-fit w-full lg:w-2/5">
            <span className="text-2xl text-primary-color-green font-bold">Bem-vindo!</span>
            <span className="mt-4 text-text-login">Faça o login ou crie uma conta</span>
                <form action="" className="flex flex-col my-6 w-full">
                    <label htmlFor="e-mail" className="text-primary-color-green font-medium text-sm">E-mail</label>
                    <input type="email" id="email" name="email" placeholder="Informe seu e-mail" className="my-4 bg-line-gray p-3 rounded-2xl w-full shadow-lg placeholder:text-xs"/>
                    <label htmlFor="password" className="text-primary-color-green font-medium text-sm">Senha</label>
                    <input type="password" name="password" id="password" placeholder="Informe sua senha" className="my-3 bg-line-gray p-3 rounded-2xl w-full shadow-lg placeholder:text-xs"/>
                    <Link href="/forgot-password" className="text-xs text-text-login mt-2">Esqueci minha senha</Link>
                    <button type="submit" className="bg-primary-color-green text-secondary-color-green p-2 rounded-2xl my-3">Login</button>
                    <Link href="/forgot-password" className="text-xs text-text-login mt-2">Não tem uma conta? Crie uma!</Link>
                    <span className="text-center text-xs text-text-login my-4">Ou</span>
                    <button className="bg-line-gray p-2 rounded-2xl flex justify-center items-center gap-6 text-text-login">
                      <Image
                        src="/img-logo-google.png"
                        alt="Logo Google"
                        title="Logo Google"
                        width={25}
                        height={25}
                        quality={100}
                      />
                      Entrar com Google
                    </button>
                </form>
        </div>
    </div>
  )
}