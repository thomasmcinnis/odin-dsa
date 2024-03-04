class Node {
    key;
    value;
    next;

    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.next = null;
    }
}

class LinkedList {
    head;

    prepend(key, value) {
        // add a new node cont. value at the start
        let node = new Node(key, value);

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

    updateAt(index, value) {
        // update the value at a specific index
        if (index > this.size() - 1) {
            throw new Error('Out of range');
        }

        let curr = this.head;
        for (let i = 0; i !== index; i++) {
            curr = curr.next;
        }
        curr.value = value;
        return;
    }

    indexOfKey(key) {
        // return the index of or null
        let index = 0;
        let curr = this.head;

        if (curr.key == key) return index;

        while (curr.next) {
            index++;
            if (curr.next.key == key) return index;
            curr = curr.next;
        }
        return null;
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

class HashMap {
    #loadFactor = 0.75;
    #size = 16;
    #nodeCount = 0;

    #buckets = new Array(this.#size);

    #hash(key) {
        let hashCode = 0;

        const prime = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = prime * hashCode + key.charCodeAt(i);
        }

        const index = hashCode % this.#size;

        return index;
    }

    #doubleSize() {
        const data = this.entries();

        this.#size *= 2;
        this.#buckets = new Array(this.#size);
        this.#nodeCount = 0;

        data.forEach((entry) => {
            this.set(entry[0], entry[1]);
        });
    }

    set(key, val) {
        if (this.#nodeCount > this.#size * this.#loadFactor) {
            this.#doubleSize();
        }

        const index = this.#hash(key);

        if (this.#buckets[index] == null) {
            this.#buckets[index] = new LinkedList();
            this.#buckets[index].prepend(key, val);
            this.#nodeCount++;
            return;
        }
        const bucket = this.#buckets[index];

        const nodeIndex = bucket.indexOfKey(key);
        if (nodeIndex !== null) {
            bucket.updateAt(nodeIndex, val);
        } else {
            bucket.prepend(key, val);
            this.#nodeCount++;
        }
    }

    get(key) {
        const index = this.#hash(key);
        const bucket = this.#buckets[index];

        if (bucket == null) return null;

        const nodeIndex = bucket.indexOfKey(key);
        if (nodeIndex == null) return null;

        const node = bucket.getAt(nodeIndex);
        return node.value;
    }

    has(key) {
        // return true or false
        const index = this.#hash(key);
        const bucket = this.#buckets[index];

        if (bucket == null) return false;

        const nodeIndex = bucket.indexOfKey(key);
        if (nodeIndex == null) return false;

        return true;
    }

    remove(key) {
        // if found, remove and return true, else false
        const index = this.#hash(key);
        const bucket = this.#buckets[index];

        if (bucket == null) return false;

        const nodeIndex = bucket.indexOfKey(key);
        if (nodeIndex == null) return false;

        bucket.removeAt(nodeIndex);
        this.#nodeCount--;
        return true;
    }

    length() {
        // return the number of stored keys
        let length = 0;

        this.#buckets.forEach((bucket) => {
            if (bucket) {
                length += bucket.size();
            }
        });

        return length;
    }

    clear() {
        // remove all the stored keys in the hash map
        this.#size = 16;
        this.#buckets = new Array(this.#size);
        this.#nodeCount = 0;
    }

    keys() {
        // return an array containing all keys
        let arr = [];

        this.#buckets.forEach((bucket) => {
            if (bucket && bucket.head) {
                let curr = bucket.head;
                while (curr.next) {
                    arr.push(curr.key);
                }
                arr.push(curr.key);
            }
        });
        return arr;
    }

    values() {
        // return array of all the values
        let arr = [];

        this.#buckets.forEach((bucket) => {
            if (bucket && bucket.head) {
                let curr = bucket.head;
                while (curr.next) {
                    arr.push(curr.value);
                }
                arr.push(curr.value);
            }
        });
        return arr;
    }

    entries() {
        // returns each key/val pair in an array
        let arr = [];

        this.#buckets.forEach((bucket) => {
            if (bucket && bucket.head) {
                let curr = bucket.head;
                while (curr.next) {
                    arr.push([curr.key, curr.value]);
                }
                arr.push([curr.key, curr.value]);
            }
        });

        return arr;
    }
}

const hashMap = new HashMap();

// Set key-value pairs
hashMap.set('one', 'First Value');
hashMap.set('two', 'Second Value');
hashMap.set('three', 'Third Value');

// Print the entries
console.log(hashMap.entries());

// Set a key-value pair
hashMap.set('one', 'First Value');

// Print the entries before clearing
console.log('Before clear: ');
console.log(hashMap.entries());

// Clear the HashMap
hashMap.clear();

// Print the entries after clearing to check results
console.log('After clear: ');
console.log(hashMap.entries());

// Assuming the initial size of HashMap is 16
for (let i = 0; i <= 20; i++) {
    hashMap.set(`Key${i}`, `Value${i}`);
}

// Print the entries
console.log(hashMap.entries());
