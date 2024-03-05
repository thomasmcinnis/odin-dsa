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
        this.#head = this.#tail = undefined;
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
            return undefined;
        }

        this.length--;

        const head = this.#head;
        this.#head = this.#head.next;

        return head.value;
    }

    peek() {
        return this.#head?.value;
    }
}
