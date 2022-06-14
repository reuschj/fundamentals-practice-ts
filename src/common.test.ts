import { factorial } from "./common";

describe("common", () => {
    describe("factorial", () => {
        it("calculates factorial of small numbers", () => {
            expect(factorial(1)).toBe(1);
            expect(factorial(2)).toBe(2);
            expect(factorial(3)).toBe(6);
            expect(factorial(4)).toBe(24);
            expect(factorial(5)).toBe(120);
        });

        it("calculates factorial of large numbers", () => {
            expect(factorial(80)).toBe(7.15694570462638e+118);
            expect(factorial(100)).toBe(9.332621544394418e+157);
            expect(factorial(150)).toBe(5.7133839564458575e+262);
        });

        it("returns infinity when number is too large", () => {
            expect(factorial(200)).toBe(Number.POSITIVE_INFINITY);
        });


        it("floors input if float given", () => {
            expect(factorial(5.6)).toBe(120);
        });

        it("throws if input is negative", () => {
            try {
                const _ = factorial(-2);
                fail("Expected an error to be thrown, but no error was thrown.")
            } catch (e) {
                expect(e).toBeInstanceOf(Error);
            }
        });
    });
});