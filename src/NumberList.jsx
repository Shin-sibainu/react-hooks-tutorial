import React, { useEffect, useState } from "react";

export default function NumberList({ getItems }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(getItems(10));
    console.log("リストを更新しました");
  }, [getItems]);

  return (
    <div>
      {items.map((item) => (
        <div key={item} style={{ color: "black" }}>
          {item}
        </div>
      ))}
    </div>
  );
}
