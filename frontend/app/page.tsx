"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Login() {

  const phrasesEffect = ["Controle de gastos.", "Independência financeira.", "Seu patrimônio crescendo.", "Organização financeira."]

  const [text, setText] = useState("")
  const [loop, setLoop] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const fullText = phrasesEffect[loop % phrasesEffect.length]
  const isPaused = !isDeleting && text === fullText

  useEffect(() => {
    let typingSpeed = isDeleting ? 30 : 30

    if (isPaused) {
      typingSpeed = 3000
    }

    const timer = setTimeout(() => {
      
      if (!isDeleting && text === fullText) {
        setIsDeleting(true)
      } else if (isDeleting && text === "") {
        setIsDeleting(false)
        setLoop(loop + 1)
      } else {
        setText(fullText.substring(0, text.length + (isDeleting ? -1 : 1)))
      }

    }, typingSpeed)

    return () => clearTimeout(timer)
  }, [text, isDeleting, loop, fullText, isPaused])

  return (
    <div className="flex items-center min-h-dvh w-full bg-linear-to-bl from-primary-color-green to-gradient-green">
      <div className="flex flex-col mx-auto container p-4 gap-7 lg:flex-row lg:items-center lg:p-12 xl:gap-14">
        <div className="h-fit lg:w-3/6 lg:flex lg:flex-col lg:items-start">
          <div className="flex justify-center items-center gap-2 lg:gap-4">
            <h1 className="text-4xl text-center text-secondary-color-green font-semibold lg:text-right lg:text-5xl xl:text-6xl">Finance<span className="text-white">AI</span></h1>
            <Image
              src="/img-logo.png"
              alt="Logo FinanceAI"
              title="Logo FinanceAI"
              width={50}
              height={50}
              quality={100}
              className="w-8 h-8 lg:w-12 lg:h-12"
              />
          </div>
          <p className=" mt-4 text-2xl text-white font-semibold text-center lg:text-3xl lg:mt-8 lg:text-left xl:text-4xl">Controlar suas finanças nunca foi tão fácil.</p>
          <p className="text-center text-white mt-4 text-xl font-semibold lg:text-2xl lg:mt-8 xl:text-3xl">{text}<span className={`text-secondary-color-green ${isPaused ? 'animate-ping' : ''}`}>|</span></p>
        </div>
        <div className="flex flex-col items-center bg-white p-6 rounded-2xl h-fit lg:p-12 lg:w-3/6 xl:p-16">
          <span className="text-2xl text-primary-color-green font-bold lg:text-3xl lg:self-start xl:text-4xl">Bem-vindo!</span>
          <span className="mt-4 text-text-login text-center lg:text-lg lg:self-start">Faça o login ou crie uma conta</span>
            <form action="" className="flex flex-col mt-6 w-full lg:mt-12">
                <label htmlFor="e-mail" className="text-primary-color-green font-medium text-sm">E-mail</label>
                <input type="email" id="email" name="email" placeholder="Informe seu e-mail" className="my-4 bg-line-gray p-3 rounded-2xl w-full shadow-lg placeholder:text-xs outline-none focus:ring-2 focus:ring-gradient-green transition-shadow"/>
                <label htmlFor="password" className="text-primary-color-green font-medium text-sm">Senha</label>
                <input type="password" name="password" id="password" placeholder="Informe sua senha" className="my-3 bg-line-gray p-3 rounded-2xl w-full shadow-lg placeholder:text-xs outline-none focus:ring-2 focus:ring-gradient-green transition-shadow"/>
                <Link href="/forgot-password" className="text-xs text-text-login mt-2">Esqueci minha senha</Link>
                <button type="submit" className="bg-primary-color-green text-secondary-color-green p-2 rounded-2xl my-3 cursor-pointer">Login</button>
            </form>
            <Link href="/forgot-password" className="text-xs text-text-login mt-2">Não tem uma conta? Crie uma!</Link>
            <span className="text-center text-xs text-text-login my-4">Ou</span>
            <button className="bg-line-gray p-2 rounded-2xl flex justify-center items-center gap-6 text-text-login w-full cursor-pointer">
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
        </div>
      </div>
    </div>
  )
}