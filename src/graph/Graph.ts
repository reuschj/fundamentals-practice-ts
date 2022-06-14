import { v4 as UUID } from 'uuid';

export type GraphNodeCallback<T> = (data: T, index: number, node: GraphNode<T>) => void;

interface VisitedTracker<T> {
    isVisited: (node: GraphNode<T>) => boolean;
    setVisited: (node: GraphNode<T>) => Set<string>;
    tracker: Set<string>;
}

interface IndexTracker {
    incrementIndex: () => number;
    getIndex: () => number;
}

export class GraphNode<T> {
    id: string;
    data: T;
    adjacencies: GraphNode<T>[] = [];

    constructor(data: T) {
        this.id = UUID();
        this.data = data;
    }
}


export enum GraphType {
    NonDirectional,
    Directional,
}

class Graph<T> {
    graphType: GraphType;
    nodes: GraphNode<T>[];

    get adjacencyList(): Map<T, T[]> {
        const map: Map<T, T[]> = new Map();
        this.nodes.forEach((node) => {
            const { data, adjacencies } = node;
            const adjacencyList = adjacencies.map((it) => it.data);
            map.set(data, adjacencyList);
        });
        return map;
    }

    constructor(
        graphType: GraphType = GraphType.NonDirectional,
        nodes?: GraphNode<T>[],
    ) {
        this.graphType = graphType;
        this.nodes = nodes ?? [];
    }

    private static makeVisitedTracker<T>(): VisitedTracker<T> {
        const tracker: Set<string> = new Set();
        const setVisited = (node: GraphNode<T>) => tracker.add(node.id);
        const isVisited = (node: GraphNode<T>): boolean => tracker.has(node.id);
        return { isVisited, setVisited, tracker };
    }

    private static makeIndexTracker(): IndexTracker {
        let index = 0;
        const incrementIndex = () => {
            index += 1;
            return index;
        };
        const getIndex = () => index;
        return { incrementIndex, getIndex };
    }

    traverseBreadthFirst(
        source: GraphNode<T>,
        callback: GraphNodeCallback<T>,
    ) {
        const { isVisited, setVisited } = Graph.makeVisitedTracker<T>();
        const { getIndex, incrementIndex } = Graph.makeIndexTracker();

        const queue: GraphNode<T>[] = [source];

        while (queue.length > 0) {
            const current = queue.shift() as GraphNode<T>;
            if (isVisited(current)) break;
            setVisited(current);
            const { data } = current;
            callback(data, getIndex(), current);
            incrementIndex();
            for (let neighbor of current.adjacencies) {
                if (!isVisited(neighbor)) {
                    queue.push(neighbor);
                }
            }
        }
    }

    traverseDepthFirst(
        source: GraphNode<T>,
        callback: GraphNodeCallback<T>,
    ) {
        const { isVisited, setVisited } = Graph.makeVisitedTracker<T>();
        const { getIndex, incrementIndex } = Graph.makeIndexTracker();

        const stack: GraphNode<T>[] = [source];

        while (stack.length > 0) {
            const current = stack.pop() as GraphNode<T>;
            if (isVisited(current)) break;
            setVisited(current);
            const { data } = current;
            callback(data, getIndex(), current);
            incrementIndex();
            for (let neighbor of current.adjacencies) {
                if (!isVisited(neighbor)) {
                    stack.push(neighbor);
                }
            }
        }
    }
}

export default Graph;
