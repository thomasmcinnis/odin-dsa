class Node {
    value;
    next;

    constructor(value) {
        this.value = value;
    }
}

export default class Queue {
    length;
    #head;
    #tail;

    constructor() {
        this.#head = this.#tail = null;
        this.length = 0;
    }

    enqueue(value) {
        const node = new Node(value);
        this.length++;
        if (!this.#tail) {
            this.#tail = this.#head = node;
            return;
        }
        this.#tail.next = node;
        this.#tail = node;
    }

    deque() {
        if (!this.#head) {
            return null;
        }

        this.length--;

        const head = this.#head;
        if (this.length === 0) {
            this.#tail = this.#head = null;
        } else {
            this.#head = this.#head.next;
        }

        return head.value;
    }

    peek() {
        return this.#head?.value;
    }
}
