"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { HexColorPicker } from "react-colorful";
import Cookies from "js-cookie";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  tipoGeralAtual?: "Receita" | "Despesa";
}

const PALETA_DE_CORES = [
  "#FF5733", "#10B981", "#3B82F6", "#8B5CF6", "#EC4899", "#F59E0B",
];

export default function CategoryModal({
  isOpen,
  onClose,
  tipoGeralAtual = "Despesa",
}: CategoryModalProps) {
  const [categoryName, setCategoryName] = useState("");
  const [categoryType, setCategoryType] = useState<"Receita" | "Despesa">(tipoGeralAtual);
  const [corHex, setCorHex] = useState(PALETA_DE_CORES[0]);
  
  // Novo estado para controlar se a paleta estilo "Paint" está aberta
  const [showPicker, setShowPicker] = useState(false);
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  // Referência para fechar o modal de cor se clicar fora dele
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setCategoryName("");
      setCategoryType(tipoGeralAtual);
      setCorHex(PALETA_DE_CORES[0]);
      setError(false);
      setIsLoading(false);
      setShowPicker(false);
    }
  }, [isOpen, tipoGeralAtual]);

  // Efeito para fechar a paleta ao clicar fora dela
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setShowPicker(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      setError(true);
      return;
    }

    setIsLoading(true);

    try {
      // 1. A URL correta é apenas /api/categories (sem o /post) e a porta geralmente é 3000 do back-end
      const response = await axios.post("http://localhost:3001/api/categories/post", {
        // 2. Não enviamos o user_id. O back-end se vira com o cookie!
        category_name: categoryName,
        // 3. Forçamos para minúsculo para passar no express-validator ('receita' ou 'despesa')
        category_type: categoryType.toLowerCase(), 
        cor_hex: corHex,
      }, {
        // 4. ESSA É A MÁGICA! Isso avisa o navegador para anexar o cookie httpOnly escondido.
        withCredentials: true 
      });

      console.log("Categoria criada com sucesso:", response.data);
      onClose();
      
    } catch (err: any) {
      console.error("Erro na API:", err.response?.data || err.message);
      
      if (err.response?.status === 401) {
        alert("Não autorizado! Verifique se você está logado.");
      } else if (err.response?.status === 400) {
        alert(`Erro de validação: ${err.response.data.error}`);
      } else {
        alert("Ocorreu um erro ao salvar a categoria. Verifique o console.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white w-full max-w-sm rounded-3xl p-6 shadow-2xl relative">
        <button
          onClick={onClose}
          disabled={isLoading}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors text-xl font-bold cursor-pointer disabled:opacity-50"
        >
          ✕
        </button>

        <h2 className="text-xl font-bold text-primary-color-green mb-6">
          Nova Categoria
        </h2>

        <form className="flex flex-col gap-5" onSubmit={handleSave}>
          <div className="flex gap-4 p-1 bg-line-gray rounded-xl">
            <button
              type="button"
              onClick={() => setCategoryType("Despesa")}
              className={`flex-1 py-2 rounded-lg font-semibold text-sm transition-all cursor-pointer ${categoryType === "Despesa" ? "bg-white text-primary-color-green shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              Despesa
            </button>
            <button
              type="button"
              onClick={() => setCategoryType("Receita")}
              className={`flex-1 py-2 rounded-lg font-semibold text-sm transition-all cursor-pointer ${categoryType === "Receita" ? "bg-white text-primary-color-green shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
            >
              Receita
            </button>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <label className="text-primary-color-green font-semibold text-sm">Nome</label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => {
                setCategoryName(e.target.value);
                setError(false);
              }}
              placeholder="Ex: Alimentação..."
              className={`bg-line-gray border rounded-xl p-3.5 outline-none transition-all focus:ring-1 focus:ring-primary-color-green w-full text-sm font-medium text-primary-color-green
                ${error ? "border-red-500 ring-1 ring-red-500" : "border-line-gray"}`}
              disabled={isLoading}
            />
          </div>

          {/* ÁREA DE SELAÇÃO DE CORES */}
          <div className="flex flex-col gap-3 w-full">
            <label className="text-primary-color-green font-semibold text-sm">Cor da Categoria</label>
            <div className="flex gap-3 items-center">
              
              {/* BOLINHA COM CORES */}
              {PALETA_DE_CORES.map((color) => (
                <button
                  key={color}
                  type="button"
                  onClick={() => {
                    setCorHex(color);
                    setShowPicker(false);
                  }}
                  className={`w-8 h-8 rounded-full cursor-pointer transition-all ${corHex === color ? "scale-125 ring-2 ring-offset-2 ring-primary-color-green" : "hover:scale-110"}`}
                  style={{ backgroundColor: color }}
                />
              ))}

              <div className="w-px h-6 bg-gray-300 mx-1"></div>

              {/* BOTÃO PARA ABRIR PALETA DE CORES */}
              <div className="relative" ref={pickerRef}>
                <button
                  type="button"
                  onClick={() => setShowPicker(!showPicker)}
                  className="w-10 h-10 rounded-xl cursor-pointer border-2 border-gray-300 hover:scale-105 transition-transform flex items-center justify-center text-xl shadow-sm"
                  style={{ backgroundColor: corHex }}
                  title="Escolher cor personalizada"
                >
                  {/* ÍCONE PARA CRIAR UMA NOVA COR */}
                  <span className="text-white drop-shadow-md font-bold text-lg mix-blend-difference">+</span>
                </button>

                {/* MODAL DE PALETA DE CORES (só aparece se showPicker for true) */}
                {showPicker && (
                  <div className="absolute top-12 -right-4 md:left-0 z-50 p-3 bg-white rounded-2xl shadow-xl border border-gray-100 animate-fade-in">
                    <HexColorPicker color={corHex} onChange={setCorHex} />
                    
                    <div className="mt-3 flex items-center gap-2 bg-line-gray p-2 rounded-lg">
                      <span className="text-xs font-semibold text-gray-500">HEX</span>
                      <input 
                        type="text" 
                        value={corHex}
                        onChange={(e) => setCorHex(e.target.value)}
                        className="bg-transparent border-none outline-none text-sm font-medium w-full uppercase"
                        maxLength={7}
                      />
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="bg-primary-color-green text-secondary-color-green font-semibold text-base py-3.5 w-full rounded-xl hover:opacity-95 transition-all shadow-md mt-2 cursor-pointer disabled:opacity-70"
          >
            {isLoading ? "Salvando..." : "Salvar Categoria"}
          </button>
        </form>
      </div>
    </div>
  );
}