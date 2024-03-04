import mergeSort from './merge-sort.js';

class Node {
    value;
    left;
    right;

    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class Tree {
    root;

    constructor(array) {
        this.root = buildTree(array, 0, array.length - 1);
    }
}

function buildTree(array, start, end) {
    if (start > end) return null;

    const mid = Math.round((start + end) / 2);

    const root = new Node(array[mid]);

    root.left = buildTree(array, start, mid - 1);
    root.right = buildTree(array, mid + 1, end);

    return root;
}

function prettyPrint(node, prefix = '', isLeft = true) {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}

function cleanArray(array) {
    const set = new Set(array);
    const deDuped = Array.from(set);
    console.log(deDuped);

    return mergeSort(deDuped);
}

const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const cleanedArr = cleanArray(arr);

console.log(cleanedArr);

const newTree = new Tree(cleanedArr);

console.log(prettyPrint(newTree.root));
