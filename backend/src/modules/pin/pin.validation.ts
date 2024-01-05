export function isValidImageUrl(imageUrl: string): boolean {
  const allowedExtensions = /\.(jpg|jpeg|png)$/i;
  if (!allowedExtensions.test(imageUrl)) {
    return false;
  }

  if (imageUrl.startsWith("http")) {
    const simulatedFileSize = 10000000;
    if (simulatedFileSize > 10000000) {
      return false;
    }
  }

  return true;
}
