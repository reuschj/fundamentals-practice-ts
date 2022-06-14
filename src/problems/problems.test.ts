import getMaxValueForKnapSack from "./knapsack";

describe("problems", () => {
    describe("knapsack problem", () => {
        const testCases: [number, number[], number[], number][] = [
            [4, [4, 5, 1], [1, 2, 3], 3],
        ];
        it("can find the max value of a knapsack", () => {
            testCases.forEach(([capacity, weights, values, expectation]) => {
                expect(getMaxValueForKnapSack(capacity, weights, values)).toBe(expectation);
            });
        });
    });
});