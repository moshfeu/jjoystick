Dead simple horizontal Joystick built as web components on top of `input[type=range]`.

## Installation

`npm install jjoystick`

`yarn add jjoystick`

## Usage

## Events

- `dir` - when directions changed even without ending the touch / click
- `end` - when interaction ended
- `zero` - when handle went to the initial position

```html
<script src="node_modules/jjoystick/index.js"></script>

<j-joystick></j-joystick>

<script>
const joystick = document.querySelector('j-joystick');
joystick.addEventListener('dir', ({detail}) => console.log(detail) /* right, left */);
joystick.addEventListener('end', () => console.log('end'));
joystick.addEventListener('zero', () => console.log('zero'));
</script>
```

## Demo

https://codesandbox.io/s/jjoystick-demo-71trm