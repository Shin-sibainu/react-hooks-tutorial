import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import "./App.css";
import ShinCodeContext from "./main";
// import NumberList from "./NumberList.jsx";
import SomeChild from "./SomeChild";
import useLocalStorage from "./useLocalStorage";

const reducer = (state, action) => {
  switch (action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    default:
      return state;
  }
};

function App() {
  const [count, setCount] = useState(0);
  const shincodeInfo = useContext(ShinCodeContext);
  const ref = useRef();
  const [state, dispatch] = useReducer(reducer, 0);

  useEffect(() => {
    console.log("hello");
    // setCount(count + 1); useEffect内ではセッターは呼ばない -> 無限ループになる

    // return () => alert("goodbye"); //unmount時に実行される
  }, [count]);

  const handleRef = () => {
    console.log(ref.current.value);
    ref.current.focus();
    console.log(ref.current.offsetHeight);
  };

  //useMemo(2回目以降の同じ入力の関数呼び出しに対するコストが削減)
  const [count01, setCount01] = useState(0);
  const [count02, setCount02] = useState(0);

  // const square = () => {
  //   console.log("実行されました");
  //   let i = 0;
  //   while (i < 1000000000) i++;
  //   return count02 * count02;
  // };

  // 変数のメモ化;
  const square = useMemo(() => {
    //ここのコールバックはcount02が更新される意外のときでは、実行されず、前の保存（メモ化）された結果を呼び出す。
    console.log("実行されました");
    let i = 0;
    //重い処理 //2000000000
    while (i < 2) {
      i++;
    }
    return count02 * count02;
  }, [count02]); //count02が更新されない限り、square関数は実行されずに前の計算結果のキャッシュされた結果を使う。

  //useCallback
  //関数のメモ化
  const [counter, setCounter] = useState(0);

  // const showCount = () => {
  //   alert(`これは重い処理です。`);
  // };

  // const showCount = useCallback(() => {
  //   alert(`Count ${counter}`);
  // }, [counter]);

  //カスタムフックス
  // const [name, setName] = useState("");
  const [age, setAge] = useLocalStorage("age", 24);

  return (
    <div className="App">
      <h1>UseState, UseEffect</h1>
      <button onClick={() => setCount(count + 1)}>＋</button>
      <p>{count}</p>

      <hr />
      <h1>UseContext</h1>
      <p>{shincodeInfo.name}</p>
      <p>{shincodeInfo.age}</p>

      <hr />
      <h1>UseRef</h1>
      <input type="text" ref={ref} />
      <button onClick={handleRef}>UseRef</button>

      <hr />
      <h1>UseReducer</h1>
      <p>カウント: {state}</p>
      <button onClick={() => dispatch({ type: "increment" })}>＋</button>
      <button onClick={() => dispatch({ type: "decrement" })}>－</button>

      <hr />
      <h1>useMemo</h1>
      <div>カウント１: {count01}</div>
      <div>カウント２: {count02}</div>
      {/* <div>square: {square()}</div> */}
      <div>結果: {square}</div>
      <button onClick={() => setCount01(count01 + 1)}>＋</button>
      <button onClick={() => setCount02(count02 + 1)}>＋</button>

      <hr />
      <h1>UseCallBack</h1>
      {/* <SomeChild showCount={showCount} />
      <button onClick={() => setCounter(counter + 1)}>＋</button> */}

      <hr />
      <h1>カスタムフック</h1>
      <p>{age}</p>
      <button onClick={() => setAge(34)}>年齢をセット</button>
    </div>
  );
}

export default App;
