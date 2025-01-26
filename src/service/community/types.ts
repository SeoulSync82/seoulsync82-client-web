export interface CommunityPostItem {
  id: number;
  course_name: string;
  course_image: string;
  course_date: string;
  course_location: string;
  course_price: number;
  course_review_count: number;
  course_review_score: number;
}

export interface CommunityPostListData {
  items: CommunityPostItem[];
  total_count: number;
}
