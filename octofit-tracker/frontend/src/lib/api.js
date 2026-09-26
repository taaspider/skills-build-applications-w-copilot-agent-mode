const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim()
const apiOrigin = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : ''

export function resolveApiUrl(endpoint) {
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  return `${apiOrigin}${path}`
}

export function normalizeCollectionResponse(payload) {
  if (Array.isArray(payload)) return payload
  if (!payload || typeof payload !== 'object') return []

  const candidates = [
    payload.results,
    payload.items,
    payload.docs,
    payload.records,
    payload.data,
  ]

  for (const candidate of candidates) {
    if (Array.isArray(candidate)) return candidate
    if (candidate && typeof candidate === 'object') {
      const nestedRecords = normalizeCollectionResponse(candidate)
      if (nestedRecords.length > 0) return nestedRecords
    }
  }

  return []
}

export async function fetchCollection(endpoint, { signal } = {}) {
  const response = await fetch(resolveApiUrl(endpoint), {
    signal,
    headers: { Accept: 'application/json' },
  })

  if (!response.ok) {
    throw new Error(`Falha ao carregar dados (${response.status}).`)
  }

  return normalizeCollectionResponse(await response.json())
}