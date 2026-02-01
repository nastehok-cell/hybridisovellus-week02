import type { MediaItem } from 'hybrid-types/DBTypes';

export type MediaItemWithOwner = MediaItem & {
  username: string;
};
