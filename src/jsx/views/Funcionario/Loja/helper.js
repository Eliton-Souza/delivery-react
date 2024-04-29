import Compressor from 'compressorjs';

export const comprimirImagem = async (file) => {
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      quality: 0.5, // Define a qualidade desejada (entre 0 e 1)
      success(result) {
        resolve(result); // Resolve a Promise com a imagem comprimida
      },
      error(err) {
        reject(err); // Rejeita a Promise em caso de erro
      },
    });
  });
};