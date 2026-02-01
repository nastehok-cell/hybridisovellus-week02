import type { MediaItem } from 'hybrid-types/DBTypes';

export type MediaItemWithOwner = MediaItem & {
  username: string;
};
export type UploadResponse = {
  message: string;
  data: {
    filename: string;
    originalname: string;
    media_type: string;
    filesize: number;
  };
};

export type MediaInput = {
  title: string;
  description: string;
  filename: string;
  originalname: string;
  media_type: string;
  filesize: number;
};