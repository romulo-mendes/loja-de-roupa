export function TailwindTest() {
  return (
    <div className="p-8 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Teste do Tailwind CSS</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white text-black p-4 rounded-md">
          <h3 className="font-semibold">Card 1</h3>
          <p className="text-sm text-gray-600">Se você está vendo este card estilizado, o Tailwind está funcionando!</p>
        </div>
        <div className="bg-red-500 text-white p-4 rounded-md hover:bg-red-600 transition-colors">
          <h3 className="font-semibold">Card 2</h3>
          <p className="text-sm">Hover sobre este card para ver a transição</p>
        </div>
        <div className="bg-green-500 text-white p-4 rounded-md transform hover:scale-105 transition-transform">
          <h3 className="font-semibold">Card 3</h3>
          <p className="text-sm">Este card tem animação de escala no hover</p>
        </div>
      </div>
      <button className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded-md font-semibold transition-colors">
        Botão de Teste
      </button>
    </div>
  )
}
