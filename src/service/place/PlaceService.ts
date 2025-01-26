import Service from '../Service';

class PlaceService extends Service {
  constructor() {
    super({ isNeedAuthorization: false });
  }

  async getPlaceCulture(size: number, last_id: number = 0) {
    const response = await this.service.get(`/place/culture?size=${size}&last_id=${last_id}`);
    console.log(response);
  }

  async getPlaceCultureDetail(uuid: string) {
    const response = await this.service.get(`/place/culture/${uuid}`);
    console.log(response);
  }

  async getPlaceExhibition(size: number, last_id: number = 0, order: number = 0) {
    const response = await this.service.get(
      `/place/exhibition?size=${size}&last_id=${last_id}&order=${order}`,
    );
    console.log(response);
  }

  async getPlacePopup(size: number, last_id: number = 0, order: number = 0) {
    const response = await this.service.get(
      `/place/popup?size=${size}&last_id=${last_id}&order=${order}`,
    );
    console.log(response);
  }

  async getPlaceDetail(uuid: string) {
    const response = await this.service.get(`/place/${uuid}`);
    console.log(response);
  }
}
export default new PlaceService();
