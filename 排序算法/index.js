// ******************* 排序 *********************************

// 插入排序 

// 思路：双数组排序 像快速打牌一样

function insertionSort(arr) {
    var len = arr.length;
    var preIndex, current;
    for (var i = 1; i < len; i++) {
        preIndex = i - 1;
        current = arr[i];
        while (preIndex >= 0 && arr[preIndex] > current) {
            arr[preIndex + 1] = arr[preIndex];
            preIndex--;
        }
        arr[preIndex + 1] = current;
    }
    return arr;
}

console.log(insertionSort([99, 16, 2, 5, 1, 33, 4, 62, 7]))