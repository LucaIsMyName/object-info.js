/* ------------------------------------------------------------------------
 * ------------------------------------------------------------------------
 * @name oji.js
 * @version 1.0
 * @description 
 * A JavaScript snippet that adds data attributes to HTML elements 
 * with information about their size and position 
 * relative to the viewport and document.
 * Use this to Debug Elements or Style them 
 * upon relative or absolute values in relation
 * to the viewport or the document
 * ------------------------------------------------------------------------
 * ------------------------------------------------------------------------
 */

let getOji = { global: {}, elements: {}, finished: function () { } };



(function () {

    /**-------------------------------------------------- 
     * INTERNAL FUNCTIONS
     * --------------------------------------------------*/

    /**
     * @name camelToKebabCase
     * @param {string} str 
     * @returns 
     */

    function camelToKebabCase(str = "TestString") {
        return str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase(); // Transform camelCase to kebab-case
    }

    /**
     * @name kebabToCamelCase
     * @param {string} str 
     * @returns {string} str
     */

    function kebabToCamelCase(str = "test-string") {
        return str.replace(/-./g, (match) => match.charAt(1).toUpperCase());
    }

    /**------------------------------------
     * Make Objects HTML and 
     * Pretittified Text Strings
    ------------------------------------ */
    /**
     * @name transformJsonToHTMLString
     * @param {object} json 
     * @returns {string} cssString
     * Transform an JSON Object into a HTML Attribute friendly Syntax to render in the DOM Element
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
     * @name prettifyObjectForHTML
     * @param {object} json 
     * @returns {string} htmlString
     * Transform an JSON Object into a HTML Content friendly Syntax to render in the DOM Element
     */
    function prettifyObjectForHTML(json) {
        let htmlString = '<div style="white-space: pre;">'; // Use 'pre' for preformatted text
        const indent = '    '; // Define the indentation (two spaces in this case)

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
     * @name getUserAgentFontSize
     * @returns {float} userAgentFontSize
     */
    function getUserAgentFontSize() {
        let tempEl = document.createElement('div');
        tempEl.style.display = 'none';
        document.body.appendChild(tempEl);
        let userAgentFontSize = parseFloat(window.getComputedStyle(tempEl).fontSize);
        document.body.removeChild(tempEl);
        // document.body.getAttribute(`data-${ojiAtt}-debug-active`) === 'true' ? console.log('Default font size:', userAgentFontSize) : null;
        return userAgentFontSize;
    }

    /**
     * @name enableOji
     * @description
     * Function to enable the oji.js functionality
     * @returns {void}
     */

    function enableOji() {
        // document.querySelector(`[data-${ojiAtt}-active]`)
        //     .setAttribute(`data-${ojiAtt}-debug-active`, 'true');
        calculateObjectInfo();
    }


    /**
     * @handleAttributeChange
     * @param {array} mutationsList
     * @returns {void}
     * @description
     * if oji.js calculatiuon is finished and rendered to the DOM
     * now set interactions like:
     * 1. if some js changes the [data-oji-attributes-active] on the <body>
     * all attributes get removed from the DOM,
     * if it's set to "true" again it applies them again
     * 
     * { WORK IN PROGRESS }
     * Listen to global events on the body that change the 
     * [data-oji-active], [data-oji-attributes-active] & [dataoji-debug-active] bools
     * to true
     */

    function handleAttributeChange(mutationsList) {
        for (let mutation of mutationsList) {
            if (mutation.type === 'attributes') {
                // console.log(`The ${mutation.attributeName} attribute was modified.`);
                const attrValue = body.getAttribute(mutation.attributeName);
                switch (mutation.attributeName) {
                    case `data-${ojiAtt}-attributes-active`:
                        attrValue === `false` ? disableOjiAttributes() : enableOjiAttributes();
                        break;
                    case `data-${ojiAtt}-debug-active`:
                        attrValue === `false` ? disableOjiDebug() : enableOjiDebug();
                        break;
                    case `data-${ojiAtt}-active`:
                        attrValue === `false` ? disableOji() : enableOji();
                        break;
                }
            }
        }
    }

    /**
     * @name getOrCreateRandomId
     * @returns {number} randomId
     * @description
     * Get a random number between 0 and 9999
     */
    function getOrCreateRandomId() {
        randomId = Math.floor(Math.random() * 9999);
    }

    /**
     * @name enableOjiAttributes
     * @returns {void}
     * @description
     * Function to enable the oji attributes functionality
     * This would re-calculate and apply all the necessary 
     * attributes to each element.
     */
    function enableOjiAttributes() {

        // console.log('oji attributes functionality enabled');
        // body.setAttribute(`data-${ojiAtt}-attributes-active`, 'true'); 

        /** 
         * If you have a function that originally calculates 
         * and applies the oji attributes, call it here.
         * This would re-calculate and apply all the 
         * necessary attributes to each element.*/
        calculateObjectInfo();  // Assuming this is your initial function that applies oji attributes.
    }

    /**
     * @name disableOjiAttributes
     * @returns {void}
     * @description
     * Function to disable the oji attributes functionality
     * This would remove all the oji attributes from each element.
     */
    function disableOjiAttributes() {
        // console.log('oji attributes functionality disabled');
        // Remove all oji attributes from elements, except for specific ones
        document.querySelectorAll(`[data-${ojiAtt}]`).forEach(el => {
            // Get all attributes of the element
            Array.from(el.attributes).forEach(attr => {
                /**
                 *  Check if the attribute starts 
                 * with `data-oji-` and is not one
                 * of the exceptions 
                 */
                if (attr.name.startsWith(`data-${ojiAtt}-`) && ![
                    `data-${ojiAtt}-debug`,
                    `data-${ojiAtt}-summary`,
                    `data-${ojiAtt}-attributes`,
                    `data-${ojiAtt}-id`
                ].includes(attr.name)) {

                    /** 
                     * Remove the attribute
                     */

                    // console.log('Removing:', attr.name);
                    el.removeAttribute(attr.name);
                }
            });
        });
    }

    /**
     * @name santizeAttributeValue
     * @param {string} value 
     * @returns {string} value
     * @description
     * Remove the 'px', '%', 'rem' and 'vw' units from a value
     */

    function santizeAttributeValue(value) {
        return value
            .replace('px', '')
            .replace('%', '')
            .replace('rem', '')
            .replace('vw', '');
    }

    /**
     * @name getLuminance
     * @param {array} rgb 
     * @returns {float}
     * @description
     * Calculate the luminance of a color
     * @see {@link https://www.w3.org/TR/WCAG20/#relativeluminancedef}
     */
    function getLuminance(rgb = [128, 128, 128]) {
        let a = rgb.map(function (v) {
            v /= 255;
            return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
        });
        return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    }

    /**
     * @name getContrastRatio
     * @param {string} color1 
     * @param {string} color2 
     * @returns {number} contrastRatio
     * @description
     * Calculate the contrast ratio between two colors
     * @see {@link https://www.w3.org/TR/WCAG20/#contrast-ratiodef}
     */
    function getContrastRatio(color1, color2) {
        let luminance1 = getLuminance(color1);
        let luminance2 = getLuminance(color2);
        let brightest = Math.max(luminance1, luminance2);
        let darkest = Math.min(luminance1, luminance2);
        return (brightest + 0.05) / (darkest + 0.05);
    }

    /**
     * @name parseColor
     * @param {*} color 
     * @returns {array} rgb
     * @description
     * Parse a color string into an array of RGB values
     * @see {@link https://stackoverflow.com/a/21648508}
     */

    function parseColor(color) {
        if (color === 'transparent' || color === 'none') {
            color = 'rgb(255, 255, 255)'; // Default to white if transparent or none
        }
        let rgb = color.match(/\d+/g).map(Number);
        return rgb;
    }

    /**
     * @name calculateObjectInfo
     * @description 
     * Calculates the object info and adds 
     * the data attributes to the elements.
     * @returns {void}
     */
    function calculateObjectInfo() {
        if (document.body.getAttribute(`data-${ojiAtt}-active`) === 'true') {

            /**
             * elements
             * @description 
             * An array of all elements with the 
             * [data-oji] attribute.
             */
            let elements = document.querySelectorAll(`[data-${ojiAtt}]`);

            /**
             * @description 
             * Loops through all elements with the 
             * [data-oji] attribute and calculates 
             * the object info.
             */
            for (var i = 0; i < elements.length; i++) {
                let initialOji = getOji;
                /**
                 * @name el
                 * @description The current element 
                 * in the loop.
                 */
                let el = elements[i];

                /**
                 * @description
                 * Conditional checks for attributes 
                 * - [oji-attributes]
                 * - [oji-debug]
                 * - [oji-styles]
                 */

                let checkAttributes = el.hasAttribute(`data-${ojiAtt}-attributes`) || el.hasAttribute(`data-${config.slug.long}-attributes`) || el.hasAttribute(`data-${config.slug.short}-attributes`);
                let checkDebug = el.hasAttribute(`data-${ojiAtt}-debug`) || el.hasAttribute(`data-${config.slug.long}-debug`) || el.hasAttribute(`data-${config.slug.short}-debug`);
                let checkSummary = el.getAttribute(`data-${ojiAtt}-summary`);
                let bodySummaryActive = document.body.getAttribute(`data-${ojiAtt}-summary-active`);

                /**
                 * 
                 * @description
                 * This part of the Software Calculates and fetches
                 * the actual values thar are displayed as attributes 
                 * and elements (debug)
                 * 
                 */
                /**
                 * Scroll Position
                 */
                let scrollX = window.scrollX;
                let scrollY = window.scrollY;

                /**
                 * style
                 * @description 
                 * The computed style of the 
                 * current element in the loop.
                 */
                let style = window.getComputedStyle(el);

                /**
                 * widthPx & heightPx
                 * @description 
                 * The width and height of the 
                 * current element in pixels.
                 */
                let widthPx = parseFloat(style.width);
                let heightPx = parseFloat(style.height);
                /**
                 * roundedWidth & roundedHeight
                 * @description 
                 * The width of the current element 
                 * in pixels rounded to the 
                 * nearest integer.
                 */
                let roundedWidth = Math.round(widthPx);
                let roundedHeight = Math.round(heightPx);

                /**
                 * DocWidth & DocHeight
                 * @description 
                 * The width and height of 
                 * the document in pixels.
                 */
                let DocWidth = document.documentElement.scrollWidth;
                let DocHeight = document.body.scrollHeight;

                /**
                * docWidthRelative & docHeightRelative
                * @description 
                * The width of the current element 
                * in pixels relative to the document.
                */
                let docWidthRelative = (100 / DocWidth * roundedWidth).toFixed(1);
                let docHeightRelative = (100 / DocHeight * roundedHeight).toFixed(1);

                /**
                 * viewPortWidth & viewPortHeight
                 * @description 
                 * The width and height of the
                 * viewport in pixels.
                 */
                let viewPortWidth = window.innerWidth;
                let viewPortHeight = window.innerHeight;

                /**
                 * viewPortWidthRelative & viewPortHeightRelative
                 * @description 
                 * The width and height of the current 
                 * element in pixels relative to the 
                 * viewport.
                 */
                let viewPortWidthRelative = (100 / viewPortWidth * widthPx).toFixed(2);
                let viewPortHeightRelative = (100 / viewPortHeight * heightPx).toFixed(2);

                /**
                 * @name rect
                 * @description
                 * Get the boundaries of the el
                 */
                let rect = el.getBoundingClientRect();

                /**
                 * @name toViewport
                 * @description 
                 * The distance from the edge 
                 * of the viewport to the edge of the 
                 * current element in pixels.
                 */
                let topToViewport = rect.top;
                let rightToViewport = window.innerWidth - rect.right;
                let bottomToViewport = window.innerHeight - rect.bottom;
                let leftToViewport = rect.left;

                /**
                 * @name spacingViewportRelative
                 * @description The distance from the edge of the viewport to the edge of the current element in pixels relative to the viewport.
                 */
                let spacingLeftViewportRelative = (100 / viewPortWidth * leftToViewport).toFixed(2);
                let spacingRightViewportRelative = (100 / viewPortWidth * rightToViewport).toFixed(2);
                let spacingTopViewportRelative = (100 / viewPortHeight * topToViewport).toFixed(2);
                let spacingBottomViewportRelative = (100 / viewPortHeight * bottomToViewport).toFixed(2);

                /**
                 * spacingsDoc
                 * @description The distance from the left edge of the viewport to the left edge of the current element in pixels relative to the document.
                 */
                let spacingLeftDocRelative = ((100 / DocWidth) * (leftToViewport + scrollX)).toFixed(2);
                let spacingRightDocRelative = (100 - ((leftToViewport + scrollX + widthPx) * 100 / DocWidth)).toFixed(2);
                let spacingTopDocRelative = ((100 / DocHeight) * (topToViewport + scrollY)).toFixed(2);
                let spacingBottomDocRelative = (100 - ((topToViewport + scrollY + heightPx) * 100 / DocHeight)).toFixed(2);
                let spacingLeftDocPx = leftToViewport + scrollX;
                let spacingRightDocPx = DocWidth - (leftToViewport + scrollX + widthPx);
                let spacingTopDocPx = topToViewport + scrollY;
                let spacingBottomDocPx = DocHeight - (topToViewport + scrollY + heightPx);

                /**
                 * @elementStyles
                 * Styling Parameters
                 * Font Size, Family, Color 
                 * and BG Colors
                 */
                let elementStyles = window.getComputedStyle(el);
                let fontSize = parseInt(elementStyles.getPropertyValue('font-size'));
                let fontSizePx = fontSize;
                let fontSizeRem = fontSize / 16;
                let fontSizeVw = parseFloat(100 / viewPortWidth * fontSize).toFixed(2);
                let fontFamily = `${elementStyles.getPropertyValue('font-family')}`;
                let color = `${elementStyles.getPropertyValue('color')}`;
                let backgroundColor = `${elementStyles.getPropertyValue('background-color')}`;
                let rgbColor = parseColor(color);
                let rgbBackgroundColor = parseColor(backgroundColor);
                let colorContrastRatio = getContrastRatio(rgbColor, rgbBackgroundColor).toFixed(2);
                if (backgroundColor === 'transparent' || backgroundColor === 'none') {
                    backgroundColor = 'white';
                }

                if (color === 'transparent' || color === 'none') {
                    color = 'white';
                }
                /**
                 * Calc the Area of an Element
                 */
                let viewportArea = viewPortWidth * viewPortHeight;
                let documentArea = DocWidth * DocHeight;
                let elementArea = widthPx * heightPx;

                /**
                 * Calc the Area visible inside the 
                 * viewport of an oji element
                 */

                let leftEdgeInsideViewport = Math.max(spacingLeftDocPx, 0);
                let rightEdgeInsideViewport = Math.min(spacingLeftDocPx + widthPx, viewPortWidth);
                let visibleWidth = Math.max(0, rightEdgeInsideViewport - leftEdgeInsideViewport);
                let topEdgeInsideViewport = Math.max(topToViewport, 0);
                let bottomEdgeInsideViewport = Math.min(topToViewport + heightPx, viewPortHeight);
                let visibleHeight = Math.max(0, bottomEdgeInsideViewport - topEdgeInsideViewport);
                let visibleArea = visibleWidth * visibleHeight;
                let percentageVisible = (visibleArea / elementArea * 100).toFixed(2);

                /**
                * Calc the Area visible inside the document of an oji element
                */

                let leftEdgeInsideDoc = Math.max(spacingLeftDocPx, 0);
                let rightEdgeInsideDoc = Math.min(spacingLeftDocPx + widthPx, DocWidth);
                let visibleWidthDoc = Math.max(0, rightEdgeInsideDoc - leftEdgeInsideDoc);
                let topEdgeInsideDoc = Math.max(spacingTopDocPx, 0);
                let bottomEdgeInsideDoc = Math.min(spacingTopDocPx + heightPx, DocHeight);
                let visibleHeightDoc = Math.max(0, bottomEdgeInsideDoc - topEdgeInsideDoc);
                let visibleAreaDoc = visibleWidthDoc * visibleHeightDoc;
                let percentageVisibleDoc = (visibleAreaDoc / elementArea * 100).toFixed(2);

                /**
                 * 
                 * @param {object} oji
                 * store all the calculated Values in a 
                 * global objet to render from 
                 * there in the UI
                 * 
                 */
                //  const id = el.getAttribute(`data-${ojiAtt}-id`) || `oji-${Math.random().toString(36).substr(2, 9)}`;
                //  el.setAttribute(`data-${ojiAtt}-id`, id);
                //  updateOjiObject(el, id, i);

                let oji = {
                    info: {
                        name: config.info.name,
                        id: randomId + '-' + i,
                        attribute: config.attribute,
                        slug: config.slug,
                    },
                    object: {
                        absoluteWidth: `${roundedWidth}px`,
                        absoluteHeight: `${roundedHeight}px`,
                        aspectRatio: `1:${(widthPx / heightPx).toFixed(2)}`,
                        relativeAreaOfViewport: ((elementArea / viewportArea) * 100).toFixed(2) + '%',
                        relativeAreaInViewportVisible: `${percentageVisible}%`,
                        relativeAreaOfDocument: ((elementArea / documentArea) * 100).toFixed(2) + '%',
                        relativeAreaInDocumentVisible: `${percentageVisibleDoc}%`,
                        fontSizePx: fontSizePx + 'px',
                        fontSizeRem: fontSizeRem + 'rem',
                        fontSizeVw: fontSizeVw + 'vw',
                        fontFamily: fontFamily,
                        color: color,
                        backgroundColor: backgroundColor,
                        colorContrast: colorContrastRatio,
                    },
                    viewport: {
                        absoluteWidth: `${viewPortWidth}px`,
                        absoluteHeight: `${viewPortHeight}px`,
                        aspectRatio: `1:${(viewPortWidth / viewPortHeight).toFixed(2)}`,
                        relativeObjectWidth: `${viewPortWidthRelative}%`,
                        relativeObjectHeight: `${viewPortHeightRelative}%`,
                        relativeSpacingToObjectTop: `${spacingTopViewportRelative}%`,
                        relativeSpacingToObjectRight: `${spacingRightViewportRelative}%`,
                        relativeSpacingToObjectBottom: `${spacingBottomViewportRelative}%`,
                        relativeSpacingToObjectLeft: `${spacingLeftViewportRelative}%`,
                        absoluteSpacingToObjectTop: `${Math.round(topToViewport)}px`,
                        absoluteSpacingToObjectRight: `${Math.round(rightToViewport)}px`,
                        absoluteSpacingToObjectBottom: `${Math.round(bottomToViewport)}px`,
                        absoluteSpacingToObjectLeft: `${Math.round(leftToViewport)}px`,
                    },
                    document: {
                        absoluteWidth: `${DocWidth}px`,
                        absoluteHeight: `${DocHeight}px`,
                        aspectRatio: `1:${(DocWidth / DocHeight).toFixed(2)}`,
                        relativeObjectWidth: `${docWidthRelative}%`,
                        relativeObjectHeight: `${docHeightRelative}%`,
                        relativeSpacingToObjectTop: `${spacingTopDocRelative}%`,
                        relativeSpacingToObjectRight: `${spacingRightDocRelative}%`,
                        relativeSpacingToObjectBottom: `${spacingBottomDocRelative}%`,
                        relativeSpacingToObjectLeft: `${spacingLeftDocRelative}%`,
                        absoluteSpacingToObjectTop: `${Math.round(spacingTopDocPx)}px`,
                        absoluteSpacingToObjectRight: `${Math.round(spacingRightDocPx)}px`,
                        absoluteSpacingToObjectBottom: `${Math.round(spacingBottomDocPx)}px`,
                        absoluteSpacingToObjectLeft: `${Math.round(spacingLeftDocPx)}px`,
                    }
                };

                getOji.elements[parseInt(i)] = oji;

                /**
                 * @description Adds the data attributes to the 
                 * current element in the loop if the attribute 
                 * [data-oji-attributes] is set
                 */
                if (checkAttributes && document.body.getAttribute('data-oji-attributes-active') === "true") {
                    ['object', 'viewport', 'document'].forEach(section => {
                        for (const [key, value] of Object.entries(oji[section])) {
                            // Transform camelCase keys to kebab-case for attributes
                            const attributeKey = camelToKebabCase(key);
                            el.setAttribute(
                                `data-${ojiAtt}-${section}-${attributeKey}`,
                                santizeAttributeValue(value)
                            );
                        }
                    });
                }

                /*
                 * ------------------------------------------------------------------------
                 * { WORK IN PROGRESS }
                 * @description 
                 * Checks if the data-oji-summary is not set to false and
                 * gets this data from the stringified JSON from transformJsonToHTMLString()
                 * ------------------------------------------------------------------------
                 * ------------------------------------------------------------------------*/
                if (checkSummary !== 'false') {
                    el.setAttribute(`data-${ojiAtt}-summary`, transformJsonToHTMLString(oji));
                }

                /*
                 * ------------------------------------------------------------------------
                 * @description 
                 * Check if data-oji-debug is set and 
                 * add the data-oji-id attribute to the current element 
                 * in the loop and display debig overlays
                 * ------------------------------------------------------------------------
                 ------------------------------------------------------------------------*/

                // if (checkDebug) {
                if (document.body.getAttribute(`data-${ojiAtt}-debug-active`) === 'true') {
                    if (checkDebug) {
                        let debugBox = el.querySelector(`.${ojiAtt}-debug-container`);
                        // document.querySelector(`[data-${ojiAtt}-debug-active]`).setAttribute(`data-${ojiAtt}-debug-active`, 'true')

                        if (checkIfOjiDebugIsPresent === 'false') {
                            debugBox.remove();
                            return;
                        }

                        /** ------------------------------------
                         * Check if the debug 
                         * box already exists  
                         ------------------------------------*/

                        if (!debugBox) {
                            debugBox = document.createElement('div');
                            debugBox.setAttribute('class', `${ojiAtt}-debug-container`);
                            el.appendChild(debugBox);
                        }
                        debugBox.innerHTML = `<code>${prettifyObjectForHTML(oji)}</code>`;
                        el.setAttribute(`data-${ojiAtt}-id`, `${randomId}-${i}`);
                    }
                }
            }
        }

        getOji.calculate = calculateObjectInfo;

        return getOji;
    }

    /**-------------------------------------------------- 
     * @name config
     * @description
     * The configuration object for the oji.js script.
     * This object contains all the necessary information
     * to calculate the object info and apply it to the
     * elements in the DOM.
     * --------------------------------------------------*/

    const config = {
        info: {
            name: 'oji.js',
            version: '0.2',
            id: getOrCreateRandomId(),
        },

        attribute: 'oji',
        slug: {
            short: 'oji',
            long: 'object-info',
        },
        debounce: parseInt(document.body.getAttribute('data-oji-debounce')) || 1000,
        user: {
            agent: navigator.userAgent,
            os: navigator.platform,
            lang: navigator.language || navigator.userLanguage,
            fontSize: `${getUserAgentFontSize()}px`,
            screen: {
                height: window.screen.height,
                width: window.screen.width,
                dimensions: `${window.screen.height}x${window.screen.width}px`,
                aspectRatio: `1:${(window.screen.width / window.screen.height).toFixed(2)}`,
                pixels: `${window.screen.width * window.screen.height}`
            },
        },
        DOM: {
            nodes: parseInt(document.getElementsByTagName('*').length),
            lang: document.documentElement.lang || document.lang,
        },
        // debounce: 1000,
        events: [
            'load',
            'resize',
            'scroll',
            'click',
            // 'focus',
            // 'blur',
            'mousedown',
            'mouseup',
            'touch'
        ],
    };

    /**-------------------------------------------------- 
     * RUN APP
     * --------------------------------------------------*/

    /**
     * Add the config Object 
     * to the getOji Object
     **/

    getOji.global = config;

    /**
    * Assign shorthands for the 
    * config Object infos
    **/

    const ojiName = config.info.name;
    const ojiAtt = config.attribute;
    const ojiVersion = config.info.version;
    const body = document.querySelector('body');
    const ojiElementsPresent = document.querySelectorAll(`[data-${ojiAtt}]`).length;

    /**
     * Assign  shorthands for boolean values 
     * that check if certain `oji` attributes 
     * are present in the DOM
     **/

    const checkIfOjiIsPresent = document.querySelector(`[data-${ojiAtt}]`);
    const checkIfOjiAttributesIsPresent = document.querySelector(`[data-${ojiAtt}][data-${ojiAtt}-attributes]`);
    const checkIfOjiDebugIsPresent = document.querySelector(`[data-${ojiAtt}][data-${ojiAtt}-debug]`);
    const checkIfOjiSummaryIsNotFalse = document.querySelector(`[data-${ojiAtt}-summary-active]`) !== 'false' ? true : false;

    /**
     * if `oji` is present in the DOM
     * give the body tag an attribute 
     * `data-oji-active="true"`
     **/

    if (checkIfOjiIsPresent) {
        body.setAttribute(`data-${ojiAtt}-active`, 'true');
    }

    /**
    * If there is a [data-oji-attributes] present (at least one)
    * give the body tag an attribute
    */
    if (checkIfOjiIsPresent && checkIfOjiAttributesIsPresent) {
        body.setAttribute(`data-${ojiAtt}-attributes-active`, 'true');

    } else {
        body.setAttribute(`data-${ojiAtt}-attributes-active`, 'false');
    }


    if (checkIfOjiSummaryIsNotFalse) {
        const summaryAttributes = document.querySelectorAll(`[data-${ojiAtt}-summary]`);
        summaryAttributes.forEach((el) => {
            el.removeAttribute(`data-${ojiAtt}-summary`);
        });
    }

    /**
    * If the `[data-oji-debug]` is on any element (at least one)
    * Make a Div at the bottom of the <body> Tag and append
    * globally relevant information about the user agent the 
    * screen, the document and the DOM to the Element.
    */
    let bodyHasDebugAttPresent = body.getAttribute(`data-${ojiAtt}-debug-active`);
    body.setAttribute(`data-${ojiAtt}-debug-active`, `${bodyHasDebugAttPresent || 'true'}`);
    if (document.body.getAttribute(`data-${ojiAtt}-debug-active`) === 'false') {
        return;
    }
    else {
        body.setAttribute(`data-${ojiAtt}-debug-active`, 'true');
        debugGlobalContainer = document.createElement('div');
        debugGlobalContainer.setAttribute('class', `${ojiAtt}-global-debug-container`);
        debugGlobalContainer.innerHTML = `
        <div>
        <p><b>${config.info.name}</b></p>
        <hr>
        <section class="${ojiAtt}-global-debug-infos">
        <p>Attributes <br><b>[data-${ojiAtt}]</b></p>
        <p># of oji Objects<br><b>${ojiElementsPresent}</b></p>
        <hr>
        <p>User Agent<br>
        Browser: <b>${config.user.agent}</b>,<br>
        Language: <b>${config.user.lang}</b>,<br>
        Font Size: <b>${config.user.fontSize}</b>,<br>
        </b>
        <hr>
        <p>Operating System:<br><b>${config.user.os}</b></p>
        <hr>
        <p>Monitor<br>
            Height: <b>${config.user.screen.height}px</b>,<br>
            Width: <b>${config.user.screen.width}px</b>,<br>
            Dimension: <b>${config.user.screen.dimensions}</b>,<br>
            # of Pixels: <b>${config.user.screen.pixels}px</b>,<br>
            Aspect Ratio: <b>${config.user.screen.aspectRatio}</b>,<br>
        </p>
        <hr>
        <p>DOM<b><br>
        Nodes:${config.DOM.nodes},<br>
        Language:${config.DOM.lang},<br>
        </b>
        </p>
        <hr>
        </section>
        </div>`;
        document.body.appendChild(debugGlobalContainer);
    }

    /**
     * @name red-green-blue
     * @description 
     * A random number between 0 and 255 to 
     * create a unique Color Outline for each 
     * debugged Box.
     */

    let red = Math.floor(Math.random() * 256), green = Math.floor(Math.random() * 256), blue = Math.floor(Math.random() * 256);

    /**
     * @name style {HTMLStyleElement}
     * @description 
     * A style tag that contains the CSS 
     * for the data-oji-debug attribute.
     */

    style = document.createElement('style');
    style.textContent = removeExtraSpaces(`
        .${ojiAtt}-debug-container, .${ojiAtt}-global-debug-container {
            --${ojiAtt}-max-width: min(320px, 100%);
            --${ojiAtt}-text: #000;
            --${ojiAtt}-outline-width: 3px;
            --${ojiAtt}-shadow-large: 0 0 1rem rgba(0,0,0,0.33);
            --${ojiAtt}-shadow-small: 0 0 0.1em rgba(0,0,0,0.5);
            --${ojiAtt}-px: 1.5px;
            --${ojiAtt}-font-size: 10px;

        }
        .oji-debug-container {
            font-size: var(--${ojiAtt}-font-size) !important;
        }
        [data-${ojiAtt}-debug][data-${ojiAtt}-id]  {
            position: relative;
            outline-width: var(--${ojiAtt}-outline-width);
            outline-style: solid;
            outline-offset: calc(var(--${ojiAtt}-px) * -1);
            box-shadow: var(--${ojiAtt}-shadow-large);
        }

        .${ojiAtt}-debug-container hr, .${ojiAtt}-global-debug-container hr {
            background-color: rgba(0,0,0,0.1);
            height: var(--${ojiAtt}-px);
            border:none;
            margin-block: 1em;
        }
        .${ojiAtt}-global-debug-container,
        [data-${ojiAtt}-debug] .${ojiAtt}-debug-container {
            font-size: var(--${ojiAtt}-font-size) !important;
            border-radius: 0.5em;
            background-color: #ffffffb3;
            color: #000;
            -webkit-backdrop-filter: blur(0.5em);
            backdrop-filter: blur(0.5em);
            text-shadow: 0.05em 0.05em 0.1em rgba(0,0,0,0.5);
            box-shadow: var(--${ojiAtt}-shadow-small);
            max-width: min(100%, var(--${ojiAtt}-max-width));
            min-width: min(100%, calc(var(--${ojiAtt}-max-width) / 2));
            max-height: calc(100% - 1rem);
            word-break: break-word;
            <!-- font-size: 0.66em; -->
            line-height: 1.25;
            font-family: monospace;
            z-index: 9999;
            text-shadow: 0 0 1px rgba(0,0,0, 0.33);       
            overflow:scroll;
            min-height: calc(var(--${ojiAtt}-max-width) / 1.5);
            padding: 1em;
        }
        [data-${ojiAtt}-debug] .${ojiAtt}-debug-container {
            opacity: 0.66;
            position: absolute;
            top: 0.5rem;
            left: 0.5rem;
            right: 0.5rem;
            outline-color:rgb(${red}, ${green}, ${blue})
        }

        .${ojiAtt}-global-debug-container {
            position: fixed;
            right: 0.5rem;
            bottom: 0.5rem;
        }

        .${ojiAtt}-global-debug-container hr, p {
            margin-block: 0.5rem;
            
        }
        [data-${ojiAtt}-debug]:hover .object-${ojiAtt}-container:hover {
            opacity: 1;
        }
        @media (prefers-color-scheme: dark) {
            [data-${ojiAtt}-debug] {
                box-shadow: var(--${ojiAtt}-shadow-large);

            }
            [data-${ojiAtt}-debug].object-${ojiAtt}-container {
                background-color: #000000b3;
                color: #fff;
            }
        }`);
    document.head.appendChild(style);
    style.setAttribute('id', 'oji-styles');

    /*
     * 
     * Assign the debb ounce Function 
     * to the calculateObjectInfo function
     * 
     * */
    var debouncedCalculateObjectInfo = debounce(calculateObjectInfo, parseInt(config.debounce));

    /**
         * If there is a [data-oji-summary] present (at least one)
         * give the body tag an attribute
         * `data-oji-summary-active="false"`
         * and remove the data-oji-summary attribute from the element
         */

    /*
     * 
     * Event Listener Loop for the 
     * calculateObjectInfo Events
     * 
     */

    for (var i = 0; i < config.events.length; i++) {
        let event = config.events[i];
        window.addEventListener(event, debouncedCalculateObjectInfo);

    }

    /**------------------------------------
     * Console Message
    ------------------------------------*/
    if (checkIfOjiDebugIsPresent) {
        console.log(
            `oji.js is initialized and working!`
        );
    }

    /**
     * { WORK IN PROGRESS}
     * Enable / Disable Oji Debug Gloablly
     */

    const observer = new MutationObserver(handleAttributeChange);
    observer.observe(body, { attributes: true });
    /**
     * Disable oji debug functionality globally
     */
    function disableOjiDebug() {
        console.log('oji debug functionality disabled');
        let globalDebugBox = document.querySelector('.oji-global-debug-container');
        if (globalDebugBox) {
            globalDebugBox.remove();
        }

        document.querySelectorAll(`[data-${ojiAtt}][data-${ojiAtt}-debug]`).forEach(el => {
            let debugBox = el.querySelector(`.${ojiAtt}-debug-container`);
            console.log(el);
            el.setAttribute(`data-${ojiAtt}-debug`, `false`);

            if (debugBox) {
                debugBox.remove();
            }
        });

        document.body.setAttribute(`data-${ojiAtt}-debug-active`, 'false');
    }
    function disableOjiDebug() {
        console.log('oji debug functionality disabled');

        let globalDebugBox = document.querySelector('.oji-global-debug-container');
        if (globalDebugBox) {
            globalDebugBox.remove();
        }

        /**
         * Iterate through all elements with the 
         * `data-oji-debug` attribute and remove 
         * their debug containers 
         * */
        document.querySelectorAll(`[data-${ojiAtt}][data-${ojiAtt}-debug]`).forEach(el => {
            let debugBox = el.querySelector(`.${ojiAtt}-debug-container`);
            if (debugBox) {
                debugBox.remove();
            }
        });
    }

    /**
     * Enable oji debug functionality globally
     */

    function enableOjiDebug() {
        console.log('oji debug functionality enabled');
        calculateObjectInfo();
    }

    /**
     * Disable Oji all at once
     */

    function disableOji() {
        console.log('oji functionality disabled');
        // Remove all oji attributes from elements, except for specific ones
        // document.querySelector(`[data-${ojiAtt}-active]`)
        //     .setAttribute(`data-${ojiAtt}-active`, 'false');
        document
            .querySelectorAll(`.${ojiAtt}-debug-container, .${ojiAtt}-global-debug-container`)
            .forEach(el => {
                el.remove();
            }
            )
        // document.querySelector(`[data-${ojiAtt}-debug-active]`).setAttribute(`[data-${ojiAtt}-debug-active]`, 'false');
        document.querySelectorAll(`[data-${ojiAtt}]`).forEach(el => {
            Array.from(el.attributes).forEach(attr => {
                if (attr.name.startsWith(`data-${ojiAtt}-`) && ![
                    `data-${ojiAtt}-debug`,
                    `data-${ojiAtt}-attributes`,
                    `data-${ojiAtt}-id`
                ].includes(attr.name)) {
                    checkIfOjiDebugIsPresent === true ? console.log('Removing:', attr.name) : null;
                    el.removeAttribute(attr.name);
                }
            });
        });
    }

})();

/**-------------------------------------------------- 
 * PUBLIC API
 * --------------------------------------------------*/

/**
     * @name removeExtraSpaces
     * @param {string} str
     * @returns {string} str
     * @description
     * Remove extra spaces from a string
     * @see {@link https://stackoverflow.com/a/4328722}
     */

function removeExtraSpaces(str) {
    return str.replace(/\s{2,}/g, " ");
}

getOji.trimWhitespace = removeExtraSpaces;


/**
 * @name debounce
 * @description A function that delays the execution of the input function until after a specified wait time has elapsed since the last time it was invoked.
 * @param {Function} func - The function to debounce.
 * @param {number} wait - The number of milliseconds to delay.
 * @returns {Function}
 * 
 */

function debounce(func, wait) {
    let timeout;
    return function executedFunction() {
        let context = this;
        let args = arguments;
        let later = function () {
            timeout = null;
            func.apply(context, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

getOji.debounce = debounce;

/**
 * 
 * @param {HTMLElement} el 
 * @returns void
 * @description
 * Get the position of an element
 */
function getObjectInDocPosition(element = 'body') {
    let el = document.querySelector(element);
    var xPosition = 0;
    var yPosition = 0;

    while (el) {
        if (el.tagName == "BODY") {
            // deal with browser quirks with body/window/document and page scroll
            var xScrollPos = el.scrollLeft || document.documentElement.scrollLeft;
            var yScrollPos = el.scrollTop || document.documentElement.scrollTop;

            xPosition += (el.offsetLeft - xScrollPos + el.clientLeft);
            yPosition += (el.offsetTop - yScrollPos + el.clientTop);
        } else {
            xPosition += (el.offsetLeft - el.scrollLeft + el.clientLeft);
            yPosition += (el.offsetTop - el.scrollTop + el.clientTop);
        }

        el = el.offsetParent;
    }
    return {
        x: xPosition,
        y: yPosition
    };
}

getOji.documentPosition = getObjectInDocPosition;

/**
 * @name getObjectInViewportPosition
 * @param {HTMLElement} el
 * @returns {object}
 * @description
 * Get the position of an element in the viewport
 */

function getObjectInViewportPosition(element = 'body') {
    el = document.querySelector(element);
    var rect = el.getBoundingClientRect();
    return {
        top: rect.top,
        right: rect.right,
        bottom: rect.bottom,
        left: rect.left,
        width: rect.width,
        height: rect.height
    };
}

getOji.viewportPosition = getObjectInViewportPosition;

/**
 * @name getOjiValues
 * @param {HTMLElement} el
 * @returns {object}
 * @description
 * Get the oji values of an element like 
 * absolute width, height, relative width, 
 * height, spacing to viewport, 
 * document and more.
 */

function getOjiValues(element = 'body') {
    el = document.querySelector(element);
    return {
        object: {
            absoluteWidth: el.getAttribute('data-oji-object-absolute-width'),
            absoluteHeight: el.getAttribute('data-oji-object-absolute-height'),
            aspectRatio: el.getAttribute('data-oji-object-aspect-ratio'),
            relativeAreaOfViewport: el.getAttribute('data-oji-object-relative-area-of-viewport'),
            relativeAreaInViewportVisible: el.getAttribute('data-oji-object-relative-area-in-viewport-visible'),
            relativeAreaOfDocument: el.getAttribute('data-oji-object-relative-area-of-document'),
            relativeAreaInDocumentVisible: el.getAttribute('data-oji-object-relative-area-in-document-visible'),
            fontSizePx: el.getAttribute('data-oji-object-font-size-px'),
            fontSizeRem: el.getAttribute('data-oji-object-font-size-rem'),
            fontSizeVw: el.getAttribute('data-oji-object-font-size-vw'),
            fontFamily: el.getAttribute('data-oji-object-font-family'),
            color: el.getAttribute('data-oji-object-color'),
            backgroundColor: el.getAttribute('data-oji-object-background-color'),
            colorContrast: el.getAttribute('data-oji-object-color-contrast'),
        },
    }
}

getOji.values = getOjiValues;

/**
 * @name getOjiComparison
 * @param {HTMLElement} element1
 * @param {HTMLElement} element2
 * @returns {object}
 * @description
 * Get the comparison of two oji elements
 * like area, font size and color contrast.
 */

function getOjiComparison(element1, element2) {
    let el1 = getOjiValues(element1);
    let el2 = getOjiValues(element2);
    getOji.calculate(element1);
    getOji.calculate(element2);
    // compare the 2 elements and return the comparison
    let comparison = {
        overlap: areasOverlap(element1, element2),
        area: el1.object.relativeAreaInDocumentVisible === el2.object.relativeAreaInDocumentVisible ? 'Same Size' : 'Different Size',
        fontSize: el1.object.fontSizePx === el2.object.fontSizePx,
        colorContrast: el1.object.colorContrast === el2.object.colorContrast,
    };

    return comparison;
}

/** */
function areasOverlap(element1, element2) {

    let el1 = document.querySelector(element1);
    let el2 = document.querySelector(element2);

    let el1Rect = el1.getBoundingClientRect();
    let el2Rect = el2.getBoundingClientRect();

    return !(
        el1Rect.right < el2Rect.left ||
        el1Rect.left > el2Rect.right ||
        el1Rect.bottom < el2Rect.top ||
        el1Rect.top > el2Rect.bottom
    );

}

getOji.compare = getOjiComparison;


/**
 * @name ojiAdd
 * @param {HTMLElement} element
 * @param {boolean} hasAttributes
 * @param {boolean} hasDebug
 * @param {object} void
 * @description
 * a function that adds a html element
 * or a array of them to the oji calculation 
 * and adds attributes, debug and summary 
 * to them if the giuven param is true
 */

function ojiAdd(element, hasAttributes = true, hasDebug = true) {
    let elements = document.querySelectorAll(element);
    elements.forEach(el => {
        el.setAttribute(`data-oji`, '');
        getOji.calculate(el);
        if (hasAttributes) {
            el.setAttribute(`data-oji-attributes`, '');
        }
        if (hasDebug) {
            el.setAttribute(`data-oji-debug`, '');
        }
    }
    );
}

getOji.add = ojiAdd;

/**
 * @name ojiRemove
 * @param {HTMLElement} element
 * @description
 * a function that removes a html element
 * from oji calculation
 */

function ojiRemove(elementSelector) {
    let elements = document.querySelectorAll(elementSelector);
    elements.forEach(el => {
        Array.from(el.attributes).forEach(attr => {
            if (attr.name.startsWith('data-oji')) {
                el.removeAttribute(attr.name);
            }
        });
        let debugBox = el.querySelector('.oji-debug-container');
        if (debugBox) {
            el.removeChild(debugBox);
        }
    });
}

// Assuming getOji is defined and used elsewhere in your code
getOji.remove = ojiRemove;

/**
 * @name ojiFinished
 * @param {function} callback
 * @param {number} debounce
 * @description
 * function to trigger anytime or 
 * once if the oji claculateObjectInfo 
 * is finished

 */

function ojiFinished(callback, timeout = 100) {
    if (typeof callback !== 'function') return;

    const debouncedCallback = debounce(callback, timeout);
    const observer = new MutationObserver(debouncedCallback);
    observer.observe(document.body, { attributes: true, childList: true, subtree: true });

    let events = ['load', 'resize', 'scroll', 'click', 'focus', 'blur', 'mouseup', 'touch'];
    events.forEach(event => {
        window.addEventListener(event, debouncedCallback);
    });

    debouncedCallback();
}

getOji.finished = ojiFinished;

// getOji.enable = enableOji;


/**
 * @name window.oji
 * @description
 * Expose the `getOji` as `oji` function to the global scope.
 */
window.oji = getOji;

window.oji.finished(
    () => {
        console.log('oji.js is finished calculating the object info for the elements in the DOM.');
    }
)