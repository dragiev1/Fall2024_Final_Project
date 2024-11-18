// Only for talking to the server.

const API_URL = 'http://localhost:3000/api/v1/'

export async function rest<T>(url: string): Promise<T> {
  return fetch(url).then((x)=>x.json());
}

export function api<T>(url: string) {
  return rest<T>(API_URL + url)
}

