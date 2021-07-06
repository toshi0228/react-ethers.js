import React, { useEffect, useState } from "react";
import ipfsConf from "./ipfsConf";

const IpfsCpomponet = () => {
  const [ipfsHash, setIpfsHash] = useState("");
  const [buffer, setBuffer] = useState("");

  useEffect(() => {
    console.log("再レンダリング");
  }, [ipfsHash]);

  const captureFile = (event: any) => {
    console.log("File loader ...");
    event.preventDefault();
    //fileにアクセスする
    const file = event.target.files[0];
    //fileを読み込む
    const reader = new window.FileReader();
    //fileをipfsいアクセスできるArrayに追加する
    reader.readAsArrayBuffer(file);
    reader.onloadend = () => {
      //結果をBufferに入れ,ipfsにアクセスできるようにする
      // @ts-ignore
      setBuffer(new Buffer(reader.result));
      // console.log("buffer", this.state.buffer);
    };
  };

  const onSubmit = async (event: any) => {
    console.log("on Submit ...");
    //Submit時にリロードしなくなる
    event.preventDefault();
    //ipfsにファイルを追加

    try {
      const result = await ipfsConf.add(buffer);
      console.log("path", result.path);
      setIpfsHash(result.path);
      //ブロックチェーンにipfsHashを書きこむ
      // this.state.contract.methods.set(result[0].hash).send({ from: this.state.accounts[0]})
      // this.state.contract.methods.set(result.path).send({ from: this.state.accounts[0]}).then(res=> console.log({res})).catch(e=> console.log({e}))
      //iphsHashの値をアップデートする
      // return this.loadIpfsHash();
    } catch {
      console.log("エラーです");
      return;
    }
  };

  return (
    <div className="App">
      <h1>Your Image</h1>
      <p>This image is stored on IPFS & The Ethereum Blockchain!</p>

      <div>
        {ipfsHash ? (
          <img src={`https://ipfs.io/ipfs/${ipfsHash}`} alt="" />
        ) : (
          <div>画像登録なし</div>
        )}
      </div>
      {/*<img src={`https://ipfs.io/ipfs/${this.state.hoge}`} alt=""></img>*/}
      <h2>Upload image</h2>
      <form onSubmit={onSubmit}>
        <input type="file" onChange={captureFile} />
        <input type="submit" />
      </form>
      {/*<button onClick={async () => await fetchGreeting()}>値の取得</button>*/}
    </div>
  );
};

export default IpfsCpomponet;

// import React, { Component , useState, useEffect} from "react";
// import SimpleStorageContract from "./contracts/SimpleStorage.json";
// import getWeb3 from "./utils/getWeb3";
// import ipfs from "./ipfs.js";
// import "./App.css";
// // import { providers, Contract, utils } from "ethers";
// import { fetchGreeting } from "./eth/eth.ipfs";
// cp App extends Component {
//     constructor(props) {
//         super(props)
//         this.state= {
//             web3: null,
//             accounts: null,
//             contract: null,
//             buffer: null,
//             ipfsHash: [],
//             hoge: '',
//         }
//         //関数を使えるようにする
//         this.captureFile = this.captureFile.bind(this);
//         this.onSubmit = this.onSubmit.bind(this);
//     }
//
//     loadIpfsHash = async () => {
//         const length = await this.state.contract.methods.arraylength().call()
//         for (var i = 0; i <= length; i++) {
//             const ipfsHashs = await this.state.contract.methods.IpfsHash(i).call()
//             this.setState({
//                 ipfsHash: [...this.state.ipfsHash, ipfsHashs]
//             })
//         }
//     }
//     captureFile(event) {
//         console.log('File loader ...')
//         event.preventDefault()
//         //fileにアクセスする
//         const file = event.target.files[0]
//         //fileを読み込む
//         const reader = new window.FileReader()
//         //fileをipfsいアクセスできるArrayに追加する
//         reader.readAsArrayBuffer(file)
//         reader.onloadend = () => {
//             //結果をBufferに入れ,ipfsにアクセスできるようにする
//             this.setState({ buffer: Buffer(reader.result) })
//             console.log('buffer', this.state.buffer)
//         }
//     }
//     import React, { Component , useState, useEffect} from "react";
// import SimpleStorageContract from "./contracts/SimpleStorage.json";
// import getWeb3 from "./utils/getWeb3";
// import ipfs from "./ipfs.js";
// import "./App.css";
// // import { providers, Contract, utils } from "ethers";
// import { fetchGreeting } from "./eth/eth.ipfs";
// class App extends Component {
//     constructor(props) {
//         super(props)
//         this.state= {
//             web3: null,
//             accounts: null,
//             contract: null,
//             buffer: null,
//             ipfsHash: [],
//             hoge: '',
//         }
//         //関数を使えるようにする
//         this.captureFile = this.captureFile.bind(this);
//         this.onSubmit = this.onSubmit.bind(this);
//     }
//
//     loadIpfsHash = async () => {
//         const length = await this.state.contract.methods.arraylength().call()
//         for (var i = 0; i <= length; i++) {
//             const ipfsHashs = await this.state.contract.methods.IpfsHash(i).call()
//             this.setState({
//                 ipfsHash: [...this.state.ipfsHash, ipfsHashs]
//             })
//         }
//     }
//     captureFile(event) {
//         console.log('File loader ...')
//         event.preventDefault()
//         //fileにアクセスする
//         const file = event.target.files[0]
//         //fileを読み込む
//         const reader = new window.FileReader()
//         //fileをipfsいアクセスできるArrayに追加する
//         reader.readAsArrayBuffer(file)
//         reader.onloadend = () => {
//             //結果をBufferに入れ,ipfsにアクセスできるようにする
//             this.setState({ buffer: Buffer(reader.result) })
//             console.log('buffer', this.state.buffer)
//         }
//     }
//     onSubmit = async (event) => {
//         console.log('on Submit ...')
//         //Submit時にリロードしなくなる
//         event.preventDefault()
//         //ipfsにファイルを追加
//         try{
//             const result = await ipfs.add(this.state.buffer)
//             console.log("path",result.path)
//             console.log("accounts",this.state.accounts[0])
//             this.setState({ipfsHash:[...result.path]})
//             //ブロックチェーンにipfsHashを書きこむ
//             // this.state.contract.methods.set(result[0].hash).send({ from: this.state.accounts[0]})
//             // this.state.contract.methods.set(result.path).send({ from: this.state.accounts[0]}).then(res=> console.log({res})).catch(e=> console.log({e}))
//             //iphsHashの値をアップデートする
//             return this.loadIpfsHash();
//         }catch{
//             console.log("エラーです")
//             return
//         }
//         //   async (error, result) => {
//         //   console.log("書き込み完了")
//         //   if(error) {
//         //     console.error(error)
//         //     return
//         //   }
//         //   //ブロックチェーンにipfsHashを書きこむ
//         //   this.state.contract.methods.set(result[0].hash).send({ from: this.state.accounts[0] })
//         //   //iphsHashの値をアップデートする
//         //   return this.loadIpfsHash();
//         // })
//     }
//     render() {
//         // if (!this.state.web3) {
//         //   return <div>Loading Web3, accounts, and contract...</div>;
//         // }
//         return (
//             <div className="App">
//                 <h1>Your Image</h1>
//                 <p>This image is stored on IPFS & The Ethereum Blockchain!</p>
//                 {this.state.ipfsHash.map((hash, key) => {
//                     return(
//                         <div key={key}>
//                             <img src= {`https://ipfs.io/ipfs/${hash}`} alt=""></img>
//                         </div>
//                     )
//                 })}
//                 <img src= {`https://ipfs.io/ipfs/${this.state.hoge}`} alt=""></img>
//                 <h2>Upload image</h2>
//                 <form onSubmit={this.onSubmit} >
//                     <input type="file" onChange={this.captureFile} />
//                     <input type="submit" />
//                 </form>
//                 <button onClick={async () => await fetchGreeting()}>値の取得</button>
//             </div>
//         );
//     }
// }
// export default App;
