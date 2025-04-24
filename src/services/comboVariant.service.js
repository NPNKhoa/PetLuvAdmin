import ApiService from './api.service';

class ComboVariantService {
  constructor() {
    this.api = new ApiService(
      'http://localhost:5020/api/service-combo-variants/'
    );
  }

  async createAsync(payload) {
    try {
      const response = await this.api.post(``, payload);

      return response;
    } catch (error) {
      console.error('Lỗi khi tạo combo:', error);
      throw error;
    }
  }

  async deleteAsync(payload) {
    console.log(payload);
    const { serviceComboId, breedId, weightRange } = payload;
    try {
      return await this.api.delete(
        `${serviceComboId}/${breedId}/${weightRange}`
      );
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateAsync(payload) {
    const { serviceComboId, breedId, weightRange, body } = payload;

    try {
      const response = await this.api.put(
        `${serviceComboId}/${breedId}/${weightRange}`,
        body
      );
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default new ComboVariantService();
