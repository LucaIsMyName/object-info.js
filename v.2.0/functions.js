import {
    oji,
    oji_attribute,
    oji_events,
    oji_state_global,
    oji_state_attributes,
    oji_state_debug,
} from './config.js';
/**
 * @name oji_complex_to_simple_type
 * @param {string} key 
 * @param {string, number} value 
 * @returns 
 */


export function oji_complex_to_simple_type(key, value) {
    // Check for a function and execute it
    if (typeof value === 'function') {
        try {
            // Attempt to invoke the function and return its result
            return value();
        } catch (error) {
            // If the function requires parameters or throws an error, handle it here
            console.error("Error executing function: ", error);
            return "Function execution error";
        }
    }
    else if (value instanceof Element) {
        // Return the actual HTML of the element
        return value.outerHTML;
    }
    // Return the value for other types as-is
    return value;
}

/**
 * 
 * @param {object} updated_props
 * @description
 * this function should handle the updates
 * of oji local storage cookie
 */
export function oji_update(updated_props) {
    // Ensure updated_props is an object
    if (typeof updated_props !== 'object' || updated_props === null) {
        console.error('updated_props must be an object');
        return;
    }

    // if (!oji) {
    //     let oji = {};
    // }
    // Ensure oji is already defined and is an object
    if (typeof oji !== 'object' || oji === null) {
        oji = {};
    }

    // Update the oji object with the new properties if they've changed
    Object.keys(updated_props).forEach(key => {
        if (!oji.hasOwnProperty(key) || oji[key] !== updated_props[key]) {
            oji[key] = updated_props[key];
        }
    });

    // Serialize and store updated object
    try {
        let oji_string = JSON.stringify(oji, oji_complex_to_simple_type);
        localStorage.setItem('oji', oji_string);
    } catch (error) {
        console.error("Error updating localStorage: ", error);
    }
}

/**
 * 
 * @param {Array} oji_elements 
 * @returns {}
 */

export function oji_update_all_attributes(oji_elements = document.querySelectorAll(`[data-oji]`)) {
    for (i = 0; i < oji_elements.length; i++) {
        let obj = oji_elements[i];
        for (

            attribute = 0;
            attribute < oji.objects.length;
            attribute++) {
            let key = oji.objects[i][attribute.key];
            let value = oji.objects[i][attribute.value];

            obj.setAttribute(
                `${localStorage.getItem(oji.objects[attribute].key)}`,
                `${localStorage.getItem(oji.objects[attribute].value)}`
            )
        }
    }
}

/**
 * 
 * @param {Element} oji_element 
 */

export function oji_update_object_attributes(oji_element = document.querySelector(`[data-oji]`)) {
    console.log(oji_element);

    for (
        attributes = 0;
        attributes < oji_element.length;
        attributes++
    ) {
        let key = oji.objects[i][attributesey];
        let value = oji.objects[i][attribute.key];

        obj.setAttribute(
            `${localStorage.getItem(oji.objects[attributes].key)}`,
            `${localStorage.getItem(oji.objects[i].value)}`
        )
    }
}

/**
 * 
 * @param {Function} f 
 * @param {number} t 
 * @returns 
 */

export function oji_debounce(f, t) {
    let timeout;
    return function executedFunction() {
        let context = this;
        let args = arguments;
        let later = function () {
            timeout = null;
            f.apply(context, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, t);
    };
};

/**
 * 
 * @param {Array} objects 
 * @description
 * calculates all data-oji items from scratch if
 * no parameter is given
 */
export function oji_object_calc(index = 0, objects) {
    // Return if the last item of the array

    // Set an upper limit for DOM Elemnts for performance reasons
    let array = () => {
        if (objects.lenght <= 1000) {
            console.log('Number of oji Elements limited to 1000')
            array = 1000
        } else {
            array = objects.lenght
        }
    }
    // was iterated through
    if (index <= array.lenght) {
        return
    }
    let obj = objects[index];
    let style = window.getComputedStyle(obj);

    oji.objects[index] = () => {
        push(
            {
                meta: {
                    id: `${oji.config.id}-${index}`,
                },
                dimensions: {
                    absolute: {
                        width: `${style.width}`,
                        height: `${style.height}`,
                        aspectRatio: `1:${parseFloat((style.width / style.height).toFixed(2))}`,
                    },
                    viewport: {
                        absolute: {
                            spacing: {
                                top: (obj.getBoundingClientRect().top),
                                right: (window.innerWidth - obj.getBoundingClientRect().right),
                                bottom: (window.innerHeight - obj.getBoundingClientRect().bottom),
                                left: (obj.getBoundingClientRect().left),
                            }
                        },
                        relative: {
                            spacing: {
                                top: (100 / window.innerHeight * obj.getBoundingClientRect().top),
                                right: (100 / window.innerWidth * obj.getBoundingClientRect().right),
                                bottom: (100 / window.innerHeight * obj.getBoundingClientRect().bottom),
                                left: (100 / window.innerWidth * obj.getBoundingClientRect().left),
                            },
                            // The area of the Element Relative to the Viewport in Percentage
                            area: ((window.innerHeight * window.innerWidth) - (style.width * style.height)),
                            // Calc the Area of the Element Visible in the Viewport right now
                            areaVisible: null
                        }
                    },
                    document: {
                        absolute: {
                            spacing: {
                                top: (obj.getBoundingClientRect().top),
                                right: (window.innerWidth - obj.getBoundingClientRect().right),
                                bottom: (window.innerHeight - obj.getBoundingClientRect().bottom),
                                left: (obj.getBoundingClientRect().left),
                            }
                        },
                        relative: {
                            spacing: {
                                top: null,
                                right: null,
                                bottom: null,
                                left: null
                            },
                            // The area of the Element Relative to the Document in Percentage
                            area: null,
                            // The area of the Element Relative Visibility in the Document in Percentage
                            areaVisible: null
                        }
                    }
                }
            }
        )
    }
    /**
    * Use the Oji Update Function
    * to write to the Local Storage
    */
    // oji_update(oji.objects[i]);

    /* 
    Loop through the 
    Function again until the 
    end of the array is
    reached 
     */
    oji_calc_elements(i++)
}

/**
 * 
 * @param {Array} objects 
 * @param {string} events 
 * @param {Function} f 
 */

export function oji_event_listeners(
    objects = document.querySelectorAll(`[${oji_attribute}]`),
    events = oji.config.init.events,
    f) {
    /*
    Function to add Event Listeners to 
    */

    for (o = 0; o <= objects.lenght; o++) {
        let obj = objects[o];

        for (e = 0; e <= events.lenght; e++) {
            let event = events[e];
            obj.addEventListener(event, f)
        }
    }

}

export function oji_set_attributes(
    objects = oji.objects
) {
    // Retrieve the Values from 
    // local storage and set them
    // the html attributes of
    // data-oji element
}

export function oji_set_debug(
    objects = oji.objects
) {
    // Retrieve the Values from 
    // local storage and set them
    // the debug containers of
    // data-oji element
    console.log(`Debug Mode Enalbed on all data-oji Elements`)
}

/*----------------------------------
    GLOBAL APPLICATION
    SWITCHES THAT TURN ON/OFF CERTAIN
    PARTS OF OJI ALL AT ONE; NOT MATTER
    WHAT THE SPECIFIC ELEMENT HAS SET 
 ----------------------------------*/

export function oji_kill(
    objects = oji.objects
) {
    // Kill all oji functionality
    // by using this function if the
    // <body data-oji-active="false">
    // is set to false by user input
    // or if the developer hardcodes it
    // into the html
    console.log(`Oji Globally Disabled`)
}
export function oji_start(
    objects = oji.objects
) {
    // Kill all oji functionality
    // by using this function if the
    // <body data-oji-active="false">
    // is set to false by user input
    // or if the developer hardcodes it
    // into the html
    console.log(`Oji Globally Enabled`)
}
export function oji_kill_attributes(objects = oji.objects) {
    // Enable all data-oji-attriobutes functionality
    // to the applications default state
    // by using this function if the
    // <body data-oji-active="true">
    // is set to false by user input
    // or if the developer hardcodes it
    // into the html
    console.log(`Oji Attributes Globaly Disabled`)

}
export function oji_start_attributes(objects = oji.objects) {
    // Kill all oji functionality
    // by using this function if the
    // <body data-oji-active="false">
    // is set to false by user input
    // or if the developer hardcodes it
    // into the html
    console.log(`Oji Attributes Globally Enabled`)
}

export function oji_kill_debug(objects = oji.objects) {
    // Kill all oji Debug functionality
    // of the DOM 
    // by using this function if the
    // <div data-oji data-oji-debug="false">
    //or the data-oji-debug is deleted
    // all at once
    // or if the developer hardcodes it
    // into the html
    console.log(`Oji Attributes Disabled`)
}

export function oji_start_debug(objects = oji.objects) {
    // Start all oji Debug functionality
    // of the DOM 
    // by using this function if the
    // <div data-oji data-oji-debug="true">
    //or the data-oji-debug is deleted
    // all at once
    // or if the developer hardcodes it
    // into the html
    console.log(`Oji Attributes Enabled`)
}

/**
 * 
 * @returns number
 */

export function oji_create_id() {
    const oji_id = Math.random();
    console.log(oji_id);
    return oji_id;
}

/*----------------------------------
    STRING TRANSFORMATIONS
 ----------------------------------*/

/**
 * 
 * @param {json} json 
 * @returns {string} cssString
 */

export function oji_transform_json_to_html(json) {
    let html_string = '';
    for (let section in json) {
        html_string += section + ': { ';
        for (let key in json[section]) {
            let html_key = key.replace(/([A-Z])/g, '-$1').toLowerCase(); // Transform camelCase to kebab-case
            let value = json[section][key];
            // Ensure the value is properly formatted, especially if it's the last one
            html_string += `${html_key}: ${value}` + (Object.keys(json[section])[Object.keys(json[section]).length - 1] === key ? '' : ', ');
        }
        html_string += ' }, ';
    }
    // Remove the trailing comma and space after the last section
    html_string = html_string.trim().slice(0, -1);
    return html_string;
}

/**
 * 
 * @returns {string} html_string
 */

export function oji_transform_json_to_html_pretty() {
    let html_string = '<div style="white-space: pre;">'; // Use 'pre' for preformatted text
    const indent = '    '; // Define the indentation (two spaces in this case)

    function interate_object(obj, level = 0) {
        let indent_space = indent.repeat(level); // Calculate the current level indentation
        for (let section in obj) {
            html_string += `${indent_space}${section}: {<br>`; // Use <br> for line breaks
            for (let key in obj[section]) {
                let html_key = key.replace(/([A-Z])/g, '-$1').toLowerCase(); // Transform camelCase to kebab-case
                let value = obj[section][key];
                html_string += `${indent_space}${indent}${html_key}: <b>${value}</b>;<br>`; // Append key-value pair with indentation
            }
            html_string += `${indent_space}},<br>`; // Close the section with indentation
        }
    }

    interate_object(json); // Start iterating the JSON object
    html_string += '</div>'; // Close the main container
    return html_string;
}
