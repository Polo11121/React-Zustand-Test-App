import { Column } from "components";
import "./App.css";

const App = () => (
  <div className="App">
    <Column state="planned" />
    <Column state="ongoing" />
    <Column state="done" />
  </div>
);

export default App;
