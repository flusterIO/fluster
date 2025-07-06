/// A typescript wrapper for the rust based c-numpy implementation. All properties are read in typescript but methods are executed in Rust.
export class FlusterArray {
    data: number[] = [];
    constructor() { }
    /// This will return 0 if the data field was collapsed to a scalar by an operation like 'max' or 'min'.
    length(): number {
        return this.data.length;
    }
    sin() {
        this.data = this.data.map((n) => Math.sin(n));
    }
    sinh() {
        this.data = this.data.map((n) => Math.sinh(n));
    }
    cos() {
        this.data = this.data.map((n) => Math.cos(n));
    }
    cosh() {
        this.data = this.data.map((n) => Math.cosh(n));
    }
    tan() {
        this.data = this.data.map((n) => Math.tan(n));
    }
    tanh() {
        this.data = this.data.map((n) => Math.tanh(n));
    }
    absolute() {
        this.data = this.data.map((n) => Math.abs(n));
    }
    power(n: number) {
        this.data = this.data.map((_n) => Math.pow(_n, n));
    }
    acos() {
        this.data = this.data.map((_n) => Math.acos(_n));
    }
    asin() {
        this.data = this.data.map((_n) => Math.asin(_n));
    }
    atan() {
        this.data = this.data.map((_n) => Math.atan(_n));
    }
    naturalLog() {
        this.data = this.data.map((_n) => Math.log(_n));
    }
    exp() {
        this.data = this.data.map((_n) => Math.exp(_n));
    }
    round() {
        this.data = this.data.map((_n) => Math.round(_n));
    }
    roundDown() {
        this.data = this.data.map((_n) => Math.floor(_n));
    }
    roundUp() {
        this.data = this.data.map((_n) => Math.ceil(_n));
    }
    random() {
        this.data = this.data.map(() => Math.random());
    }
    multiply(n: number) {
        this.data = this.data.map((_n) => _n * n);
    }
    divide(n: number) {
        this.data = this.data.map((_n) => _n / n);
    }
    subtract(n: number) {
        this.data = this.data.map((_n) => _n - n);
    }
    add(n: number) {
        this.data = this.data.map((_n) => _n + n);
    }
    map(callback: (n: number) => number) {
        this.data = this.data.map((n) => callback(n));
    }
    static fromLength(length: number): FlusterArray {
        const x = new FlusterArray();
        x.data = Array(length).fill(1);
        return x;
    }
    static fromData(data: number[]): FlusterArray {
        const x = new FlusterArray();
        x.data = data;
        return x;
    }
}
