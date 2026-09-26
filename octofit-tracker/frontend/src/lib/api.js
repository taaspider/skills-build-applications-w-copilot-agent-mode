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
  if (!endpoint || !/^https:\/\/[^/]+\/api\//i.test(endpoint)) {
    throw new Error('Configure VITE_CODESPACE_NAME para conectar à API do Codespace.')
  }

  const response = await fetch(endpoint, {
    signal,
    headers: { Accept: 'application/json' },
  })

  if (!response.ok) {
    throw new Error(`Falha ao carregar dados (${response.status}).`)
  }

  return normalizeCollectionResponse(await response.json())
}