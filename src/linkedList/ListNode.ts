class ListNode<T> {
    data: T;
    #next?: ListNode<T>;

    constructor(data: T) {
        this.data = data;
    }

    get next(): ListNode<T> | undefined {
        return this.#next;
    }

    append(data: T): ListNode<T> {
        let current: ListNode<T> | undefined = this;
        while (current.#next) {
            current = current.#next;
        }
        const newNode = new ListNode(data);
        current.#next = newNode;
        return newNode;
    }

    join(separator?: string): string {
        const output: string[] = [];
        let current: ListNode<T> | undefined = this;
        while (current) {
            output.push(`${current.data}`);
            current = current.#next;
        }
        return output.join(separator);
    }

    toArray(): T[] {
        const output: T[] = [];
        let current: ListNode<T> | undefined = this;
        while (current) {
            output.push(current.data);
            current = current.#next;
        }
        return output;
    }

    toString(): string {
        return this.join(" ");
    }

    get reversed(): ListNode<T> {
        let previous: ListNode<T> | undefined = undefined;
        let current: ListNode<T> | undefined = this;
        let next: ListNode<T> | undefined = this.#next;
        while (current) {
            current.#next = previous;
            //
            previous = current;
            current = next;
            next = next?.next;
        }
        return previous as ListNode<T>;
    }
}

export default ListNode;
