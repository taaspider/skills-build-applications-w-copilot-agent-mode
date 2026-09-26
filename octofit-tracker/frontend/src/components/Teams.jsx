import CollectionPage from './CollectionPage.jsx'

const columns = [
  { key: 'name', label: 'Equipe' },
  { key: 'description', label: 'Sobre' },
  { key: 'memberIds', label: 'Integrantes', render: (value) => value?.length ?? 0 },
  { key: 'totalPoints', label: 'Pontos', render: (value) => Number(value ?? 0).toLocaleString('pt-BR') },
]

function Teams() {
  return (
    <CollectionPage
      resource="teams"
      category="COMUNIDADE"
      title="Equipes"
      description="Grupos que treinam e avançam juntos."
      columns={columns}
    />
  )
}

export default Teams