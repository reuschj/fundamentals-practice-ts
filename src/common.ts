export const factorial = (n: number): number => {
    if (n < 0) throw new Error(`Cannot take factorial of negative number. Received ${n}`);
    var current = Math.floor(n);
    var product = 1;
    while (current > 1) {
        product = product * current;
        current -= 1;
    }
    return product;
}
