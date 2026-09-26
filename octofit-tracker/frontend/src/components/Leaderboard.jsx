import CollectionPage from './CollectionPage.jsx'

const columns = [
  { key: 'rank', label: 'Posição', render: (value) => `#${value ?? '—'}` },
  { key: 'userName', label: 'Pessoa' },
  { key: 'teamName', label: 'Equipe' },
  { key: 'points', label: 'Pontos', render: (value) => Number(value ?? 0).toLocaleString('pt-BR') },
  { key: 'period', label: 'Período' },
]

function Leaderboard() {
  return (
    <CollectionPage
      resource="leaderboard"
      category="DESEMPENHO"
      title="Leaderboard"
      description="Pontuação e posição da temporada."
      columns={columns}
    />
  )
}

export default Leaderboard