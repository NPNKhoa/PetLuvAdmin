import ApiService from './api.service';

class RoomService {
  constructor() {
    this.api = new ApiService('http://localhost:5030/api/rooms/');
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

  async createAsync(payload) {
    const {
      roomName,
      roomDesc,
      isVisible,
      roomTypeId,
      pricePerHour,
      pricePerDay,
      roomImageUrls,
    } = payload;

    const formData = new FormData();
    formData.append('roomName', roomName);
    formData.append('roomDesc', roomDesc);
    formData.append('isVisible', isVisible);
    formData.append('roomTypeId', roomTypeId);
    formData.append('pricePerHour', pricePerHour);
    formData.append('pricePerDay', pricePerDay);

    roomImageUrls.forEach((file) => {
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
}

export default new RoomService();
