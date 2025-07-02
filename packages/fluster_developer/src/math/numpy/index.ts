/// A typescript wrapper for the rust based c-numpy implementation. All properties are read in typescript but methods are executed in Rust.
export class Numpy {
  data: number | number[] | number[][] | number[][][] = [];
  constructor() {}
  /// This will return 0 if the data field was collapsed to a scalar by an operation like 'max' or 'min'.
  length(): number {
    return typeof this.data === "number" ? 0 : this.data.length;
  }
}
