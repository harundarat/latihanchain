const crypto = require("crypto");
const SHA256 = message => crypto.createHash("sha256").update(message).digest("hex");

// Create Block
class Block {
    constructor(timestamp = "", data = []){
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.getHash();
        this.prevHash = "";
    }

    getHash() {
        return SHA256(JSON.stringify(this.data) + this.timestamp + this.prevHash);
    }
}

// Create Blockchain
class Blockchain {
    constructor(){
        this.chain = [new Block(Date.now().toString())];
    }

    getLastBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(block){
        block.prevHash = this.getLastBlock().hash;
        block.hash = block.getHash();

        this.chain.push(block);
    }
}

const latihanChain = new Blockchain();
latihanChain.addBlock(new Block(Date.now().toString(), ["Hello Om"]));
console.log(latihanChain.chain);