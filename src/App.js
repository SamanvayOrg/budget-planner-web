import Spreadsheet from "react-spreadsheet";
import {useState} from "react";

const App = () => {
  const [data, setData] = useState([
    [{ value: "Vanilla" }, { value: "Chocolate" },{value:"abc",readOnly : true}],
    [{ value: "Strawberry" }, { value: "Cookies" }],
    [{ value: "Apple" }, { value: "Apple" }],
    [{ value: "Mango" }, { value: "Mango" }],
    [{ value: "Kiwi" }, { value: "Kiwi" }],
    [{ value: "Pineapple" }, { value: "Pineapple" }],
    [{ value: "Papaya" }, { value: "Papaya" }],
  ]);
  return <Spreadsheet columnLabels={['abc','xyz','ad']}    data={data} onChange={setData}  />;
};

export default App;