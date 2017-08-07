const Node = require('./node');

class LinkedList {
    constructor() {
        this._head = null;
        this._tail = null;
        this.length = 0;
    }

    /* 1 Append new node to DLL */
    append(data) {
        const node = new Node(data);
        if(!this._head) {
            this._head = node;
            this._tail = node;
        } else {
            node.prev = this._tail;
            this._tail.next = node;
            this._tail = node;
        }
        this.length++;
    }

    /* 2 Return data from the this.head */
    head() {}

    /* 3 Return data from the this.tail */
    tail() {}

    /* 4 Return Node.data by index */
    at(index) {}

    /* 5 Insert data by index */
    insertAt(index, data) {}

    /* 6 Return true if list is empty */
    isEmpty() {}

    /* 7 Clear DLL */
    clear() {}

    /* 8 Delete element by index*/
    deleteAt(index) {}

    /* 9 Reverse DLL */
    reverse() {}

    /* 10
    Return index of element if data is found
    and -1 if data not found
    */
    indexOf(data) {}
}

module.exports = LinkedList;
