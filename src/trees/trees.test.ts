import AVLTree, { AVLNode } from "./AVLTree";
import { BalanceType, Side, Tree, TreeTraversalOrder, TreeTraversalStrategy } from "./common";
import TreeNode from "./TreeNode";

const numericTestData = [
    [10, 7, 8, 9, 1, 5],
    [10, 80, 30, 90, 40, 50, 70],
    [100, 2, 1000, 90, 80, 70, 60, 4, 10, 20]
];

function buildSortedTestTree<T>(dataList: T[]): TreeNode<T> {
    const [firstData, ...rest] = dataList;
    const node = new TreeNode(firstData);
    rest.forEach((data) => {
        node.insert(data);
    });
    return node;
}

const buildSimpleTestTree = (): TreeNode<number> => {
    const simpleTestData = [1, 2, 3, 4, 5];
    const tree = new TreeNode(simpleTestData[0]);
    tree.insert(simpleTestData[1], { side: Side.Left });
    tree.insert(simpleTestData[2], { side: Side.Right });
    tree.left?.insert(simpleTestData[3], { side: Side.Left });
    tree.left?.insert(simpleTestData[4], { side: Side.Right });
    return tree;
};

describe("Trees", () => {
    describe("AVL Tree", () => {
        let tree: AVLTree<number>;

        const buildAVLTestTree = () => {
            tree = new AVLTree();
            [10, 20, 30, 40, 50, 25].forEach((data) => {
                tree.insert(data);
            });
        };

        beforeEach(() => {
            buildAVLTestTree();
        });

        it("can be constructed", () => {
            expect(tree).toBeInstanceOf(AVLTree);
            expect(tree.root).toBeInstanceOf(AVLNode);
        });

        it("can calculate height", () => {
            expect(tree.height).toBe(3);
        });

        it("is balanced", () => {
            expect(tree.balance).toBe(0);
            expect(tree.isBalanced).toBeTruthy();
            expect(tree.balanceType).toBe(BalanceType.Even);
        });
    });

    describe("Binary Tree", () => {
        let tree: TreeNode<number>;

        beforeEach(() => {
            tree = buildSimpleTestTree();
        });

        it("can be constructed", () => {
            expect(tree).toBeInstanceOf(TreeNode);
        });

        it("can add to the left", () => {
            const data = 4;
            tree.insert(data, { side: Side.Left });
            expect(tree.left?.data).toBe(data);
        });

        it("can add to the right", () => {
            const data = 12;
            tree.insert(data, { side: Side.Right });
            expect(tree.right?.data).toBe(data);
        });

        it("can calculate height", () => {
            expect(tree.height).toBe(3);
        });

        describe("tree traversal", () => {
            describe("depth first strategy (DFS) traversal", () => {
                it("can be traversed pre-order", () => {
                    const results = tree.map((data) => data, {
                        order: TreeTraversalOrder.PreOrder
                    });
                    expect(results).toEqual([1, 2, 4, 5, 3]);
                });

                it("can be traversed in-order", () => {
                    const results = tree.map((data) => data, {
                        order: TreeTraversalOrder.InOrder
                    });
                    expect(results).toEqual([4, 2, 5, 1, 3]);
                });

                it("can be traversed post-order", () => {
                    const results = tree.map((data) => data, {
                        order: TreeTraversalOrder.PostOrder
                    });
                    expect(results).toEqual([4, 5, 2, 3, 1]);
                });
            });
            describe("breadth first strategy (BFS) traversal", () => {
                it("can be traversed by level", () => {
                    const results = tree.map((data) => data, {
                        strategy: TreeTraversalStrategy.BreadthFirst,
                    });
                    expect(results).toEqual([1, 2, 3, 4, 5]);
                });
            });
        });
    });
    describe("Binary Sort Tree", () => {
        function init<T>(testData: T[]): TreeNode<T> {
            const tree = buildSortedTestTree(testData);
            expect(tree).toBeInstanceOf(TreeNode);
            return tree;
        }
        it("forms a correctly sorted tree", () => {
            numericTestData.forEach((testData) => {
                init(testData);
            });
        });

        it("can be searched", () => {
            numericTestData.forEach((testData) => {
                const tree = init(testData);
                testData.forEach((query) => {
                    const result = tree.find(query);
                    expect(result?.data).toBe(query);
                });
            });
        });
    });
});
