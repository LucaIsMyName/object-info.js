/**
 * oji.js
 * @version 1.0.0
 * @description 
 * A JavaScript snippet that adds data attributes to HTML elements 
 * with information about their size and position relative to the viewport and document.
 * Use this to Debug Elements or Style them 
 * upon relative or absolute values in relation
 * to the viewport or the document
 */
(function () {
    /**
     * Color Contrast
     */
    function getLuminance(rgb) {
        var a = [rgb.r, rgb.g, rgb.b].map(function (v) {
            v /= 255;
            return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
        });
        return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    }

    function getContrastRatio(color1, color2) {
        var luminance1 = getLuminance(color1);
        var luminance2 = getLuminance(color2);
        var brightest = Math.max(luminance1, luminance2);
        var darkest = Math.min(luminance1, luminance2);
        return (brightest + 0.05) / (darkest + 0.05);
    }

    function parseColor(inputColor) {
        var div = document.createElement('div');
        div.style.color = inputColor;
        document.body.appendChild(div);
        var m = getComputedStyle(div).color.match(/^rgb\s*\(\s*(\d+),\s*(\d+),\s*(\d+)\s*\)$/);
        document.body.removeChild(div);
        return m ? { r: m[1], g: m[2], b: m[3] } : null;
    }
    /**
     * Transform an JSON Object into a HTML Attribute friendly Syntax to render in the DOM Element
     * @param {*} json 
     * @returns 
     */
    function transformJsonToHTMLString(json) {
        let cssString = '';
        for (let section in json) {
            cssString += section + ': { ';
            for (let key in json[section]) {
                let cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase(); // Transform camelCase to kebab-case
                let value = json[section][key];
                // Ensure the value is properly formatted, especially if it's the last one
                cssString += `${cssKey}: ${value}` + (Object.keys(json[section])[Object.keys(json[section]).length - 1] === key ? '' : ', ');
            }
            cssString += ' }, ';
        }
        // Remove the trailing comma and space after the last section
        cssString = cssString.trim().slice(0, -1);
        return cssString;
    }

    /**
     * Transform an JSON Object into a HTML Content friendly Syntax to render in the DOM Element
     * @param {*} json 
     * @returns 
     */
    function prettifyObjectForHTML(json) {
        let htmlString = '<div style="white-space: pre;">'; // Use 'pre' for preformatted text
        const indent = '  '; // Define the indentation (two spaces in this case)

        function iterateObject(obj, level = 0) {
            let indentSpace = indent.repeat(level); // Calculate the current level indentation
            for (let section in obj) {
                htmlString += `${indentSpace}${section}: {<br>`; // Use <br> for line breaks
                for (let key in obj[section]) {
                    let cssKey = key.replace(/([A-Z])/g, '-$1').toLowerCase(); // Transform camelCase to kebab-case
                    let value = obj[section][key];
                    htmlString += `${indentSpace}${indent}${cssKey}: <b>${value}</b>;<br>`; // Append key-value pair with indentation
                }
                htmlString += `${indentSpace}},<br>`; // Close the section with indentation
            }
        }

        iterateObject(json); // Start iterating the JSON object
        htmlString += '</div>'; // Close the main container
        return htmlString;
    }

    /**
     * randomId
     * @description A random number used to identify the elements with the data-object-info-debug attribute.
     */
    randomId = Math.floor(Math.random() * 9999);

    /**
     * calculateObjectInfo
     * @description Calculates the object info and adds the data attributes to the elements.
     * @returns {void}
     */
    function calculateObjectInfo() {

        /**
         * elements
         * @description An array of all elements with the data-object-info attribute.
         */
        var elements = document.querySelectorAll('[data-object-info], [data-oji]');

        /**
         * style
         * @description A style tag that contains the CSS for the data-object-info-debug attribute.
         */
        style = document.createElement('style');

        /**
         * style
         * @description A style tag that contains the CSS for the data-object-info-debug attribute.
         */
        style.textContent = `
        :root {
            --oji-max-width: min(300px, 100%);
        }
        :is([data-object-info-debug], [data-oji-debug])[data-object-info-id],  {
            position: relative;
            outline-width: 3px;
            outline-style: solid;
            outline-offset: -1.5px;
            box-shadow: 0 0 1rem rgba(0,0,0,0.33);
        }
       
        :is([data-object-info-debug], [data-oji-debug]) .object-info-debug-container {
            opacity: 0.66;
            position: absolute;
            top: 0.5rem;
            left: 0.5rem;
            right: 0.5rem;
            padding: 1em;
            border-radius: 0.5em;
            background-color: #ffffffb3;
            color: #000;
            backdrop-filter: blur(0.5em);
            text-shadow: 0.05em 0.05em 0.1em rgba(0,0,0,0.5);
            box-shadow: 0 0 0.1em rgba(0,0,0,0.5);
            max-width: min(100%, var(--oji-max-width));
            max-height: calc(100% - 1rem);
            word-break: break-word;
            font-size: 0.66rem;
            line-height: 1.25;
            font-family: monospace;
            z-index: 9999;
            text-shadow: 0 0 1px rgba(0,0,0, 0.33);       
            overflow:scroll   ;
            min-height: calc(var(--oji-max-width) / 2)
        }
        :is([data-object-info-debug], [data-oji-debug]) .object-info-debug-container:hover {
            opacity: 1;
        }
        @media (prefers-color-scheme: dark) {
            :is([data-object-info-debug], [data-oji-debug]) {
                box-shadow: 0 0 1rem rgba(255,255,255,0.33);

            }
            :is([data-object-info-debug], [data-oji-debug]) .object-info-debug-container {
                background-color: #000000b3;
                color: #fff;
                
            }
        }`;
        document.head.appendChild(style);

        /**
         * @description Loops through all elements with the data-object-info attribute and calculates the object info.
         */
        for (var i = 0; i < elements.length; i++) {
            /**
             * el
             * @description The current element in the loop.
             */
            var el = elements[i];
            /**
             * Scroll Position
             */
            var scrollX = window.scrollX;
            var scrollY = window.scrollY;
            /**
             * style
             * @description The computed style of the current element in the loop.
             */
            var style = window.getComputedStyle(el);

            /**
             * widthPx & heightPx
             * @description The width and height of the current element in pixels.
             */
            var widthPx = parseFloat(style.width);
            var heightPx = parseFloat(style.height);
            /**
             * roundedWidth & roundedHeight
             * @description The width of the current element in pixels rounded to the nearest integer.
             */
            var roundedWidth = Math.round(widthPx);
            var roundedHeight = Math.round(heightPx);

            /**
             * DocWidth & DocHeight
             * @description The width and height of the document in pixels.
             */
            var DocWidth = document.documentElement.scrollWidth;
            var DocHeight = document.body.scrollHeight;

            /**
            * docWidthRelative & docHeightRelative
            * @description The width of the current element in pixels relative to the document.
            */
            var docWidthRelative = Math.round((100 / DocWidth * roundedWidth));
            var docHeightRelative = Math.round((100 / DocHeight * roundedHeight));

            /**
             * viewPortWidth & viewPortHeight
             * @description The width and height of the viewport in pixels.
             */
            var viewPortWidth = window.innerWidth;
            var viewPortHeight = window.innerHeight;


            /**
             * viewPortWidthRelative & viewPortHeightRelative
             * @description The width and height of the current element in pixels relative to the viewport.
             */
            var viewPortWidthRelative = Math.round((100 / viewPortWidth * widthPx));
            var viewPortHeightRelative = Math.round((100 / viewPortHeight * heightPx));

            /**
             * Get the boundaries of the el
             */
            var rect = el.getBoundingClientRect();
            /**
             * toViewport
             * @description The distance from the edge of the viewport to the edge of the current element in pixels.
             */
            var topToViewport = rect.top;
            var rightToViewport = window.innerWidth - rect.right;
            var bottomToViewport = window.innerHeight - rect.bottom;
            var leftToViewport = rect.left;
            /**
             * spacingsToViewport
             * @description The distance from the edge of the viewport to the edge of the current element in pixels rounded to the nearest integer.
             */
            var spacingLeft = Math.round(leftToViewport);
            var spacingRight = Math.round(rightToViewport);
            var spacingTop = Math.round(topToViewport);
            var spacingBottom = Math.round(bottomToViewport);
            /**
             * spacingLeftViewportRelative
             * @description The distance from the edge of the viewport to the edge of the current element in pixels relative to the viewport.
             */
            var spacingLeftViewportRelative = Math.round((100 / viewPortWidth * spacingLeft));
            var spacingRightViewportRelative = Math.round((100 / viewPortWidth * spacingRight));
            var spacingTopViewportRelative = Math.round((100 / viewPortHeight * spacingTop));
            var spacingBottomViewportRelative = Math.round((100 / viewPortHeight * spacingBottom));
            /**
             * spacingLeftDocRelative
             * @description The distance from the left edge of the viewport to the left edge of the current element in pixels relative to the document.
             */
            var spacingLeftDocRelative = Math.round((100 / DocWidth) * (leftToViewport + scrollX));
            var spacingRightDocRelative = Math.round(100 - ((leftToViewport + scrollX + widthPx) * 100 / DocWidth));
            var spacingTopDocRelative = Math.round((100 / DocHeight) * (topToViewport + scrollY));
            var spacingBottomDocRelative = Math.round(100 - ((topToViewport + scrollY + heightPx) * 100 / DocHeight));
            var spacingLeftDocPx = Math.round(leftToViewport + scrollX);
            var spacingRightDocPx = Math.round(DocWidth - (leftToViewport + scrollX + widthPx));
            var spacingTopDocPx = Math.round(topToViewport + scrollY);
            var spacingBottomDocPx = Math.round(DocHeight - (topToViewport + scrollY + heightPx));

            /**
             * Styling Parameters
             */
            var elementStyles = window.getComputedStyle(el);
            var fontSize = parseInt(elementStyles.getPropertyValue('font-size'));
            var fontSizePx = fontSize;
            var fontSizeRem = fontSize / 16;
            var fontSizeVw = parseFloat(100 / viewPortWidth * fontSize).toFixed(2);
            var fontFamily = `${elementStyles.getPropertyValue('font-family')}`;
            var color = `${elementStyles.getPropertyValue('color')}`;
            var backgroundColor = `${elementStyles.getPropertyValue('background-color')}`;
            var rgbColor = parseColor(color);
            var rgbBackgroundColor = parseColor(backgroundColor);
            var colorContrastRatio = getContrastRatio(rgbColor, rgbBackgroundColor).toFixed(2);
            /**
             * Store all the calculated Values in a global objet to call
             * from there in the UI
             * 
             */
            let oji = {
                object: {
                    absoluteWidth: `${roundedWidth}px`,
                    absoluteHeight: `${roundedHeight}px`,
                    aspectRatio: `1:${(widthPx / heightPx).toFixed(2)}`,
                    fontSizePx: fontSizePx + 'px',
                    fontSizeRem: fontSizeRem + 'rem',
                    fontSizeVw: fontSizeVw + 'vw',
                    fontFamily: fontFamily,
                    color: color,
                    backgroundColor: backgroundColor,
                    colorContrast: colorContrastRatio,

                },
                viewport: {
                    absoluteViewportWidth: `${viewPortWidth}px`,
                    absoluteViewportHeight: `${viewPortHeight}px`,
                    aspectRatio: `1:${(viewPortWidth / viewPortHeight).toFixed(2)}`,
                    relativeObjectWidth: `${viewPortWidthRelative}%`,
                    relativeObjectHeight: `${viewPortHeightRelative}%`,
                    relativeSpacingTop: `${spacingTopViewportRelative}%`,
                    relativeSpacingRight: `${spacingRightViewportRelative}%`,
                    relativeSpacingBottom: `${spacingBottomViewportRelative}%`,
                    relativeSpacingLeft: `${spacingLeftViewportRelative}%`,
                    absoluteSpacingTop: `${Math.round(topToViewport)}px`,
                    absoluteSpacingRight: `${Math.round(rightToViewport)}px`,
                    absoluteSpacingBottom: `${Math.round(bottomToViewport)}px`,
                    absoluteSpacingLeft: `${Math.round(leftToViewport)}px`,
                },
                document: {
                    absoluteDocWidth: `${DocWidth}px`,
                    absoluteDocHeight: `${DocHeight}px`,
                    aspectRatio: `1:${(DocWidth / DocHeight).toFixed(2)}`,
                    relativeObjectWidth: `${docWidthRelative}%`,
                    relativeObjectHeight: `${docHeightRelative}%`,
                    relativeSpacingTop: `${spacingTopDocRelative}%`,
                    relativeSpacingRight: `${spacingRightDocRelative}%`,
                    relativeSpacingBottom: `${spacingBottomDocRelative}%`,
                    relativeSpacingLeft: `${spacingLeftDocRelative}%`,
                    absoluteSpacingTop: `${spacingTopDocPx}px`,
                    absoluteSpacingRight: `${spacingRightDocPx}px`,
                    absoluteSpacingBottom: `${spacingBottomDocPx}px`,
                    absoluteSpacingLeft: `${spacingLeftDocPx}px`,
                }
            };
            console.log(oji);
            transformedObject = transformJsonToHTMLString(oji);

            const object = oji.object;
            const viewport = oji.viewport;
            const doc = oji.document;
            /**
             * @description Adds the data attributes to the current element in the loop
             * if the attribute [data-object-info-attributes] is set
             */
            if (el.hasAttribute('data-object-info-styles') || el.hasAttribute('data-oji-styles')) {
                el.setAttribute('data-oji-object-style-font-size-px', object.fontSizePx);
                el.setAttribute('data-oji-object-style-font-size-rem', object.fontSizeRem);
                el.setAttribute('data-oji-object-style-font-size-vw', object.fontSizeVw);
            }

            if (el.hasAttribute('data-object-info-attributes') || el.hasAttribute('data-oji-attributes')) {

                el.setAttribute('data-oji-absolute-width', object.absoluteWidth);
                el.setAttribute('data-oji-absolute-height', object.absoluteHeight);
                el.setAttribute('data-oji-aspect-ratio', '1/' + object.aspectRatio);

                /** Viewport Related */
                el.setAttribute('data-oji-viewport-absolute-width', viewport.absoluteViewportWidth);
                el.setAttribute('data-oji-viewport-absolute-height', viewport.absoluteViewportHeight);
                el.setAttribute('data-oji-viewport-aspect-ratio', viewport.aspectRatio);
                el.setAttribute('data-oji-viewport-relative-object-width', viewport.relativeObjectWidth);
                el.setAttribute('data-oji-viewport-relative-object-height', viewport.relativeObjectHeight);
                el.setAttribute('data-oji-viewport-relative-to-top', viewport.relativeSpacingTop);
                el.setAttribute('data-oji-viewport-relative-to-right', viewport.relativeSpacingRight);
                el.setAttribute('data-oji-viewport-relative-to-bottom', viewport.relativeSpacingBottom);
                el.setAttribute('data-oji-viewport-relative-to-left', viewport.relativeSpacingBottom);
                el.setAttribute('data-oji-viewport-absolute-to-top', viewport.absoluteSpacingTop);
                el.setAttribute('data-oji-viewport-absolute-to-right', viewport.absoluteSpacingRight);
                el.setAttribute('data-oji-viewport-absolute-to-bottom', viewport.absoluteSpacingBottom);
                el.setAttribute('data-oji-viewport-absolute-to-left', viewport.absoluteSpacingLeft);

                /** Document Related */
                el.setAttribute('data-oji-doc-absolute-width', doc.absoluteDocWidth);
                el.setAttribute('data-oji-doc-absolute-height', doc.absoluteDocHeight);
                el.setAttribute('data-oji-doc-aspect-ratio', doc.aspectRatio);
                el.setAttribute('data-oji-doc-relative-object-width', doc.relativeObjectWidth);
                el.setAttribute('data-oji-doc-relative-object-height', doc.relativeObjectHeight);
                el.setAttribute('data-oji-doc-relative-to-top', doc.relativeSpacingTop);
                el.setAttribute('data-oji-doc-relative-to-right', doc.relativeSpacingRight);
                el.setAttribute('data-oji-doc-relative-to-bottom', doc.relativeSpacingBottom);
                el.setAttribute('data-oji-doc-relative-to-left', doc.relativeSpacingLeft);
                el.setAttribute('data-oji-doc-absolute-to-top', doc.absoluteSpacingTop);
                el.setAttribute('data-oji-doc-absolute-to-right', doc.absoluteSpacingRight);
                el.setAttribute('data-oji-doc-absolute-to-bottom', doc.absoluteSpacingBottom);
                el.setAttribute('data-oji-doc-absolute-to-left', doc.absoluteSpacingLeft);
            }

            /**
             * @description Adds the data-object-info attribute to the current element in the loop.
             * get this data from the trabsfoned JSON, not the the Old Approch with the string
             */
            el.setAttribute('data-oji-summary', transformedObject);
            /**
             * @description Adds the data-object-info-id attribute to the current element in the loop.
             */
            if (el.hasAttribute('data-object-info-debug') || el.hasAttribute('data-oji-debug')) {

                var existingDebugBox = el.querySelector('.object-info-debug-container');

                /**
                 * randomNumberR
                 * @description A random number between 0 and 255 to create a unique Color Outline for each debugged Box
                 */
                const randomNumberR = Math.floor(Math.random() * 256), randomNumberG = Math.floor(Math.random() * 256), randomNumberB = Math.floor(Math.random() * 256);
                // Create a new div element for the debug box

                var debugBox = document.createElement('div');
                debugBox.setAttribute('class', 'object-info-debug-container');
                el.style.outlineColor = `rgba(${randomNumberR}, ${randomNumberG}, ${randomNumberB}, 0.33)`;
                // Check if the debug box already exists
                if (!existingDebugBox) {
                    // If it doesn't exist, create a new debug box
                    var debugBox = document.createElement('div');
                    debugBox.setAttribute('class', 'object-info-debug-container');
                    // ... [remaining debug box style and properties setup]
                    el.appendChild(debugBox); // Append the new debug box
                } else {
                    // If it exists, use the existing debug box
                    var debugBox = existingDebugBox;
                }

                // Set the content of the debug box
                debugBox.innerHTML = `<code>${prettifyObjectForHTML(oji)}</code>`;

                // Append the debug box to the current element
                el.style.position = 'relative'; // Ensure the parent is positioned
                el.appendChild(debugBox);

                // Set the unique data-object-info-id
                el.setAttribute('data-object-info-id', `${randomId}-${i}`);

                /**
                 * 1. Create a div inside the .object-info-debug-container
                 * 2. give an onclick event listener that copies the JSON
                 * Object to the clipboard
                 */

            }
        }
    }
    /**
     * debounce
     * @description A function that delays the execution of the input function until after a specified wait time has elapsed since the last time it was invoked.
     * @param {Function} func - The function to debounce.
     * @param {number} wait - The number of milliseconds to delay.
     * @returns {Function}
     */
    function debounce(func, wait) {
        var timeout;

        // This is the function that is returned and will be called many times
        return function executedFunction() {
            // The context and args are the scope (this) and parameters for the function
            var context = this;
            var args = arguments;

            // The function to be called after the debounce time has elapsed
            var later = function () {
                // null the timeout to indicate the debounce ended
                timeout = null;
                // Execute the function
                func.apply(context, args);
            };

            // This will reset the waiting every function execution. This is the reason for the debounce behavior.
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    };

    // Debounced version of calculateObjectInfo with a 250ms wait time
    var debouncedCalculateObjectInfo = debounce(calculateObjectInfo, 200);

    // Call the debounced function instead of calculateObjectInfo directly on events
    window.addEventListener('load', debouncedCalculateObjectInfo);
    window.addEventListener('resize', debouncedCalculateObjectInfo);
    window.addEventListener('scroll', debouncedCalculateObjectInfo);


})();
