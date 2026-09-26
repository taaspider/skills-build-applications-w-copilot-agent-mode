import CollectionPage from './CollectionPage.jsx'

const columns = [
  { key: 'name', label: 'Treino' },
  { key: 'category', label: 'Categoria' },
  { key: 'difficulty', label: 'Nível' },
  { key: 'durationMinutes', label: 'Duração', render: (value) => `${value ?? 0} min` },
  { key: 'exercises', label: 'Exercícios', render: (value) => value?.length ?? 0 },
]

function Workouts() {
  return (
    <CollectionPage
      resource="workouts"
      category="TREINAMENTO"
      title="Treinos"
      description="Planos práticos para a próxima sessão."
      columns={columns}
    />
  )
}

export default Workouts