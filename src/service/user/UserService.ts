import Service from '../Service';

class UserService extends Service {
  getUserProfile() {
    return this.service.get('/user/profile');
  }
  editUserProfile(data: { name: string; profile_image: string }) {
    return this.service.put('/user/profile', data);
  }
  userLogout() {
    return this.service.post('/auth/logout');
  }
}
export default new UserService();
