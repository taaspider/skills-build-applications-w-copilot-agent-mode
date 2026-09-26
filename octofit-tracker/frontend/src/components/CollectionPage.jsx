import { useEffect, useState } from 'react'
import { fetchCollection } from '../lib/api.js'

function formatValue(value) {
  if (value === null || value === undefined || value === '') return '—'
  if (Array.isArray(value)) {
    return value
      .map((item) => (typeof item === 'object' && item !== null ? item.name ?? item.title ?? '' : item))
      .filter(Boolean)
      .join(', ') || `${value.length} itens`
  }
  if (typeof value === 'object') {
    return value.name ?? value.title ?? value.email ?? value.slug ?? value._id ?? '—'
  }
  return value
}

function CollectionPage({ resource, title, category, description, columns }) {
  const [records, setRecords] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    fetchCollection(resource, { signal: controller.signal })
      .then(setRecords)
      .catch((requestError) => {
        if (requestError.name !== 'AbortError') setError(requestError.message)
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false)
      })

    return () => controller.abort()
  }, [resource])

  return (
    <section className="collection-page" aria-labelledby="page-title">
      <div className="page-heading">
        <div>
          <p className="eyebrow">{category} <span>/</span> OCTOFIT TRACKER</p>
          <h1 id="page-title">{title}</h1>
          <p className="page-description">{description}</p>
        </div>
        <div className="record-total" aria-live="polite">
          <span>{loading ? '—' : records.length.toLocaleString('pt-BR')}</span>
          <small>REGISTROS</small>
        </div>
      </div>

      <div className="collection-panel">
        <div className="panel-heading">
          <div>
            <span className="panel-kicker">VISÃO GERAL</span>
            <h2>{title}</h2>
          </div>
          <span className="api-indicator"><span /> DADOS DA API</span>
        </div>

        {loading && (
          <div className="table-message" role="status">
            <span className="loading-mark" /> Carregando dados
          </div>
        )}

        {!loading && error && (
          <div className="table-message error-message" role="alert">
            <strong>Não foi possível carregar esta seção.</strong>
            <span>{error}</span>
          </div>
        )}

        {!loading && !error && records.length === 0 && (
          <div className="table-message">Nenhum registro encontrado.</div>
        )}

        {!loading && !error && records.length > 0 && (
          <div className="table-responsive">
            <table className="table collection-table mb-0">
              <thead>
                <tr>
                  {columns.map((column) => <th key={column.key} scope="col">{column.label}</th>)}
                </tr>
              </thead>
              <tbody>
                {records.map((record, index) => (
                  <tr key={record._id ?? record.id ?? `${resource}-${index}`}>
                    {columns.map((column) => {
                      const value = column.render
                        ? column.render(record[column.key], record)
                        : formatValue(record[column.key])
                      return <td key={column.key}>{value}</td>
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="panel-footer">
          <span>ATUALIZAÇÃO EM TEMPO REAL</span>
          <span>{loading ? 'Sincronizando' : error ? 'Sem conexão' : 'Sincronizado'}</span>
        </div>
      </div>
    </section>
  )
}

export default CollectionPage