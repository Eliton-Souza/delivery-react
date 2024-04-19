import React, { Fragment } from "react";
import { Link } from "react-router-dom";

const FotoField = ({file, setFile, noImage, id, tipo }) => {
    
    const mudarFoto = (e) => {
        setFile(e.target.files[0]);
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
                                    id={`saveImageFile_${id}`}
                                    style={{
                                        width: "150px",
                                        height: "150px",
                                        backgroundImage: `url(${typeof file === 'string' && file.startsWith('http') ? file : (file ? URL.createObjectURL(file) : noImage)})`,
                                        backgroundSize: "cover",
                                        backgroundPosition: "center",
                                        borderRadius: "50%",
                                        overflow: "hidden"
                                    }}
                                />
                            )}

                            {tipo === 'logo' && (
                                <img
                                    id={`saveImageFile_${id}`}
                                    src={typeof file === 'string' && file.startsWith('http') ? file : (file ? URL.createObjectURL(file) : noImage)}
                                    alt={file ? file.name : null}
                                    style={{ width: '150px', height: '150px' }}
                                />
                            )}

                            {tipo === 'capa' && (
                                <img
                                    id={`saveImageFile_${id}`}
                                    src={typeof file === 'string' && file.startsWith('http') ? file : (file ? URL.createObjectURL(file) : noImage)}
                                    alt={file ? file.name : null}
                                    style={{ width: '268px', height: '150px' }}
                                />
                            )}
                        </div>

                            <div className="change-btn d-flex align-items-center flex-wrap">
                                <input
                                    type='file'
                                    onChange={mudarFoto}
                                    className="form-control"
                                    id={`imageUpload_${id}`}
                                    accept=".png, .jpg, .jpeg"
                                />
                                <label htmlFor={`imageUpload_${id}`} className="dlab-upload">Escolher foto</label>
                                <Link to={"#"} className="btn remove-img ms-2" onClick={() => setFile(null)}>Remover</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default FotoField;
