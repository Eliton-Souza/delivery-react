import React, { useState } from "react";

const StepOne = ({ onChange }) => {

   const [celular, setCelular] = useState("");

   const handleCelular = (event) => {
    const novoCelular = event.target.value;
    setCelular(novoCelular);
    onChange(novoCelular);
  };

   return (
      <section>

         <div className="row">           
            <h5 className="phone">
               Digite seu número do WhatsApp com DDD{" "}
               <span className="text-danger">*</span>
            </h5>

            <div className="input-group mb-3 input-warning">
               <span className="input-group-text">             
                  +55
               </span>
               <input
                  type="text"
                  placeholder="XX X XXXX XXXX"
                  className="form-control"
                  value={celular}
                  onChange={handleCelular}
               />
            </div>
         </div>

      </section>
   );
};

export default StepOne;
