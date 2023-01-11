import { logger1, logger2 } from "./utils/logger";
import Observerable from "./utils/observerable";

const observerable = new Observerable();

observerable.subscribe(logger1);
observerable.subscribe(logger2);

function App() {
  const handleClick = () => {
    observerable.notify('button clicked')
  };

  return (
    <div className="App">
      <button onClick={handleClick}>Click Me</button>
    </div>
  );
}

export default App;
