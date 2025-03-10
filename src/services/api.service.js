class ApiService {
  constructor(baseUrl = import.meta.env.VITE_API_BASE_URL) {
    this.baseUrl = baseUrl || 'http://localhost:5000/api/';
    this.tokenKey = 'token';
  }

  async request(endpoint, method = 'GET', body = null, headers = {}) {
    const url = new URL(endpoint, this.baseUrl);
    const accessToken = localStorage.getItem(this.tokenKey);

    const options = {
      method,
      headers: {
        Authorization: accessToken ? `Bearer ${accessToken}` : '',
        ...headers,
      },
    };

    if (body instanceof FormData) {
      options.body = body;
      delete options.headers['Content-Type'];
    } else if (body && method !== 'GET' && method !== 'HEAD') {
      options.body = JSON.stringify(body);
      options.headers['Content-Type'] = 'application/json';
    }

    try {
      const response = await fetch(url, options);

      if (!response.ok && response.status === 401) {
        localStorage.removeItem(this.tokenKey);
        throw new Error('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại');
      }

      const data = await response.json();

      if (data === null || data.flag === null) {
        if (response.status === 401) {
          if (data.message && data.message.toLowerCase().includes('token')) {
            localStorage.removeItem(this.tokenKey);
            window.location.href('/dang-nhap');
          }

          throw new Error('Phiên đăng nhập hết hạn. Vui lòng đăng nhập lại');
        }

        throw new Error('Lỗi không xác định. Thử lại sau');
      }

      return data;
    } catch (error) {
      if (error instanceof TypeError) {
        throw new Error('Lỗi mạng! Vui lòng thử lại sau!');
      }

      console.error('API error:', error);
      // throw error;
    }
  }

  get(endpoint, headers = {}) {
    return this.request(endpoint, 'GET', null, headers);
  }

  post(endpoint, body, headers = {}) {
    return this.request(endpoint, 'POST', body, headers);
  }

  put(endpoint, body, headers = {}) {
    return this.request(endpoint, 'PUT', body, headers);
  }

  delete(endpoint, headers = {}) {
    return this.request(endpoint, 'DELETE', null, headers);
  }
}

export default ApiService;
