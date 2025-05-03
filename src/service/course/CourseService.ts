import Service from '../Service';
import { PlaceCustomParams } from './types';
class CourseService extends Service {
  async getCourseRecommend(station_uuid: string, theme_uuid?: string) {
    return await this.service.get('/course/recommend', {
      params: theme_uuid ? { station_uuid, theme_uuid } : { station_uuid },
    });
  }

  async getPlaceCustomize({
    place_uuids,
    place_type,
    station_uuid,
    theme_uuid = '',
  }: PlaceCustomParams) {
    return await this.service.get('/course/place/customize', {
      params: { place_uuids, place_type, station_uuid, theme_uuid },
    });
  }

  async saveCourseRecommend(data: any) {
    return await this.service.post('/course/recommend/save', data);
  }

  async getMyCourseHistory(size: number, last_id?: number) {
    return await this.service.get(`/course/my-history?size=${size}&last_id=${last_id}`);
  }
  async getBookmarkedCourseList(size: number, last_id?: number) {
    return await this.service.get(`/bookmark?size=${size}&last_id=${last_id}`);
  }
  async getCourseDetail(uuid: string) {
    return await this.service.get(`/course/${uuid}`);
  }
}

export default new CourseService();
