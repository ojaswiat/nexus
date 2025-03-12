## Why create separate components for buttons?

1. We are using Button component from @heroui/react package.
2. This button will only work on client side.
3. To ensure the client-only components are on the leaf nodes of the DOM tree, we create these buttons.
