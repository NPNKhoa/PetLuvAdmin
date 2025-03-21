import ApiService from './api.service';

class PetService {
  constructor() {
    this.api = new ApiService('http://localhost:5040/api/pets/');
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

  async getById(petId) {
    try {
      return await this.api.get(`${petId}`);
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getByUser(userId) {
    try {
      const response = this.api.get(`/api/users/${userId}/pets`);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
}

export default new PetService();
