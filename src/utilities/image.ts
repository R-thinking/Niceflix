const { REACT_APP_IMAGE_BASE_PATH: IMAGE_BASE_PATH } = process.env;
export const createImagePath = (id: string, format?: string) => {
  return `${IMAGE_BASE_PATH}/${format ?? "original"}${id}`;
};
