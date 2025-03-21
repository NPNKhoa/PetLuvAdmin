import ApiService from './api.service';

class ServicesService {
  constructor() {
    this.api = new ApiService('http://localhost:5020/api/services/');
  }

  async getServices(params) {
    const {
      pageIndex = 1,
      pageSize = 10,
      breedId = '',
      petWeight = '',
    } = params;
    const query = new URLSearchParams({
      pageIndex,
      pageSize,
      breedId,
      petWeight,
    }).toString();

    try {
      const response = await this.api.get(`?${query}`);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getServiceById(serviceId) {
    try {
      const response = await this.api.get(`${serviceId}`);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async getVariants(serviceId) {
    try {
      const response = await this.api.get(`${serviceId}/service-variants`);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async createService(payload) {
    const {
      serviceName,
      serviceDesc,
      isVisible,
      serviceTypeId,
      serviceImageUrls,
    } = payload;

    const formData = new FormData();
    formData.append('serviceName', serviceName);
    formData.append('serviceDesc', serviceDesc);
    formData.append('isVisible', isVisible);
    formData.append('serviceTypeId', serviceTypeId);

    serviceImageUrls.forEach((file) => {
      formData.append(`imageFiles`, file);
    });

    try {
      const response = await this.api.post(``, formData);

      return response;
    } catch (error) {
      console.error('Lỗi khi tạo dịch vụ:', error);
      throw error;
    }
  }

  async deleteService(serviceId) {
    try {
      const response = await this.api.delete(`${serviceId}`);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  async updateService(serviceId, payload) {
    const {
      serviceName,
      serviceDesc,
      isVisible,
      serviceTypeId,
      serviceImageUrls,
    } = payload;

    const formData = new FormData();
    formData.append('serviceName', serviceName);
    formData.append('serviceDesc', serviceDesc);
    formData.append('isVisible', isVisible);
    formData.append('serviceTypeId', serviceTypeId);

    serviceImageUrls.forEach((file) => {
      formData.append(`imageFiles`, file);
    });

    try {
      const response = await this.api.put(`${serviceId}`, formData);
      return response;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
}

export default new ServicesService();
