import React, { useState } from 'react'
import Cropper from 'react-easy-crop'
import { cortarImagem } from './helper'

const FotoCrop = ({ imagemOriginal, dimensao, setNovaImagem }) => {

  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)

  const onCropComplete = async (_, croppedAreaPixels) => {
    const novaImagem = await cortarImagem(imagemOriginal, croppedAreaPixels);
    setNovaImagem(novaImagem);
  };

  return (
    <div className="crop-main">
      <div className="crop-container">
        <Cropper
          image= {URL.createObjectURL(imagemOriginal)}
          crop={crop}
          zoom={zoom}
          aspect={dimensao}
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
        />
      </div>
    </div>
  )
}

export default FotoCrop;