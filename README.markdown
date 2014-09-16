# minform - A Minimalistic Approach to Enhancing Forms

Demo at http://www.minjs.com/#minform

## Philosophy

* **minimal markup**: HTML5 form attributes
* **minimal code**: leaning on jQuery to do the heavy lifting
* **minimal UI**: subtle hints rather than explicit instructions

## Features

### placeholders

```HTML
<input placeholder="sometext">
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

Automatically focuses the element on `document.ready`.

### required

```HTML
<input required>
```

Will block form submission and focus the required element if it's not been
filled in.

## Dependencies

jQuery >= 1.4.3
