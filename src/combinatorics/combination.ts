import permutation from "./permutation";
import { factorial } from "../common";

const combination = (n: number, m: number): number =>
    Math.round(permutation(n, m) / factorial(m));

export default combination;
