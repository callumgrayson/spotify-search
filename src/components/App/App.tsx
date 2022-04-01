import FlowController from "../FlowController/FlowController";
import "./App.css";
import AppHeading from "../Headings/AppHeading";

function App() {
  return (
    <div className="App">
      <div className="sizer">
        <AppHeading text={"Spotify Search"} />
        <FlowController />
      </div>
    </div>
  );
}

export default App;
