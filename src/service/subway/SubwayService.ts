import Service from '../Service';

class SubwayService extends Service {
  async getSubwayLines() {
    return await this.service.get('/subway/line');
  }

  async getSubwayStations(line_uuid: string) {
    return await this.service.get(`/subway/${line_uuid}`);
  }
  async checkCountSubwayStationCustom(
    line_uuid: string,
    station_uuid: string,
    place_uuids: string,
  ) {
    return await this.service.get(`/subway/${line_uuid}/${station_uuid}/customs-check`, {
      params: { place_uuids },
    });
  }
}

export default new SubwayService();
