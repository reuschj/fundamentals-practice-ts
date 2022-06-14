import HashTable from "./HashTable";

describe("hashing", () => {
    describe("HashTable", () => {
        let hashTable: HashTable<number>;

        const testKeyValuePairs: [string, number][] = [
            ["test key", 56],
            ["another key", 12],
            ["also a key", 23],
            ["short", 64],
            ["long", 34],
            ["t", 454],
            ["foo", 62324],
            ["duplicateKey", 26],
            ["bar", 232],
            ["baz", 24],
            ["boom", 2],
            ["duplicateKey", 48],
            ["bang", 100],
            ["bam", 200],
        ];

        const setAll = () => {
            const seen: Set<string> = new Set();
            let expectedCount = 0;
            testKeyValuePairs.forEach(([key, value]) => {
                hashTable.set(key, value);
                if (!seen.has(key)) expectedCount += 1;
                seen.add(key);
                expect(hashTable.count).toBe(expectedCount);
                expect(hashTable.has(key)).toBeTruthy();
                expect(hashTable.get(key)).toEqual(value);
            });
        };

        const removeAll = () => {
            let expectedCount = hashTable.count;
            const removedKeys: Set<string> = new Set();
            const expectedValues: Map<string, Set<number>> = new Map();
            testKeyValuePairs.forEach(([key, value]) => {
                const set = expectedValues.get(key) ?? new Set();
                set.add(value);
                expectedValues.set(key, set);
            });
            testKeyValuePairs.forEach(([key, value]) => {
                const expectRemovalToSucceed = !removedKeys.has(key);
                const removed = hashTable.delete(key);
                if (removed) removedKeys.add(key);
                if (expectRemovalToSucceed) {
                    expect(removed).toBeDefined();
                    const expectedValueSet = expectedValues.get(key) ?? new Set();
                    expect(expectedValueSet.has(value)).toBeTruthy();
                    expectedCount -= 1;
                } else {
                    expect(removed).toBeUndefined();
                }
                expect(hashTable.count).toBe(expectedCount);
                expect(hashTable.has(key)).toBeFalsy();
                expect(hashTable.get(key)).toBeUndefined();
            });
        };

        describe("with standard table size", () => {
            beforeEach(() => {
                hashTable = new HashTable();
            });

            it("can be constructed", () => {
                expect(hashTable).toBeInstanceOf(HashTable);
            });

            it("can set/get a value", () => {
                setAll();
            });

            it("can remove a key", () => {
                setAll();
                removeAll();
            });
        });

        describe("with small table size", () => {
            beforeEach(() => {
                hashTable = new HashTable({ size: 5 });
            });

            it("can be constructed", () => {
                expect(hashTable).toBeInstanceOf(HashTable);
            });

            it("can set/get a value", () => {
                setAll();
            });

            it("can remove a key", () => {
                setAll();
                removeAll();
            });
        });
    });
});