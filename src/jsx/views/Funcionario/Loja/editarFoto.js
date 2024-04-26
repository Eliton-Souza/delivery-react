import React, { Fragment } from "react";
import { Button } from "react-bootstrap";

const EditarFoto = ({linkImagem, noImage, tipo, setTipo, setModalCrop, titulo }) => {

	const auxEditar= () => {
        setTipo(tipo);
        setModalCrop(true);        
    }    
    
    return (
        <Fragment>
            <div className="setting-right">
                <label className="mb-2">
                    <strong style={{ fontSize: '15px' }}>{titulo}</strong>
                </label>
                        
                <div className="row">
                    {tipo === 'capa' && (
                        <div className="col-8">
                            <img
                                id={`saveImageFile_${tipo}`}
                                src={linkImagem ?? noImage}
                                alt={linkImagem ? linkImagem.name : null}
                                className="capa-image"
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </div>
                    )}

                    {tipo === 'logo' && (
                        <div className="col-md-5 col-8">
                            <img
                                id={`saveImageFile_${tipo}`}
                                src={linkImagem ?? noImage}
                                alt={linkImagem ? linkImagem.name : null}
                                className="logo-image"
                                style={{ width: '100%', height: 'auto' }}
                            />
                        </div>
                    )}

                    <div className="col-4 change-btn d-flex align-items-center">
                        <Button variant="primary" onClick={() => auxEditar()}>
                            <i className="fa fa-edit me-2" />
                            editar
                        </Button>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default EditarFoto;