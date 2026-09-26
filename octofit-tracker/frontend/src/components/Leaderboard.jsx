import CollectionPage from './CollectionPage.jsx'

const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const endpoint = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
  : null

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
      endpoint={endpoint}
      category="DESEMPENHO"
      title="Ranking"
      description="Acompanhe os pontos conquistados pela comunidade."
      columns={columns}
    />
  )
}

export default Leaderboard