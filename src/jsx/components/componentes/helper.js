export const arrayBufferToBlob = (arrayBuffer, type) => {
    return new Blob([arrayBuffer], { type: type });
};


export const cortarImagem = async (blobImagemOriginal, croppedAreaPixels) => {
    try {
        const imgUrl = URL.createObjectURL(blobImagemOriginal);
        const img = new Image();
        img.src = imgUrl;

        await new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
        });

        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');

        canvas.width = croppedAreaPixels.width;
        canvas.height = croppedAreaPixels.height;

        ctx.drawImage(
            img,
            croppedAreaPixels.x,
            croppedAreaPixels.y,
            croppedAreaPixels.width,
            croppedAreaPixels.height,
            0,
            0,
            croppedAreaPixels.width,
            croppedAreaPixels.height
        );

        return new Promise((resolve) => {
            canvas.toBlob((blob) => {
                const croppedFile = new File([blob], 'image.jpg', { type: blob.type });
                resolve(croppedFile);
            }, 'image/jpeg');
        });
    } catch (error) {
        console.log('Erro ao cortar imagem:', error);
        throw new Error('Erro ao cortar imagem');
    }
};
