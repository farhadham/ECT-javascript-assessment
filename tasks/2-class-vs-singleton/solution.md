# Static Class vs Singleton

## Static Class Example

Scenario: When creating a library of utility functions, static classes are the best choice. These functions don't depend on maintaining any internal state and only perform specific tasks.

```
class MathUtils {
  static add(a, b) {
    return a + b;
  }

  static subtract(a, b) {
    return a - b;
  }
}

// Usage
console.log(MathUtils.add(5, 3));  // Output: 8
console.log(MathUtils.subtract(5, 3));  // Output: 2
```

### Explanation:

1. A static class provides reusable methods that do not require an instance to operate.
2. The methods in MathUtils are accessed directly through the class itself, making it an ideal choice for stateless utility functions.

---

## Singleton Example

Scenario: When managing application configuration, a singleton is required. This makes sure that only one consistent configuration object exists in thw whole application.

```
class AppConfig {
  constructor() {
    if (AppConfig.instance) {
      return AppConfig.instance;
    }
    this.settings = {};
    AppConfig.instance = this;
  }

  set(key, value) {
    this.settings[key] = value;
  }

  get(key) {
    return this.settings[key];
  }
}

// Usage
const config1 = new AppConfig();
config1.set('theme', 'dark');

const config2 = new AppConfig();
console.log(config2.get('theme'));  // Output: 'dark'
```

### Explanation:

1. The AppConfig class ensures that only one instance exists by checking and returning AppConfig.instance if it already exists.
2. This is essential for consistent application-wide configuration management.

---

## When Only a Singleton Can Be Used

Scenario: Managing a database connection pool requires a singleton. Using multiple connections unnecessarily consumes resources and may lead to conflicts.

```
class DatabaseConnection {
  constructor() {
    if (DatabaseConnection.instance) {
      return DatabaseConnection.instance;
    }
    this.connection = this.connectToDatabase();
    DatabaseConnection.instance = this;
  }

  connectToDatabase() {
    console.log('Connecting to database...');
    return { connected: true }; // Simulate a connection object.
  }

  getConnection() {
    return this.connection;
  }
}

// Usage
const db1 = new DatabaseConnection();
const db2 = new DatabaseConnection();

console.log(db1.getConnection());  // Output: { connected: true }
console.log(db1 === db2);          // Output: true
```

### Explanation:

1. In this example, the DatabaseConnection class ensures that only one connection is established.
2. Attempting to create additional instances will return the already existing instance, conserving resources.
3. This pattern is necessary for shared resources like database connections to prevent inefficiency or errors.
