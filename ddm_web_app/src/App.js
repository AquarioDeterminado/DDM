import './App.css';
import makeRoutes from "./views/MakeRoutes";
import a from 'leaflet/dist/leaflet.css';
import "i18next"
import 'dotenv/config'

function App() {
    return makeRoutes();
}

export default App;
