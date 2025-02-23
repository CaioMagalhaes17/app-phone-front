export const createRoundedIcon = (imageUrl: string, size: number): Promise<string> => {
  return new Promise((resolve) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      resolve(imageUrl); // Se falhar, retorna a URL original
      return;
    }

    canvas.width = size;
    canvas.height = size;

    const img = new Image();
    img.src = imageUrl;
    img.crossOrigin = "Anonymous";

    img.onload = () => {
      ctx.beginPath();
      ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.clip();
      ctx.drawImage(img, 0, 0, size, size);
      resolve(canvas.toDataURL()); // Retorna a imagem como base64
    };

    img.onerror = () => resolve(imageUrl); // Fallback se a imagem falhar
  });
};