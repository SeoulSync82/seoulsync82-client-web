import Service from '../Service';
import { PlaceCustomParams } from './types';
class CourseService extends Service {
  getCourseRecommend(station_uuid: string, theme_uuid?: string) {
    return this.service.get('/course/recommend', {
      params: theme_uuid ? { station_uuid, theme_uuid } : { station_uuid },
    });
  }

  getPlaceCustomize({ place_uuids, place_type, station_uuid, theme_uuid = '' }: PlaceCustomParams) {
    return this.service.get('/course/place/customize', {
      params: { place_uuids, place_type, station_uuid, theme_uuid },
    });
  }

  saveCourseRecommend(data: any) {
    return this.service.post('/course/recommend/save', data);
  }

  getMyCourseHistory(size: number, last_id?: number) {
    return this.service.get(`/course/my-history?size=${size}&last_id=${last_id}`);
  }

  getCourseDetail(uuid: string) {
    return this.service.get(`/course/${uuid}`);
  }

  getBookmarkedCourseList(size: number, last_id?: number) {
    return this.service.get(`/bookmark?size=${size}&last_id=${last_id}`);
  }

  addCourseBookmark(uuid: string) {
    return this.service.post(`/bookmark/${uuid}`);
  }

  cancelCourseBookmark(uuid: string) {
    return this.service.patch(`/bookmark/${uuid}`);
  }

  getCommentList(uuid: string, size: number = 10, last_id?: number) {
    return this.service.get(`/comment/${uuid}?size=${size}`);
  }

  addComment(uuid: string, data: any) {
    return this.service.post(`/comment/${uuid}`, data);
  }

  updateComment(uuid: string, data: any) {
    return this.service.put(`/comment/${uuid}`, data);
  }

  deleteComment(uuid: string) {
    return this.service.patch(`/comment/${uuid}`);
  }
}

export default new CourseService();
