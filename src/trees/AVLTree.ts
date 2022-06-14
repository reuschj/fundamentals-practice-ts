import { Tree, Node, BalanceType } from "./common";

// export type TreeCallback<T, R> = (data: T, index: number, node: AVLNode<T>) => R;


export class AVLNode<T> implements Node<T> {
    #left?: AVLNode<T>;
    #right?: AVLNode<T>;
    data: T;
    #height: {
        value: number;
        needsUpdate: boolean;
    };

    static readonly #balanceThreshold = { left: -1, right: 1 };

    constructor(data: T) {
        this.data = data;
        this.#height = { value: 1, needsUpdate: false };
    }

    get left(): AVLNode<T> | undefined {
        return this.#left;
    }

    set left(node: AVLNode<T> | undefined) {
        this.#left = node;
        this.#height.needsUpdate = true;
    }

    get right(): AVLNode<T> | undefined {
        return this.#right;
    }

    set right(node: AVLNode<T> | undefined) {
        this.#right = node;
        this.#height.needsUpdate = true;
    }

    toString(): string {
        return `(${this.left?.toString() ?? "nil"} < ${this.data} > ${this.right?.toString() ?? "nil"})`;
    }

    get height(): number {
        const { value, needsUpdate } = this.#height;
        if (!needsUpdate) return value;
        const self = 1;
        const leftHeight = this.left?.height ?? 0;
        const rightHeight = this.right?.height ?? 0;
        const newHeight = self + Math.max(leftHeight, rightHeight);
        this.#height.value = newHeight;
        this.#height.needsUpdate = false;
        return newHeight;
    }

    get balance(): number {
        return (this.left?.height ?? 0) - (this.right?.height ?? 0);
    }

    get isBalanced(): boolean {
        const { balance } = this;
        if (balance < AVLNode.#balanceThreshold.left) return false;
        if (balance > AVLNode.#balanceThreshold.right) return false;
        return true;
    }

    get balanceType(): BalanceType {
        const { balance } = this;
        if (balance < AVLNode.#balanceThreshold.left) return BalanceType.Right;
        if (balance > AVLNode.#balanceThreshold.right) return BalanceType.Left;
        return BalanceType.Even;
    }

    find(
        data: T
    ): AVLNode<T> | undefined {
        if (data === this.data) return this;
        const dataIsLarger = data > this.data;
        const findLeft = () => this.left?.find(data);
        const findRight = () => this.right?.find(data);
        const firstResult = dataIsLarger ? findRight() : findLeft();
        if (firstResult) return firstResult;
        const fallbackResult = dataIsLarger ? findLeft() : findRight();
        if (fallbackResult) return fallbackResult;
    }

    static insert<T>(newData: T, node: AVLNode<T> | undefined): AVLNode<T> {
        return AVLNode.balancedInsert(newData, node);
    }

    private static unbalancedInsert<T>(newData: T, node: AVLNode<T> | undefined): AVLNode<T> {
        if (!node) return new AVLNode(newData);
        const { data } = node;
        if (newData < data) {
            node.left = AVLNode.balancedInsert(newData, node.left);
        } else if (newData > data) {
            node.right = AVLNode.balancedInsert(newData, node.right);
        }
        // Duplicate keys not allowed
        return node;
    }

    private static balancedInsert<T>(newData: T, node: AVLNode<T> | undefined): AVLNode<T> {
        const unbalanced = AVLNode.unbalancedInsert(newData, node);
        return AVLNode.reBalance(unbalanced);
    }

    private static reBalance<T>(node: AVLNode<T>): AVLNode<T> {
        const { data, balanceType } = node;
        switch (balanceType) {
            case BalanceType.Left: {
                const leftData = node.left?.data ?? 0;
                // LEFT LEFT case
                if (data < leftData) {
                    return AVLNode.rotateRight(node);
                }
                // LEFT RIGHT case
                if (data > leftData) {
                    if (node.left) node.left = AVLNode.rotateLeft(node.left);
                    return AVLNode.rotateRight(node);
                }
            }
            case BalanceType.Right: {
                const rightData = node.right?.data ?? 0;
                // RIGHT LEFT case
                if (data < rightData) {
                    if (node.right) node.right = AVLNode.rotateRight(node.right);
                    return AVLNode.rotateLeft(node);
                }
                // RIGHT RIGHT case
                if (data > rightData) {
                    return AVLNode.rotateLeft(node);
                }
            }
            default:
                return node;
        }
    }

    private static rotateLeft<T>(
        node: AVLNode<T>
    ): AVLNode<T> {
        if (!node.right) return node;
        const newTopNode = node.right;
        const temp02 = newTopNode.left;

        newTopNode.left = node;
        node.right = temp02;

        return newTopNode;
    }

    private static rotateRight<T>(
        node: AVLNode<T>
    ): AVLNode<T> {
        if (!node.left) return node;
        const newTopNode = node.left;
        const temp02 = newTopNode.right;

        newTopNode.right = node;
        node.left = temp02;

        return newTopNode;
    }
}

export interface AVLInsertOptions<T> {
    node?: AVLNode<T>;
}

class AVLTree<T> implements Tree<T, AVLInsertOptions<T>> {
    root?: AVLNode<T>;

    constructor(root?: AVLNode<T>) {
        if (root) this.root = root;
    }

    get height(): number {
        return this.root?.height ?? 0;
    }

    toString(): string {
        return this.root?.toString() ?? "Rootless AVL Tree";
    }

    get balance(): number {
        return this.root?.balance ?? 0;
    }

    get isBalanced(): boolean {
        return this.root?.isBalanced ?? true;
    }

    get balanceType(): BalanceType {
        return this.root?.balanceType ?? BalanceType.Even;
    }

    find(
        data: T
    ): AVLNode<T> | undefined {
        return this.root?.find(data);
    }

    insert(data: T): AVLNode<T> {
        const newRoot = AVLNode.insert(data, this.root);
        this.root = newRoot;
        return newRoot;
    }
}

export default AVLTree;
