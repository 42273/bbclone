import { useRef } from 'react';
import Script from "next/script";
export default function RoomLocation({ location }: { location: { lat: number, lng: number } }) {
    const lat = location.lat;
    const lng = location.lng;
    const mapRef = useRef<HTMLDivElement>(null!)
    const mapsReadyInit = () => {
        let pyrmont = new google.maps.LatLng(lat, lng);
        const map = new google.maps.Map(mapRef.current, {
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
        marker.addListener('mouseover', () => {
            let opacity = 1;
            let timer = setInterval(function () {
                if (opacity > 0) {
                    opacity -= 0.2
                    marker.setOpacity(opacity)
                }
                if (opacity <= 0) {
                    marker.setOpacity(1)
                    clearInterval(timer);
                }
            }, 100);
        })
    }

    return <>
        <div id="map" ref={mapRef} style={{ height: "100%", width: "100%" }} >
        </div>

        <Script
            src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBDVRixpcidj74WqDcnU7xS2BnWlTwm93s&libraries=places"
            onReady={mapsReadyInit}
        />
    </>
}