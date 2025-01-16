### Original Snippet

```
function fetchData() {
  fetch('https://api.example.com/data')
    .then((response) => response.json())
    .then((data) => process(data))
    .catch((err) => console.log(err));
}

function process(data) {
  for (let i = 0; i < data.length; i++) {
    console.log(data[i].value);
  }
}
```

### Code Review

- Use async/await for better readability and maintainability.
- Validate the structure of the data array.
- Check `response.ok` to ensure the response is successful.
- Log meaningful error messages to aid debugging.
- Use Array mapping for more readability

### Suggested Code

```
async function fetchData() {
  try {
    const response = await fetch('https://api.example.com/data');

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    process(data);
  } catch (error) {
    console.error('Failed to fetch data:', error);
  }
}

function process(data) {
  if (!Array.isArray(data)) {
    console.log('Unexpected data format: Expected an array.');
  }

  data.map((item) => {
    console.log('Processed Values:', item.value);
  });
}
```
