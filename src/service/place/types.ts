import { ItemsData } from '@/types/global';

export interface PlaceItemsData extends ItemsData<PlaceItem> {}

export interface PlaceItem {
  uuid: string;
  thumbnail: string;
  place_type: string;
  place_name: string;
  address: string;
  start_date: string;
  end_date: string;
  hashtag: string;
  top_level_address: string;
}
