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
    config: {
        init: {
            name: 'oji.js',
            version: '0.1',
            id: localStorage.getItem(config.init.id) || oji_create_id(),
            // The begiing of every oji attribute
            attribute: 'data-oji',
            slug: 'oji',
            lag: localStorage.getItem(config.init.lag) || 0,
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
                global: localStorage.getItem(config.state.global) || document.querySelector('body').getAttribute(`${oji_init.attribute}`) || true,
                debug: localStorage.getItem(config.state.debug) || true,
                attributes: localStorage.getItem(config.state.attributes) || true,
                summary: localStorage.getItem(config.state.summary) || true,
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
            abolute: {
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
                area: (docment.body.innerHeight * docment.body.innerWidth).toFixed(0),
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
    object: [
        {}
    ]
}