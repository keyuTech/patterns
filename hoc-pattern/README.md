# HOC模式/HOC Pattern

> 「前端设计模式」系列是对于 [patterns.dev](https://www.patterns.dev/) 一书的一系列学习笔记

## 是什么

> Pass reusable logic down as props to components throughout your application

👆将**可重用逻辑**作为 **props** 传递给整个应用程序中的组件

HOC 全称 **Higher Order Component**，在应用中，经常会出现在多个组件中使用相同逻辑的情况，这种时候就可以通过使用 HOC 来在多个组件中复用逻辑。

Higher Order Component (HOC) 是**接收**其他**组件**作为参数并且**返回组件**的**组件**。

HOC 包含我们想要应用于我们作为参数传递的组件的特定逻辑。 应用该逻辑后，HOC 返回具有附加逻辑的组件。

通俗来讲，HOC 就是一个组件，组件的参数可以是另一个组件，在 HOC 内部为参数组件添加一些功能，随后将添加了功能的参数组件返回出去。
## 怎么做

### 基础示例
我们经常会想要将一个确定的样式添加给不同的组件，这种时候，与其每次都为组件创建 ```style```，我们可以简单地通过创建一个添加样式的 HOC 来批量的为组件添加样式：

```jsx
function withStyles(component) {
  return props => {
    const style = {padding: '0.2rem', margin: '1rem'}
    return <component style={style} {...props}>
  }
}

const Button = () => <button>Button</button>
const Text = () => <p>Hello World</p>

const styledButton = withStyles(Button)
const styledText = withStyles(Text)
```

上例中我们创建了一个组件 ```withStyles```，这个组件接收一个组件 ```component```，并且在保留参数组件原有参数的情况下，将 ```style```添加到参数组件上，最后将添加了样式的参数组件返回。

### 额外示例
在这个示例中，我们要创建一个为组件添加loading的 HOC。

[App.jsx](./src/App.jsx) 中引入了 ```DogImages``` 组件用于展示🐶图片，[DogImages.jsx](./src//DogImages.jsx) export出了一个被 ```withLoader``` 包裹的组件，[withLoader.jsx](./src/withLoader.jsx) 接收两个参数，一个参数组件一个url用于获取数据。

在这个示例中，```withLoader``` 就是用于给组件添加loading的 HOC。

## 组合使用
除了单独使用高阶组件之外，我们还可以组合多个高阶组件。 假设我们还想添加显示悬停的功能：当用户将鼠标悬停在 DogImages 列表上时出现文本框。

为了添加hovering的功能，我们需要再创建一个名为 ```withHover``` 的 HOC，然后用 ```withHover``` 包裹 ```withLoader``` 组件，详见[withHover.jsx](./src/withHover.jsx)。

然后在 [DogImagesWithHover.jsx](./src/DogImagesWithHover.jsx)中引入并使用 ```withHover```。

## 与 Hooks 对比
某些情况下我们可以使用 React Hooks 替代 HOC。

例如上文中的 ```withHover```，我们就可以使用 ```useHover``` 作为替代：为组件添加 ```mouseOver``` 和 ```mouseLeave``` 事件监听，并将此 Hook 导出。

[useHover.jsx](./src/useHover.jsx) 的useEffect中添加了监听事件，并且设置了hovering为 ```true``` 或 ```false```，useHover中返回 ref 和 hovering，只要在使用中将 ref 绑定，就可以通过 hovering 确定鼠标是否 hover 在元素上。

```jsx
function DogImagesUseHover(props) {
  const [hoverRef, hovering] = useHover();

  return (
    <div ref={hoverRef} {...props}>
      {hovering && <div id="hover">Hovering!</div>}
      <div id="list">
        {props.data.message.map((dog, index) => (
          <img src={dog} alt="Dog" key={index} />
        ))}
      </div>
    </div>
  );
}
```

React Hooks 并不是用来替代高阶组件模式的。
> "In most cases, Hooks will be sufficient and can help reduce nesting in your tree." - [React Docs](https://reactjs.org/docs/hooks-faq.html#do-hooks-replace-render-props-and-higher-order-components)

在使用 HOC 时很容易出现组件的多层嵌套，而使用 React Hooks 可以有效避免这个问题。

### 何时使用 HOC
* 整个应用程序中的许多组件都需要使用相同的、未定制的行为。
* 该组件可以独立工作，无需添加自定义逻辑。

### 何时使用 React Hooks
* 必须为使用它的每个组件定制该行为。
* 该行为不会遍及整个应用程序，只有一个或几个组件使用该行为。
* 该行为向组件添加了许多属性。

## 优/缺点
### 优点
使用高阶组件模式允许我们将我们想要重用的逻辑全部放在一个地方。 这降低了通过一遍又一遍地复制代码在整个应用程序中意外传播错误的风险，每次都可能引入新的错误。 通过将所有逻辑都放在一个地方，我们可以让我们的代码保持 DRY 并轻松实施关注点分离。

### 缺点
HOC 可以传递给元素的 prop 名称可能会导致命名冲突。

当使用多个组合 HOC 时，所有这些都将 props 传递给包装在其中的元素，可能很难弄清楚哪个 HOC 负责哪个 prop。 这会妨碍轻松调试和扩展应用程序。