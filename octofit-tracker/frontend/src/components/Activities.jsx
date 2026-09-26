import CollectionPage from './CollectionPage.jsx'

const columns = [
  { key: 'type', label: 'Atividade' },
  { key: 'userId', label: 'Pessoa' },
  { key: 'durationMinutes', label: 'Duração', render: (value) => `${value ?? 0} min` },
  { key: 'distanceKm', label: 'Distância', render: (value) => `${value ?? 0} km` },
  { key: 'calories', label: 'Calorias', render: (value) => `${value ?? 0} kcal` },
  {
    key: 'completedAt',
    label: 'Concluída em',
    render: (value) => value ? new Intl.DateTimeFormat('pt-BR').format(new Date(value)) : '—',
  },
]

function Activities() {
  return (
    <CollectionPage
      resource="activities"
      category="MOVIMENTO"
      title="Atividades"
      description="Sessões registradas pela comunidade."
      columns={columns}
    />
  )
}

export default Activities