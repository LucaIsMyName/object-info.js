# oji.js

## Overview

This JavaScript snippet is designed to be a tool for developers and designers who need to obtain detailed information about HTML elements on their web page. It provides a convenient way to visualize and understand various metrics related to the size, position, and relative spacing of elements. This tool is especially useful during the debugging and layout adjustment phases of web development.

## Features

- Metrics: Calculates and displays a wide array of metrics including absolute dimensions, aspect ratios, relative viewport and document positions, and spacings.
- Updates: Listens to page load, resize, and scroll events to update the metrics in real-time.
- Debug Visualization: Offers a visual overlay on elements with debug information to aid in quick assessment and adjustments.

## How It Works

1. **Initialization:** 
   1. Generates a random session ID to uniquely tag elements during that session.
   2. Attaches event listeners to the window to trigger information calculation on load, resize, and scroll.
2. **Calculating Object Information:** 
   1. Iterates over all elements with the attribute data-object-info.
   2. Computes various metrics such as element dimensions, aspect ratio, relative positions, and spacings.
   3. Updates elements with calculated information, which can be used for debugging or other purposes.
3. **Styling and Debugging:**
   1. Applies a set of styles to elements marked for debugging (`data-object-info-debug`). These styles make it easy to visually identify the dimensions and spacing of elements.
   2. Provides a detailed after-element content display showing all the calculated metrics for easy on-page reference.

## Installation

1. Copy the entire script.
2. Paste it into your project's main JavaScript file or include it as a separate script in your HTML via  
   ```html
   <script src="path/to/object-info.js" defer></script>
   ```
3. Make sure the script is laoded after the DOM is loaded, use `defer` if you out the `<head>` of your document

## Usage
1. **To enable the tool on an element:**
   - Add the attribute `data-oji` to any HTML element you want to inspect. This will set a single HTML Attribute which gives you a summary of the elements position and size in relation to the viewport and document itself.
2. **To view debugging visuals:**
   - Add the attribute `data-oji-debug` to the same element. This will activate the visual overlay with detailed metrics.
3. **To Animate or Style Elements**
   - Add the `data-oji-attributes` to the element and Object Info will set all values as HTML Attributes whioch can be used by some other JS as anchor attributes and behave a certain way

## Notes for Users

- Understanding Code: A basic understanding of HTML and JavaScript is sufficient to implement and utilize this tool effectively.
- Customization: The tool is designed to be customizable. You can modify the styles and the information displayed as per your needs.
- Performance: Keep in mind that adding debug information to a large number of elements can impact the performance of your page. Use it judiciously, especially on production sites.
- Troubleshooting
  - Not Working: Ensure the script is loaded correctly and the attributes are properly set on the elements.
  - Incorrect Information: Check for any errors in the console and ensure your page's CSS and JavaScript are not conflicting with the tool's operation.
