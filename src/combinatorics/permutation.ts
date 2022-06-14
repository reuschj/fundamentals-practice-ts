import { factorial } from "../common";

const permutation = (n: number, m: number): number =>
    Math.round(factorial(n) / factorial(n - m));

export default permutation;
