### Classes

GlobalBlackWhiteList:

- Manages the global blacklist and whitelist.
- Provides methods to add or remove users and check if a user is on the blacklist or whitelist.

CustomerBlackWhiteList:

- Manages customer-specific blacklists and whitelists.
- Similar to the global list but for individual customers.
- Each customer has their own list, allowing them to manage their users separately.

User:

- Represents a user with basic information like userId and name.

### Basic functionality

GlobalBlackWhiteList:

- Allows adding and removing users to/from the global blacklist and whitelist.
- Can check if a user is in the global blacklist or whitelist.

GlobalBlackWhiteList:

- Allows adding and removing users to/from a customer's specific blacklist and whitelist.
- Can check if a user is in the customer's blacklist or whitelist.

### Scalability

Date Structures:

- Sets are used to store user IDs for efficient lookup and management.
- By using Sets, you ensure that adding, removing, and checking users is fast and efficient, even with a large number of users.

Caching:

- Frequently checked user lists (like the global list) could be cached for fast access.
