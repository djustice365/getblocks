import { JsonRpc, RpcError } from 'eosjs';
const fetch = null;
const rpc = new JsonRpc('https://api.eosnewyork.io', { fetch });

export function loadBlocks() {
  let pre = document.getElementsByTagName('pre')[0];
  pre.textContent = "";
  
  let blocks = [];
  
  (async () => {
    try{
      // Get head block number from endpoint
      let endpointInfo = await rpc.get_info();
      let headBlockNum = endpointInfo.head_block_num;
      
      // Create a list of the last 10 blocks
      let currentBlock = await rpc.get_block(headBlockNum);
      blocks.push(currentBlock);
      
      // Get previous block of each block and add to list until we hit 10
      for (let i = 0; i < 9; i++) {
        let previousBlock = await rpc.get_block(currentBlock.previous);
        blocks.push(previousBlock);
        currentBlock = previousBlock;
      }
      
      for (let i = 0; i < blocks.length; i++) {
        createBlockElement(blocks[i]);
      }
    } catch (e) {
      console.log('\nCaught Exception: ' + e);
      if (e instanceof RpcError) {
        console.log(JSON.stringify(e.json, null, 2));
      }
    }
  })();
}

export function createBlockElement(block) {
  let pre = document.getElementsByTagName('pre')[0];
  let raw = document.createElement("p");
  raw.innerHTML = JSON.stringify(block, null, 2);
  raw.className = "collapsible-content";
  
  let div = document.createElement("div");
  div.innerHTML = 'Hash: ' + block.id + '\n' +
                  'Timestamp: ' + block.timestamp + '\n' +
                  'Actions: ' + block.transactions.length;
  div.className = "collapsible";
  div.appendChild(raw);
  div.addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.children[0];
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
  
  pre.appendChild(div);
}

export default loadBlocks;