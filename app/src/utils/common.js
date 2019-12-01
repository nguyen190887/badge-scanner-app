export const isBrowser = typeof window !== `undefined`;

export const resizeImage = async (file, width) => {
  return new Promise(resolve => {
    const quality = 1;
    const mime = 'image/jpeg';

    const reader = new FileReader();
    reader.onload = event => {
      const img = new Image();
      img.src = event.target.result;

      img.onload = () => {
        if (width >= img.width) {
          resolve(event.target.result);
          return;
        }

        const height = (img.height / img.width) * width; // keep proportion
        console.log(`Resize ${img.width}:${img.height} -> ${width}:${height}`);
        const elem = document.createElement('canvas');
        elem.width = width;
        elem.height = height;
        const ctx = elem.getContext('2d');
        // img.width and img.height will contain the original dimensions
        ctx.drawImage(img, 0, 0, width, height);
        //   const data = ctx.canvas.toDataURL(img, mime, quality);
        // resolve(data);
        ctx.canvas.toBlob(
          blob => {
            resolve(new File([blob], file.name));
          },
          mime,
          quality
        );
      };
    };
    reader.onerror = error => console.log(error);
    reader.readAsDataURL(file);
  });
};
