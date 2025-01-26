export interface ApiResponse<T> {
  status: 'SUCCESS' | 'FAILURE';
  data: T;
}

export interface ItemsData<T> {
  items: T[];
  last_item_id: number;
}
