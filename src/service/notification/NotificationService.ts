import Service from '../Service';

class NotificationService extends Service {
  async getNotificationList(size: number = 10, last_id: number = 0) {
    return await this.service.get(`/notification?size=${size}&last_id=${last_id}`);
  }
  async setReadNotification(uuid: string) {
    return await this.service.patch(`/notification/${uuid}`);
  }
}
export default new NotificationService();
