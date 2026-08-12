declare class ImageCapture {
  constructor(videoTrack: MediaStreamTrack);
  takePhoto(options?: any): Promise<Blob>;
  grabFrame(): Promise<ImageBitmap>;
}
