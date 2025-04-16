const n=`\`useMemo\` is a React Hook that helps **optimize performance** by **memoizing** the result of a **function**, so that React doesn’t re-run that function on every render **unless its dependencies change**.

### Syntax:

\`\`\`tsx
const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
\`\`\`

### When to use \`useMemo\`:

Use \`useMemo\` when:

- You have a **computationally expensive function**.
- The return value is **used in rendering** or **in other functions**.
- You want to **avoid recalculating** unless inputs actually change.

### Example:

\`\`\`tsx
import React, { useMemo } from "react";

function MyComponent({ a, b }) {
  const expensiveCalculation = (a: number, b: number) => {
    console.log("Calculating...");
    return a + b;
  };

  const result = useMemo(() => expensiveCalculation(a, b), [a, b]);

  return <div>Result: {result}</div>;
}
\`\`\`

### Without \`useMemo\`:

- \`expensiveCalculation\` would run on **every render**, even if \`a\` and \`b\` didn’t change.

### With \`useMemo\`:

- \`expensiveCalculation\` runs **only if \`a\` or \`b\` changes**.

---
`;export{n as default};
