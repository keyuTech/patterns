import React, { useState } from "react";

export default function withHover(Element) {
  return props => {
    const [hovering, setHover] = useState(false);

    return (
      <Element
        {...props}
        hovering={hovering.toString()}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      />
    );
  };
}