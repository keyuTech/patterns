const useState = (value) => {
  const getter = () => {}
  const setter = () => {}

  return [getter, setter]
}

const useEffect = () => {

}


const [num, setNum] = useState(1)

useEffect(() => {
  console.log(num());
})