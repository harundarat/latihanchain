const crypto = require("crypto");
const SHA256 = message => crypto.createHash("sha256").update(message).digest("hex");

// Create Block
class Block {
    constructor(timestamp = "", data = []){
        this.timestamp = timestamp;
        this.data = data;
        this.hash = this.getHash();
        this.prevHash = "";
        this.nonce = 0;
    }

    getHash() {
        return SHA256(JSON.stringify(this.data) + this.timestamp + this.prevHash + this.nonce);
    }

    mine(difficult) {
        while (!this.hash.startsWith(Array(difficult + 1).join("0"))) {
            this.nonce++;
            this.hash = this.getHash();
        }
    }
}

// Create Blockchain
class Blockchain {
    constructor(){
        this.chain = [new Block(Date.now().toString())];
        this.difficulty = 1;
    }

    getLastBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(block){
        block.prevHash = this.getLastBlock().hash;
        block.hash = block.getHash();

        block.mine(this.difficulty);

        this.chain.push(block);
    }

    // Validation
    isValid(blockchain = this) {
        for (let i = 1; i < blockchain.chain.length; i++) {
            const currentBlock = blockchain.chain[i];
            const prevBlock = blockchain.chain[i-1];

            if (currentBlock.hash !== currentBlock.getHash() || currentBlock.prevHash !== prevBlock.hash ) {
                return false;
            }
            
        }

        return true;
    }

}

const latihanChain = new Blockchain();
latihanChain.addBlock(new Block(Date.now().toString(), ["Hello Om"]));
latihanChain.addBlock(new Block(Date.now().toString(), ["Hello Om 1"]));
latihanChain.addBlock(new Block(Date.now().toString(), ["Hello Om 2"]));

// latihanChain.chain[1].data = "data changed"; // .isValid() will return false
console.info(latihanChain.isValid());
console.info(latihanChain.chain);

difficult = 1;