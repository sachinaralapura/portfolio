`useCallback` is a React Hook that returns a **memoized version of a callback function**, so that the function **only changes if its dependencies change**.

### Syntax:
```js
const memoizedCallback = useCallback(() => {
  doSomething(a, b);
}, [a, b]);
```

---

### ✅ Use `useCallback` when:
- You’re passing a **function as a prop** to a child component.
- You want to **prevent unnecessary re-renders** of that child.
- You want to **avoid recreating the same function** on every render (especially inside `useEffect`, `useMemo`, etc.).

---

### Example:
```tsx
import React, { useState, useCallback } from 'react';

function Button({ onClick }: { onClick: () => void }) {
  console.log("Button rendered");
  return <button onClick={onClick}>Click me</button>;
}

const Parent = () => {
  const [count, setCount] = useState(0);

  const handleClick = useCallback(() => {
    console.log("Button clicked");
  }, []); // will not recreate `handleClick` on every render

  return (
    <div>
      <p>Count: {count}</p>
      <Button onClick={handleClick} />
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
};
```

Without `useCallback`, the `handleClick` function would be recreated on every render, causing the `Button` component to re-render even if its props didn’t really change.

---

### 🧠 TL;DR:
- `useMemo`: Memoizes **value**.
- `useCallback`: Memoizes **function**.