import styles from "./GameMap.module.css";
import ProfileButton from "../../components/ProfileButton/ProfileButton";
import CardHand from "../../components/CardHand/CardHand";
import {MapContainer, Marker, Popup, TileLayer} from "react-leaflet";
import {useEffect, useRef, useState} from "react";
import {ROUTES} from "../../MakeRoutes";

import {useNavigate} from "react-router-dom";
import INFO_STATUS from "../../../controllers/utils/InfoStatus";
import {getEvents} from "../../../controllers/MapController";
import {movePlayerTo} from "../../../controllers/MovementController";

function Map() {

    const navigate = useNavigate();
    const [events, setEvents] = useState({state: INFO_STATUS.LOADING});

    const mapRef = useRef(null);
    const latitude = 51.505;
    const longitude = -0.09;

    useEffect(() => {
        getEvents((res, status) => {
            if (status === 200) {
                setEvents({events: res.events, state: INFO_STATUS.READY});
            } else {
                setEvents({state: INFO_STATUS.ERROR});
            }

        })
    }, []);

    return (
        // Make sure you set the height and width of the map container otherwise the map won't show
        <MapContainer center={[latitude, longitude]} zoom={13} ref={mapRef} className={styles.map}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {events.state === INFO_STATUS.READY ? events.events.map((event, index) => (
                <Marker key={index} position={[event.latitude, event.longitude]}>
                    <Popup>
                        <div>
                            <h2>{event.title}</h2>
                            <p>{event.description}</p>
                            <button onClick={() =>  movePlayerTo({latitude: event.latitude, longitude: event.longitude}, navigate)}>Details</button>
                        </div>
                    </Popup>
                </Marker>
            )) : null}
        </MapContainer>
    );
}

function GameMap() {

    const navigate = useNavigate();

    function handleCardClick() {
        navigate(ROUTES.DECKMANAGER);
    }

    return (
        <div className={styles.gameMap}>
            <div className={styles.profileButton}>
                <ProfileButton/>
            </div>
            <Map/>
            <div className={styles.cardHand}>
                <CardHand onClick={handleCardClick}/>
            </div>
        </div>
    );

}

export default GameMap;
