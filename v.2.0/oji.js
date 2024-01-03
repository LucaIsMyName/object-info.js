/**------------------------------------------------------------------------
 * ------------------------------------------------------------------------
 * @name oji.js
 * @version 1.1
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

/**
 * The software calculates 
 * certain data points and sets them as
 * html attributes or provides a debugging
 * overlay for developers
 * when it comes to position of a specific 
 * html element (oji-element) and set's these infos
 * as data attributes like eg. 
 * [data-oji-object-absolute-width="330"], 
 * [data-oji-viewport-object-relative-spacing-left="3.45%"]
 * the software retrieves these values from
 * a local storage object (oji)
 * that's shoould always be up to date with the DOM
 * 
 * the initial state sin the ooji object are always overriden 
 * by the local storage "copy"
 * --> in general: the local storage should always tbe the state of the app
 * only a chache and cookie refresh should
 * set the initial values for the state
 * 
 * 
 * all outputed and claculated values for the object, viewport,
 * and document should not be changeable by the deveoloper/user
 * if they are changed they should be reverted back to
 * the right values after the next refresh (whoich the change of 
 * an attribute should trigger a refresh)
 */

(function () {

    /**
     * 1. set an initial oji object that has the default values
     * this object should be always updated and store ALL releavmnt infomation
     * the object has initial states, but the software sets a localStorage 
     * object that mirrors this one, if, the local storage information
     * for a value is different from the config, it should prefer
     * the localStorage object
     */

    let oji = {
        config: {
            init: {
                name: 'oji.js',
                version: '0.1',
                id: getOrCreateRandomId(),
                // The begiing of every oji attribute
                attribute: 'data-oji',
                slug: 'oji',
                lag: 0,
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
                state: {
                    global: true,
                    debug: true,
                    attributes: true,
                    summary: true
                }
            },
            // Blank Keys that retirive the 
            // value from the localStorage Object
            storage: {
                // This as a 'copy' of the oji.config.init.state
                state: {
                    global,
                    debug,
                    attributes,
                    summary,
                }
            }
        },
        // User Agent Informations
        user: {
            agent: navigator.userAgent,
            os: navigator.platform,
            lang: navigator.language || navigator.userLanguage,
            fontSize: `${getUserAgentFontSize()}px`,
            dimensions: {
                abolute: {
                    height: window.screen.height,
                    width: window.screen.width,
                    aspectRatio: `1:${(window.screen.width / window.screen.height).toFixed(2)}`,
                    numberOfPixels: `${window.screen.width * window.screen.height}`
                }
            },
        },
        document: {
            nodes: parseInt(document.getElementsByTagName('*').length),
            lang: document.documentElement.lang || document.lang,
            dimensions: {
                absolute: {
                    width: document.documentElement.scrollWidth,
                    height: document.body.scrollHeight,
                },
                relative: {
                    width,
                    height,
                }
            }
        },
        viewport: {
            dimensions: {
                absolute: {
                    width: window.innerWidth,
                    height: window.innerHeight,
                    area: (window.innerHeight * window.innerWidth).toFixed(0),

                },
                relative: {
                    width,
                    height,
                }
            },
            object: {
                absolute: {
                    spacing: {
                        top,
                        right,
                        bottom,
                        left
                    }
                },
                relative: {
                    width,
                    area,
                    spacing: {
                        top,
                        right,
                        bottom,
                        left
                    }
                }
            }
        },
        object: [
            // Insert the elements as objects in here 
            // that have the [data-oji] attribute set
            // and store the these infos
            // in the let oji and the local storage
            {
                meta: {
                    id,
                    debug,
                    attributes,
                    summary,
                },
                dimensions: {
                    absolute: {
                        width,
                        height,
                        area,
                    },
                }
            }
        ]
    }

    /**
     * 2. Store this Object in a structured way 
     * into localStorage as a Cookie initially
     */

    /**
     * 3. Calc
     * Calculate the values here one for one
     * Percentage Values have 2 floating numbers, px none
     */

    /**
     * 4. If the body tag has data-oji-attributes="true" 
     * (initial state: let oji.config.init.state.attributes):
     * render all attributes the the oji element that also has
     * [data-oji][data-oji-attributes="true"] (set the the user/developer of oji)
     * NOTE: if the data-oji-attributes is set to false by the user
     * or developer, update the oji object accordingly and
     * apple the changes to teh DOM
     * (example 1: if the [data-oji-attributes] on the body is set to false 
     * it should delete all [data-oji-*] attributes from EVERY DOM Element
     * example 2: if the data-oji-attributes on the specific element
     * is to false by the user or developer it should only delete the
     * attributes that start with [data-oji-*] from ONLY THIS Element
     * )
     * 
     * --> NOTE: always update the oji object in local storage 
     * accordingly as it is the representation of the
     *  current state of the program
     */


    /**
      * 5. If the body tag has data-oji-debug="true" 
      * (initial state: let oji.config.init.state.debug):
      * render the debug overlay boxes to the elements
      * that also have the [data-oji-debug="true"] set
      * otherwise: dont display the debug info and overlay
      * 
      * (example 1: if the [data-oji-debug] on the body is set to false by the user or developer
     * it should delete ALL Oji Debug Overlay Container and the Global Debuug Container from HTML DOM
     * example 2: if the data-oji-debug on the specific element
     * is to false by the user or developer it should only delete the
     * Debug Container from ONLY THIS Element
     * 
     * --> NOTE: alwaysupdate the oji object in local storage 
     * accordingly as it is the representation of the
     *  current state of the program
     * )
      */

    /**
      * 6. Update the let oji object and the localStorage Object when any value get's
      * recalculated by scrolling, resizing, touc, click or keyup/down events...
      * also: if any attriobute on the body tag
      * [data-oji-active="true"] , 
      * [data-oji-debug-active="true"],
      * [data-oji--attributes-active="true"],
      * [data-oji-summary-active="true"] 
      * is changed by SOME other JS
      * it should change the localstorage oji 
      * object accordingly and update the DOM
      */

    /**
     * 7. Internal Functions
     *  - camelToKebab()
     *  - kebapToCamel()
     *  - jsonToString()
     *  - prettify(jsonToString)
     * -  debounce()
     * -  getContrastRatio()
     */

    /**
     * 8. Public Functions for Developers
     * - oji.add(
     *      config.storage.time,
     *      dateTime(), // Optional
     *   )
     * - oji.remove(
     *      config.document.nodes,
     *      // if not set the the key value pair is disabled globally
     *      // optionally the dev/usef can only remove them 
     *      //as attributes or from the debug overlay
     *      {attributes, debug} // Optional, default: {global}
     *  )
     * - oji.change(
     *    config.storage.state.global,
     *    false
     *  )
     * 
     * oji.calc(
     *      viewport.dimensions.absolute.height * 2
     *  )
     */


})();
