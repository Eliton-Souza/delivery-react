import React, { Fragment } from "react";
import { Button } from "react-bootstrap";

const EditarFoto = ({linkImagem, noImage, tipo, setTipo, setModalCrop }) => {

	const auxEditar= () => {
        setTipo(tipo);
        setModalCrop(true);        
    }    
    
    return (
        <Fragment>
            <div className="setting-right">
                <div className="setting-img d-flex align-items-center mb-4">
                    <div className="avatar-upload d-flex align-items-center">
                        <div className=" change position-relative d-flex">
                        <div className="avatar-preview">
                            {tipo === 'perfil' && (
                                <div
                                    id={`saveImageFile_${tipo}`}
                                    style={{
                                        width: "150px",
                                        height: "150px",
                                        backgroundImage: `url(${linkImagem ?? noImage})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        borderRadius: "50%",
                                        overflow: "hidden"
                                    }}
                                />
                            )}

                            {tipo === 'logo' && (
                                <img
                                    id={`saveImageFile_${tipo}`}
                                    src={ linkImagem ?? noImage}
                                    alt={linkImagem ? linkImagem.name : null}
                                    style={{ width: '150px', height: '150px' }}
                                />
                            )}

                            {tipo === 'capa' && (
                                <img
                                    id={`saveImageFile_${tipo}`}
                                    src={ linkImagem ?? noImage}
                                    alt={linkImagem ? linkImagem.name : null}
                                    style={{ width: '268px', height: '150px' }}
                                />
                            )}
                        </div>

                            <div className="change-btn d-flex align-items-center flex-wrap">
                                <Button variant="primary" onClick={()=> auxEditar()}>
                                    <i className="fa fa-edit me-2" />
                                    Editar
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default EditarFoto;
