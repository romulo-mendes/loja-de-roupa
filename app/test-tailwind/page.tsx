import { TailwindTest } from "@/components/tailwind-test"

export default function TestTailwindPage() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Teste do Tailwind CSS</h1>

        <TailwindTest />

        <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">Checklist de Verificação</h2>
          <ul className="space-y-2">
            <li className="flex items-center">
              <span className="w-4 h-4 bg-green-500 rounded-full mr-3"></span>
              <span>Se você vê cores e estilos, o Tailwind está carregando</span>
            </li>
            <li className="flex items-center">
              <span className="w-4 h-4 bg-blue-500 rounded-full mr-3"></span>
              <span>Se o layout é responsivo, o grid está funcionando</span>
            </li>
            <li className="flex items-center">
              <span className="w-4 h-4 bg-purple-500 rounded-full mr-3"></span>
              <span>Se há animações no hover, as transições estão ativas</span>
            </li>
          </ul>
        </div>

        <div className="mt-8 text-center">
          <a
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
          >
            Voltar para a Loja
          </a>
        </div>
      </div>
    </div>
  )
}
