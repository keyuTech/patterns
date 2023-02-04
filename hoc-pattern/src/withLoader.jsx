import { useEffect } from "react"
import { useState } from "react"

export default function withLoader(Element, url) {
  return props => {
    const [data, setData] = useState(null)

    useEffect(() => {
      const getData = async () => {
        const res = await fetch(url);
        const data = await res.json();
        setData(data);
      }

      getData()
    }, [])

    if (!data) {
      return <div style={{color: "#fff"}}>Loading...</div>;
    }

    return <Element {...props} data={data}/>
  }
}