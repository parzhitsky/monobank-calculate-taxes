import { type HttpStatusCodeError } from '@@shared/api/http-status-code/http-status-code.type.js'
import { type JsonStringifiable } from '@@shared/json-stringifiable/json-stringifiable.type.js'

/** @private */
const API_ORIGIN = 'https://api.monobank.ua/'

/** @private */
const API_TOKEN = process.env.API_TOKEN

if (!API_TOKEN) {
  throw new Error(`API_TOKEN environment variable must be defined`)
}

/** @private */
type PathName = `/${string}`

/** @private */
function createApiRequestUrl(pathName: PathName): URL {
  return new URL(pathName, API_ORIGIN)
}

/** @private */
const headers = new Headers({
  'X-Token': API_TOKEN,
  'Accept': 'application/json',
})

export async function makeRequest<ResBody extends JsonStringifiable>(pathname: PathName): Promise<ResBody> {
  const url = createApiRequestUrl(pathname)

  console.log('::', makeRequest.name, ':: requesting: GET ', url)

  const res = await fetch(url, { headers })
  const body = await res.json()

  if (!res.ok) {
    throw new RequestNotOkError(`${res.status}` as HttpStatusCodeError, res.statusText, body)
  }

  return body
}

export class RequestNotOkError extends Error {
  constructor(
    public readonly statusCode: HttpStatusCodeError,
    public readonly statusText: string,
    public readonly body: unknown,
  ) {
    super(`${statusCode} ${statusText}`)
  }
}
