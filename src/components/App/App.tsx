import FlowController from "../FlowController/FlowController";
import AppHeading from "../Headings/AppHeading";
import "./App.css";

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
