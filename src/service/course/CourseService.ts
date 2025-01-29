import Service from '../Service';

class CourseService extends Service {
  async getCourseRecommend(station_uuid: string, theme_uuid: string) {
    // TODO: subway_uuid -> station_uuid 변경 요청
    return await this.service.get(
      `/course/recommend?station_uuid=${station_uuid}&theme_uuid=${theme_uuid}`,
    );
  }

  async getPlaceCustomize(
    place_uuids: string,
    place_type: string,
    station_uuid: string,
    theme_uuid?: string,
  ) {
    return await this.service.get(
      `/course/place/customize?place_uuids=${place_uuids}&place_type=${place_type}&station_uuid=${station_uuid}&theme_uuid=${theme_uuid}`,
    );
  }

  async saveCourseRecommend() {
    return await this.service.post('/course/recommend/save');
  }

  async getMyCourseHistory(size: number, last_id?: string) {
    return await this.service.get(`/course/my-history?size=${size}&last_id=${last_id}`);
  }
  async getBookmarkedCourseList(size: number, last_id?: string) {
    return await this.service.get(`/bookmark?size=${size}&last_id=${last_id}`);
  }
  async getCourseDetail(uuid: string) {
    return await this.service.get(`/course/${uuid}`);
  }
}

export default new CourseService();
