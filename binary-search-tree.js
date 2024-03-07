import mergeSort from './merge-sort.js';
import Queue from './queue.js';
import Stack from './stack.js';

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

    const mid = Math.floor((start + end) / 2);

    const root = new Node(array[mid]);

    root.left = buildTree(array, start, mid - 1);
    root.right = buildTree(array, mid + 1, end);

    return root;
}

function findNode(root, value) {
    if (!root) {
        return false;
    }

    if (root.value === value) {
        return root;
    }

    if (value < root.value) {
        return findNode(root.left, value);
    }
    return findNode(root.right, value);
}

function insertNode(root, value) {
    if (!root) {
        root = new Node(value);
        return;
    }

    if (root.value === value) {
        return;
    }

    if (value < root.value) {
        if (!root.left) {
            root.left = new Node(value);
            return;
        }
        return insertNode(root.left, value);
    }

    if (!root.right) {
        root.right = new Node(value);
        return;
    }
    return insertNode(root.right, value);
}

function deleteNode(root, value) {
    // There are three cases to consider
    //  1.  The node is a leaf
    //      -   Remove the reference at parent.
    //  2.  The node has one child
    //      -   Set the child to be the new left or right pointer of parent.
    //  3.  The node has two children
    //      -   Swap node to be deleted with smallest value on the larger side
    //      -   Eg. move to the right, then all the way down the left until
    //          reaching a leaf, copy that value to the deleted node position,
    //          and the deleted node to the leaf. Run delete again because it
    //          will now be a leaf and can delete normally.
    if (!root) {
        return root;
    }

    // Check if val is smaller or larger and recurse on that side
    if (value < root.value) {
        root.left = deleteNode(root.left, value);
        return root;
    }
    if (root.value < value) {
        root.right = deleteNode(root.right, value);
        return root;
    }

    // Reaching here must mean root.value is equal to value and this is the
    // node to delete

    // If only one child exists, return that as the new root of this branch
    if (!root.left) {
        return root.right;
    }
    if (!root.right) {
        return root.left;
    }

    // If both children exist we have to make a successor swap
    let parent = root;

    // Move down the large side
    let successor = root.right;

    // Go as far as possible down the smaller branch
    while (successor.left) {
        parent = successor;
        successor = successor.left;
    }

    if (parent !== root) {
        // If we have moved down the tree to a leftmost node
        // then the node above should have its left branch replaced with
        // the right of the successor
        parent.left = successor.right;
    } else {
        // Otherwise we are still at root because the path doesn't continue
        // left. So make the next right branch the parents (roots) right child
        parent.right = successor.right;
    }

    // In both cases, the found successor needs to overwrite the found value
    // to delete it.
    root.value = successor.value;
    return root;
}

function levelOrder(root, arr = []) {
    // This doesn't have to be recursive
    const queue = new Queue();
    queue.enqueue(root);

    while (queue.length > 0) {
        const curr = queue.deque();

        if (curr.left !== null) {
            queue.enqueue(curr.left);
        }
        if (curr.right !== null) {
            queue.enqueue(curr.right);
        }

        arr.push(curr.value);
    }
    // if (callback) {
    //     traverseByLevel(queue, callback);
    // } else {
    //     const arr = [];
    //     function add(value) {
    //         arr.push(value);
    //     }
    //     traverseByLevel(queue, add);
    //     return arr;
    // }
    return arr;
}

// Pre, post, in-order depth first searching
function inOrder(curr, pathArr = []) {
    if (!curr) {
        return pathArr;
    }

    inOrder(curr.left, pathArr);
    pathArr.push(curr.value);
    inOrder(curr.right, pathArr);

    return pathArr;
}

function preOrder(curr, pathArr = []) {
    if (!curr) {
        return pathArr;
    }

    pathArr.push(curr.value);
    preOrder(curr.left, pathArr);
    preOrder(curr.right, pathArr);

    return pathArr;
}

function postOrder(curr, pathArr = []) {
    if (!curr) {
        return pathArr;
    }

    postOrder(curr.left, pathArr);
    postOrder(curr.right, pathArr);
    pathArr.push(curr.value);

    return pathArr;
}

// Height function. Returns a nodes greatest leaf distance
function height(curr) {
    if (curr == null) {
        return 0;
    }

    return Math.max(height(curr.left), height(curr.right)) + 1;
}

function depth(curr, value) {
    // hit a leaf, did not find our value
    if (!curr) {
        return false;
    }

    if (curr.value === value) {
        return 0;
    }

    // continue left or right, if the returned val isnt false, we must have
    // found the value and returned a number
    // so increment it and return up the traversal
    if (value < curr.value) {
        const left = depth(curr.left, value);
        if (left !== false) {
            return left + 1;
        }
    }
    if (value > curr.value) {
        const right = depth(curr.right, value);
        if (right !== false) {
            return right + 1;
        }
    }

    // if either of the above received false we end up here, so return
    // false up the traversal
    return false;
}

function isBalanced(curr) {
    // We hit a leaf and nothing can be unbalanced at a leaf, so return true
    if (curr == null) {
        return true;
    }

    let heightLeft = height(curr.left);
    let heightRight = height(curr.right);
    // using abs to make sure it is positive integer
    const delta = Math.abs(heightLeft - heightRight);

    // Delta has to be less than one
    // We recurse down left and right and if they all return true we are good
    if (
        delta <= 1 &&
        isBalanced(curr.left) == true &&
        isBalanced(curr.right) == true
    ) {
        return true;
    }

    // At this point either the curr delta isn't less than one
    // or one of the child nodes failed, so return false
    return false;
}

function rebalance(tree) {
    // get an array of the tree with a traversal from above
    // overwrite the tree with a new version using buildtree function

    const treeArr = preOrder(tree.root);
    tree.root = null;
    tree.root = buildTree(treeArr, 0, treeArr.length - 1);
}

// Utility to print the nodes nicely
function prettyPrint(root, prefix = '', isLeft = true) {
    if (root === null) {
        return;
    }
    if (root.right !== null) {
        prettyPrint(root.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${root.value}`);
    if (root.left !== null) {
        prettyPrint(root.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
}

// Utility to de-dupe and order an aray before using it for a tree
function cleanArray(array) {
    const deDuped = Array.from(new Set(array));
    return mergeSort(deDuped);
}

// Make a tree
const arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
// const arr = [1, 2, 3, 4, 5, 6, 7];
const cleanedArr = cleanArray(arr);
const newTree = new Tree(cleanedArr);
insertNode(newTree.root, 51);
console.log(prettyPrint(newTree.root));
// console.log(levelOrder(newTree.root));
// console.log(height(newTree.root));
// console.log(depth(newTree.root, 18));
// console.log(isBalanced(newTree.root));
rebalance(newTree);
console.log(prettyPrint(newTree.root));
console.log(isBalanced(newTree.root));
