import ApiService from './api.service';

class PetBreedService {
  constructor() {
    this.api = new ApiService('http://localhost:5040/api/pet-breeds/');
  }

  async getAll(params) {
    const { petType = '', pageIndex = 1, pageSize = 10 } = params;
    const query = new URLSearchParams({
      petType,
      pageIndex,
      pageSize,
    }).toString();

    try {
      const response = await this.api.get(`?${query}`);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getById(breedId) {
    try {
      const response = await this.api.get(`${breedId}`);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  //   async createAsync(payload) {
  //     try {
  //       const response = await this.api.post(``, payload);

  //       return response;
  //     } catch (error) {
  //       console.error('Lỗi khi tạo combo:', error);
  //       throw error;
  //     }
  //   }

  //   async deleteAsync(comboId) {
  //     try {
  //       const response = await this.api.delete(`${comboId}`);
  //       return response;
  //     } catch (error) {
  //       console.log(error);
  //       throw error;
  //     }
  //   }

  //   async updateAsync(payload) {
  //     try {
  //       const response = await this.api.put(`${payload.comboId}`, payload.body);
  //       return response;
  //     } catch (error) {
  //       console.log(error);
  //       throw error;
  //     }
  //   }
}

export default new PetBreedService();
