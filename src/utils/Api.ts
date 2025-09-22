export default class Api {
  _baseUrl!: string;
  _headers!: Record<string, string>;

  constructor({
    baseUrl,
    headers,
  }: {
    baseUrl: string;
    headers: Record<string, string>;
  }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _makeRequest<T>(endpoint: string): Promise<T> {
    return fetch(`${this._baseUrl}${endpoint}`, {
      headers: this._headers,
    }).then((res) => {
      if (res.ok) return res.json();
      return Promise.reject({ status: res.status, message: res.statusText });
    });
  }
}
