import { inPlaceSwap } from "./common";

export function partition<T>(
    array: T[],
    low?: number,
    high?: number,
): number {
    const lowIndex = low ?? 0;
    const highIndex = high ?? array.length - 1;

    const pivot = array[highIndex];

    let nextPivotIndex = lowIndex - 1;

    for (let index = lowIndex; index < highIndex; index += 1) {
        const current = array[index];
        if (current <= pivot) {
            nextPivotIndex += 1;
            inPlaceSwap(array, index, nextPivotIndex);
        }
    }
    nextPivotIndex += 1;
    inPlaceSwap(array, highIndex, nextPivotIndex);

    return nextPivotIndex;
}

function quickSort<T>(
    array: T[],
    low?: number,
    high?: number,
): void {
    const lowIndex = low ?? 0;
    const highIndex = high ?? array.length - 1;

    if (lowIndex >= highIndex) return;

    const nextPivotIndex = partition(array, lowIndex, highIndex);
    quickSort(array, lowIndex, nextPivotIndex - 1);
    quickSort(array, nextPivotIndex + 1, highIndex);
}

export default quickSort;