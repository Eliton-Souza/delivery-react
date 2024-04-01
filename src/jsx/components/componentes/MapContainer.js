import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { pegarLocalizacao } from '../../../services/api';

const MapContainer = ({permissao, setPermissao}) => {
    const [userLocation, setUserLocation] = useState(null);
    
   
    const [zoom, setZoom] = useState(17);

    const mapOptions = {
        zoom: zoom,
        center: userLocation,
        mapTypeId: 'hybrid',
    };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: 'AIzaSyCW4Oli-CFB7gjpPZzYb9YN1lgg2XESN6I',
    });

    const handleMarkerDragEnd = (event) => {
        setUserLocation({ lat: event.latLng.lat(), lng: event.latLng.lng() });
        setZoom(17);
    };

    const pegarLocal= async ()=>{
        const local= await pegarLocalizacao();
       
        if(local.location && local.accuracy){
           
            if(local.accuracy>50){
                swal({
                    title: "Atenção",
                    text: "Verifique sua localização e se necessário faça ajustes arrastando o ponteiro vermelho no mapa",
                    icon: "warning",
                })
            }

            setUserLocation({ lat: local.location.lat, lng: local.location.lng });
        }
        else if(local.status === 404){
           
            swal({
                title: "Atenção",
                text: local.error,
                icon: "warning",
            })
            setZoom(13);
            setUserLocation({ lat: -8.764259, lng: -67.364798 });
        }
        else{
            swal("Oops", local.error, "error");
            setPermissao(false);
            setUserLocation(null);
        }
    };


    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {

                    if(position.coords.accuracy>50){
                        swal({
                            title: "Atenção",
                            text: "Verifique sua localização e se necessário faça ajustes arrastando o ponteiro vermelho no mapa",
                            icon: "warning",
                        })
                    }

                    setUserLocation({ lat: position.coords.latitude, lng: position.coords.longitude });
                    setPermissao(true);
                },
                (error) => {
                    swal("Acesso a localização negado", "Mas a qualquer momento você pode clicar em 'Adicionar Localização' e facilitar o trabalho do entregador.", "error");
                }
            );
        } else {
            swal("Oops", "Acesso a localização não é suportada pelo navegador. Clique em 'Adicionar Localização' e tente novamente!", "error");
        }
    }, []);


    useEffect(() => {
        if(permissao){
            pegarLocal();
        }
    }, [permissao]);


    return (
        <>
            {isLoaded && permissao && userLocation && (
                <GoogleMap
                    mapContainerStyle={{ width: '100%', height: '400px' }}
                    options={mapOptions}
                >
                    <Marker
                        position={userLocation}
                        draggable={true}
                        onDragEnd={handleMarkerDragEnd}
                    />
                </GoogleMap>
            )}
        </>
    );

};

export default MapContainer;
