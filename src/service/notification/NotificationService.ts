import Service from '../Service';

class NotificationService extends Service {
  getNotificationList(size: number = 10, last_id?: string | number) {
    return this.service.get(`/notification?size=${size}&last_id=${last_id}`);
  }
  setReadNotification(uuid: string) {
    return this.service.patch(`/notification/${uuid}`);
  }
}
export default new NotificationService();
