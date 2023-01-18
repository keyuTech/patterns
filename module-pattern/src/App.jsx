import { add, multiply, square, subtract } from './math.js';
import addWithDefault, { subtractWithDefault } from './math-with-default-export.js';

function App() {
  const addResult = add(1, 2);
  const multiplyResult = multiply(2);
  const subtractResult = subtract(3, 1);
  const squareResult = square(2);

  console.log(addResult); // 3
  console.log(multiplyResult); // 4
  console.log(subtractResult); // 2
  console.log(squareResult); // 4

  console.log(privateValue); // Error: privateValue is not defined

  console.log(addWithDefault(1, 2)); // 3
  console.log(subtractWithDefault(2, 1)); // 1
  return (
    <div className="App">
      <button id="button">Load math module</button>
    </div>
  );
}

export default App;
