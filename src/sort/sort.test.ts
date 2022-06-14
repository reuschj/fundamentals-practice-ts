import { InPlaceSortingFunction } from "./common";
import mergeSort from "./mergeSort";
import quickSort from "./quickSort";

const basicTestArrays = [
    [10, 7, 8, 9, 1, 5],
    [10, 80, 30, 90, 40, 50, 70],
    [100, 2, 1000, 90, 80, 70, 60, 4, 10, 20]
];

const testSortingFunction = (
    sortingFunction: InPlaceSortingFunction<number>,
    inputs: number[][] = basicTestArrays,
) => {
    inputs.forEach((array) => {
        const testArray = [...array];
        const expectation = [...array];
        sortingFunction(testArray);
        expectation.sort((a, b) => a - b);
        expect(testArray).toEqual(expectation);
    });
};

describe("Sorting", () => {
    describe("Merge Sort", () => {
        it("sorts arrays correctly", () => {
            testSortingFunction(mergeSort);
        });
    });
    describe("Quick Sort", () => {
        it("sorts arrays correctly", () => {
            testSortingFunction(quickSort);
        });
    });
});
