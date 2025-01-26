import Service from '../Service';

class CommunityService extends Service {
  constructor() {
    super();
  }

  async getCommunityPostList(size: number = 10, last_id: number = 0, me: boolean = false) {
    return await this.service.get(`/community?size=${size}&last_id=${last_id}&me=${me}`);
  }
  async getCommunityPostDetail(uuid: string) {
    return await this.service.get(`/community/${uuid}`);
  }
  async createCommunityPost(uuid: string) {
    return await this.service.post(`/community/${uuid}`);
  }
}

export default new CommunityService();
