import React, { Fragment, useState } from "react";
import bgimage from '../../../images/no-img-avatar.png';
import { Link } from "react-router-dom";


const FotoField = ({ changeFoto }) => {

	const [file, setFile] = useState(null);
   
    const mudarFoto = (e) => {
        setFile(e.target.files[0]);
        changeFoto(e.target.files[0]);

		setTimeout(function(){
			document.getElementById("saveImageFile").getAttribute("src");
		}, 250);
    }

 
  return (
    <Fragment>       
      <div className="setting-right">                              
            <div className="setting-img d-flex align-items-center mb-4">
                <div className="avatar-upload d-flex align-items-center">
                    <div className=" change position-relative d-flex">
                        <div className="avatar-preview">         
                         
                            <img id="saveImageFile" src={file? URL.createObjectURL(file) : bgimage} 
                                alt={file? file.name : null}
                            />
                        </div>
                        <div className="change-btn d-flex align-items-center flex-wrap">
                            <input
                                type='file'
                                onChange={mudarFoto}
                                className="form-control"
                                id="imageUpload"
                                accept=".png, .jpg, .jpeg"
                            />
                            <label htmlFor="imageUpload" className="dlab-upload">Escolher foto</label>
                            <Link to={"#"} className="btn remove-img ms-2" onClick={()=>setFile(null)}>Remover</Link>
                        </div>
                    </div>                                                        
                </div>  
            </div>                                                  
        </div>                                                                  
    </Fragment>
  );
};

export default FotoField;