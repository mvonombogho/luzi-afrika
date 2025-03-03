import createImageUrlBuilder from '@sanity/image-url';
import { dataset, projectId } from './client';

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || '',
  dataset: dataset || '',
});

export const urlForImage = (source: any) => {
  if (!source || !source.asset) {
    return '';
  }

  return imageBuilder.image(source).auto('format').fit('max');
};

// Common image size presets
export const imageUrlFor = (source: any) => ({
  // For profile images
  avatar: (width = 100, height = 100) => urlForImage(source).width(width).height(height).url(),
  
  // For thumbnails
  thumbnail: (width = 400, height = 300) => urlForImage(source).width(width).height(height).url(),
  
  // For cover images
  cover: (width = 1200, height = 630) => urlForImage(source).width(width).height(height).url(),
  
  // For full-width images
  full: (width = 1600) => urlForImage(source).width(width).url(),
  
  // For custom dimensions
  custom: (width: number, height: number) => urlForImage(source).width(width).height(height).url(),
});