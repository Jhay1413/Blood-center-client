import { GoogleMap, InfoWindow, Marker, useJsApiLoader,Autocomplete } from "@react-google-maps/api";
import { Modal } from "antd";
import { useState } from "react";
import Combobox from "react-widgets/Combobox";
import 'react-widgets/styles.css';
import usePlacesAutoComplete,{getGeocode,getLatLng}from "use-places-autocomplete"
const google_key = import.meta.env.VITE_MAP_KEY
interface MarkerPosition {
    lat:number;
    lng:number;
  }
  interface ActivityModalProps{
    isModalOpen : boolean
    cancelModal:()=>void
    setFieldValue: (field: string, value: string, shouldValidate?: boolean) => void 
} 
const containerStyle = {
    width: '100%',
    height: '100%'
  };
  
  const center = {
    lat: 11.247638,
    lng: 124.989734
  };
  
const MapComponent = ({ isModalOpen, cancelModal, setFieldValue }: ActivityModalProps ) =>{
    const {isLoaded} = useJsApiLoader({
        googleMapsApiKey: google_key,
        libraries :["places"]
    })
    const [markerPosition, setMarkerPosition] = useState<MarkerPosition | null>(null);
    const [showInfoWindow, setShowInfoWindow] = useState(false);

    if(!isLoaded){
        return null;
    }
    

    const handleMapClick = (event: google.maps.MapMouseEvent) => {
        // Set the marker position
        if(event.latLng){
            const lat = event.latLng.lat();
           
            const lng = event.latLng.lng();
           
            setMarkerPosition({ lat, lng });
        }
       

        // Show the info window for the marker
        setShowInfoWindow(true);
    };

    const markerSetterOnSearch = (lat:number,lng:number) =>{
        setMarkerPosition({ lat, lng });
    }
    const onLocationConfirm = (lat:number,lng:number) =>{
        setFieldValue('location.latitude', `${lat}`);
        setFieldValue('location.longitude', `${lng}`);

            cancelModal();
    }
    const handleConfirmLocation = async() => {
        // Pass the confirmed location back to the parent component
        if (markerPosition) {
            onLocationConfirm(markerPosition.lat, markerPosition.lng);
            setMarkerPosition(null); // Remove the marker after confirmation
            setShowInfoWindow(false); // Hide the InfoWindow
            cancelModal(); // Close the map modal

            try {
                const results = await getGeocode({ location: { lat: markerPosition.lat, lng: markerPosition.lng } });
                if (results && results.length > 0) {
                  const placeName = results[0].formatted_address;
                    setFieldValue('address',`${placeName}`);
          
                  // You can do something with the placeName, such as updating state or displaying it to the user
                }
              } catch (error) {
                console.error('Error fetching place name:', error);
              }
        }
    }; 

    return (
        <>
        <div className="w-11/12">
            <Modal open={isModalOpen} onCancel={cancelModal} width='50%' footer={null}>
            
                <div className="w-full h-96">
                    
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={center}
                        zoom={15}
                        onClick={handleMapClick}
                    >
                        <div className="flex items-center justify-center">
                            <SearchTab markerSetterOnSearch= {markerSetterOnSearch}/>
                </div>
                        {markerPosition ? (
                            <Marker position={markerPosition} onClick={() => setShowInfoWindow(true)}>
                                {showInfoWindow ? (
                                    <InfoWindow position={markerPosition} onCloseClick={() => setShowInfoWindow(false)}>
                                        <div>
                                            <p>Is this the correct location?</p>
                                            <button className="bg-blue-500 text-white p-2 text-xs" onClick={handleConfirmLocation}>Confirm Location</button>
                                        </div>
                                    </InfoWindow>
                                ):""}
                            </Marker>
                        ): ""}
                    </GoogleMap>
                </div>
            </Modal>
        </div>
    </>
    )
}

interface SearchTabProps  {
    markerSetterOnSearch: (lat:number,lng:number)=>void
}
const SearchTab = ({markerSetterOnSearch}:SearchTabProps) =>{

    const {
            ready,
            value,
            setValue,
            suggestions:{status,data},
            clearSuggestions
        } = usePlacesAutoComplete();
        const handleSelect = async(selectedValue:string) => {
            console.log(selectedValue);
            setValue(selectedValue, false);

            clearSuggestions();

            const results = await getGeocode({address: selectedValue})
            const {lat,lng} = await getLatLng(results[0]);

            markerSetterOnSearch(lat,lng)
            // Handle the selected value as needed
          };
    return(
        <div>
      <Combobox
        data={status === 'OK' ? data.map((suggestion) => suggestion.description) : []}
        value={value}
        onChange={(newValue) => setValue(newValue)}
        onSelect={(selectedValue) => handleSelect(selectedValue)}
        disabled={!ready}
        className="p-4 border-2 "
      />
    </div>
        )


}
export default MapComponent;