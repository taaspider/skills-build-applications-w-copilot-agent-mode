import CollectionPage from './CollectionPage.jsx'

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
      endpoint="/api/workouts/"
      category="PLANEJAMENTO"
      title="Treinos"
      description="Sugestões para manter o ritmo e variar os estímulos."
      columns={columns}
    />
  )
}

export default Workouts