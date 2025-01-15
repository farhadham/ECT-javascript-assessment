export namespace Utility {
  /**
   * A generic Singleton class for managing single instances of other classes.
   * @template T - The type of the class being managed.
   */
  export class SessionSingleton<T> {
    private instanceRef: T | null = null;
    private ClassType: { new (): T };

    /**
     * Constructs the SessionSingleton for a given class type.
     * @param ClassType - The class type to manage as a singleton.
     */
    constructor(ClassType: { new (): T }) {
      this.ClassType = ClassType;
    }

    /**
     * Retrieves the singleton instance of the class. If it doesn't exist, creates one.
     * @returns T - The singleton instance of the class.
     */
    public instance(): T {
      if (!this.instanceRef) {
        this.instanceRef = new this.ClassType();
      }
      return this.instanceRef;
    }
  }
}

// -------------
// Usage example
// -------------
export class TestClass {
  private name: string = 'empty';

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }
}

function demonstrateSingletonClass() {
  console.log(
    `\n--------------\nGeneric singleton creator using "Class" keyword\n--------------`,
  );
  // Initializing the singleton instance
  const singleton1 = new Utility.SessionSingleton(TestClass);

  // Access and modify first singleton instance
  const instance1 = singleton1.instance();
  console.log('Instance 1 initial name = ', instance1.getName()); // Output: "empty"
  instance1.setName('Yanni');
  console.log(
    'Instance 2 name after setting to "Yanni" = ',
    instance1.getName(),
  ); // Output: "Yanni"

  // Access and modify second singleton instance
  const instance2 = singleton1.instance();
  console.log('Instance 2 initial name = ', instance2.getName()); // Output: "Yanni"
  instance2.setName('Hans');
  console.log(
    'Instance 2 name after setting to "Hans" = ',
    instance2.getName(),
  ); // Output: "Hans"

  console.log(
    'Instance 1 name after setting to "Hans" by instance 2 = ',
    instance1.getName(),
  ); // Output: "Hans"

  // Verify that both instances are the same
  console.log(
    'Are singleton instances from class the same?',
    instance1 === instance2, // Output: true
  );
}

demonstrateSingletonClass();
