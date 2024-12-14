const ROOT_URL = 'http://localhost:3000'
const API_URL = ROOT_URL + 'api/v1'

//  Fetch function for all REST operations
export function rest<T>(
  url: string,
  data?: T,
  method?: string,
  headers?: Record<string, string>
): Promise<T> {
  return fetch(url, {
    method: method ?? (data ? 'POST' : 'GET'), // If data exists, use POST, else GET
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    body: data ? JSON.stringify(data) : undefined // Stringify the body if data is provided
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      return response.json() // Parse the JSON response if status is OK
    })
    .catch((error) => {
      console.error('API request error:', error)
      throw error // Re-throw to allow for handling in the calling function
    })
}

// API wrapper function which adds base URL
export function api<T>(url: string, data?: T, method?: string): Promise<T> {
  return rest<T>(API_URL + url, data, method) // Append base URL to the provided endpoint
}

export async function loadScript(url: string): Promise<void> {
  return new Promise((resolve, reject) => {
    if (document.querySelector(`script[src="${url}"]`)) {
      resolve()
      return
    }
    const script = document.createElement('script')
    script.src = url
    script.onload = () => resolve()
    script.onerror = (url) => reject(new Error(`Failed to load script: ${url}`))
    document.head.appendChild(script)
  })
}
