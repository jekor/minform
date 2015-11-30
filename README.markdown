# minform 2.0 - A Minimalist JavaScript Form Enhancer

Demo at http://www.minjs.com/#minform

## Features

* minimal markup: HTML5 form attributes
* minimal code: and no library dependencies
* minimal UI: subtle hints rather than explicit instructions

## How to Use

```JavaScript
var form = document.getElementById('yourForm');
minform(form);
```

## Features

### placeholders

```HTML
<input placeholder="some text">
```

You need to style "placeheld" inputs yourself. A good default is:

```CSS
.placeheld {
  color: #A0A0A0;
  font-style: italic;
}
```

### autofocus

```HTML
<input autofocus>
```

Automatically focuses the element when `minform()` is called on it. Note that only the first autofocus input is focused.

### required

```HTML
<input required>
```

Will block form submission and focus the required element if it has not been filled in.

## Unsupported Browsers

* Internet Explorer <= 8
