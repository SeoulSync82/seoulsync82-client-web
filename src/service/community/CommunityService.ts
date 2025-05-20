import Service from '../Service';

class CommunityService extends Service {
  constructor() {
    super();
  }

  getCommunityPostList(size = 10, next_page = '', me = false, order: 'latest' | 'popular') {
    return this.service.get('/community', {
      params: { next_page, size, me, order },
    });
  }

  getCommunityPostDetail(uuid: string) {
    return this.service.get(`/community/${uuid}`);
  }

  createCommunityPost(uuid: string, score: number, review: string) {
    return this.service.post(`/community/${uuid}`, { score, review });
  }

  postCommunityLike(uuid: string) {
    return this.service.post(`/reaction/${uuid}`);
  }

  postCommunityCancelLike(uuid: string) {
    return this.service.patch(`/reaction/${uuid}`);
  }

  addCommunityPostLike(uuid: string) {
    return this.service.post(`/reaction/${uuid}`);
  }

  cancelCommunityPostLike(uuid: string) {
    return this.service.patch(`/reaction/${uuid}`);
  }
}

export default new CommunityService();
