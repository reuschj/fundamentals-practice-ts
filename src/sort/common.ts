export type InPlaceSortingFunction<T> = (array: T[]) => void;

export function inPlaceSwap<T>(
    array: T[],
    left: number,
    right: number,
): boolean {
    if (left < 0 || left >= array.length) return false;
    if (right < 0 || right >= array.length) return false;
    const temp = array[left];
    array[left] = array[right];
    array[right] = temp;
    return true;
}

export function min<T>(
    left: T,
    right: T,
): { low: T, isLeft?: boolean } {
    if (left <= right) return { low: left, isLeft: true };
    return { low: right };
}
