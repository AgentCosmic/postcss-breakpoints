# PostCSS Breakpoints

Generate classes that activate at defined widths.

Plugin syntax:
```
@generate-breakpoints (<name>: <width>; ...) {
	<classes>...
}
```

## Example

Input:
```css
@generate-breakpoints (desktop: 1280px; tablet: 1024px) {
	.test, .foobar {
		font: bold;
		& .nest {
			border: none;
		}
	}
}
```

Output:
```css
@media (min-width: 1280px) {
	.desktop-test, .desktop-foobar {
		font: bold;
		& .nest {
			border: none;
		}
	}
}
@media (min-width: 1024px) {
	.tablet-test, .tablet-foobar {
		font: bold;
		& .nest {
			border: none;
		}
	}
}
.test, .foobar {
	font: bold;
	& .nest {
		border: none;
	}
}
```

## Usage

Install plugin.

```bash
npm i @daltontan/postcss-breakpoints
```

Add to you PostCSS config:

```js
module.exports = {
	plugins: [
		require('@daltontan/postcss-breakpoints'),
	]
}
```
