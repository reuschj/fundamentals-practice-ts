import combination from "./combination";
import permutation from "./permutation";

describe("Combinatorics", () => {
    describe("combination", () => {
        it("can calculate a combination", () => {
            expect(combination(5, 3)).toBe(10);
            expect(combination(10, 5)).toBe(252);
            expect(combination(75, 2)).toBe(2775);
        });
    });

    describe("permutation", () => {
        it("can calculate a permutation", () => {
            expect(permutation(3, 2)).toBe(6);
            expect(permutation(5, 3)).toBe(60);
            expect(permutation(7, 4)).toBe(840);
            expect(permutation(10, 4)).toBe(5040);
        });
    });
});
