# alloy-node

This is a tiny wrapper that makes a POST request to run an Alloy workflow.

## Usage

```
import Alloy from 'alloy-node';

...

const alloy = new Alloy(<apiKey>);

alloy.identify(<username>);

alloy.update(<payload>);
```
