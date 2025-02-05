import Service from '../Service';

class PlaceService extends Service {
  constructor() {
    super({ isNeedAuthorization: false });
  }

  async getPlaceCulture(size: number, last_id: number = 0) {
    return await this.service.get(`/place/culture?size=${size}&last_id=${last_id}`);
  }

  async getPlaceExhibition(
    size: number,
    last_id: number = 0,
    order: 'latest' | 'deadline' = 'latest',
  ) {
    return await this.service.get(
      `/place/exhibition?size=${size}&last_id=${last_id}&order=${order}`,
    );
  }

  async getPlacePopup(size: number, last_id: number = 0, order: 'latest' | 'deadline' = 'latest') {
    return await this.service.get(`/place/popup?size=${size}&last_id=${last_id}&order=${order}`);
  }

  async getPlaceDetail(uuid: string) {
    return await this.service.get(`/place/${uuid}`);
  }
}
export default new PlaceService();
