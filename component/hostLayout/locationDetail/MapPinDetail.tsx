import { useEffect } from 'react';

interface MapPinDetailProps {
    location: { lat: string, lng: string };
    setNewLocation: React.Dispatch<React.SetStateAction<{
        lat: number;
        lng: number;
    }>>
}
export default function MapPinDetail({ location, setNewLocation }: MapPinDetailProps) {
    const lat = Number(location.lat);
    const lng = Number(location.lng);
    useEffect(() => {
        let pyrmont = new google.maps.LatLng(lat, lng);
        const map = new google.maps.Map(document.getElementById('map')!, {
            center: pyrmont,
            zoom: 16,
            scrollwheel: false,
            streetViewControl: false,
            panControl: false,
            mapTypeControl: false
        });
        const icon = {
            url: "/images/mapsMarker.png",
            scaledSize: new google.maps.Size(50, 50),
        }
        let marker = new google.maps.Marker({
            animation: google.maps.Animation.DROP,
            position: { lat: lat, lng: lng },
            map,
            title: "this is marker",
            icon: icon
        })
        setNewLocation({ lat: lat, lng: lng });
        map.addListener("center_changed", () => {
            setTimeout(() => {
                let moveLat = map.getCenter()?.lat()!.toFixed(4);
                let moveLng = map.getCenter()?.lng()!.toFixed(4);
                marker.setPosition({ lat: Number(moveLat), lng: Number(moveLng) })
                setNewLocation({ lat: Number(moveLat), lng: Number(moveLng) })
            }, 100)
        })
        function markerBounce() {
            marker.setAnimation(google.maps.Animation.BOUNCE);
        }
        map.addListener("dragstart", markerBounce)
        map.addListener("dragend", () => {
            const timer = setTimeout(() => {
                marker.setAnimation(null);
            }, 2000);
        })
    }, [])
    return (
        <>
            <div id="map" style={{ height: "100%", width: "100%" }}>
            </div>
        </>
    )
}