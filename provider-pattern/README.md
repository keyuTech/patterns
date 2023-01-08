# Provider Pattern

> 「前端设计模式」系列是对于 [patterns.dev](https://www.patterns.dev/) 一书的一系列学习笔记

## 是什么

> Make data available to multiple child components

👆使数据对多个子组件可用

### 前置
在React的使用过程中，我们会使用 `props` 实现父子组件的通信，但是在多层组件嵌套的情况下会出现所谓的 `prop drilling` 的情况，即较深层的子组件想要用到上层的数据时，需要经过很多层的传递，这种情况下想要重构时需要修改非常多的代码，但是中间层的组件并没有消费数据，造成不必要的困扰，而且很难定位到初始数据的位置。 

### 解决方案
在上述情况下，如果我们可以跳过中间层不需要数据的组件，直接将数据传递到底层需要数据的子组件，就可以避免所谓的 `prop drilling` 的情况。这就是 Prodiver Pattern 所要解决的。

## 怎么做
### 基础使用
React中提供的 `Context` 对象就是 Provider Pattern 的实现，我们可以通过 `createContext` 创建一个 Context对象。然后可以在子组件中通过 `useContext` 获取数据。

``` jsx
const Context = React.createContext()

function App() {
  const data = {
    name: 'Andy',
    age: 18
  }

  return <div>
    <Context.Provider value={data}>
      <ComponentA/>
      <ComponentB/>
    </Context.Provider>
  </div>
}

function ComponentA() {
  const {data} = useContext(Context)

  return <div>
    {data.name}
  </div>
}

function ComponentB() {
  const {data} = useContext(Context)

  return <div>
    {data.age}
  </div>
}
```
在上例中，我们直接将数据存入Context中，并用 `Context.Provider`包裹子组件，在子组件 `ComponentA` 和 `ComponentB` 中直接取用，没有经过中间层组件的传递。

### 额外示例
当前文件中展示了一个切换主题的Demo，在 `App.js` 中定义了 `ThemeContext` 用于存放主题信息和触发切换主题的方法，同时通过 `ThemeContext.Provider` 包裹 `Toggle` 和 `List` 两个组件。`List` 组件中包含 `ListItem` 子组件。
通过 `Toggle` 组件触发切换主题的方法更改Context中的数据，在 `ListItem` 中通过 `useContent(ThemeContext)` 获取主题数据。
在更改数据及获取数据的过程中并没有中间组件 `List` 的参与。

## 优/缺点
### 优点
Provider 模式/上下文 API 可以将数据传递给许多组件，而无需手动将其传递到每个组件层。它降低了重构代码时意外引入错误的风险。以前，如果我们以后想要重命名一个 prop，我们必须在使用该值的整个应用程序中重命名该 prop。
使用 Provider Pattern 可以很容易地保持某种全局状态，因为我们可以让组件访问这个全局状态。

### 缺点
在某些情况下，过度使用 Provider Pattern 会导致性能问题。使用Context的所有组件都会在每次状态更改时重新呈现。
在当前文件提供的额外示例中，由于theme被定义在 `App.js` 中，所以每次触发主题更改时，整个App中的所有组件都会被重新渲染。当项目比较复杂时有可能会导致性能问题。

如果想要解决这个问题，我们可以通过建立多个Context，并将Context.Provider下放到中间层组件的方式解决。