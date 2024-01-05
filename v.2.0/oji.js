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

import {
  oji,
  oji_attribute
} from './config.js';

import {
  oji_update,
  oji_debounce,
  oji_create_id,
  oji_object_calc,
  oji_complex_to_simple_type,
  oji_event_listeners,
  oji_kill,
  oji_start,
  oji_kill_attributes,
  oji_start_attributes,
  oji_kill_debug,
  oji_start_debug

} from './functions.js';

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
  let oji_elements = document.querySelectorAll(`[${oji_attribute}]`);
  let oji_is_active_globally = document.body.getAttribute(`${oji_attribute}-active`);
  let oji_debug_is_active_globally = document.body.getAttribute(`${oji_attribute}-debug`);
  let oji_attributes_is_active_globally = document.body.getAttribute(`${oji_attribute}-debug`);
  
  oji_update(oji);
  // Check if the body has the data-oji-active attribute set to "false"
  // If not, then set it to "true"
  if (oji_is_active_globally !== 'false') {
    document.body.setAttribute(`${oji_attribute}-active`, 'true');
    localStorage.setItem('oji_config_state_global', 'true'); // Corrected the way of setting the item
  }

  // Similar check for data-oji-debug
  if (oji_debug_is_active_globally !== 'false') {
    document.body.setAttribute(`${oji_attribute}-debug`, 'true');
    oji.config.init.state.global = 'true';
  }

  // Similar check for data-oji-debug
  if (oji_debug_is_active_globally !== 'false') {
    document.body.setAttribute(`${oji_attribute}-debug`, 'true');
    oji.config.init.state.debug = 'true';
  }

  // Similar check for data-oji-debug
  if (oji_attributes_is_active_globally !== 'false') {
    document.body.setAttribute(`${oji_attribute}-debug`, 'true');
    oji.config.init.state.attributes = 'true';
  }

  console.log(oji_object_calc(0, oji_elements))

  // Event listener for 'load' event
  document.addEventListener('load', () => {

  });

})();
