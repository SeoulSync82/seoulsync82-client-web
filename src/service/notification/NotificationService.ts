import Service from '../Service';

class NotificationService extends Service {
  getNotificationList(size: number = 10, next_page: string = '') {
    return this.service.get(`/notification?size=${size}&next_page=${next_page}`);
  }
  setReadNotification(uuid: string) {
    return this.service.patch(`/notification/${uuid}`);
  }
}
export default new NotificationService();
