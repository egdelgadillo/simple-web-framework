/*
 * Attributes Module
 * Credits To: Stephen Grider - https://www.udemy.com/user/sgslo/
 * Written by: Emiliano Delgadillo - https://github.com/egdelgadillo/
 *
 * The Attributes class handles the Model's data, defining a private
 * data property, which can be only accessed from the class methods
 * get() and getAll() and only modified through the set() method
 * This module has no dependencies whatsoever and is designed to be
 * used alongside the composition architecture
 */
export class Attributes<T> {
  constructor(private data: T) {}

  /*
   * Simply returns the value of the data attribute at a given key value
   */
  get = <K extends keyof T>(key: K): T[K] => {
    return this.data[key];
  };

  /*
   * Assigns a value of a predefined type of T and assigns it to the
   * existing data attribute
   */
  set = (update: T): void => {
    (<any>Object).assign(this.data, update);
  };

  /*
   * Returns the complete value of the class' data attribute
   */
  getAll = (): T => {
    return this.data;
  };
}
