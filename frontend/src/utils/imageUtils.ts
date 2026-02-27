import { ExternalBlob } from '../backend';

/**
 * Converts an ExternalBlob to a direct URL for display.
 * Returns a fallback URL if provided and the blob URL fails.
 */
export function getBlobImageUrl(blob: ExternalBlob | null | undefined, fallback?: string): string {
  if (!blob) return fallback || '';
  try {
    return blob.getDirectURL();
  } catch {
    return fallback || '';
  }
}

/**
 * Injects data-blob-index attributes onto img tags in HTML content.
 * This is called before saving content to the backend so we can
 * later resolve images by index.
 *
 * @param htmlContent - The HTML content string
 * @param startIndex - The starting index for blob numbering (0 for no featured image offset)
 */
export function injectBlobIndexAttributes(htmlContent: string, startIndex: number): string {
  if (!htmlContent) return htmlContent;
  let index = startIndex;
  return htmlContent.replace(/<img([^>]*?)>/gi, (match, attrs) => {
    // Only inject if not already present
    if (/data-blob-index/i.test(attrs)) {
      return match;
    }
    const newAttrs = attrs + ` data-blob-index="${index}"`;
    index++;
    return `<img${newAttrs}>`;
  });
}

/**
 * Replaces image src attributes in HTML content with resolved ExternalBlob URLs.
 * Uses data-blob-index attributes to map images to their corresponding blobs.
 *
 * @param htmlContent - The HTML content string with placeholder or stale src values
 * @param contentImages - Array of ExternalBlob objects for inline images
 * @param hasBeginningImage - Whether the post has a featured image (affects index offset)
 */
export function replaceContentImageUrls(
  htmlContent: string,
  contentImages: ExternalBlob[],
  hasBeginningImage: boolean
): string {
  if (!htmlContent || !contentImages || contentImages.length === 0) {
    return htmlContent;
  }

  try {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, 'text/html');
    const images = doc.querySelectorAll('img');

    images.forEach((img, positionalIndex) => {
      // Try data-blob-index first
      const blobIndexAttr = img.getAttribute('data-blob-index');
      let blobIndex: number;

      if (blobIndexAttr !== null && blobIndexAttr !== undefined) {
        blobIndex = parseInt(blobIndexAttr, 10);
      } else {
        // Fallback: use positional index
        blobIndex = positionalIndex;
      }

      if (!isNaN(blobIndex) && blobIndex >= 0 && blobIndex < contentImages.length) {
        try {
          const url = contentImages[blobIndex].getDirectURL();
          if (url) {
            img.setAttribute('src', url);
          }
        } catch (err) {
          // Keep original src if resolution fails
        }
      }
    });

    return doc.body.innerHTML;
  } catch (err) {
    console.error('Error replacing content image URLs:', err);
    return htmlContent;
  }
}
