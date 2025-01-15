/**
 * A basic implementation of the Singleton design pattern using Class Keyword.
 * Ensures that only one instance of the class is created and provides a global point of access to it.
 */
export class SingletonIncrementor {
  // Holds the single instance of the class
  private static instance: SingletonIncrementor | null = null;

  private value: number = 0;

  // Private constructor to prevent direct instantiation
  private constructor() {}

  /**
   * Provides access to the single instance of the class.
   * If the instance doesn't exist, it creates one.
   * @returns SingletonIncrementor - The singleton instance.
   */
  public static getInstance(): SingletonIncrementor {
    if (!SingletonIncrementor.instance) {
      SingletonIncrementor.instance = new SingletonIncrementor();
    }
    return SingletonIncrementor.instance;
  }

  /**
   * Increments the internal value by 1 and returns the updated value.
   * @returns number - The incremented value.
   */
  public incrementOnce(): number {
    return ++this.value;
  }
}

// -------------
// Usage example
// -------------
function demonstrateSingletonClass() {
  console.log(
    `\n--------------\nBasic Singleton using "Class" keyword\n--------------`,
  );
  // Retrieve the singleton instance
  const singleton1 = SingletonIncrementor.getInstance();
  const singleton2 = SingletonIncrementor.getInstance();

  // Perform operations using the singleton
  console.log('Singleton 1 increment:', singleton1.incrementOnce()); // Output: 1
  console.log('Singleton 1 increment again:', singleton1.incrementOnce()); // Output: 2
  console.log(
    'Singleton 2 increment (same instance):',
    singleton2.incrementOnce(),
  ); // Output: 3
  console.log('Singleton 2 increment again:', singleton2.incrementOnce()); // Output: 4

  // Verify that both instances are the same
  console.log(
    'Are singleton instances from class the same?',
    singleton1 === singleton2, // Output: true
  );
}

demonstrateSingletonClass();
