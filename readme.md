# `oji.js`

## Overview

`oji.js`(oji = object-info) is a JavaScript snippet that equips developers and designers with detailed data attributes about HTML elements' size, position, and relative metrics to the viewport and document. It's a tool during the debugging and layout phases, offering insights into element metrics, which are crucial for creating responsive and well-structured web pages.

## Features

- Dynamic Metrics: Computes and attaches detailed metrics to elements, such as absolute dimensions, aspect ratios, and relative positions to the viewport and document.
- Real-time Updates: Responds to page load, resize, and scroll events, ensuring the metrics are always up-to-date.
- Enhanced Debugging: Introduces a debug visualization layer on specified elements, displaying a comprehensive set of metrics for quick analysis and adjustments.

## How It Works

1. **Initialization:** 
   1. Generates a unique session ID for tagging elements.
   2. Sets up event listeners on the window for load, resize, click, focus, blur and scroll events to trigger metric computation.
2. **Metric Computation:** 
   1.Targets elements marked with `data-oji` or `data-object-info`.
   1. Calculates various metrics, including dimensions, aspect ratios, and relative positions to the viewport or the document.
   2. Updates elements with these metrics, which are then accessible for debugging or other applications.
3. **Visualization and Debugging:**
   1.Applies distinct styles to elements flagged for debugging (`data-oji-debug`), highlighting their dimensions and positions.
   1. Provides an on-page overlay detailing all computed metrics for each element, facilitating an easier understanding and quicker layout adjustments.

## Installation

1. Copy the entire script from `oji.js`.
2. Include it in your project by embedding it directly in your HTML or linking it as a separate file:
   ```html
   <script src="path/to/object-info.js" defer></script>
   ```
3. Ensure the script loads after the DOM is fully loaded, ideally using the defer attribute if placing it in the `<head>` section.

## Usage
1. **Activating the Tool:**
   - Assign the `data-oji` attribute to any HTML element you wish to analyze. This activates the `data-oji-summary` attribute, providing a summary of the element's metrics related to its position and size.
2. **Enabling Debug Visuals:**
   - Use the `data-oji-debug` attribute on the desired elements to initiate a visual overlay, displaying an extensive set of metrics for in-depth analysis.
3. **Animating and Styling:**
   - Apply the  `data-oji-attributes` to elements, and `oji.js` will assign computed metrics as HTML attributes. These can serve as hooks for further scripting or styling, allowing you to create responsive behaviors based on the element's metrics. (like triggering animations or interaction on certain viewport or document relatied positions)

## Data Points

`oji` is globally available as object and as html attributes

```js
   {
      info: {
         name: 'oji',
         id: 1234-0,
         attribute:'data-oji',
         slug:'oji',
      }
      object: {
         // the absolute width
         absoluteWidth: `${integer}px`,
         // the absolute height
         absoluteHeight: `${integer}px`,
         // the aspect-ratio
         aspectRatio: `1:${float}`,
         // the percentage of the area of the element of the current viewport
         relativeAreaOfViewport: `${float}%`,
         // the percentage of the area of the element visible within the current viewport
         relativeAreaInViewportVisible: `${float}%`,
         // the percentage of the area of the element of the document
         relativeAreaOfDocument: `${float}%`,
         // the percentage of the area  of the element visible of the document
         relativeAreaInDocumentVisible: `${float}%`,
         // the font-size in px
         fontSizePx: `${float}px`,
         // the font-size in rem
         fontSizeRem: `${float}rem`,
         // the font-size in the current Vw
         fontSizeVw: `${float}vw`,
         // the font-family
         fontSizeFamily: `${string}`,
         // the text-color of the element
         color: `${string}`,
         // the background-color of the element
         backgroundColor: `${string}`,
         // the contrast-ratio bewtween text/background
         colorContrast: `${float}`,
      },
      viewport: {
         // the absolute width of the viewport
         absoluteWidth: `${integer}px`,
         // the absolute height of the viewport
         absoluteHeight: `${integer}px`,
         // the aspect-ratio of the viewport
         aspectRatio: `1:${float}`,
         // the relative object width in the viewport
         relativeObjectWidth: `${integer}%`,
         // the relative object height in the viewport
         relativeObjectHeight: `${integer}%`,
         // the relative object distance to the right of the viewport
         relativeSpacingToObjectRight: `${integer}%`,
         // the relative object distance to the bottom of the viewport
         relativeSpacingToObjectBottom: `${integer}%`,
         // the relative object distance to the left of the viewport
         relativeSpacingToObjectLeft: `${integer}%`,
         // the relative object distance to the top of the viewport
         absoluteSpacingToObjectTop: `${integer}px`,
         // the absolute object distance to the right of the viewport
         absoluteSpacingToObjectRight: `${integer}px`,
         // the relative object distance to the bottom of the viewport
         absoluteSpacingToObjectBottom: `${integer}px`,
         // the relative object distance to the left of the viewport
         absoluteSpacingToObjectLeft: `${integer}px`,
         // the relative object distance to the top of the viewport
         absoluteSpacingToObjectTop: `${integer}px`
      },
      document: {
         // the absolute width of the document
         absoluteWidth: `${integer}px`,
         // the absolute height of the document
         absoluteHeight: `${integer}px`,
         // the aspect-ratio of the document
         aspectRatio: `${integer}px`,
         // the relative object width in the document
         relativeObjectWidth: `${integer}%`,
         // the relative object height in the document
         relativeObjectHeight: `${integer}%`,
         // the relative object spacing to the top of the document
         relativeSpacingToObjectTop: `${integer}%`,
         // the relative object spacing to the right of the document
         relativeSpacingToObjectRight: `${integer}%`,
         // the relative object spacing to the bottom of the document
         relativeSpacingToObjectBottom: `${integer}%`,
         // the relative object spacing to the left of the document
         relativeSpacingToObjectLeft: `${integer}%`,
         // the absolute object spacing to the top of the document
         absoluteSpacingToObjectTop: `${integer}px`,
         // the absolute object spacing to the right of the document
         absoluteSpacingToObjectRight: `${integer}px`,
         // the absolute object spacing to the bottom of the document
         absoluteSpacingToObjectBottom: `${integer}px`,
         // the absolute object spacing to the left of the document
         absoluteSpacingToObjectLeft: `${integer}px`,
      }
   }
```

## JavaScript API

```js
oji.viewportPosition('.myElement').absoluteSpacingToObjectTop;
oji.documentPostion('.myElement').relativeObjectWidth;
oji.values('.myElement').absoluteWidth;
oji.compare('.myElement', '.someOtherElement').area.hasOverlap;
```

## DOM Manipulation Examples

`oji`can be used for triggering and handling animations with JS or CSS.

```html
<script>
/*
There is an element with the data-animate-on-scroll attribute
it has also a data-oji-object-relative-area-in-viewport-visible attribute
if this attribute value (float with 2 decimal numbers) reaches 50.00 or more
set class to "sky", 75.00 or more to 'yellow', under 50.00 to "blue"
*/

document.addEventListener("scroll", (e) => {
   const elements = document.querySelectorAll('[data-animate-on-scroll]');
   const ojiAreaAttribute = 'data-oji-object-relative-area-in-viewport-visible';
   elements.forEach(el => {
         const visibility = parseFloat(el.getAttribute(ojiAreaAttribute));
         if (visibility >= 50.00) {
            el.classList = 'sky';
         }
         if (visibility <= 50.00) {
            el.classList = 'blue';
         }
         if (visibility >= 75.00) {
            el.classList = 'yellow';
         }
   });
});
</script>

```

```html
<script>
/**
* If an element has the `data-animate-on-scrolljack` attribute is present and also a `data-oji-object-relative-area-in-viewport-visible` attribute
* use relative area in viewport visible to change the background color of the element
* if it's 100.00 or more turn the opacity to 1
* if there is 99.99 or less turn the the viewporta rea percentage the same as the opacity
*/

document.addEventListener("scroll", (e) => {
   const elements = document.querySelectorAll('[data-animate-on-scrolljack]');
   const ojiAreaAttribute = 'data-oji-object-relative-area-in-viewport-visible';
   elements.forEach(el => {
      const visibility = parseFloat(el.getAttribute(ojiAreaAttribute));
      el.style.opacity = (visibility / 100).toFixed(2);
      el.style.transition = 'all 0.6s ease';
      el.style.transform = `scale(calc(${(visibility / 100).toFixed(2)}))`;
      if (visibility === 100.00) {
         el.style.backgroundColor = 'yellow';
      }
      if (visibility !== 100.00) {
         el.style.backgroundColor = 'transparent';
      }
   });
});
</script>
```

## Notes for Users

- Customization: Feel free to tailor the styles and displayed information to fit your specific needs.
- Performance Considerations: Attaching debug information to numerous elements might affect page performance. Use this feature wisely, particularly on live websites.
- 
- Troubleshooting
  - Not Working: Confirm that the script is correctly loaded and that elements have the appropriate attributes set.
  - Inaccurate Metrics: Inspect the console for errors and check that your page's CSS and JavaScript aren't interfering with `oji.js`'s` functionality.
