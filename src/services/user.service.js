import ApiService from './api.service';

class UserService {
  constructor() {
    this.api = new ApiService('http://localhost:5050/api/users/');
  }

  async getAll(params) {
    const { pageIndex = 1, pageSize = 10 } = params;
    const query = new URLSearchParams({ pageIndex, pageSize }).toString();

    try {
      const response = await this.api.get(`?${query}`);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getById(userId) {
    try {
      return await this.api.get(`${userId}`);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default new UserService();
