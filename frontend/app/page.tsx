"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

interface AuthErrors {
  nome?: boolean
  email?: boolean
  password?: boolean
  confirmPassword?: boolean
}

const phrasesEffect = [
  "Controle de gastos.", 
  "Independência financeira.", 
  "Seu patrimônio crescendo.", 
  "Organização financeira."
]

export default function Login() {
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

  const [authMode, setAuthMode] = useState<"login" | "register" | "forgot">("login")

  const [nome, setNome] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errors, setErrors] = useState<AuthErrors>({})

  const switchMode = (mode: "login" | "register" | "forgot") => {
    setAuthMode(mode)
    setErrors({})
    setPassword("")
    setConfirmPassword("")
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault() 
    const newErrors: AuthErrors = {}

    if (!email.trim() || !email.includes("@")) newErrors.email = true
    if (!password.trim() || password.length < 6) newErrors.password = true

    if (authMode === "register") {
      if (!nome.trim()) newErrors.nome = true
      if (!confirmPassword.trim() || password !== confirmPassword) newErrors.confirmPassword = true
    }

    if (authMode === "forgot") {
      if (!confirmPassword.trim() || password !== confirmPassword) newErrors.confirmPassword = true
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      console.log(`Sucesso no modo ${authMode}!`, { nome, email, password })
      alert(authMode === "login" ? "Entrando..." : authMode === "register" ? "Conta criada com sucesso!" : "Senha redefinida com sucesso!")
    }
  }

  const baseInputClass = "mt-2 bg-line-gray border p-3 rounded-2xl w-full shadow-lg placeholder:text-xs outline-none focus:ring-2 focus:ring-gradient-green transition-all"
  const errorInputClass = "border-red-500 ring-2 ring-red-500"
  const defaultInputClass = "border-transparent"

  return (
    <div className="flex items-center min-h-dvh w-full bg-linear-to-bl from-primary-color-green to-gradient-green overscroll-none">
      <div className="flex flex-col mx-auto container px-6 py-10 gap-4 lg:flex-row lg:items-center lg:p-12 xl:gap-14">
        
        <div className="h-fit lg:w-3/6 lg:flex lg:flex-col lg:items-start">
          <div className="flex justify-center items-center gap-2 lg:gap-4">
            <h2 className="text-3xl text-center text-secondary-color-green font-semibold lg:text-right lg:text-5xl xl:text-6xl">Finance<span className="text-white">AI</span></h2>
            <Image src="/img-logo.png" alt="Logo FinanceAI" width={50} height={50} className="w-7 h-7 lg:w-12 lg:h-12" />
          </div>
          <p className=" mt-4 text-xl text-white font-semibold text-center lg:text-3xl lg:mt-8 lg:text-left xl:text-4xl">Controlar suas finanças nunca foi tão fácil.</p>
          <p className="text-center text-white mt-4 text-lg font-semibold lg:text-2xl lg:mt-8 xl:text-3xl">{text}<span className={`text-secondary-color-green ${isPaused ? 'animate-pulse' : ''}`}>|</span></p>
        </div>

        {/* AQUI ESTÁ A CORREÇÃO DA LARGURA: Voltei para a sua classe original lg:w-3/6 e p-12/16 */}
        <div className="flex flex-col items-center bg-white p-6 rounded-2xl h-fit shadow-2xl lg:p-12 lg:w-3/6 xl:p-16">
          
          {/* ========================================= */}
          {/* TELA DE LOGIN */}
          {/* ========================================= */}
          {authMode === "login" && (
            <div className="w-full flex flex-col animate-fade-in">
              <span className="text-2xl text-center text-primary-color-green font-bold lg:text-3xl lg:self-start xl:text-4xl">Bem-vindo!</span>
              <span className="mt-2 text-text-login text-center text-sm md:text-base lg:self-start">Faça o login ou crie uma conta</span>
              
              <form onSubmit={handleSubmit} className="flex flex-col mt-6 w-full lg:mt-8">
                <div className="flex flex-col mb-4">
                  <label className="text-primary-color-green font-medium text-sm">E-mail</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Informe seu e-mail" 
                    className={`${baseInputClass} ${errors.email ? errorInputClass : defaultInputClass}`}
                  />
                </div>
                
                <div className="flex flex-col mb-2">
                  <label className="text-primary-color-green font-medium text-sm">Senha</label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Informe sua senha" 
                    className={`${baseInputClass} ${errors.password ? errorInputClass : defaultInputClass}`}
                  />
                  {errors.password && (
                    <span className="text-red-500 text-xs font-semibold mt-1.5 ml-1">
                      A senha deve ter no mínimo 6 caracteres.
                    </span>
                  )}
                </div>
                
                <button 
                  type="button" 
                  onClick={() => switchMode("forgot")}
                  className="text-xs text-left text-text-login mt-2 hover:text-primary-color-green transition-colors w-fit cursor-pointer"
                >
                  Esqueci minha senha
                </button>
                
                <button type="submit" className="bg-primary-color-green text-secondary-color-green font-bold text-base p-3 rounded-2xl my-5 cursor-pointer hover:opacity-90 transition-all shadow-md">
                  Login
                </button>
              </form>
              
              <button 
                type="button"
                onClick={() => switchMode("register")}
                className="text-sm font-medium text-text-login hover:text-primary-color-green transition-colors cursor-pointer"
              >
                Não tem uma conta? <span className="font-bold underline">Crie uma!</span>
              </button>
            </div>
          )}

          {/* ========================================= */}
          {/* TELA DE REGISTRO */}
          {/* ========================================= */}
          {authMode === "register" && (
            <div className="w-full flex flex-col animate-fade-in">
              <span className="text-center text-2xl text-primary-color-green font-bold lg:text-3xl lg:self-start xl:text-4xl">Criar conta</span>
              <span className="mt-2 text-text-login text-center text-sm md:text-base lg:self-start">Preencha seus dados abaixo</span>
              
              <form onSubmit={handleSubmit} className="flex flex-col mt-6 w-full lg:mt-8">
                <div className="flex flex-col mb-3">
                  <label className="text-primary-color-green font-medium text-sm">Nome completo</label>
                  <input 
                    type="text" 
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    placeholder="Informe seu nome" 
                    className={`${baseInputClass} ${errors.nome ? errorInputClass : defaultInputClass}`}
                  />
                </div>

                <div className="flex flex-col mb-3">
                  <label className="text-primary-color-green font-medium text-sm">E-mail</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Informe seu e-mail" 
                    className={`${baseInputClass} ${errors.email ? errorInputClass : defaultInputClass}`}
                  />
                </div>
                
                <div className="flex flex-col gap-3">
                  <div className="w-full flex flex-col">
                    <label className="text-primary-color-green font-medium text-sm">Senha</label>
                    <input 
                      type="password" 
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Mínimo de 6 caracteres" 
                      className={`${baseInputClass} ${errors.password ? errorInputClass : defaultInputClass}`}
                    />
                    {errors.password && (
                      <span className="text-red-500 text-[11px] font-semibold mt-1.5 ml-1 leading-tight">
                        Mínimo de 6 caracteres.
                      </span>
                    )}
                  </div>
                  <div className="w-full flex flex-col">
                    <label className="text-primary-color-green font-medium text-sm">Confirmar</label>
                    <input 
                      type="password" 
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Repita a senha" 
                      className={`${baseInputClass} ${errors.confirmPassword ? errorInputClass : defaultInputClass}`}
                    />
                    {errors.confirmPassword && (
                      <span className="text-red-500 text-[11px] font-semibold mt-1.5 ml-1 leading-tight">
                        As senhas não coincidem.
                      </span>
                    )}
                  </div>
                </div>
                
                <button type="submit" className="bg-primary-color-green text-secondary-color-green font-semibold text-base p-3 rounded-2xl mt-8 mb-5 cursor-pointer hover:opacity-90 transition-all shadow-md">
                  Criar minha conta
                </button>
              </form>
              
              <button 
                type="button"
                onClick={() => switchMode("login")}
                className="text-sm font-medium text-text-login hover:text-primary-color-green transition-colors cursor-pointer"
              >
                Já tem uma conta? <span className="font-bold underline">Faça login</span>
              </button>
            </div>
          )}

          {/* ========================================= */}
          {/* TELA DE RECUPERAR SENHA */}
          {/* ========================================= */}
          {authMode === "forgot" && (
            <div className="w-full flex flex-col animate-fade-in">
              <span className="text-center text-2xl text-primary-color-green font-bold lg:text-3xl lg:self-start xl:text-4xl">Recuperar senha</span>
              <span className="mt-2 text-text-login text-center text-sm md:text-base lg:self-start">Crie uma nova senha</span>
              
              <form onSubmit={handleSubmit} className="flex flex-col mt-6 w-full lg:mt-8">
                <div className="flex flex-col mb-4">
                  <label className="text-primary-color-green font-medium text-sm">E-mail da conta</label>
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Informe seu e-mail" 
                    className={`${baseInputClass} ${errors.email ? errorInputClass : defaultInputClass}`}
                  />
                </div>

                <div className="flex flex-col mb-4">
                  <label className="text-primary-color-green font-medium text-sm">Nova senha</label>
                  <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Informe a nova senha" 
                    className={`${baseInputClass} ${errors.password ? errorInputClass : defaultInputClass}`}
                  />
                  {errors.password && (
                    <span className="text-red-500 text-xs font-semibold mt-1.5 ml-1">
                      A senha deve ter no mínimo 6 caracteres.
                    </span>
                  )}
                </div>
                
                <div className="flex flex-col mb-2">
                  <label className="text-primary-color-green font-medium text-sm">Confirmar nova senha</label>
                  <input 
                    type="password" 
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repita a nova senha" 
                    className={`${baseInputClass} ${errors.confirmPassword ? errorInputClass : defaultInputClass}`}
                  />
                  {errors.confirmPassword && (
                    <span className="text-red-500 text-xs font-semibold mt-1.5 ml-1">
                      As senhas não coincidem.
                    </span>
                  )}
                </div>
                
                <button type="submit" className="bg-primary-color-green text-secondary-color-green font-semibold text-base p-3 rounded-2xl mt-8 mb-5 cursor-pointer hover:opacity-90 transition-all shadow-md">
                  Redefinir senha
                </button>
              </form>
              
              <button 
                type="button"
                onClick={() => switchMode("login")}
                className="text-sm font-medium text-text-login hover:text-primary-color-green transition-colors cursor-pointer"
              >
                Lembrou a senha? <span className="font-semibold underline">Voltar para login</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}