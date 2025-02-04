export type SubwayItem = {
  uuid: string;
  station?: string;
};

export type ThemeItem = {
  uuid: string;
  theme?: string;
};

export type CustomPlaceItem = {
  sort: number;
  uuid: string;
  place_name: string;
  place_type: string;
  thumbnail: string;
  address: string;
  latitude: string;
  longitude: string;
  score: number | string;
  place_detail: string;
};

export interface SaveCourseRecommendReqData {
  subway: SubwayItem;
  theme: ThemeItem;
  course_uuid: string;
  course_name: string;
  places: CustomPlaceItem[];
}

export interface PlaceCustomParams {
  place_uuids: string;
  place_type: string;
  station_uuid: string;
  theme_uuid?: string;
}
