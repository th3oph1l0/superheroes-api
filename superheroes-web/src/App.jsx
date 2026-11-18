import { useEffect, useState } from 'react'
import { listHeroes, createHero } from './api'

function App() {
  // Lista de heróis que veio do backend
  const [heroes, setHeroes] = useState([])

  // Valores digitados no formulário
  const [name, setName] = useState('')
  const [universe, setUniverse] = useState('')
  const [power, setPower] = useState('')

  // Mensagem de erro (se algo der errado)
  const [error, setError] = useState('')

  // Carrega os heróis do backend
  async function loadHeroes() {
    try {
      const data = await listHeroes()
      setHeroes(data)
    } catch (err) {
      setError(err.message)
    }
  }

  // Roda uma vez quando a página abre
  useEffect(() => {
    loadHeroes()
  }, [])

  // Roda quando clica em "Cadastrar"
  async function handleSubmit(event) {
    event.preventDefault() // impede a página de recarregar
    setError('')

    try {
      await createHero({ name, universe, power })

      // Limpa o formulário
      setName('')
      setUniverse('')
      setPower('')

      // Recarrega a lista para mostrar o herói novo
      loadHeroes()
    } catch (err) {
      setError(err.message)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6">Super-Heróis</h1>

        {/* Formulário de cadastro */}
        <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow mb-6 flex flex-col gap-3">
          <h2 className="text-xl font-semibold">Cadastrar herói</h2>

          <input
            className="border p-2 rounded"
            placeholder="Nome (ex: Homem-Aranha)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            className="border p-2 rounded"
            placeholder="Universo (ex: Marvel)"
            value={universe}
            onChange={(e) => setUniverse(e.target.value)}
          />

          <input
            className="border p-2 rounded"
            placeholder="Poder (ex: Soltar teias)"
            value={power}
            onChange={(e) => setPower(e.target.value)}
          />

          <button type="submit" className="bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Cadastrar
          </button>

          {error && <p className="text-red-600">{error}</p>}
        </form>

        {/* Lista de heróis */}
        <h2 className="text-xl font-semibold mb-3">Heróis cadastrados</h2>

        {heroes.length === 0 && <p className="text-gray-500">Nenhum herói cadastrado ainda.</p>}

        <ul className="flex flex-col gap-3">
          {heroes.map((hero) => (
            <li key={hero.id} className="bg-white p-4 rounded shadow">
              <p className="text-lg font-bold">{hero.name}</p>
              <p>Universo: {hero.universe}</p>
              <p>Poder: {hero.power}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
