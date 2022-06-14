export class KnapSackItem<T> {
    readonly weight: number;
    readonly value: T;

    constructor(
        weight: number,
        value: T,
    ) {
        this.weight = weight;
        this.value = value;
    }
}

// Backing logic
function _getMaxValueForKnapSack<T>(
    capacity: number,
    items: KnapSackItem<T>[],
): number {
    const cachedValues = Array(capacity + 1).fill(0);

    for (const currentItem of items) {
        // We will consider all potential final weights starting at capacity and going down to zero
        for (let capacityConsidered = capacity; capacityConsidered >= 0; capacityConsidered -= 1) {
            if (currentItem.weight <= capacityConsidered) {
                const capacityWithoutItem = capacityConsidered - currentItem.weight;
                cachedValues[capacityConsidered] = Math.max(
                    cachedValues[capacityConsidered], // <- Currently cached max, or
                    cachedValues[capacityWithoutItem] + currentItem.value
                );
            }
        }
    }
    return cachedValues[capacity];
}

/**
 * Function to return max value that can be put in knapsack of given capacity.
 *
 * @param capacity - Total weight capacity of knapsack
 * @param items - Items for the knapsack in array
 * @returns The max value for the backpack
 */
function getMaxValueForKnapSack<T>(
    capacity: number,
    items: KnapSackItem<T>[],
): number;

/**
 * Function to return max value that can be put in knapsack of given capacity.
 *
 * @param capacity - Total weight capacity of knapsack
 * @param weights - Weights of items in array
 * @param values - Values of items in array
 * @returns The max value for the backpack
 */
function getMaxValueForKnapSack<T>(
    capacity: number,
    weights: number[],
    values: T[],
): number;

// Implementation only
function getMaxValueForKnapSack<T>(
    capacity: number,
    itemsOrWeights: KnapSackItem<T>[] | number[],
    values?: T[],
): number {
    if (values) {
        const weights = itemsOrWeights as number[];
        if (weights.length !== values.length) return -1;
        const items = weights.map((weight, index) => new KnapSackItem(weight, values[index]));
        return _getMaxValueForKnapSack(capacity, items);
    } else {
        const items = itemsOrWeights as KnapSackItem<T>[];
        return _getMaxValueForKnapSack(capacity, items);
    }
}

export default getMaxValueForKnapSack;
