import CollectionPage from './CollectionPage.jsx'

const columns = [
  { key: 'name', label: 'Pessoa' },
  { key: 'email', label: 'E-mail' },
  { key: 'age', label: 'Idade', render: (value) => value ? `${value} anos` : '—' },
  { key: 'totalPoints', label: 'Pontos', render: (value) => Number(value ?? 0).toLocaleString('pt-BR') },
  { key: 'teamId', label: 'Equipe' },
]

function Users() {
  return (
    <CollectionPage
      resource="users"
      category="COMUNIDADE"
      title="Pessoas"
      description="Perfis e evolução dos participantes."
      columns={columns}
    />
  )
}

export default Users