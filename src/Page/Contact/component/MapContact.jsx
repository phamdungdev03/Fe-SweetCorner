import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { useMemo } from "react";

const MapContact = () => {
  // API Key từ Google Cloud
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "YOUR_GOOGLE_MAPS_API_KEY", // Thay thế bằng API key của bạn
  });

  // Vị trí mặc định của bản đồ (ví dụ: Hà Nội)
  const center = useMemo(() => ({ lat: 21.028511, lng: 105.804817 }), []);

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      zoom={15} // Độ phóng to bản đồ
      center={center} // Vị trí trung tâm bản đồ
      mapContainerStyle={{ width: "100%", height: "400px" }} // Kích thước của bản đồ
    >
      <Marker position={center} />
    </GoogleMap>
  );
};

export default MapContact;
