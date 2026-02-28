import { ExternalBlob } from '../backend';

/**
 * Convert an ExternalBlob to a direct URL for display.
 */
export function getBlobImageUrl(blob: ExternalBlob): string {
  return blob.getDirectURL();
}

/**
 * Inject data-blob-index attributes onto <img> tags in HTML content
 * before saving, so we can resolve them later.
 */
export function injectBlobIndexAttributes(content: string): string {
  return content.replace(/<img([^>]*?)data-blob-index="(\d+)"([^>]*?)>/g, (match) => match);
}

/**
 * Replace inline image markers {{inline-image:N}} with actual <img> tags
 * using the ExternalBlob direct URLs from the inlineImages array.
 *
 * Also handles legacy {{image:N}} markers for backward compatibility.
 */
export function replaceInlineImageMarkers(
  content: string,
  inlineImages: Array<{ image: { blob: ExternalBlob; fit: string; size: string }; position: bigint }>
): string {
  if (!inlineImages || inlineImages.length === 0) return content;

  let result = content;

  // Build a map from position index to image URL
  const imageMap = new Map<number, { url: string; fit: string; size: string }>();
  inlineImages.forEach((inlineImg, idx) => {
    const url = inlineImg.image.blob.getDirectURL();
    imageMap.set(idx, { url, fit: inlineImg.image.fit, size: inlineImg.image.size });
    // Also map by position value
    const posNum = Number(inlineImg.position);
    if (!imageMap.has(posNum)) {
      imageMap.set(posNum, { url, fit: inlineImg.image.fit, size: inlineImg.image.size });
    }
  });

  // Replace {{inline-image:N}} markers
  result = result.replace(/\{\{inline-image:(\d+)\}\}/g, (match, indexStr) => {
    const index = parseInt(indexStr, 10);
    const imgData = imageMap.get(index);
    if (!imgData) return match;
    const sizeClass = getSizeClass(imgData.size);
    const fitStyle = getFitStyle(imgData.fit);
    return `<img src="${imgData.url}" class="inline-blog-image ${sizeClass}" style="${fitStyle}" alt="Inline image" />`;
  });

  // Replace legacy {{image:N}} markers
  result = result.replace(/\{\{image:(\d+)\}\}/g, (match, indexStr) => {
    const index = parseInt(indexStr, 10);
    const imgData = imageMap.get(index);
    if (!imgData) return match;
    const sizeClass = getSizeClass(imgData.size);
    const fitStyle = getFitStyle(imgData.fit);
    return `<img src="${imgData.url}" class="inline-blog-image ${sizeClass}" style="${fitStyle}" alt="Inline image" />`;
  });

  return result;
}

/**
 * Replace content image URLs using blob index attributes (legacy support).
 */
export function replaceContentImageUrls(
  content: string,
  inlineImages: Array<{ image: { blob: ExternalBlob; fit: string; size: string }; position: bigint }>
): string {
  if (!inlineImages || inlineImages.length === 0) return content;

  let result = content;

  result = result.replace(/data-blob-index="(\d+)"/g, (match, indexStr) => {
    const index = parseInt(indexStr, 10);
    const inlineImg = inlineImages[index];
    if (!inlineImg) return match;
    const url = inlineImg.image.blob.getDirectURL();
    return `src="${url}" ${match}`;
  });

  return result;
}

function getSizeClass(size: string): string {
  switch (size) {
    case 'small': return 'inline-blog-image--small';
    case 'large': return 'inline-blog-image--large';
    default: return 'inline-blog-image--medium';
  }
}

function getFitStyle(fit: string): string {
  switch (fit) {
    case 'cover': return 'object-fit: cover;';
    case 'contain': return 'object-fit: contain;';
    default: return '';
  }
}
