import CollectionPage from './CollectionPage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/users/`
  : null

const columns = [
  { key: 'name', label: 'Pessoa' },
  { key: 'email', label: 'E-mail' },
  { key: 'age', label: 'Idade' },
  { key: 'teamId', label: 'Equipe' },
  { key: 'totalPoints', label: 'Pontos' },
]

function Users() {
  return (
    <CollectionPage
      endpoint={endpoint}
      category="COMUNIDADE"
      title="Pessoas"
      description="Perfis que fazem parte do OctoFit Tracker."
      columns={columns}
    />
  )
}

export default Users