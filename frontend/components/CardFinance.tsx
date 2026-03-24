import Image from "next/image";

interface CardProps {
  icon: string;
  editButton?: boolean;
  border?: boolean;
  title: string;
  value: string;
  bgColor: string;
  textColor: string;
  bgIcon: string;
}

export default function CardFinance({ icon, editButton, border, title, value, bgColor, textColor, bgIcon }: CardProps) {

  const borderSolid = border ? "border-1 border-solid border-line-gray" : ""

  return (
    <div className={`flex flex-col rounded-2xl p-4 ${bgColor} shadow-sm ${borderSolid}`}>
      <div className="flex justify-between items-center">
          <div className={`p-2 ${bgIcon} rounded-lg`}>
            <Image
              src={icon}
              alt={`Ícone ${title}`}
              title={`Ícone ${title}`}
              width={30}
              height={30}
              className="w-6 h-6"
            />
          </div>
          {editButton && (
            <button className="cursor-pointer hover:opacity-70 transition-opacity">
              <Image
                src="/img-edit.png"
                alt="ícone de Edição"
                title="Clique aqui para editar o valor"
                width={24}
                height={24}
              />
            </button>
          )}
      </div>
      <div className="flex flex-col gap-1 mt-3">
        <span className={`${textColor} font-semibold text-xl`}>{value}</span>
        <span className={`${textColor} font-semibold text-md`}>{title}</span>
      </div>
    </div>
  )
}