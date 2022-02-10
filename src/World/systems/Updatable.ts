// `interface` is entirely a compile time thing and adds no overhead compared to a `class`.
interface Updatable<T> {
    object: T;
    tick(delta: number, elapsedTime: number): void;
}

export { Updatable };
