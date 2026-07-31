import { compressImage } from "./imageCompression";

const CLOUD_NAME = "ues5tn61";
const UPLOAD_PRESET = "dnatshirt_upload";

export const uploadImage = async (
  image: any,
  onProgress?: (progress: number) => void
): Promise<any> => {
  const compressed = await compressImage(image.uri);

  return new Promise((resolve, reject) => {
    const data = new FormData();

    data.append("file", {
      uri: compressed.uri,
      name: image.fileName || "image.jpg",
      type: "image/jpeg",
    } as any);

    data.append("upload_preset", UPLOAD_PRESET);

    const xhr = new XMLHttpRequest();

    xhr.open(
      "POST",
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`
    );

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable && onProgress) {
        const progress = Math.round((event.loaded * 100) / event.total);
        onProgress(progress);
      }
    };

    xhr.onload = () => {
      if (xhr.status === 200) {
        resolve(JSON.parse(xhr.responseText));
      } else {
        reject(new Error(xhr.responseText));
      }
    };

    xhr.onerror = () => {
      reject(new Error("Upload failed"));
    };

    xhr.send(data);
  });
};