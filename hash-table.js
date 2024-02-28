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
      throw new Error("Out of range");
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
      throw new Error("Out of range");
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
      throw new Error("Out of range");
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
      throw new Error("Out of range");
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
  #capacity = 16;

  #buckets = new Array(this.#capacity);

  #hash(key) {
    let hashCode = 0;

    const prime = 31;
    for (let i = 0; i < array.length; i++) {
      hashCode = prime * hashCode + key.charCode;
    }

    return hashCode;
  }

  // A utility to overcome the fact array in javascript is really an array list
  #checkIndex(index) {
    if (index < 0 || index >= this.#buckets.length) {
      throw new Error("Trying to access out of range bucket");
    }
    return index;
  }

  set(key, val) {
    // will run the key through the hash, then go to that loc in the array
    const index = this.#hash(key);
    const bucket = this.#buckets[index];

    // if there is list at the bucket
    if (bucket !== null) {
      // check if the key is there, if it is update value
      const nodeIndex = bucket.indexOfKey(key);
      if (nodeIndex) {
        bucket.updateAt(nodeIndex, val);
        return;
      }
      // otherwise just prepend a new node
      bucket.prepend(key, val);
      return;
    }

    bucket = new LinkedList();
    bucket.prepend(key, val);
  }

  get(key) {
    // return val or null
  }

  has(key) {
    // return true or false
  }

  remove(key) {
    // if found, remove and return true, else false
  }

  length() {
    // return the number of stored keys
  }

  clear() {
    // remove all the stored keys in the hash map
  }

  keys() {
    // return an array containing all keys
  }

  values() {
    // return array of all the values
  }

  entries() {
    // returns each key/val pair in an array
    // [[key, val], [key, val]]
  }
}
