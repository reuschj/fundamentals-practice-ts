import { Side, Tree, Node, TreeTraversalOrder, TreeTraversalSettings, TreeTraversalStrategy } from "./common";

interface InsertOptions {
    side?: Side;
}


export type TreeCallback<T, R> = (data: T, index: number, node: TreeNode<T>) => R;


class TreeNode<T> implements Tree<T, InsertOptions>, Node<T> {
    left?: TreeNode<T>;
    right?: TreeNode<T>;
    data: T;

    constructor(data: T) {
        this.data = data;
    }

    toString(): string {
        return `(${this.left ?? "nil"} < ${this.data} > ${this.right ?? "nil"})`;
    }

    get height(): number {
        const self = 1;
        const leftHeight = this.left?.height ?? 0;
        const rightHeight = this.right?.height ?? 0;
        return self + Math.max(leftHeight, rightHeight);
    }

    insert(
        data: T,
        options?: InsertOptions,
    ): TreeNode<T> | undefined {
        const { side } = options ?? {};
        if (typeof side === "undefined") {
            this.insertSorted(data);
            return;
        }
        const node = new TreeNode(data);
        switch (side) {
            case Side.Left:
                this.left = node;
                break;
            case Side.Right:
                this.right = node;
                break;
        }
        return node;
    }

    insertSorted(
        data: T,
    ): TreeNode<T> | undefined {
        const createNode = () => new TreeNode(data);
        if (data > this.data) {
            if (this.right) {
                return this.right.insertSorted(data);
            } else {
                return this.right = createNode();
            }
        } else {
            if (this.left) {
                return this.left.insertSorted(data);
            } else {
                return this.left = createNode();
            }
        }
    }

    find(
        data: T
    ): TreeNode<T> | undefined {
        if (data === this.data) return this;
        const dataIsLarger = data > this.data;
        const findLeft = () => this.left?.find(data);
        const findRight = () => this.right?.find(data);
        const firstResult = dataIsLarger ? findRight() : findLeft();
        if (firstResult) return firstResult;
        const fallbackResult = dataIsLarger ? findLeft() : findRight();
        if (fallbackResult) return fallbackResult;
    }

    private static resolvePartialTraversalSettingsWithDefaults(
        traversalSettings?: Partial<TreeTraversalSettings>,
    ): TreeTraversalSettings {
        const {
            strategy = TreeTraversalStrategy.DepthFirst,
            order = TreeTraversalOrder.PreOrder,
        } = traversalSettings ?? {};
        return { strategy, order };
    }

    forEach(
        callback: TreeCallback<T, void>,
        traversalSettings?: Partial<TreeTraversalSettings>,
    ) {
        const { strategy, order } = TreeNode.resolvePartialTraversalSettingsWithDefaults(traversalSettings);
        switch (strategy) {
            case TreeTraversalStrategy.DepthFirst:
                this.depthFirstTraverse(order, 0, callback);
                break;
            case TreeTraversalStrategy.BreadthFirst:
                this.breadthFirstTraverse(0, callback);
        }
    }

    map<R>(
        callback: TreeCallback<T, R>,
        traversalSettings?: Partial<TreeTraversalSettings>,
    ): R[] {
        const { strategy, order } = TreeNode.resolvePartialTraversalSettingsWithDefaults(traversalSettings);
        switch (strategy) {
            case TreeTraversalStrategy.DepthFirst:
                return this.depthFirstTraverse(order, 0, callback)[2];
            case TreeTraversalStrategy.BreadthFirst:
                return this.breadthFirstTraverse(0, callback)[2];
        }
    }

    private depthFirstTraverse<R>(
        order: TreeTraversalOrder,
        index = 0,
        callback?: TreeCallback<T, R>,
    ): [number, R, R[]] {
        let i = index;
        let r: R = undefined as unknown as R;
        const results: R[] = [];
        const call = () => {
            if (!callback) return;
            const { data } = this;
            r = callback(data, i, this);
            results.push(r);
            i += 1;
        };
        if (order === TreeTraversalOrder.PreOrder) call();
        if (this.left) {
            const [index, result, all] = this.left.depthFirstTraverse(order, i, callback);
            i = index;
            r = result;
            results.push(...all);
        }
        if (order === TreeTraversalOrder.InOrder) call();
        if (this.right) {
            const [index, result, all] = this.right.depthFirstTraverse(order, i, callback);
            i = index;
            r = result;
            results.push(...all);
        }
        if (order === TreeTraversalOrder.PostOrder) call();
        return [i, r, results];
    }

    private breadthFirstTraverse<R>(
        index = 0,
        callback?: TreeCallback<T, R>,
    ): [number, R, R[]] {
        let i = index;
        let r: R = undefined as unknown as R;
        const results: R[] = [];
        const call = (root: TreeNode<T>) => {
            if (!callback) return;
            const { data } = root;
            r = callback(data, i, root);
            results.push(r);
            i += 1;
        };
        for (let level = 0; level < this.height; level += 1) {
            const [newIndex, result, all] = this.traverseLevel(level, i, callback);
            i = newIndex;
            r = result;
            results.push(...all);
        }
        return [i, r, results];
    }

    private traverseLevel<R>(
        level: number,
        index = 0,
        callback?: TreeCallback<T, R>,
    ): [number, R, R[]] {
        let i = index;
        let r: R = undefined as unknown as R;
        const results: R[] = [];
        const call = (root: TreeNode<T>) => {
            if (!callback) return;
            const { data } = root;
            r = callback(data, i, root);
            results.push(r);
            i += 1;
        };
        if (level <= 0) {
            call(this);
        } else {
            if (this.left) {
                const [newIndex, result, all] = this.left.traverseLevel(level - 1, i, callback);
                i = newIndex;
                r = result;
                results.push(...all);
            }
            if (this.right) {
                const [newIndex, result, all] = this.right.traverseLevel(level - 1, i, callback);
                i = newIndex;
                r = result;
                results.push(...all);
            }
        }
        return [i, r, results];
    }
}

export default TreeNode;
