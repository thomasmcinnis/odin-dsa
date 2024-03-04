class Node {
    next;
    value;

    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    head;

    append(value) {
        // add a new node containing value to the end
        let curr = this.getTail();
        curr.next = new Node(value);
    }

    prepend(value) {
        // add a new node cont. value at the start
        let node = new Node(value);

        if (this.head !== null) {
            node.next = this.head;
        }
        this.head = node;
    }

    size() {
        if (this.head == null) return 0;

        let curr = this.head;
        let size = 1;

        while (curr.next) {
            curr = curr.next;
            size++;
        }
        return size;
    }

    getTail() {
        // returns the last node in the list
        let curr = this.head;

        while (curr.next) {
            curr = curr.next;
        }
        return curr;
    }

    getAt(index) {
        // retun the node at the index
        if (index > this.size() - 1) {
            throw new Error('Out of range');
        }

        let curr = this.head;
        for (let i = 0; i !== index; i++) {
            curr = curr.next;
        }
        return curr;
    }

    pop() {
        // remove the last node
        let curr = this.head;

        if (!curr.next) {
            this.head = null;
            return;
        }

        while (curr.next.next) {
            curr = curr.next;
        }

        curr.next = null;
    }

    contains(value) {
        // Checks for value in the list
        let curr = this.head;
        if (curr.value == value) return true;

        while (curr.next) {
            if (curr.next.value == value) return true;
            curr = curr.next;
        }
        return false;
    }

    indexOf(value) {
        // return the index of or null
        let index = 0;
        let curr = this.head;

        if (curr.value == value) return index;

        while (curr.next) {
            index++;
            if (curr.next.value == value) return index;
            curr = curr.next;
        }
        return null;
    }

    toString() {
        // return the whole list as a string in the format:
        // ( value ) -> ( value ) -> ( value ) -> null
        let curr = this.head;
        if (curr == null) return 'null';

        let nodes = [];

        while (curr.next) {
            nodes.push(`( ${curr.value} )`);
            curr = curr.next;
        }

        nodes.push(`( ${curr.value} )`);
        nodes.push('null');

        const string = nodes.join(' -> ');
        return string;
    }

    insertAt(value, index) {
        // insert a new node
        if (index > this.size() - 1) {
            throw new Error('Out of range');
        }

        let curr = this.head;
        let node = new Node(value);

        if (index == 0) {
            node.next = curr;
            this.head = node;
            return;
        }

        for (let i = 0; i < index - 1; i++) {
            curr = curr.next;
        }

        node.next = curr.next;
        curr.next = node;
    }

    removeAt(index) {
        // what it says on the tin
        if (index > this.size() - 1) {
            throw new Error('Out of range');
        }

        let curr = this.head;

        if (index == 0) {
            this.head = curr.next;
            return;
        }

        for (let i = 0; i < index - 1; i++) {
            curr = curr.next;
        }

        curr.next = curr.next.next;
    }
}

const list = new LinkedList();

list.prepend('A');
list.prepend('B');
list.append('C');
list.append('D');
console.log(list.toArray());

list.insertAt('E', list.indexOf('B'));
console.log(list.toArray());

list.removeAt(list.indexOf('B'));
console.log(list.toArray());
