import logo from './logo.svg';
import './App.css';
import MapComponent from './Map'

function App() {
  return (
    <div className="App">
      <h1>Radarin map preliminary version</h1>
      <div id="webMap">
        <MapComponent />
      </div>
    </div>
  );
}

export default App;