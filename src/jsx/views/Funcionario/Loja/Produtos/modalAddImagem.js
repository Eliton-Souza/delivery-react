import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import FotoCrop from "../../../../components/componentes/fotoCrop";
import { comprimirImagem } from "../helper";
import LoadingPage from "../../../../components/componentes/LoadingPage";


const ModalAddImagem = ({ imagem, setImagem, setLinkImagem, setModal }) => {

  const inputFileRef = React.useRef(null);
  const [loading, setLoading] = useState(null);

  const [novaImagem, setNovaImagem] = useState(null);
  const [imagemOriginal, setimagemOriginal] = useState(imagem);
  
  const salvarFoto = async () => {
    setLoading(true);

    setTimeout(() => {
      setImagem(novaImagem);

      const imageUrl = URL.createObjectURL(novaImagem);
      setLinkImagem(imageUrl);
      
      setModal(false);
      setLoading(false);
    }, 500);  //500ms
  };

  const handleFileChange = async (e) => {

    setLoading(true);

    const compress= await comprimirImagem(e.target.files[0]);
    const blob = new Blob([compress], { type: 'image/jpg' });
    const imagemComprimida = new File([blob], 'image.jpg', { type: blob.type });

    setimagemOriginal(imagemComprimida);
    setLoading(false);
  }

  return (
    <Modal show={true} onHide={() => { setModal(false) }} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Editar Imagem</Modal.Title>
      </Modal.Header>

      <Modal.Body>

        {loading && (
          <LoadingPage></LoadingPage>
        )}

        {!loading && imagemOriginal && (
          <div style={{ height: '400px', margin: 'auto' }}>
            <FotoCrop imagemOriginal={imagemOriginal} dimensao={1} setNovaImagem={setNovaImagem}></FotoCrop>
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

        <Button className="mr-2" variant="success" disabled={!novaImagem || loading} onClick={() => salvarFoto()}>
          Salvar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAddImagem;