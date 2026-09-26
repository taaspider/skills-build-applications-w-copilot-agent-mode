const codespaceName = (import.meta.env.VITE_CODESPACE_NAME ?? '').trim()

export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : '/api'

function unwrapCollection(payload) {
  if (Array.isArray(payload)) return payload
  if (!payload || typeof payload !== 'object') return null

  for (const key of ['results', 'items', 'records', 'docs', 'data']) {
    const value = payload[key]
    if (Array.isArray(value)) return value

    const nested = unwrapCollection(value)
    if (nested !== null) return nested
  }

  return null
}

export function normalizeCollection(payload) {
  return unwrapCollection(payload) ?? []
}

export async function fetchCollection(resource, { signal } = {}) {
  const response = await fetch(`${API_BASE_URL}/${resource}/`, {
    headers: { Accept: 'application/json' },
    signal,
  })

  if (!response.ok) {
    throw new Error(`Não foi possível carregar os dados (${response.status}).`)
  }

  return normalizeCollection(await response.json())
}