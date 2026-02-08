import type { MediaItem } from 'hybrid-types/DBTypes';

export type MediaItemWithOwner = MediaItem & {
  username: string;
};
export type UploadResponse = {
  message: string;
  data: {
    filename: string;
    media_type: string;
    filesize: number;
  };
};