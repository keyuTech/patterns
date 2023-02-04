import './App.css'
import DogImages from './DogImages'
import DogImagesWithHover from './DogImagesWithHover'

function App() {
  return (
    <div className="App">
      <h1>
        Browse Dog Images{" "}
        <span role="img" aria-label="emoji">
          🐕
        </span>
      </h1>
      <DogImages />
      <DogImagesWithHover/>
    </div>
  )
}

export default App
