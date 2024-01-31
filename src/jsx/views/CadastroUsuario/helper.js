export const formataCelular = (numero) => {
    // Remove espaços em branco, parênteses, traços e vírgulas
    const numeroLimpo = numero.replace(/[()\s,-]/g, '');

    return numeroLimpo;
};