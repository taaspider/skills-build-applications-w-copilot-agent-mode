import CollectionPage from './CollectionPage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/workouts/`
  : null

const columns = [
  { key: 'name', label: 'Treino' },
  { key: 'category', label: 'Categoria' },
  { key: 'difficulty', label: 'Nível' },
  { key: 'durationMinutes', label: 'Duração', render: (value) => `${value ?? 0} min` },
  { key: 'exercises', label: 'Exercícios' },
]

function Workouts() {
  return (
    <CollectionPage
      endpoint={endpoint}
      category="PLANEJAMENTO"
      title="Treinos"
      description="Sugestões para manter o ritmo e variar os estímulos."
      columns={columns}
    />
  )
}

export default Workouts