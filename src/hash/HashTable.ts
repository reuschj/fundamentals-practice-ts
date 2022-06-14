export type HashFunction = (key: string, size: number) => number;

const defaultHashFunction: HashFunction = (key, size) => {
    let sum = 0;
    for (let i = 0; i < key.length; i += 1) {
        sum += key.charCodeAt(i);
    }
    return sum % size;
};

class HashTableNode<T> {
    data: [string, T];
    next?: HashTableNode<T>;

    constructor(key: string, value: T) {
        this.data = [key, value];
    }

    get key(): string {
        return this.data[0];
    }

    get value(): T {
        return this.data[1];
    }

    set value(value: T) {
        this.data[1] = value;
    }
}

class HashTable<T> {
    #size: number;
    #table: (HashTableNode<T> | undefined)[];
    #hashFunction: HashFunction;
    #count: number = 0;

    constructor(
        options?: {
            size?: number;
            customHashFunction?: HashFunction;
        }
    ) {
        const {
            size = 1000,
            customHashFunction,
        } = options ?? {};
        this.#size = size;
        this.#table = new Array(size);
        this.#hashFunction = customHashFunction ?? defaultHashFunction;
    }

    get count(): number {
        return this.#count;
    }

    set(key: string, value: T): T {
        const i = this.indexFor(key);
        const makeNode = () => {
            this.#count += 1;
            return new HashTableNode(key, value);
        }
        let existing = this.headFor(i);
        if (!existing) {
            this.#table[i] = makeNode();
        } else {
            while (typeof existing.next !== "undefined" && existing.key !== key) {
                existing = existing.next;
            }
            if (existing.key === key) {
                existing.value = value;
            } else {
                existing.next = makeNode();
            }
        }
        return value;
    }

    get(key: string): T | undefined {
        const i = this.indexFor(key);
        let result = this.headFor(i);
        if (!result) return undefined;
        while (result && result.key !== key) {
            result = result.next;
        }
        return result?.value;
    }

    has(key: string): boolean {
        const i = this.indexFor(key);
        let result = this.headFor(i);
        if (!result) return false;
        while (result && result.key !== key) {
            result = result.next;
        }
        return typeof result !== "undefined";
    }

    delete(key: string): T | undefined {
        const i = this.indexFor(key);
        let existing = this.headFor(i);
        if (!existing) return undefined;
        let last: HashTableNode<T> | undefined = undefined;
        while (existing && existing.key !== key) {
            last = existing;
            existing = existing.next;
        }
        if (!existing) return undefined;
        if (last) {
            last.next = existing.next;
        } else if (typeof existing.next !== "undefined") {
            this.#table[i] = existing.next;
        } else {
            delete this.#table[i];
        }
        this.#count -= 1;
        return existing.value;
    }

    private indexFor(key: string): number {
        return this.#hashFunction(key, this.#size);
    }

    private headFor(index: number): HashTableNode<T> | undefined {
        return this.#table[index];
    }
}

export default HashTable;
