import styles from "./GameMap.module.css";
import ProfileButton from "../../components/ProfileButton/ProfileButton";
import CardHand from "../../components/CardHand/CardHand";
import {MapContainer, Marker, Polyline, Popup, TileLayer, useMap} from "react-leaflet";
import {useEffect, useRef, useState} from "react";
import {ROUTES} from "../../MakeRoutes";
import {useNavigate} from "react-router-dom";
import INFO_STATUS from "../../../controllers/utils/InfoStatus";
import {movePlayerTo} from "../../../controllers/MovementController";
import {getEvents} from "../../../controllers/MapController";
import L from "leaflet";
import {getCurrentHand} from "../../../controllers/UserController";

function DistanceLine ({positions, distance, shown}) {
    const map = useMap();

    useEffect(() => {
        const polyline = L.polyline(positions, {color: "#5D3819", dashArray: '20, 20'}).addTo(map);
        return () => {
            map.removeLayer(polyline);
        }
    }, [positions]);

    return null;
}


const enemyIcon = L.icon({
    iconUrl: 'http://localhost:8080/assets/Enemy.png',
    iconSize: [50, 65],
    iconAnchor: [25, 50],
    popupAnchor: [0, -50]
});

const playerIcon = L.icon({
    iconUrl: 'http://localhost:8080/assets/Player.png',
    iconSize: [50, 65],
    iconAnchor: [25, 50],
    popupAnchor: [0, -50]
});


function Map() {

    const navigate = useNavigate();
    const [events, setEvents] = useState({state: INFO_STATUS.LOADING});
    const [player, setPlayer] = useState({coordinates: {latitude: 0, longitude: 0},status: INFO_STATUS.LOADING});

    const [distance, setDistance] = useState(0);
    const [activeEvent, setActiveEvent] = useState(-1);

    const mapRef = useRef(null);
    const longitude = -9.148084795448995;
    const latitude = 38.72068259212949;

    useEffect(() => {

        navigator.geolocation.getCurrentPosition((position) => {
            setPlayer({coordinates: {latitude: position.coords.latitude, longitude: position.coords.longitude}, status: INFO_STATUS.READY})
        });

        getEvents((res, status) => {
            if (status === 200) {
                setEvents({events: res.events, state: INFO_STATUS.READY});
            } else {
                setEvents({state: INFO_STATUS.ERROR})
            }

        });
    }, []);

    return (
        // Make sure you set the height and width of the map container otherwise the map won't show
        <MapContainer center={[latitude, longitude]} zoom={13} ref={mapRef} className={styles.map}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {player.status === INFO_STATUS.READY  ? <Marker position={[player.coordinates.latitude, player.coordinates.longitude]} icon={playerIcon}>
                </Marker> : null}

            {events.state === INFO_STATUS.READY ? events.events.map((event, index) => (

                <Marker key={index} position={[event.location.coordinates[1], event.location.coordinates[0]]} icon={enemyIcon}
                        eventHandlers={{
                            click: (e) => {
                                setDistance(e.latlng.distanceTo({lat: player.coordinates.latitude, lng: player.coordinates.longitude}));
                                setActiveEvent(index);
                            },
                        }}>
                    {
                        activeEvent === index ?
                        <DistanceLine positions={[[player.coordinates.latitude, player.coordinates.longitude], [event.location.coordinates[1], event.location.coordinates[0]]]} distance={distance} shown={false} />
                            : null
                    }

                    <Popup>
                        <div>
                            <h2>{event.name}</h2>
                            <p>{event.description}</p>
                            <p>Distance: {distance.toFixed(2)} meters</p>
                            <button onClick={() =>  movePlayerTo({latitude: event.location.coordinates[1], longitude: event.location.coordinates[0]}, event.playerId, navigate)}>Battle</button>
                        </div>
                    </Popup>
                </Marker>
            )) : null}
        </MapContainer>
    );
}

function GameMap() {

    const navigate = useNavigate();
    const [cards, setCards] = useState({state: INFO_STATUS.LOADING});

    function handleCardClick() {
        navigate(ROUTES.DECKMANAGER);
    }

    useEffect(() => {

        getCurrentHand((response, status) => {
            if (status === 200) {
                setCards({state: INFO_STATUS.READY, cards: response.pack});
            } else {
                setCards({state: INFO_STATUS.ERROR});
            }
        });

    }, []);

    return (
        <div className={styles.gameMap}>
            <div className={styles.profileButton}>
                <ProfileButton/>
            </div>
            <Map/>
            <div className={styles.cardHand}>
                <CardHand cards={cards.cards} onClick={handleCardClick} id={"currentHand"}/>
            </div>
        </div>
    );

}

export default GameMap;
