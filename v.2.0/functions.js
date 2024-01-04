

export function oji_complex_to_simple_type(key, value) {
    // Modify this function to handle other complex types as needed
    if (typeof value === 'function') {
        return value.name; // Or whatever you decide to store for functions
    } else if (value instanceof Element) {
        return value.tagName; // Simplification for DOM elements
    }
    return value;
}
/**
 * 
 * @param {object} oji_complex_to_simple_type 
 */
export function oji_update(updated_props) {
    // Calc all Objects
    oji_object_calc();
    // Ensure oji is already defined and is an object
    if (typeof oji !== 'object') {
        oji = {};
    }

    // Update the oji object with the new properties
    for (const key in updated_props) {
        if (updated_props.hasOwnProperty(key)) {
            oji[key] = updated_props[key];
        }
    }

    // Serialize the updated object into a string
    let oji_string = JSON.stringify(oji, oji_complex_to_simple_type);

    // Store it in localStorage
    localStorage.setItem('oji', oji_string);
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

export function oji_object_calc(objects = config.objects) {
    /*
    each iteration of the loop should
    create a oji.object.array id can 
    later place on the element in the 
    html attributes ection or insert in 
    the DOM as visle cntainer for debugging

    these arrays should be stored in the 
    oji.objects keyword (all of them)

    I'm trying to use a
    function programming 
    approch to this loop
    */

    /**
     * 
     * @param {array} objects 
     * @returns {object} 
     */

    function oji_calc_elements(index = 0, objects) {
        // Return if the last item of the array
        // was iterated through
        if (index <= array.lenght) {
            return
        }


        let array = () => {
            if (objects.lenght <= 1000) {
                console.log('Number of oji Elements limited to 1000')
                array = 1000
            } else {
                array = objects.lenght
            }
        }
        let obj = objects[i];
        let style = window.getComputedStyle(obj);

        oji.objects.obj.push(
            {
                meta: {
                    id: `${oji.config.id}-${index}`,
                },
                dimnensions: {
                    absolute: {
                        width: `${style.width}`,
                    }
                }
            }
        )
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

}

export function oji_set_attributes(objects = config.objects) {
    // Retrieve the Values from 
    // local storage and set them
    // the html attributes of
    // data-oji element
}

export function oji_set_debug(objects = config.objects) {
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

export function oji_kill() {
    // Kill all oji functionality
    // by using this function if the
    // <body data-oji-active="false">
    // is set to false by user input
    // or if the developer hardcodes it
    // into the html
    console.log(`Oji Disabled`)
}
export function oji_start() {
    // Kill all oji functionality
    // by using this function if the
    // <body data-oji-active="false">
    // is set to false by user input
    // or if the developer hardcodes it
    // into the html
    console.log(`Oji Enabled`)
}
export function oji_kill_attributes() {
    // Enable all data-oji-attriobutes functionality
    // to the applications default state
    // by using this function if the
    // <body data-oji-active="true">
    // is set to false by user input
    // or if the developer hardcodes it
    // into the html
    console.log(`Oji Enabled`)

}
export function oji_start_attributes() {
    // Kill all oji functionality
    // by using this function if the
    // <body data-oji-active="false">
    // is set to false by user input
    // or if the developer hardcodes it
    // into the html
    console.log(`Oji Attributes Enabled`)
}

export function oji_kill_debug() {
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

export function oji_start_debug() {
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
