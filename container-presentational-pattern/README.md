# 容器/展示模式 / Container/Presentational Pattern

> 「前端设计模式」系列是对于 [patterns.dev](https://www.patterns.dev/) 一书的一系列学习笔记

## 是什么

> Enforce separation of concerns by separating the view from the application logic

👆通过将视图与应用程序逻辑分离来强制分离关注点

简单来说就是将UI和逻辑分离的设计模式，MVC、MVVM都是这种设计模式的体现。控制UI的就是 `Presentational`，控制逻辑的就是 `Container`。

## 怎么做

```jsx
// index.jsx
function App() {
  return (
    <div className="App">
      <DogImagesContainer />
    </div>
  );
}

// dogImagesContainer.jsx
export default class DogImagesContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      dogs: []
    };
  }

  componentDidMount() {
    fetch("https://dog.ceo/api/breed/labrador/images/random/6")
      .then(res => res.json())
      .then(({ message }) => this.setState({ dogs: message }));
  }

  render() {
    return <DogImages dogs={this.state.dogs} />;
  }
}

// dogImages.jsx
export default function DogImages({ dogs }) {
  return dogs.map((dog, i) => <img src={dog} key={i} alt="Dog" />);
}
```

上例中创建了一个用于展示狗狗图片的App，在 `index.jsx` 中只引入了 `DogImagesContainer` 这个组件，也即容器组件，在这个组件中只负责获取数据并且处理数据，并不关心数据如何展示，它通过props将数据传递给展示组件 `DogImages`，展示组件中只做了一件事：将数据遍历并渲染。

## Hooks
在React 16.8.0版本添加了 `Hooks` 特性之后，我们可以使用 `React Hooks` 来替代容器/展示模式，所以在目前这个时间点（2022年），容器/展示模式会被一些人认为是过时的设计模式，也有一定的道理。
```jsx
// useDogImages.jsx
export default function useDogImages() {
  const [dogs, setDogs] = useState([]);

  useEffect(() => {
    fetch("https://dog.ceo/api/breed/labrador/images/random/6")
      .then(res => res.json())
      .then(({ message }) => setDogs(message));
  }, []);

  return dogs;
}

// dogImages.jsx
export default function DogImages() {
  const dogs = useDogImages();

  return dogs.map((dog, i) => <img src={dog} key={i} alt="Dog" />);
}
```

上例中我们创建了一个名为 `useDogImages` 的 Hook 来获取并处理数据，然后就可以直接在 `DogImages` 组件中调用 `useDogImages` Hook 即可拿到所需的数据。

Hooks可以很容易地分离组件中的逻辑和视图，就像容器/展示模式一样。但 Hooks 为我们节省了将展示组件包装在容器组件中所必需的额外层。

## 优/缺点
### 优点
容器/展示模式将UI和逻辑分离，使得UI组件很容易变得可复用，因为它们只是显示数据而不更改此数据。我们可以在应用中的不同地方复用UI组件。
同时，测试UI组件也变得更简单，UI组件通常是个纯函数，我们知道组件将根据数据呈现什么结果，不再需要模拟数据处理。

### 缺点
由于React Hooks的出现，实现UI和逻辑分离变得更简单，同时也可以直接使用函数式组件而不是类组件。