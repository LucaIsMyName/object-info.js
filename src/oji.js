/**------------------------------------------------------------------------
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

(function () {
    /**------------------------------------------------------------------------
     * ------------------------------------------------------------------------
     * @description
     * oji Config Const to fetch data from
     * ------------------------------------------------------------------------
     ------------------------------------------------------------------------*/

    const config = {
        info: {
            name: 'oji.js',
            version: '0.1',
            id: getOrCreateRandomId(),
        },

        attribute: 'oji',
        slug: {
            short: 'oji',
            long: 'object-info',
        },
        debounce: 0,
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
        // debounce: 100,
        events: [
            'load',
            'resize',
            'scroll',
            'click',
            'focus',
            'blur',
            'mousedown',
            'mouseup',
            'touch'
        ],
    };

    function getOrCreateRandomId() {
        randomId = Math.floor(Math.random() * 9999);
    }

    const ojiName = config.info.name;
    const ojiAtt = config.attribute;
    const ojiVersion = config.info.version;
    const body = document.querySelector('body');
    const ojiElementsPresent = document.querySelectorAll(`[data-${ojiAtt}]`).length;

    const checkIfOjiIsPresent = document.querySelector(`[data-${ojiAtt}]`);
    const checkIfOjiAttributesIsPresent = document.querySelector(`[data-${ojiAtt}][data-${ojiAtt}-attributes]`);
    const checkIfOjiDebugIsPresent = document.querySelector(`[data-${ojiAtt}][data-${ojiAtt}-debug]`);

    if (checkIfOjiIsPresent) {
        body.setAttribute(`data-${ojiAtt}-active`, 'true');
        console.log(`Element found in the DOM that has the [data-${ojiAtt}] attribute set.`);
    } else {
        console.log(`No Element found in the DOM that has the [data-${ojiAtt}] attribute set.`);
    }
    /**
    * If there is a [data-oji-attributes] present (at least one)
    * give the body tag an attribute
    */
    if (checkIfOjiIsPresent && checkIfOjiAttributesIsPresent) {
        body.setAttribute(`data-${ojiAtt}-attributes-active`, 'true');
        console.log(`Element found in the DOM that has the [data-${ojiAtt}-attributes] attribute set.`);

    } else {
        body.setAttribute(`data-${ojiAtt}-attributes-active`, 'false');
        console.log(`No Element found in the DOM that has the [data-${ojiAtt}-attributes] attribute set.`);
    }


    /**
    * If the [data-oji-debug] is on any element (at least one)
    * Make a Div at the bottom of the <body> Tag
    */
    let bodyHasDebugAttPresent = body.getAttribute(`data-${ojiAtt}-debug-active`);
    body.setAttribute(`data-${ojiAtt}-debug-active`, `${bodyHasDebugAttPresent || 'true'}`);
    console.log(body);
    if (document.body.getAttribute(`data-${ojiAtt}-debug-active`) === 'false') {
        return;
    }
    else {
        body.setAttribute(`data-${ojiAtt}-debug-active`, 'true');

        debugGlobalContainer = document.createElement('div');
        debugGlobalContainer.setAttribute('class', `${ojiAtt}-global-debug-container`);
        debugGlobalContainer.innerHTML = `<div>
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
        console.log(`Element found in the DOM that has the [data-${ojiAtt}-debug] attribute set.`);
    }
    /**------------------------------------
     * @name red-green-blue
     * @description 
     * A random number between 0 and 255 to 
     * create a unique Color Outline for each 
     * debugged Box.
     ------------------------------------*/

    /** random Number generator */
    const red = Math.floor(Math.random() * 256), green = Math.floor(Math.random() * 256), blue = Math.floor(Math.random() * 256);

    /**------------------------------------------------------------------------
     * ------------------------------------------------------------------------
     * style
     * @description 
     * A style tag that contains the CSS 
     * for the data-oji-debug attribute.
     * ------------------------------------------------------------------------
     ------------------------------------------------------------------------*/
    style = document.createElement('style');
    style.textContent = `
        :root {
            --${ojiAtt}-max-width: min(320px, 100%);
        }

        :where([data-${ojiAtt}-debug]):where([data-${ojiAtt}-id])  {
            position: relative;
            outline-width: 3px;
            outline-style: solid;
            outline-offset: -1.5px;
            box-shadow: 0 0 1rem rgba(0,0,0,0.33);
        }

        :where(.${ojiAtt}-debug-container, .${ojiAtt}-global-debug-container) hr {
            background-color: black;
            height: 1px;
            border:none;
            margin-block: 1rem;
        }
        :where(.${ojiAtt}-global-debug-container),
        :where([data-${ojiAtt}-debug]) :where(.${ojiAtt}-debug-container) {
            border-radius: 0.5em;
            background-color: #ffffffb3;
            color: #000;
            -webkit-backdrop-filter: blur(0.5em);
            backdrop-filter: blur(0.5em);
            text-shadow: 0.05em 0.05em 0.1em rgba(0,0,0,0.5);
            box-shadow: 0 0 0.1em rgba(0,0,0,0.5);
            max-width: min(100%, var(--oji-max-width));
            min-width: min(100%, calc(var(--oji-max-width) / 2));
            max-height: calc(100% - 1rem);
            word-break: break-word;
            font-size: 0.66rem;
            line-height: 1.25;
            font-family: monospace;
            z-index: 9999;
            text-shadow: 0 0 1px rgba(0,0,0, 0.33);       
            overflow:scroll;
            min-height: calc(var(--oji-max-width) / 1.5);
            padding: 1em;

        }
        :where([data-${ojiAtt}-debug]) :where(.${ojiAtt}-debug-container) {
            opacity: 0.66;
            position: absolute;
            top: 0.5rem;
            left: 0.5rem;
            right: 0.5rem;
            outline-color:rgb(${red}, ${green}, ${blue})
        }

        :where(.${ojiAtt}-global-debug-container) {
            position: fixed;
            right: 0.5rem;
            bottom: 0.5rem;
        }

        :where(.${ojiAtt}-global-debug-container :where(hr, p)) {
            margin-block: 0.5rem;
            
        }
        :where([data-${ojiAtt}-debug]) :where(.object-${ojiAtt}-container):hover {
            opacity: 1;
        }
        @media (prefers-color-scheme: dark) {
            :where([data-${ojiAtt}-debug]) {
                box-shadow: 0 0 1rem rgba(255,255,255,0.33);

            }
            :where([data-${ojiAtt}-debug]):where(.object-${ojiAtt}-container) {
                background-color: #000000b3;
                color: #fff;
            }
        }`;
    document.head.appendChild(style);

    /**------------------------------------------------------------------------
     * ------------------------------------------------------------------------
     * calculateObjectInfo
     * @description 
     * Calculates the object info and adds 
     * the data attributes to the elements.
     * @returns {void}
     * ------------------------------------------------------------------------
     ------------------------------------------------------------------------*/
    function calculateObjectInfo() {
        if (document.body.getAttribute(`data-${ojiAtt}-active`) === 'true') {


            /**
             * elements
             * @description 
             * An array of all elements with the 
             * [data-oji] attribute.
             */
            var elements = document.querySelectorAll(`[data-${ojiAtt}]`);

            /**
             * @description 
             * Loops through all elements with the 
             * [data-oji] attribute and calculates 
             * the object info.
             */
            for (var i = 0; i < elements.length; i++) {
                /**------------------------------------
                 * @name el
                 * @description The current element 
                 * in the loop.
                 ------------------------------------*/
                let el = elements[i];

                /**------------------------------------
                 * @description
                 * Conditional checks for attributes 
                 * - [oji-attributes]
                 * - [oji-debug]
                 * - [oji-styles]
                 ------------------------------------*/

                let checkAttributes = el.hasAttribute(`data-${ojiAtt}-attributes`) || el.hasAttribute(`data-${config.slug.long}-attributes`) || el.hasAttribute(`data-${config.slug.short}-attributes`);
                let checkDebug = el.hasAttribute(`data-${ojiAtt}-debug`) || el.hasAttribute(`data-${config.slug.long}-debug`) || el.hasAttribute(`data-${config.slug.short}-debug`);
                let checkSummary = el.getAttribute(`data-${ojiAtt}-summary`);
                let bodySummaryActive = document.body.getAttribute(`data-${ojiAtt}-summary-active`);

                /**------------------------------------------------------------------------
                 * ------------------------------------------------------------------------
                 * @description
                 * This part of the Software Calculates and fetches
                 * the actual values thar are displayed as attributes 
                 * and elements (debug)
                 * ------------------------------------------------------------------------
                ------------------------------------------------------------------------ */
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
                // console.log(elementStyles);
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

                // Calculate horizontal overlap
                let leftEdgeInsideViewport = Math.max(spacingLeftDocPx, 0);
                let rightEdgeInsideViewport = Math.min(spacingLeftDocPx + widthPx, viewPortWidth);
                let visibleWidth = Math.max(0, rightEdgeInsideViewport - leftEdgeInsideViewport);
                // Calculate vertical overlap
                let topEdgeInsideViewport = Math.max(topToViewport, 0);
                let bottomEdgeInsideViewport = Math.min(topToViewport + heightPx, viewPortHeight);
                let visibleHeight = Math.max(0, bottomEdgeInsideViewport - topEdgeInsideViewport);
                // Calculate the visible area of the element
                let visibleArea = visibleWidth * visibleHeight;
                // Calculate the percentage of the element that's visible
                let percentageVisible = (visibleArea / elementArea * 100).toFixed(2);

                /**
                * Calc the Area visible inside the document of an oji element
                */

                // Calculate horizontal overlap
                let leftEdgeInsideDoc = Math.max(spacingLeftDocPx, 0);
                let rightEdgeInsideDoc = Math.min(spacingLeftDocPx + widthPx, DocWidth);
                let visibleWidthDoc = Math.max(0, rightEdgeInsideDoc - leftEdgeInsideDoc);
                // Calculate vertical overlap
                let topEdgeInsideDoc = Math.max(spacingTopDocPx, 0);
                let bottomEdgeInsideDoc = Math.min(spacingTopDocPx + heightPx, DocHeight);
                let visibleHeightDoc = Math.max(0, bottomEdgeInsideDoc - topEdgeInsideDoc);
                // Calculate the visible area of the element
                let visibleAreaDoc = visibleWidthDoc * visibleHeightDoc;
                // Calculate the percentage of the element that's visible
                let percentageVisibleDoc = (visibleAreaDoc / elementArea * 100).toFixed(2);

                /**------------------------------------------------------------------------
                 * ------------------------------------------------------------------------
                 * @param {object} oji
                 * store all the calculated Values in a 
                 * global objet to render from 
                 * there in the UI
                 * ------------------------------------------------------------------------
                 ------------------------------------------------------------------------*/
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
                        relativeAreaInViewport: ((elementArea / viewportArea) * 100).toFixed(2) + '%',
                        relativeAreaInViewportVisible: `${percentageVisible}%`,
                        relativeAreaInDocument: ((elementArea / documentArea) * 100).toFixed(2) + '%',
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
                        absoluteWidth: `${DocWidth}px`,
                        absoluteHeight: `${DocHeight}px`,
                        aspectRatio: `1:${(DocWidth / DocHeight).toFixed(2)}`,
                        relativeObjectWidth: `${docWidthRelative}%`,
                        relativeObjectHeight: `${docHeightRelative}%`,
                        relativeSpacingTop: `${spacingTopDocRelative}%`,
                        relativeSpacingRight: `${spacingRightDocRelative}%`,
                        relativeSpacingBottom: `${spacingBottomDocRelative}%`,
                        relativeSpacingLeft: `${spacingLeftDocRelative}%`,
                        absoluteSpacingTop: `${Math.round(spacingTopDocPx)}px`,
                        absoluteSpacingRight: `${Math.round(spacingRightDocPx)}px`,
                        absoluteSpacingBottom: `${Math.round(spacingBottomDocPx)}px`,
                        absoluteSpacingLeft: `${Math.round(spacingLeftDocPx)}px`,
                    }
                };

                /**------------------------------------------------------------------------
                 * ------------------------------------------------------------------------
                 * @description Adds the data attributes to the 
                 * current element in the loop if the attribute 
                 * [data-oji-attributes] is set
                 * ------------------------------------------------------------------------
                 ------------------------------------------------------------------------*/
                if (checkAttributes && document.body.getAttribute('data-oji-attributes-active') === "true") {
                    ['object', 'viewport', 'document'].forEach(section => {
                        for (const [key, value] of Object.entries(oji[section])) {
                            // Transform camelCase keys to kebab-case for attributes
                            const attributeKey = camelToKebabCase(key);
                            el.setAttribute(`data-${ojiAtt}-${section}-${attributeKey}`, value);
                        }
                    });
                }
                /**------------------------------------------------------------------------
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

                /**------------------------------------------------------------------------
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
    }
    /**------------------------------------------------------------------------
     * ------------------------------------------------------------------------
     * Assign the debaounce Function 
     * to the calculateObjectInfo function
     * ------------------------------------------------------------------------
     * ------------------------------------------------------------------------*/
    var debouncedCalculateObjectInfo = debounce(calculateObjectInfo, config.debounce || 250);

    /**------------------------------------------------------------------------
     * ------------------------------------------------------------------------
     * Event Listener Loop for the 
     * calculateObjectInfo Events
     * ------------------------------------------------------------------------
     ------------------------------------------------------------------------*/

    for (var i = 0; i < config.events.length; i++) {
        let event = config.events[i];
        window.addEventListener(event, debouncedCalculateObjectInfo)
    }

    /**------------------------------------
     * Console Message
    ------------------------------------*/
    if (checkIfOjiDebugIsPresent) {
        console.log(
            `oji.js is initialized and working!`
        );
    }

    /**------------------------------------------------------------------------
     * oji.js calculatiuon is finished and rendered to the DOM
     * now set interactions like:
     * 1. if some js changes the [data-oji-attributes-active] on the <body>
     * all attributes get removed from the DOM,
     * if it's set to "true" again it applies them again
     * 
     * 
     * { WORK IN PROGRESS }
     * Listen to global events on the body that change the 
     * [data-oji-active], [data-oji-attributes-active] & [dataoji-debug-active] bools
     * to true
     ------------------------------------------------------------------------*/

    function handleAttributeChange(mutationsList) {
        for (let mutation of mutationsList) {
            if (mutation.type === 'attributes') {
                console.log(`The ${mutation.attributeName} attribute was modified.`);
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

    // Function to re-enable oji attributes functionality
    function enableOjiAttributes() {
        console.log('oji attributes functionality enabled');
        // If you have a function that originally calculates and applies the oji attributes, call it here.
        // This would re-calculate and apply all the necessary attributes to each element.
        calculateObjectInfo();  // Assuming this is your initial function that applies oji attributes.
    }

    // Function to disable oji attributes functionality
    function disableOjiAttributes() {
        console.log('oji attributes functionality disabled');
        // Remove all oji attributes from elements, except for specific ones
        document.querySelectorAll(`[data-${ojiAtt}]`).forEach(el => {
            // Get all attributes of the element
            Array.from(el.attributes).forEach(attr => {
                // Check if the attribute starts with 'data-oji-' and is not one of the exceptions
                if (attr.name.startsWith(`data-${ojiAtt}-`) && ![
                    `data-${ojiAtt}-debug`,
                    `data-${ojiAtt}-summary`,
                    `data-${ojiAtt}-attributes`,
                    `data-${ojiAtt}-id`
                ].includes(attr.name)) {
                    // Remove the attribute
                    console.log('Removing:', attr.name);
                    el.removeAttribute(attr.name);
                }
            });
        });
    }

    /**
     * { WORK IN PROGRESS}
     * Enable / Disable Oji Debug Gloablly
     */
    // Function to disable oji attributes functionality

    // Create an observer instance linked to the handleAttributeChange callback function
    const observer = new MutationObserver(handleAttributeChange);

    // Start observing the body tag for attribute changes
    observer.observe(body, { attributes: true });
    /**
 * Disable oji debug functionality globally
 */
    function disableOjiDebug() {
        console.log('oji debug functionality disabled');
        // Remove the global debug box if it exists
        let globalDebugBox = document.querySelector('.oji-global-debug-container');
        if (globalDebugBox) {
            globalDebugBox.remove();
        }

        // Iterate through all elements with the data-oji-debug attribute and remove their debug containers
        document.querySelectorAll(`[data-${ojiAtt}][data-${ojiAtt}-debug]`).forEach(el => {
            let debugBox = el.querySelector(`.${ojiAtt}-debug-container`);
            console.log(el);
            el.setAttribute(`data-${ojiAtt}-debug`, `false`);

            if (debugBox) {
                debugBox.remove();
            }
        });

        // Update the state to remember that the debug functionality is disabled
        document.body.setAttribute(`data-${ojiAtt}-debug-active`, 'false');
    }
    function disableOjiDebug() {
        console.log('oji debug functionality disabled');

        // Remove the global debug box if it exists
        let globalDebugBox = document.querySelector('.oji-global-debug-container');
        if (globalDebugBox) {
            globalDebugBox.remove();
            // globalDebugBox.parentNode.remove.attribute('data-oji-debug');
        }

        // Iterate through all elements with the data-oji-debug attribute and remove their debug containers
        document.querySelectorAll(`[data-${ojiAtt}][data-${ojiAtt}-debug]`).forEach(el => {
            let debugBox = el.querySelector(`.${ojiAtt}-debug-container`);
            if (debugBox) {
                debugBox.remove();

            }
        });

        // Update the state to remember that the debug functionality is disabled
        // document.body.setAttribute(`data-${ojiAtt}-debug-active`, 'false');
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
            // Get all attributes of the element
            Array.from(el.attributes).forEach(attr => {
                // Check if the attribute starts with 'data-oji-' and is not one of the exceptions
                if (attr.name.startsWith(`data-${ojiAtt}-`) && ![
                    `data-${ojiAtt}-debug`,
                    `data-${ojiAtt}-attributes`,
                    `data-${ojiAtt}-id`
                ].includes(attr.name)) {
                    // Remove the attribute
                    console.log('Removing:', attr.name);
                    el.removeAttribute(attr.name);
                }
            });
        });
    }

    function enableOji() {
        // document.querySelector(`[data-${ojiAtt}-active]`)
        //     .setAttribute(`data-${ojiAtt}-debug-active`, 'true');
        calculateObjectInfo();
    }


    /**------------------------------------------------------------------------
     * ------------------------------------------------------------------------
     * FUNCTIONS
     * ------------------------------------------------------------------------
     ------------------------------------------------------------------------*/
    /**
     * 
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
     * @returns 
     */

    function kebabToCamelCase(str = "test-string") {
        return str.replace(/-./g, (match) => match.charAt(1).toUpperCase());
    }

    /**------------------------------------
     * Get Color Contrast Ratio Functions
     * https://www.w3.org/WAI/GL/wiki/Contrast_ratio
     ------------------------------------*/
    /**
     * @name getLuminance
     * @param {array} rgb 
     * @returns {float}
     */
    function getLuminance(rgb = [128, 128, 128]) {
        let a = [rgb.r, rgb.g, rgb.b].map(function (v) {
            v /= 255;
            // console.log(v);
            return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
        });
        return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
    }
    /**
     * @name getContrastRatio
     * @param {string} color1 
     * @param {string} color2 
     * @returns {number} contrastRatio
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
     * @param {string} inputColor 
     * @returns 
     */
    function parseColor(inputColor) {
        let div = document.createElement('div');
        div.style.color = inputColor;
        document.body.appendChild(div);
        let m = getComputedStyle(div).color.match(/^rgb\s*\(\s*(\d+),\s*(\d+),\s*(\d+)\s*\)$/);
        document.body.removeChild(div);
        return m ? { r: m[1], g: m[2], b: m[3] } : null;
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
        console.log('Default font size:', userAgentFontSize);
        return userAgentFontSize;
    }

})();
