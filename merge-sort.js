function merge(left, right) {
    let result = [];

    while (left.length && right.length) {
        if (left[0] <= right[0]) {
            result.push(left.shift());
        } else {
            result.push(right.shift());
        }
    }

    while (left.length) {
        result.push(left.shift());
    }

    while (right.length) {
        result.push(right.shift());
    }

    return result;
}

export default function mergeSort(list) {
    if (list.length < 2) return list;

    const mid = Math.floor(list.length / 2);

    let left = mergeSort(list.slice(0, mid));
    let right = mergeSort(list.slice(mid));

    return merge(left, right);
}

// const testArr = [3, 2, 1, 13, 8, 5, 0, 1];
// console.log(mergeSort(testArr));
