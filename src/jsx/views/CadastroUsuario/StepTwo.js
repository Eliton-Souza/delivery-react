import React, { useEffect, useState } from "react";

const StepTwo = ({ onChange }) => {

   const [codigo, setCodigo] = useState("");

   const handleCodigo = (event) => {
    const novoCodigo = event.target.value;
    setCodigo(novoCodigo);
    onChange(novoCodigo);
  };

  // Estado para armazenar o tempo restante em segundos
  const [tempoRestante, setTempoRestante] = useState(180);

  // Função para formatar o tempo em minutos e segundos
  const formatarTempo = (tempo) => {
    const minutos = Math.floor(tempo / 60);
    const segundos = tempo % 60;
    return `${minutos}:${segundos < 10 ? `0${segundos}` : segundos}`;
  };

  // Função que será chamada a cada segundo para atualizar o tempo restante
  const atualizarTempo = () => {
   setTempoRestante(tempoRestante - 1);
  };

  // Efeito que inicia o cronômetro quando o componente monta
  useEffect(() => {
   if (tempoRestante > 0) {
     const intervalo = setInterval(atualizarTempo, 1000);
 
     // Limpa o intervalo quando o componente é desmontado
     return () => clearInterval(intervalo);
   }
   else{
      swal({
         title: "Oops",
         text: "Token expirado, envie um novo código",
         icon: "error",
      }).then(() => {
         window.location.reload();
      });
   }
 }, [tempoRestante]);



   return (
      <section>

         <div className="row">           
            <h6 className="code">
               Digite o código enviado para seu WhatsApp{" "}
               <span className="text-danger">*</span>
            </h6>

            <div className="input-group mb-3 input-warning">
               <span className="input-group-text">             
                  code
               </span>
               <input
                  type="text"                  
                  className="form-control"
                  value={codigo}
                  onChange={handleCodigo}
               />
               <span className="input-group-text">Expira em: {formatarTempo(tempoRestante)}</span>
              
            </div>
         </div>

      </section>
   );
};


export default StepTwo;
