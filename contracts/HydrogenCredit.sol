// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract HydrogenCredit {

    uint public batchCount = 0;

    struct Batch {
        uint id;
        address producer;
        string name;
        uint amount; // in kg
        bool certified;
        bool retired;
        uint timestamp;
    }

    mapping(uint => Batch) public batches;

    // Events for all actions
    event BatchCreated(uint id, address producer, string name, uint amount, uint timestamp);
    event BatchCertified(uint id, address certifier, uint timestamp);
    event BatchTransferred(uint id, address from, address to, uint timestamp);
    event BatchRetired(uint id, address buyer, uint timestamp);

    // --- Producer creates batch ---
    function createBatch(string memory _name, uint _amount) public {
        batchCount++;
        batches[batchCount] = Batch({
            id: batchCount,
            producer: msg.sender,
            name: _name,
            amount: _amount,
            certified: false,
            retired: false,
            timestamp: block.timestamp
        });

        emit BatchCreated(batchCount, msg.sender, _name, _amount, block.timestamp);
    }

    // --- Certifier approves batch ---
    function certifyBatch(uint _id) public {
        Batch storage batch = batches[_id];
        require(!batch.certified, "Already certified");
        batch.certified = true;

        emit BatchCertified(_id, msg.sender, block.timestamp);
    }

    // --- Transfer batch credits (from producer to buyer) ---
    function transferBatch(uint _id, address _to) public {
        Batch storage batch = batches[_id];
        require(batch.certified, "Batch not certified");
        require(msg.sender == batch.producer, "Only producer can transfer");
        require(!batch.retired, "Batch already retired");

        batch.producer = _to; // new owner

        emit BatchTransferred(_id, msg.sender, _to, block.timestamp);
    }

    // --- Retire batch credits ---
    function retireBatch(uint _id) public {
        Batch storage batch = batches[_id];
        require(batch.certified, "Batch not certified");
        require(msg.sender == batch.producer, "Only owner can retire");
        require(!batch.retired, "Already retired");

        batch.retired = true;

        emit BatchRetired(_id, msg.sender, block.timestamp);
    }
}
