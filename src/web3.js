import { providers, Contract, utils } from "ethers";
import hello from "./hello.json";

export const connect = async () => {
  // const address = "0x87DEEe5Dd8381b5832570B310dB2b79Dae0e4B5a";
  const address = "0x7bb910083d9243ec1e1d7041677e3b79913f36f7";

  // @ts-ignore
  // メタマスクに接続していない場合は、アカウントに接続
  await window.ethereum.request({ method: "eth_requestAccounts" });

  // @ts-ignore
  // ネットワークの取得
  const network = await providers.getNetwork(window.chainId);

  // @ts-ignore
  // スマートコントラクトと接続
  const provider = new providers.Web3Provider(window.ethereum, network);

  // @ts-ignore
  //コントラクトのインスタンスを生成
  const contract = new Contract(address, hello.abi, provider);

  return contract.connect(provider.getSigner());

  /*// @ts-ignore
    if (!window.ethereum)
        // @ts-ignore
        console.log(window.ethereum);*/
};

export async function getContract(addr) {
  // @ts-ignore
  const network = await providers.getNetwork(window.chainId);
  console.log(network);
  // @ts-ignore
  const provider = new providers.Web3Provider(window.ethereum, network);
  console.log(provider);
  console.log(provider.getSigner());
  const contract = new Contract(addr, "abi", provider);
  console.log(contract);
  return contract.connect(provider.getSigner());
  /*// @ts-ignore
  if (!window.ethereum)
      // @ts-ignore
      console.log(window.ethereum);*/
}

export const fetchGreeting = async () => {
  // アカウントアドレス
  // const address = "0x87DEEe5Dd8381b5832570B310dB2b79Dae0e4B5a";

  // 関数のアドレス
  // const address = "0x7bb910083d9243ec1e1d7041677e3b79913f36f7";
  // const address = "0x23C59765c48D3caBdE609891ce8ba0e29579Cd9c";
  // const address = "0xd9145CCE52D386f254917e481eB44e9943F39138";
  const address = "0xCa8a625b2768D5Ca77fb9401431164579b091374";

  // @ts-ignore
  await window.ethereum.request({ method: "eth_requestAccounts" });
  // @ts-ignore
  const network = await providers.getNetwork(window.chainId);

  // @ts-ignore
  //provider(Metamask)を設定
  const provider = new providers.Web3Provider(window.ethereum, network);

  // @ts-ignore
  //コントラクトのインスタンスを生成
  const contract = new Contract(address, hello.abi, provider);
  console.log(contract.address);
  console.log(contract);

  const price = await provider
    .getBalance("0x87DEEe5Dd8381b5832570B310dB2b79Dae0e4B5a")
    .then((balance) => {
      let balanceInEth = utils.formatEther(balance);
      console.log(balanceInEth);
    });

  try {
    const data = await contract.hello();
    console.log(data);
  } catch (e) {
    console.log("エラー", e);
  }

  return contract.connect(provider.getSigner());
};

export const setGreeting = async (value) => {
  // アカウントアドレス
  // const address = "0x87DEEe5Dd8381b5832570B310dB2b79Dae0e4B5a";

  // 関数のアドレス
  const address = "0x23C59765c48D3caBdE609891ce8ba0e29579Cd9c";

  // @ts-ignore
  await window.ethereum.request({ method: "eth_requestAccounts" });
  // @ts-ignore
  const network = await providers.getNetwork(window.chainId);

  // @ts-ignore
  //provider(Metamask)を設定
  const provider = new providers.Web3Provider(window.ethereum, network);

  // 値を更新する場合は、署名が必要
  const signer = provider.getSigner();

  //コントラクトのインスタンスを生成
  // const contract = new Contract(address, hello.abi, signer);
  const contract = new Contract(address, hello.abi, signer);

  const transaction = await contract.setGreeting(value);
  await transaction.wait();

  fetchGreeting();
};

// キティ取得
export const fetchKitty = async () => {
  // アカウントアドレス
  const accountAddress = "0x87DEEe5Dd8381b5832570B310dB2b79Dae0e4B5a";

  // 関数のアドレス
  const address = "0x08b05c43bAeE627e26dbeA0958B7B9A7F8C0BDf8";

  // @ts-ignore
  await window.ethereum.request({ method: "eth_requestAccounts" });
  // @ts-ignore
  const network = await providers.getNetwork(window.chainId);

  // @ts-ignore
  //provider(Metamask)を設定
  const provider = new providers.Web3Provider(window.ethereum, network);

  // @ts-ignore
  //コントラクトのインスタンスを生成
  const contract = new Contract(address, hello.kitty, provider);

  try {
    const data = await contract.getKitty(accountAddress);
    // const data = await contract.hello();
    console.log(data);
  } catch (e) {
    console.log("エラー", e);
  }

  return contract.connect(provider.getSigner());
};

// ipfsの関数
export const ipfsFunc = async () => {
  console.log("ipfsの関数");
  // アカウントアドレス
  // const accountAddress = "0x87DEEe5Dd8381b5832570B310dB2b79Dae0e4B5a";
  //
  // // 関数のアドレス
  const address = "0xd9145CCE52D386f254917e481eB44e9943F39138";
  //
  // @ts-ignore
  await window.ethereum.request({ method: "eth_requestAccounts" });
  // @ts-ignore
  const network = await providers.getNetwork(window.chainId);

  // @ts-ignore
  //provider(Metamask)を設定
  const provider = new providers.Web3Provider(window.ethereum, network);

  // 値を更新する場合は、署名が必要
  const signer = provider.getSigner();

  // @ts-ignore
  //コントラクトのインスタンスを生成
  const contract = new Contract(address, hello.ipfsAbi, signer);

  // const ownerAddress = contract.address;
  //
  // await contract.setHash(ownerAddress).then((res) => {
  //   const data = contract.getHash();
  //   console.log({ data });
  // });

  // console.log(await contract.getHash());

  // try {
  //   const data = await contract.getKitty(accountAddress);
  //   // const data = await contract.hello();
  //   console.log(data);
  // } catch (e) {
  //   console.log("エラー", e);
  // }
  //
  // return contract.connect(provider.getSigner());
};
