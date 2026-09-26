import CollectionPage from './CollectionPage.jsx'

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
      endpoint="/api/users/"
      category="COMUNIDADE"
      title="Pessoas"
      description="Perfis que fazem parte do OctoFit Tracker."
      columns={columns}
    />
  )
}

export default Users