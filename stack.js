class Node {
    value;
    prev;

    constructor(value) {
        this.value = value;
    }
}

export default class Stack {
    length;
    #head;

    constructor() {
        this.#head = undefined;
        this.length = 0;
    }

    push(value) {
        const node = new Node(value);

        this.length++;
        if (!this.#head) {
            this.#head = node;
            return;
        }

        node.prev = this.#head;
        this.#head = node;
    }

    pop() {
        if (!this.#head) return null;

        this.length--;
        let head = this.#head;

        if (this.length === 0) {
            this.#head = undefined;
            return head.value;
        }

        this.#head = head.prev;
        return head.value;
    }

    peek() {
        return this.#head?.value;
    }
}
