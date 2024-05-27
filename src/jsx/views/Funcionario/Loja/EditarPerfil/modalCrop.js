import React, { useEffect, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import FotoCrop from "../../../../components/componentes/fotoCrop";
import { api } from "../../../../../services/api";
import LoadingPage from "../../../../components/componentes/LoadingPage";
import { comprimirImagem } from "../helper";


const ModalCrop = ({ linkImagem, setImagens, setModal, tipo }) => {

  const inputFileRef = React.useRef(null);

  const [novaImagem, setNovaImagem] = useState(null);
  const [imagemOriginal, setimagemOriginal] = useState(null);
  const [loading, setLoading] = useState(false);

  const dimensao = (tipo== "capa" ? 3 : 1);


  const pegarImagem= async () => {
    setLoading(true);

    if (linkImagem.startsWith('http')) {
      const result = await api.pegarImagem(linkImagem);
  
      if(result.success){
        const arrayBytes = new Uint8Array(result.imagem.data); //array de bytes da imagem
        const blobImagem = new Blob([arrayBytes.buffer], { type: 'image/jpeg' });
        const novo= new File([blobImagem], 'image.jpg', { type: blobImagem.type });

        setimagemOriginal(novo);
      }else{
        swal("Oops", result.error, "error");
      }
    }
    else{
      const response = await fetch(linkImagem);
      const blob = await response.blob();
      const novo= new File([blob], 'image.jpg', { type: blob.type });

      setimagemOriginal(novo);
    }

    setLoading(false);
  }

  useEffect(() => {
   pegarImagem();
  }, []); 


  const salvarFoto = async () => {
    setLoading(true);
   
    try {
      const result = await api.uploadFoto(novaImagem);

      if (result.success) {
        const link = result.imageUrl;
        const resultLink = await api.atualizarImagemPerfilLoja(link, tipo);

        if (resultLink.success) {
          swal("Sucesso!", "Imagem alterada com sucesso", "success");
          //setimagemOriginal(novaImagem);
        
          setImagens(imagens => ({
            ...imagens,
            [tipo]: link
          }));
          
          
          setModal(false);
          
        } else {
          swal("Oops", result.error, "error");
        }
      } else {
        swal("Oops", result.error, "error");
      }
    } catch (error) {
      console.log('Erro ao processar a imagem:', error);
      swal("Oops", "Erro ao processar a imagem", "error");
    }
    
    setLoading(false);
  };


  const handleFileChange = async (e) => {

    const compress= await comprimirImagem(e.target.files[0]);
    const blob = new Blob([compress], { type: 'image/jpg' });
    const imagemComprimida = new File([blob], 'image.jpg', { type: blob.type });

    setimagemOriginal(imagemComprimida);
  }

  return (
    <Modal show={true} onHide={() => { setModal(false) }} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Editar Imagem</Modal.Title>
      </Modal.Header>

      <Modal.Body>

        {loading && (
          <div style={{ height: '400px', margin: 'auto' }}>
            <LoadingPage></LoadingPage>
          </div>
        )}

        {!loading && imagemOriginal && (
          <div style={{ height: '400px', margin: 'auto' }}>
            <FotoCrop imagemOriginal={imagemOriginal} dimensao={dimensao} setNovaImagem={setNovaImagem}></FotoCrop>
          </div>
        )}

      </Modal.Body>

      <Modal.Footer size="lg">
        <Button variant="danger" onClick={() => setModal(false)} style={{ marginLeft: '10px' }}>
          Cancelar
        </Button>

        <Button variant="warning" onClick={() => inputFileRef.current.click()} style={{ marginLeft: '10px' }}>
          <input
            type="file"
            accept="image/*"
            ref={inputFileRef}
            style={{ display: 'none' }}
            onChange={handleFileChange}
          />
          Trocar Imagem
        </Button>

        <Button className="mr-2" variant="success" disabled={!novaImagem} onClick={() => salvarFoto()}>
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalCrop;