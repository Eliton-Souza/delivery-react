import React from "react";

const TituloPagina = ({titulo}) => {

  return (
    <div className="row page-titles mx-0">
      <ol className="breadcrumb">
        <li className="breadcrumb-item active">{titulo}</li>
      </ol>
    </div>
  );
};

export default TituloPagina;