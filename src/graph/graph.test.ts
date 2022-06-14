import Graph, { GraphNode, GraphType } from "./Graph";

describe("graphs", () => {
    describe("Graph", () => {
        const testData = ["A", "B", "C", "D", "E"];
        let testGraph: Graph<string>;

        beforeEach(() => {
            const [a, b, c, d, e] = testData.map((it) => new GraphNode(it));
            a.adjacencies = [e, b];
            b.adjacencies = [a, c];
            c.adjacencies = [b, d];
            d.adjacencies = [c, e];
            e.adjacencies = [d, a];
            testGraph = new Graph(GraphType.NonDirectional, [a, b, c, d, e]);
        });
        it("constructs correctly", () => {
            expect(testGraph).toBeInstanceOf(Graph);
        });


        describe("traversal", () => {
            it("can traverse depth-first", () => {
                const output: string[] = [];
                let count = 0;
                testGraph.traverseDepthFirst(testGraph.nodes[0], (
                    data, index
                ) => {
                    expect(index).toBe(count);
                    output.push(data);
                    count += 1;
                });
                expect(output.join("")).toEqual(testData.join(""))
            });

            it("can traverse breadth-first", () => {
                const output: string[] = [];
                let count = 0;
                testGraph.traverseBreadthFirst(testGraph.nodes[0], (
                    data, index
                ) => {
                    expect(index).toBe(count);
                    output.push(data);
                    count += 1;
                });
                expect(output.join("")).toEqual("AEBDC");
            });
        });
    });
});