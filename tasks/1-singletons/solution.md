# Task: Implementing a Singleton in the Simplest Way

## Thought Process

The goal of this task was to create a Singleton, which is a design pattern that ensures only one instance of a class exists in the application. I kept the solution simple by using a `class` with static properties to control the instance and provide a way to access it. I wanted the code to be easy to understand and follow the basic rules of a Singleton.

## Challenges Encountered

- Making sure the Singleton is easy to understand while still following the pattern correctly.
- Deciding how to show that all references point to the same instance.

## Decisions Made

- **Private Constructor:** I used a private constructor to stop anyone from creating a new instance directly.
- **Static Property:** A static property was used to store the single instance of the class.
- **Increment Example:** I added a simple `incrementOnce` method that updates and returns a shared value to demonstrate the Singleton's shared behavior.

## Testing

I wrote unit tests to check that:

- Calling `getInstance` always returns the same object.
- The `incrementOnce` method affects the shared state correctly.

---

# Task: Creating a Generic Singleton Creator Class

## Thought Process

The goal of this task was to build a generic class, `Utility.SessionSingleton`, that can manage single instances of any class as a singleton. This would allow reusability and flexibility, as the same singleton logic can work for different class types without rewriting the implementation. The design had to ensure that each class type gets its own unique singleton instance.

## Challenges Encountered

- Designing a generic structure that works for any class without tying it to a specific type.
- Making sure the singleton logic was properly saved while keeping the code clear and easy to use.

## Decisions Made

- **Generic Implementation:** I used TypeScript's generics (`<T>`) to make the `SessionSingleton` class flexible enough to handle any class type.
- **Instance Management:** A private property (`instanceRef`) stores the single instance, and the `instance()` method ensures only one instance is created and reused.

## Testing

I wrote unit tests to check that:

- Each `SessionSingleton` only creates one instance for a given class.
- Modifying the singleton's state through one reference reflects in all other references.
- Separate `SessionSingleton` instances manage unique singletons for different classes.
