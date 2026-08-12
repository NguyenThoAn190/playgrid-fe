export const dataURLtoBlob = (dataURL: any): Blob => {
  const byteString = atob(dataURL.split(",")[1]);

  const mimeString = dataURL.split(",")[0].split(":")[1].split(";")[0];

  const arrayBuffer = new ArrayBuffer(byteString.length);
  const intArray = new Uint8Array(arrayBuffer);

  for (let i = 0; i < byteString.length; i++) {
    intArray[i] = byteString.charCodeAt(i);
  }

  return new Blob([arrayBuffer], { type: mimeString });
};
