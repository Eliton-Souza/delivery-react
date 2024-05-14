import Compressor from 'compressorjs';
import { differenceInMinutes, isWithinInterval, parse, format, isBefore, isAfter } from 'date-fns';
import { ptBR } from 'date-fns/locale';


export const comprimirImagem = async (file) => {
  return new Promise((resolve, reject) => {
    new Compressor(file, {
      quality: 0.5, // Define a qualidade desejada (entre 0 e 1)
      success(result) {
        resolve(result); // Resolve a Promise com a imagem comprimida
      },
      error(err) {
        reject(err); // Rejeita a Promise em caso de erro
      },
    });
  });
};


export const pegarStatusHorarios = (horariosLoja, setStatusFuncionamento) => {
  
  const horarioAtualAM =  parse(format(new Date(), 'HH:mm:ss', { timeZone: 'America/Manaus' }), 'HH:mm:ss', new Date());
  const diaSemanaAM = format(new Date(), 'EEEE', { timeZone: 'America/Manaus', locale: ptBR });

  const dia= horariosLoja.find(horario => horario.diaSemana == diaSemanaAM);

  if(dia){
    const abre1 = dia.abertura1 ? parse(dia.abertura1, 'HH:mm:ss', new Date()) : null;
    const fecha1 = dia.fechamento1  ? parse(dia.fechamento1, 'HH:mm:ss', new Date()) : null;

    const abre2 = dia.abertura2 ? parse(dia.abertura2, 'HH:mm:ss', new Date()) : null;
    const fecha2 = dia.fechamento2 ? parse(dia.fechamento2, 'HH:mm:ss', new Date()) : null;
    

    if( abre1 && fecha1 && isWithinInterval(horarioAtualAM, { start: abre1, end: fecha1 })){
      if(differenceInMinutes(fecha1, horarioAtualAM) > 30){
        setStatusFuncionamento("aberto 🟢");
      }else{
        setStatusFuncionamento(`fecha às: ${dia.fechamento1.split(':').slice(0, 2).join(':')} ⚠️`);
      }
    }else if(abre2 && fecha2 && isWithinInterval(horarioAtualAM, { start: abre2, end: fecha2 })){
      if(differenceInMinutes(fecha2, horarioAtualAM) > 30){
        setStatusFuncionamento("aberto 🟢");
      }else{
        setStatusFuncionamento(`fecha às: ${dia.fechamento2.split(':').slice(0, 2).join(':')} ⚠️`);
      }
    }
    else if(abre1 && isBefore(horarioAtualAM, abre1)){
      setStatusFuncionamento(`abre às: ${dia.abertura1.split(':').slice(0, 2).join(':')} 🔴`);   //fechado
    }
    else if(fecha1 && abre2 && isWithinInterval(horarioAtualAM, { start: fecha1, end: abre2 })){
      setStatusFuncionamento(`abre às: ${dia.abertura2.split(':').slice(0, 2).join(':')} 🔴`);   //fechado
    }
    else if(fecha2 && isAfter(horarioAtualAM, fecha2)){
      setStatusFuncionamento(`fechou às: ${dia.fechamento2.split(':').slice(0, 2).join(':')} 🔴`); 
    }
    else if(fecha1 && isAfter(horarioAtualAM, fecha1)){
      setStatusFuncionamento(`fechou às: ${dia.fechamento1.split(':').slice(0, 2).join(':')} 🔴`); 
    } 
    else {
      setStatusFuncionamento("Fechado 🔴");  //fechado
    } 
  }
  else {
    alert("tem mudar o nome q ta esscrito no dia da semana");
  }
};