import CollectionPage from './CollectionPage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
  : null

const columns = [
  { key: 'name', label: 'Equipe' },
  { key: 'description', label: 'Sobre' },
  { key: 'memberIds', label: 'Integrantes' },
  { key: 'totalPoints', label: 'Pontos' },
]

function Teams() {
  return (
    <CollectionPage
      endpoint={endpoint}
      category="COMUNIDADE"
      title="Equipes"
      description="Grupos que treinam e evoluem juntos."
      columns={columns}
    />
  )
}

export default Teams