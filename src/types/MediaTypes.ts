import type { MediaItem } from 'hybrid-types/DBTypes';

export type MediaItemWithOwner = MediaItem & {
  username: string;
};

export type MediaInput = {
  title: string;
  description: string;
  filename: string;
  originalname: string;
  filetype: string;
};

export type UploadResponse = {
  filename: string;
  originalname: string;
  filetype: string;
};