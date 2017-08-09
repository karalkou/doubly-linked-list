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
        return this;
    }

    /* 2 Return data from the this._head */
    head() {
        if(this._head){
            return this._head.data;
        }
    }

    /* 3 Return data from the this._tail */
    tail() {
        if(this._tail){
            return this._tail.data;
        }
    }

    /* 4 Return Node.data by index */
    at(index) {
        if (index > this.length || index < 0) { throw new Error('Index out of bounds'); }

        let gotNode = this._find(index);

        return gotNode.data;
    }

    /* 5 Insert data by index */
    insertAt(index, data) {
        if (index > this.length || index < 0) {  throw new Error('Index out of bounds'); }

        const node = new Node(data);
        let prevNode,
            nextNode;

        if (index === 0) {
            // Insert in the beginning
            nextNode = this._head;
            this._head = node;
            nextNode.prev = node;
            node.next = nextNode;

        } else if (index === this.length){
            // Insert at the end
            if (!this._head) this._head = node;

            if (this._tail) {
                this._tail.next = node;
                node.prev = this._tail;
            }

            this._tail = node;

        } else {
            nextNode = this._find(index);
            prevNode = nextNode.prev;
            prevNode.next = node;
            node.prev = prevNode;

            nextNode.prev = node;
            node.next = nextNode;
        }

        this.length++;
        return this;
    }

    /* 6 Return true if list is empty */
    isEmpty() {
        return this.length === 0;
    }

    /* 7 Clear DLL */
    clear() {
        /* походу нужно удалить ещё и всю нутрянку. Т.е. нужно поубирать ссылки на объекты */
        let startNode = this._head,
            nextNode = null;

        for(let i=0; i<this.length; i+=1){
            nextNode = startNode.next;
            startNode.next = null;
            startNode.prev = null;
            startNode.data = null;
            startNode = nextNode;
        }

        /* закомментил из-за тестов */
        // this._head = null;
        // this._tail = null;
        this.length = 0;
        return this;
    }

    /* 8 Delete element by index*/
    deleteAt(index) {
        if (index > this.length || index < 0) { throw new Error('Index out of bounds'); }

        let prevNode,
            nextNode;

        if (index === 0) {
            // Delete in the beginning
            if( this.length > 1 ){
                this._head = this._head.next;
                this._head.prev = null;
            }
        } else if (index === this.length){
            // Delete at the end
            if( this.length > 1 ){
                this._tail = this.tail.prev;
                this._tail.next = null;
            }

        } else {
            // Delete in the middle
            let willBeDeletedNode = this._find(index);
            prevNode = willBeDeletedNode.prev;
            nextNode = willBeDeletedNode.next;

            willBeDeletedNode.next.prev = prevNode;
            willBeDeletedNode.prev.next = nextNode;
        }

        this.length--;
        return this;
    }

    /* 9 Reverse DLL */
    reverse() {
        /* change links of head and tail */
        let formerTail = this._tail;
        this._tail = this._head;
        this._head = formerTail;

        /* change links of nodes */
        let startNode = this._tail;

        for(let i=1; i<=this.length; i+=1){
            let buffer = startNode.next;
            startNode.next = startNode.prev;
            startNode.prev = buffer;
            startNode = buffer;
        }

        return this;
    }

    /* 10
    Return index of element if data is found
    and -1 if data not found
    */
    indexOf(data) {
        let result=-1;
        let currentNode = this._head;

        for (let i=0; i<this.length; i+=1){
            if (currentNode.data === data){
                result = i;
                break;
            }
            currentNode = currentNode.next;
        }

        return result;
    }

    /* Help to find DLL node */
    _find(index){
        let node = this._head;

        for(let i=0; i<index; i+=1) {
            node = node.next;
        }

        return node;
    }

    /* Help to find last DLL node */
    _findLast() {
        let currNode = this._head;
        while ( !(currNode.next === null) ) {
            currNode = currNode.next;
        }
        return currNode;
    }
}

module.exports = LinkedList;
