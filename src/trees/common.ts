export enum Side {
    Left,
    Right,
}

export interface Tree<T, InsertOptions = {}> {
    root?: Node<T>;

    insert(data: T, options?: InsertOptions): Node<T> | undefined;

    find(data: T): Node<T> | undefined;
}

export interface Node<T> {
    data: T;
    left?: Node<T>;
    right?: Node<T>;
}

export enum TreeTraversalStrategy {
    DepthFirst,
    BreadthFirst,
}

export enum TreeTraversalOrder {
    PreOrder,
    InOrder,
    PostOrder,
}

export interface TreeTraversalSettings {
    strategy: TreeTraversalStrategy;
    order: TreeTraversalOrder;
}

export enum BalanceType {
    Left = 1,
    Even = 0,
    Right = -1,
}
