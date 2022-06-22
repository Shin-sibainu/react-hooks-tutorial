import {
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import "./App.css";
import ShinCodeContext from "./main";

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
  const [expensiveCount, setExpensiveCount] = useState(100);

  const expensiveCounter = () => {
    setExpensiveCount(expensiveCount + 100);
  };

  const expensiveFunction = useMemo(() => {
    //重い処理
    let i = 0;
    while (i < 10) {
      i++;
    }
    return expensiveCount * expensiveCount;
  }, [expensiveCount]);

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
      <h1>UseMemo</h1>
      <p>カウンター：{expensiveCount}</p>
      <button onClick={expensiveCounter}>+100</button>
    </div>
  );
}

export default App;

/* 
  componentDidMount() {
    //初期化
  }

  componentDidUpdate() {
    //状態更新
  }

  componentWillUnmount() {
    //終了
  }
*/
