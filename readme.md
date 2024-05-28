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
         absoluteWidth: `${integer}px`,
         absoluteHeight: `${integer}px`,
         aspectRatio: `1:${float}`,
         relativeObjectWidth: `${integer}%`,
         relativeObjectHeight: `${integer}%`,
         relativeSpacingToObjectRight: `${integer}%`,
         relativeSpacingToObjectBottom: `${integer}%`,
         relativeSpacingToObjectLeft: `${integer}%`,
         absoluteSpacingToObjectTop: `${integer}px`,
         absoluteSpacingToObjectRight: `${integer}px`,
         absoluteSpacingToObjectBottom: `${integer}px`,
         absoluteSpacingToObjectLeft: `${integer}px`,
      },
      document: {
         absoluteWidth: `${integer}px`,
         absoluteHeight: `${integer}px`,
         aspectRatio: `${integer}px`,
         relativeObjectWidth: `${integer}%`,
         relativeObjectHeight: `${integer}%`,
         relativeSpacingToObjectTop: `${integer}%`,
         relativeSpacingToObjectRight: `${integer}%`,
         relativeSpacingToObjectBottom: `${integer}%`,
         relativeSpacingToObjectLeft: `${integer}%`,
         absoluteSpacingToObjectTop: `${integer}px`,
         absoluteSpacingToObjectRight: `${integer}px`,
         absoluteSpacingToObjectBottom: `${integer}px`,
         absoluteSpacingToObjectLeft: `${integer}px`,
      }
   }
```

## Notes for Users

- Customization: Feel free to tailor the styles and displayed information to fit your specific needs.
- Performance Considerations: Attaching debug information to numerous elements might affect page performance. Use this feature wisely, particularly on live websites.
- 
- Troubleshooting
  - Not Working: Confirm that the script is correctly loaded and that elements have the appropriate attributes set.
  - Inaccurate Metrics: Inspect the console for errors and check that your page's CSS and JavaScript aren't interfering with `oji.js`'s` functionality.
