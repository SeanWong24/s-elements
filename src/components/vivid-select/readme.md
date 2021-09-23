# vivid-select



<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description | Type                                                                                                            | Default     |
| ------------- | ------------- | ----------- | --------------------------------------------------------------------------------------------------------------- | ----------- |
| `color`       | `color`       |             | `"danger" \| "dark" \| "light" \| "medium" \| "primary" \| "secondary" \| "success" \| "tertiary" \| "warning"` | `'primary'` |
| `placeholder` | `placeholder` |             | `string`                                                                                                        | `undefined` |
| `value`       | `value`       |             | `string`                                                                                                        | `undefined` |


## Events

| Event     | Description | Type                  |
| --------- | ----------- | --------------------- |
| `sChange` |             | `CustomEvent<string>` |


## Dependencies

### Depends on

- [vivid-button](../vivid-button)
- [vivid-overlay](../vivid-overlay)

### Graph
```mermaid
graph TD;
  vivid-select --> vivid-button
  vivid-select --> vivid-overlay
  style vivid-select fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
