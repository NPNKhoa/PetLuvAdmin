import ApiService from './api.service';

class ComboService {
  constructor() {
    this.api = new ApiService('http://localhost:5020/api/service-combos/');
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

  async getById(comboId) {
    try {
      const response = await this.api.get(`${comboId}`);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getVariants(comboId) {
    console.log(comboId);
    try {
      const response = await this.api.get(`${comboId}/service-combo-variants`);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
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

  async deleteAsync(comboId) {
    try {
      const response = await this.api.delete(`${comboId}`);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateAsync(payload) {
    try {
      const response = await this.api.put(`${payload.comboId}`, payload.body);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default new ComboService();
