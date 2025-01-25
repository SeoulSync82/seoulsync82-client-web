import Service from '../Service';

class AuthService extends Service {
  constructor() {
    super({ isNeedAuthorization: false });
  }

  async getKakaoAuth() {
    const response = await this.service.get('/user/login/kakao');
    console.log(response);
  }
  async getNaverAuth() {
    const response = await this.service.get('/user/login/naver');
    console.log(response);
  }
  async getGoogleAuth() {
    const response = await this.service.get('/user/login/google');
    console.log(response);
  }
}
export default new AuthService();
