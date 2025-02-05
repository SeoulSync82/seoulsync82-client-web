import Service from '../Service';

class CommunityService extends Service {
  constructor() {
    super();
  }

  async getCommunityPostList(
    size: number = 10,
    next_page: string = '',
    me: boolean = false,
    order: 'latest' | 'popular',
  ) {
    return await this.service.get(`/community`, {
      params: {
        next_page,
        size,
        me,
        order,
      },
    });
  }
  async getCommunityPostDetail(uuid: string) {
    return await this.service.get(`/community/${uuid}`);
  }
  async createCommunityPost(uuid: string) {
    return await this.service.post(`/community/${uuid}`);
  }
}

export default new CommunityService();
