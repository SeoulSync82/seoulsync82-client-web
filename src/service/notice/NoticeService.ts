import Service from '../Service';

class NoticeService extends Service {
  getNoticeList(size: number = 10, last_id: string = '') {
    return this.service.get(`/notice?size=${size}&last_id=${last_id}`);
  }

  getNoticeDetail(uuid: string, size: number = 10, last_id: string = '') {
    return this.service.get(`/notice/${uuid}?size=${size}&last_id=${last_id}`);
  }
}

export default new NoticeService();
