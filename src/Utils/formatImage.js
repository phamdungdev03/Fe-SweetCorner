import default_image from "../imgs/default-image.png";

export const formatImg = (img) => {
  if (img?.startsWith("http") || img?.startsWith("https")) {
    return img;
  }

  return img ? `http://localhost:8080/public/imgs/${img}` : default_image;
};
