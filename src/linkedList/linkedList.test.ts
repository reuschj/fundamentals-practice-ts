import ListNode from "./ListNode";

describe("linked list", () => {
    describe("ListNode", () => {
        const testData = ["A", "B", "C", "D", "E"];
        let testHead: ListNode<string>;

        beforeEach(() => {
            const [first, ...rest] = testData;
            testHead = new ListNode(first);
            rest.forEach((it) => {
                testHead.append(it);
            });
        });

        it("constructs correctly", () => {
            expect(testHead).toBeInstanceOf(ListNode);
        });

        it("can append items correctly", () => {
            expect(testHead.toArray()).toEqual(testData);
        });

        it("can be joined to string", () => {
            const separator = " > ";
            expect(testHead.join(separator)).toEqual(testData.join(separator));
        });

        it("can be reversed", () => {
            const separator = " > ";
            expect(testHead.reversed.join(separator)).toEqual(testData.reverse().join(separator));
        });
    });
});