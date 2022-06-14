import { min } from "./common";

export function combine<T>(
    left: T[],
    right: T[],
    destination: T[],
): void {
    let li = 0;
    let ri = 0;
    let di = 0;

    while (li < left.length && ri < right.length) {
        const { low, isLeft } = min(left[li], right[ri]);
        destination[di] = low;
        if (isLeft) {
            li += 1;
        } else {
            ri += 1;
        }
        di += 1;
    }

    [...left.slice(li), ...right.slice(ri)].forEach((value) => {
        destination[di] = value;
        di += 1;
    });
}

function mergeSort<T>(
    array: T[],
): void {
    if (array.length <= 1) return;
    const mid = Math.floor(array.length / 2);

    const left = array.slice(0, mid);
    const right = array.slice(mid);

    mergeSort(left);
    mergeSort(right);

    combine(left, right, array);
}

export default mergeSort;
