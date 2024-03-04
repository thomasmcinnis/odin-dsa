class Node {
    key;

    constructor(key) {
        this.key = key;
    }
}

export default class HashSet {
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
        console.log(hashCode);

        const index = hashCode % this.#size;

        return index;
    }

    #doubleSize() {
        const data = this.keys();

        this.#size *= 2;
        this.#buckets = new Array(this.#size);
        this.#nodeCount = 0;

        data.forEach((entry) => {
            this.set(entry);
        });
    }

    set(key) {
        if (this.#nodeCount > this.#size * this.#loadFactor) {
            this.#doubleSize();
        }

        const index = this.#hash(key);
        console.log(index);

        this.#buckets[index] = new Node(key);
        this.#nodeCount++;
    }

    get(key) {
        const index = this.#hash(key);
        const bucket = this.#buckets[index];

        if (!bucket) return null;

        return bucket.key;
    }

    has(key) {
        // return true or false
        const index = this.#hash(key);
        const bucket = this.#buckets[index];

        if (!bucket) return false;

        return true;
    }

    remove(key) {
        // if found, remove and return true, else false
        const index = this.#hash(key);
        this.#buckets[index] = null;
        this.#nodeCount--;
    }

    length() {
        return this.#nodeCount;
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
}

const set = new HashSet();

const testArr = [0, 1, 1, 2, 3, 5, 8, 13];

testArr.forEach((item) => {
    set.set(item.toString());
});

console.log(set);
