import PropertyMap from "./PropertyMap";


interface PropertyMapWrapperProps {
  lat: number;
  lng: number;
  address: string;
}

export default function PropertyMapWrapper({ lat, lng, address }: PropertyMapWrapperProps) {
  return <PropertyMap lat={lat} lng={lng} address={address} />;
}
