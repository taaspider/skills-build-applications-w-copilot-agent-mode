import CollectionPage from './CollectionPage.jsx'

const columns = [
  { key: 'name', label: 'Equipe' },
  { key: 'description', label: 'Sobre' },
  { key: 'memberIds', label: 'Integrantes' },
  { key: 'totalPoints', label: 'Pontos' },
]

function Teams() {
  return (
    <CollectionPage
      endpoint="/api/teams/"
      category="COMUNIDADE"
      title="Equipes"
      description="Grupos que treinam e evoluem juntos."
      columns={columns}
    />
  )
}

export default Teams