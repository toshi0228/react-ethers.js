import React, { ChangeEvent, useState } from "react";
import { ethers } from "ethers";
import {
  connect,
  fetchGreeting,
  setGreeting,
  fetchKitty,
  ipfsFunc,
} from "./web3";

import "./App.css";
import Ipfs from "./ipfs";
import InputText from "./component/addText";

const App = () => {
  const [value, setValue] = useState("");
  const onClick = () => {
    console.log(value);
    setGreeting(value);
  };

  return (
    <div>
      はじまりのページ
      <button onClick={async () => await connect()}>コントラクトの取得</button>
      <button onClick={async () => await fetchGreeting()}>値の取得</button>
      <input onChange={(e: any) => setValue(e.target.value)} />-
      <button onClick={onClick}>送信</button>
      <button onClick={async () => await fetchKitty()}>キティの取得</button>
      <button onClick={async () => await ipfsFunc()}>ipfsに保存</button>
      {/*ipfsの所を追加*/}
      <Ipfs />
      <InputText />
    </div>
  );
};

export default App;
