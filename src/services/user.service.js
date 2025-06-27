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

  async togleAccountStatus(userId) {
    try {
      const response = await this.api.put(`${userId}/toggle-account-status`);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async register(payload) {
    const {
      email,
      fullName,
      gender,
      dateOfBirth,
      phoneNumber,
      address,
      avatar,
    } = payload;

    const formData = new FormData();
    formData.append('email', email);
    formData.append('fullName', fullName);
    formData.append('gender', gender);
    formData.append('dateOfBirth', dateOfBirth);
    formData.append('phoneNumber', phoneNumber);
    formData.append('address', address);
    formData.append('avatar', avatar);
    formData.append('isActive', true);
    formData.append('password', '12345678');

    try {
      return await this.api.post(`/api/register/`, formData);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async login(credentials) {
    const { email, password } = credentials;

    try {
      const response = await this.api.post('/api/login', { email, password });
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new UserService();
