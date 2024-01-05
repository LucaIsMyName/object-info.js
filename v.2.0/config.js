/**
 * @name oji
 * @description
 * the object that is the single source of truth
 * it should be set to local storage and update
 * the DOM from the local storage
 * this is the initial application state
 * 
 */



export let oji = {
    _experimental: {},
    config: {
        init: {
            name: 'oji.js',
            version: '0.1',
            id: false,
            // The begiing of every oji attribute
            attribute: 'data-oji',
            slug: 'oji',
            debounce: 0,
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
                summary: true,
            }
        },
    },
    // User Agent Informations
    user: {
        agent: navigator.userAgent,
        os: navigator.platform,
        lang: navigator.language || navigator.userLanguage,
        // fontSize: `${getUserAgentFontSize()}px`,
        dimensions: {
            absolute: {
                height: window.screen.height,
                width: window.screen.width,
                aspectRatio: `1:${(window.screen.width / window.screen.height).toFixed(2)}`,
                numberOfPixels: window.screen.width * window.screen.height
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
                area: (document.body.innerHeight * document.body.innerWidth).toFixed(0),
            },
        }
    },
    viewport: {
        dimensions: {
            absolute: {
                width: window.innerWidth,
                height: window.innerHeight,
                area: (window.innerHeight * window.innerWidth).toFixed(0),
            },
        },
    },
    objects: [

    ]
}

export let oji_attribute = oji.config.init.attribute;
export let oji_version = oji.config.init.version;
export let oji_events = oji.config.init.events;
export let oji_debounce = oji.config.init.debounce;
export let oji_state = oji.config.init.state;
export let oji_state_global = oji.config.init.state.global;
export let oji_state_attributes = oji.config.init.state.attributes;
export let oji_state_debug = oji.config.init.state.debug;

