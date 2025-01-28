import Service from '../Service';

class ThemeService extends Service {
  async getThemes() {
    return await this.service.get('/theme');
  }
}

export default new ThemeService();
