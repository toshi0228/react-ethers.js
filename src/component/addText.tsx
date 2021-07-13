import React, { useState } from "react";
import ipfsConf from "../ipfsConf";

const InputText = () => {
  const [text, setText] = useState("");
  const [hash, setHash] = useState("");

  const submit = async () => {
    console.log("送信");
    const data = {
      text: text,
      test: "test",
    };

    const result = await ipfsConf.add(JSON.stringify(data));
    setHash(result.path);
    alert("登録完了");
  };

  return (
    <div>
      <p>テキストの入力</p>
      <input onChange={(e) => setText(e.target.value)} />
      <p>ipfsに保存するもの入力:{text}</p>

      {/*https://ipfs.io/ipfs/QmTy3Gwrk9MYCbAikSpzFwtXYujMvwZ4Qy66mydtLLKxVJ*/}

      <p>
        <p>{`https://ipfs.io/ipfs/${hash}`}</p>
        <a href={`https://ipfs.io/ipfs/${hash}`}>ipfsリンク先</a>
      </p>
      <button onClick={submit}>ipfsに登録</button>
    </div>
  );
};

export default InputText;
