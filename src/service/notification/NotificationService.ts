import Service from '../Service';

class NotificationService extends Service {
  async getNotificationList() {
    return await this.service.get('/notification');
  }
  async setReadNotification(uuid: string) {
    return await this.service.patch(`/notification/${uuid}`);
  }
}
export default new NotificationService();
