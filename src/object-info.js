(function () {
    randomId = Math.floor(Math.random() * 9999);
    function calculateObjectInfo() {
        var elements = document.querySelectorAll('[data-object-info]');

        style = document.createElement('style');
        style.textContent = `
        [data-object-info-debug] {
            position: relative;
            --oj-max-width: min(300px, 100%);
            outline-width: 3px;
            outline-style: solid;
            outline-offset: -1.5px;
        }
       
        [data-object-info-debug]::after {
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
            max-width: var(--oj-max-width);
            word-break: break-word;
            font-size: 0.66rem;
            line-height: 1.25;
            font-family: monospace;
            z-index: 9999;
            text-shadow: 0 0 1px rgba(0,0,0, 0.33);
           
        }
        @media (prefers-color-scheme: dark) {
            [data-object-info-debug]::after {
                background-color: #000000b3;
                color: #fff;
            }
        }`;
        document.head.appendChild(style);

        for (var i = 0; i < elements.length; i++) {
            var el = elements[i];
            var style = window.getComputedStyle(el);
            var widthPx = parseFloat(style.width);
            var heightPx = parseFloat(style.height);
            var roundedWidth = Math.round(widthPx);
            var roundedHeight = Math.round(heightPx);
            var viewPortWidth = window.innerWidth;
            var viewPortHeight = window.innerHeight;
            var DocWidth = document.documentElement.scrollWidth;
            var DocHeight = document.documentElement.scrollHeight;
            var viewPortWidthRelative = Math.round((100 / viewPortWidth * roundedWidth));
            var viewPortHeightRelative = Math.round((100 / viewPortHeight * roundedHeight));
            var docWidthRelative = Math.round((100 / DocWidth * roundedWidth));
            var docHeightRelative = Math.round((100 / DocHeight * roundedWidth));
            var rect = el.getBoundingClientRect();
            var leftToViewport = rect.left;
            var topToViewport = rect.top;
            var rightToViewport = window.innerWidth - rect.right;
            var bottomToViewport = window.innerHeight - rect.bottom;
            var spacingLeft = Math.round(leftToViewport);
            var spacingRight = Math.round(rightToViewport);
            var spacingTop = Math.round(topToViewport);
            var spacingBottom = Math.round(bottomToViewport);
            var spacingLeftViewportRelative = Math.round((100 / viewPortWidth * spacingLeft));
            var spacingRightViewportRelative = Math.round((100 / viewPortWidth * spacingRight));
            var spacingTopViewportRelative = Math.round((100 / viewPortHeight * spacingTop));
            var spacingBottomViewportRelative = Math.round((100 / viewPortHeight * spacingBottom));
            var spacingLeftDocRelative = Math.round((100 / DocWidth * spacingLeft));
            var spacingRightDocRelative = Math.round((100 / DocWidth * spacingRight));
            var spacingTopDocRelative = Math.round((100 / DocHeight * spacingTop));
            var spacingBottomDocRelative = Math.round((100 / DocHeight * spacingBottom));

            if (el.hasAttribute('data-object-info-attributes')) {
                el.setAttribute('data-object-info-width', roundedWidth + 'px');
                el.setAttribute('data-object-info-height', roundedHeight + 'px');
                el.setAttribute('data-object-info-aspect', '1/' + (roundedWidth / roundedHeight).toFixed(2));
                el.setAttribute('data-object-info-viewport-width-relative', viewPortWidthRelative + '%');
                el.setAttribute('data-object-info-viewport-height-relative', viewPortHeightRelative + '%');
                el.setAttribute('data-object-info-document-width-relative', docWidthRelative + '%');
                el.setAttribute('data-object-info-document-height-relative', docHeightRelative + '%');
                el.setAttribute('data-object-info-left-to-viewport', Math.round(leftToViewport) + 'px');
                el.setAttribute('data-object-info-top-to-viewport', Math.round(topToViewport) + 'px');
                el.setAttribute('data-object-info-right-to-viewport', Math.round(rightToViewport) + 'px');
                el.setAttribute('data-object-info-bottom-to-viewport', Math.round(bottomToViewport) + 'px');
                el.setAttribute('data-object-info-left-to-viewport-relative', spacingLeftViewportRelative + '%');
                el.setAttribute('data-object-info-top-to-viewport-relative', spacingTopViewportRelative + '%');
                el.setAttribute('data-object-info-right-to-viewport-relative', spacingRightViewportRelative + '%');
                el.setAttribute('data-object-info-bottom-to-viewport-relative', spacingBottomViewportRelative + '%');
                el.setAttribute('data-object-info-left-to-doc-relative', spacingLeftDocRelative + '%');
                el.setAttribute('data-object-info-top-to-doc-relative', spacingTopDocRelative + '%');
                el.setAttribute('data-object-info-right-to-doc-relative', spacingRightDocRelative + '%');
                el.setAttribute('data-object-info-bottom-to-doc-relative', spacingBottomDocRelative + '%');
            }
            let summaryContent = '{ ' +
                'absolute: { ' +
                'width:' + roundedWidth + 'px, ' +
                'height:' + roundedHeight + 'px, ' +
                'aspect:' + '1/' + (roundedWidth / roundedHeight).toFixed(2) + ', ' +
                'spacing-top:' + spacingTop + 'px, ' +
                'spacing-right:' + spacingRight + 'px, ' +
                'spacing-bottom:' + spacingBottom + 'px, ' +
                'spacing-left:' + spacingLeft + 'px, ' +
                ' }, ' +
                'viewport: { ' +
                'width:' + viewPortWidthRelative + '%, ' +
                'height:' + viewPortHeightRelative + '%, ' +
                'spacing-top:' + spacingTopViewportRelative + '%, ' +
                'spacing-right:' + spacingRightViewportRelative + '%, ' +
                'spacing-bottom:' + spacingBottomViewportRelative + '%, ' +
                'spacing-left:' + spacingLeftViewportRelative + '% ' +
                '}, ' +
                'document: { ' +
                'width:' + docWidthRelative + '%, ' +
                'height:' + docHeightRelative + '%, ' +
                'spacing-top:' + spacingTopDocRelative + '%, ' +
                'spacing-right:' + spacingRightDocRelative + '%, ' +
                'spacing-bottom:' + spacingBottomDocRelative + '%, ' +
                'spacing-left:' + spacingLeftDocRelative + '% ' +
                '} ' +
                '}'

            el.setAttribute('data-object-info', summaryContent);

            if (el.hasAttribute('data-object-info-debug')) {
                const randomNumberR = Math.floor(Math.random() * 256);
                const randomNumberG = Math.floor(Math.random() * 256);
                const randomNumberB = Math.floor(Math.random() * 256);
                el.style.outlineColor = `rgba(${randomNumberR}, ${randomNumberG}, ${randomNumberB}, 0.33)`;
                el.style.boxShadow = `0 0 1rem rgba(${randomNumberR}, ${randomNumberG}, ${randomNumberB}, 0.66)`;
                el.setAttribute('data-object-info-id', `${randomId}-${i}`);
                styleTag = document.createElement('style');
                styleTag.textContent = `
                [data-object-info-id="${randomId}-${i}"]::after {
                    content: 'object-info-id="${randomId}-${i}" = ${summaryContent}';
                   
                }`;
                document.head.appendChild(styleTag);
            }
        }
    }

    window.addEventListener('load', calculateObjectInfo);
    window.addEventListener('resize', calculateObjectInfo);
    window.addEventListener('scroll', calculateObjectInfo);

})();
