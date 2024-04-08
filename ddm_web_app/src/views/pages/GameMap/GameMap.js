import styles from "./GameMap.module.css";
import ProfileButton from "../../components/ProfileButton/ProfileButton";
import CardHand from "../../components/CardHand/CardHand";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {useRef} from "react";
import {ROUTES} from "../../MakeRoutes";
import {useNavigate} from "react-router-dom";

function Map() {

    const navigator = useNavigate();

    const mapRef = useRef(null);
    const latitude = 51.505;
    const longitude = -0.09;

    return (
        // Make sure you set the height and width of the map container otherwise the map won't show
        <MapContainer center={[latitude, longitude]} zoom={13} ref={mapRef} className={styles.map}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[51.505, -0.09]} eventHandlers={{
                click: (e) => {
                    navigator(ROUTES.DOGBATTLE);
                },
            }}>
                <Popup>
                    A pretty CSS3 popup. <br /> Easily customizable.
                </Popup>
            </Marker>
        </MapContainer>
    );
}

function GameMap() {
  return (
      <div className={styles.gameMap}>
          <div className={styles.profileButton}>
              <ProfileButton/>
          </div>
          <Map/>
          <div className={styles.cardHand}>
            <CardHand />
          </div>
      </div>
  );
}

export default GameMap;