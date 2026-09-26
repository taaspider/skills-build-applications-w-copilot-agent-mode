import CollectionPage from './CollectionPage.jsx'

const columns = [
  { key: 'rank', label: 'Posição', render: (value) => `#${value ?? '—'}` },
  { key: 'userName', label: 'Pessoa' },
  { key: 'teamName', label: 'Equipe' },
  { key: 'points', label: 'Pontos' },
  { key: 'period', label: 'Período' },
]

function Leaderboard() {
  return (
    <CollectionPage
      endpoint="/api/leaderboard/"
      category="DESEMPENHO"
      title="Ranking"
      description="Acompanhe os pontos conquistados pela comunidade."
      columns={columns}
    />
  )
}

export default Leaderboard