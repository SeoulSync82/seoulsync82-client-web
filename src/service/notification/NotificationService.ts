import Service from '../Service';

class NotificationService extends Service {
  async getNotificationList(size: number = 10, next_page: string = '') {
    return await this.service.get(`/notification?size=${size}&next_page=${next_page}`);
  }
  async setReadNotification(uuid: string) {
    return await this.service.patch(`/notification/${uuid}`);
  }
}
export default new NotificationService();
