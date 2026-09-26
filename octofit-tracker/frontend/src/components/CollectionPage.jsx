import { useEffect, useState } from 'react'
import { fetchCollection } from '../lib/api.js'

function formatValue(value) {
  if (value === null || value === undefined || value === '') return '—'

  if (Array.isArray(value)) {
    const labels = value
      .map((item) => (typeof item === 'object' && item !== null
        ? item.name ?? item.title ?? item.email ?? item._id
        : item))
      .filter(Boolean)
    return labels.join(', ') || `${value.length} itens`
  }

  if (typeof value === 'object') {
    return value.name ?? value.title ?? value.email ?? value.slug ?? value._id ?? '—'
  }

  return value
}

function CollectionPage({ endpoint, category, title, description, columns }) {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [reloadKey, setReloadKey] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    fetchCollection(endpoint, { signal: controller.signal })
      .then((data) => setRecords(data))
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') setError(requestError.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [endpoint, reloadKey])

  function reload() {
    setError('')
    setLoading(true)
    setReloadKey((key) => key + 1)
  }

  return (
    <section className="collection-page" aria-labelledby="collection-title">
      <div className="page-heading">
        <div>
          <span className="eyebrow">{category}</span>
          <h1 id="collection-title">{title}</h1>
          <p>{description}</p>
        </div>
        <div className="record-summary" aria-live="polite">
          <strong>{loading ? '—' : records.length}</strong>
          <span>registros</span>
        </div>
      </div>

      <div className="collection-toolbar">
        <span>{loading ? 'Sincronizando dados' : 'Dados atualizados da API'}</span>
        <button
          className="btn btn-outline-success btn-sm"
          type="button"
          onClick={reload}
          disabled={loading}
        >
          Atualizar
        </button>
      </div>

      {error && (
        <div className="alert alert-danger d-flex align-items-center justify-content-between" role="alert">
          <span>{error}</span>
          <button
            className="btn btn-sm btn-outline-danger"
            type="button"
            onClick={reload}
          >
            Tentar novamente
          </button>
        </div>
      )}

      {loading ? (
        <div className="loading-state" role="status">
          <span className="spinner-border spinner-border-sm" aria-hidden="true" />
          <span>Carregando {title.toLowerCase()}...</span>
        </div>
      ) : records.length === 0 && !error ? (
        <div className="empty-state">
          <strong>Nenhum registro por aqui ainda.</strong>
          <span>Os dados aparecerão nesta lista quando forem adicionados à API.</span>
        </div>
      ) : records.length > 0 ? (
        <div className="table-responsive collection-table-wrap">
          <table className="table align-middle collection-table">
            <thead>
              <tr>
                {columns.map((column) => <th key={column.key} scope="col">{column.label}</th>)}
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr key={record._id ?? record.id ?? index}>
                  {columns.map((column) => {
                    const value = record[column.key]
                    return (
                      <td key={column.key}>
                        {column.render ? column.render(value, record) : formatValue(value)}
                      </td>
                    )
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : null}
    </section>
  )
}

export default CollectionPage