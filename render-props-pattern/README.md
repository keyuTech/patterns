# Render Props模式/Render Props Pattern
> 「前端设计模式」系列是对于 [patterns.dev](https://www.patterns.dev/) 一书的一系列学习笔记
    
## 是什么

> Pass JSX elements to components through props
    
👆通过 **props** 将 **JSX 元素**传递给组件

在[HOC Pattern/HOC模式](../hoc-pattern)章节中我们了解到：如果多个组件需要访问相同的数据或包含相同的逻辑，那么能够重用组件逻辑会非常方便。

除了HOC模式外的另外一种方法就是使用**Render Props模式**，render prop是组件上的prop，它是一个返回JSX元素的函数。在这个过程中组件只是调用render prop，并不会实现组件本身的渲染逻辑。

## 怎么做
假设我们有一个```Title```组件，这个组件除了渲染我们通过prop传入的值之外，不做任何事情。我们就可以使用render prop来实现
```jsx
<Title render={() => <h1>I am a render prop!</h1>}/>
```
在```Title```组件中，我们可以返回调用的render prop来渲染：
```jsx
const Title = props => props.render()
```
接收 prop 的组件是非常可重用的。我们可以多次使用它，每次都可以将不同的值传递给 render prop。
```jsx
import React from "react";
import { render } from "react-dom";
import "./styles.css";

const Title = (props) => props.render();

render(
  <div className="App">
    <Title render={() => <h1>✨ First render prop! ✨</h1>} />
    <Title render={() => <h2>🔥 Second render prop! 🔥</h2>} />
    <Title render={() => <h3>🚀 Third render prop! 🚀</h3>} />
  </div>,
  document.getElementById("root")
);
```
虽然叫做 ```render props```，但是render prop不一定非要调用 ```render```，只要是渲染JSX的prop都可以是render prop，我们可以随意取名：
```jsx
import React from "react";
import { render } from "react-dom";
import "./styles.css";

const Title = (props) => (
  <>
    {props.renderFirstComponent()}
    {props.renderSecondComponent()}
    {props.renderThirdComponent()}
  </>
);

render(
  <div className="App">
    <Title
      renderFirstComponent={() => <h1>✨ First render prop! ✨</h1>}
      renderSecondComponent={() => <h2>🔥 Second render prop! 🔥</h2>}
      renderThirdComponent={() => <h3>🚀 Third render prop! 🚀</h3>}
    />
  </div>,
  document.getElementById("root")
);
```
上例中我们就把每一个render prop都取了一个单独的名称：```renderFirstComponent```、```renderSecondComponent```、```renderThirdComponent```，但是它们都是render props。

使用render props的目的是为了通过接收render prop的组件将数据传入render prop中：
```jsx
function Component(props) {
  const data = { ... }

  return props.render(data)
}

<Component render={data => <ChildComponent data={data}/>}/>
```

## 额外示例
下面有一个简单的示例，用户可以输入摄氏温度，应用将其转换为华氏度和开尔文温度：
```jsx
import React, { useState } from "react";
import "./styles.css";

function Input() {
  const [value, setValue] = useState("");

  return (
    <input
      type="text"
      value={value}
      onChange={e => setValue(e.target.value)}
      placeholder="Temp in °C"
    />
  );
}

export default function App() {
  return (
    <div className="App">
      <h1>☃️ Temperature Converter 🌞</h1>
      <Input />
      <Kelvin />
      <Fahrenheit />
    </div>
  );
}

function Kelvin({ value = 0 }) {
  return <div className="temp">{value + 273.15}K</div>;
}

function Fahrenheit({ value = 0 }) {
  return <div className="temp">{(value * 9) / 5 + 32}°F</div>;
}
```
上面的示例里有一个问题，就是 ```Input``` 组件里接收用户的输入,但是 ```Fahrenheit```组件和 ```Kelvin```组件并不能获取用户的输入值。

### 状态提升
为了解决上例中的问题，一种方法是状态提升，将存储用户输入的state提升至 ```App```组件内，然后将state及setState通过props传入子组件：
```jsx
function Input({ value, handleChange }) {
  return <input value={value} onChange={e => handleChange(e.target.value)} />;
}

export default function App() {
  const [value, setValue] = useState("");

  return (
    <div className="App">
      <h1>☃️ Temperature Converter 🌞</h1>
      <Input value={value} handleChange={setValue} />
      <Kelvin value={value} />
      <Fahrenheit value={value} />
    </div>
  );
}
```
通过状态提升这种方法我们确实是解决了state共享的问题，但是如果是对于一个大型的应用来说，应用中会存在非常多的子组件，如果仍然使用状态提升的方法，会导致应用中存在过多的状态，难以维护甚至有可能会造成性能问题。

### Render props
所以我们可以使用render props来避免状态提升所产成的问题：
```jsx
function Input(props) {
  const [value, setValue] = useState("")
  
  return <>
    <input
      type="text"
      value={value}
      onChange={e => setValue(e.target.value)}
      placeholder="Temp in °C"
    />
    {props.render(value)}
  </>
}

export default function App() {
  return (
    <div className="App">
      <h1>☃️ Temperature Converter 🌞</h1>
      <Input
        render={value => (
          <>
            <Kelvin value={value} />
            <Fahrenheit value={value} />
          </>
        )}
      />
    </div>
  );
}
```
如此一来，```Fahrenheit```组件和```Kelvin```组件中就都可以获取用户输入值，并且也避免了状态提升带来的难维护的问题。

## 使用函数作为子组件
除了常规的 JSX 组件，我们还可以将函数作为子组件传递给 React 组件。我们可以通过 children prop使用此功能，从技术上讲，它也是一个render props。
```jsx
export default function App() {
  return (
    <div className="App">
      <h1>☃️ Temperature Converter 🌞</h1>
      <Input>
        {value => (
          <>
            <Kelvin value={value} />
            <Fahrenheit value={value} />
          </>
        )}
      </Input>
    </div>
  );
}

function Input(props) {
  const [value, setValue] = useState("");

  return (
    <>
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        placeholder="Temp in °C"
      />
      {props.children(value)}
    </>
  );
}
```
同样是对于上文中的例子来说，将 ```Fahrenheit```组件和```Kelvin```组件作为子组件传递给 ```Input```组件也是render props的一种使用方式。

## 优/缺点
### 优点
使用 render props 模式可以很容易地在多个组件之间共享逻辑和数据。 通过使用 render 或 children prop，可以提高组件的复用性。 
虽然高阶组件模式主要解决相同的问题，即可重用性和共享数据，但render props模式解决了我们在使用 HOC 模式时可能遇到的一些问题。
* 使用 render props 模式不会出现 HOC 模式中遇到的命名冲突问题，因为我们不会自动合并 props。 我们显式地将 props 传递给子组件，它的值由父组件提供。
* 由于我们明确地传递了 props，因此我们解决了 HOC 的隐式 props 问题。 应该传递给元素的props在 render props 的参数列表中都是可见的。 这样，我们就可以确切地知道某些 prop 的来源。

我们可以通过 render props 将应用程序的逻辑与渲染组件分开。接收 render prop 的有状态组件可以将数据传递给无状态组件，无状态组件只渲染数据。

### 缺点
我们试图用 render props 解决的问题，在很大程度上已经被 React Hooks 所取代。由于 Hooks 改变了我们向组件添加复用性和数据共享的方式，因此在许多情况下它们可以取代 render props 模式。
由于我们不能将生命周期方法添加到 render prop，我们只能在不需要更改它们接收到的数据的组件上使用它。
