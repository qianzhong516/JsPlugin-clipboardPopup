(function() {

    /* Constructor */
    ClipboardPopup = function() {

        this.wrapper = null
        this.link = null
        this.button = null

        let defaults = {
            wrapperId: 'clipboard',
            wrapperBgColor: '#292929',
            linkBgColor: '#FFFFFF',
            btnColor: '#fff',
            linkContent: 'link is here'
        }

        if( arguments[0] && typeof arguments[0] === 'object' ){
            this.settings = extendSettings(defaults, arguments[0])
        }else 
            this.settings = defaults

        init.call(this)
    }
    
    /* Public methods */
    ClipboardPopup.prototype.show = function() {
        let _ = this
        _.wrapper.style.transform = 'translateY(0)'
    }

    /* Private methods */
    function init() {
        let _ = this

        _.wrapper = document.querySelector(`#${_.settings.wrapperId}`)
        _.wrapper.className+= ' clipboardPopup'
        _.wrapper.style.backgroundColor = this.settings.wrapperBgColor

        _.link = document.createElement('p')
        _.link.textContent = this.settings.linkContent
        _.link.style.backgroundColor = this.settings.linkBgColor

        _.button = document.createElement('button')
        _.button.style.border = `2px solid ${_.settings.btnColor}`
        _.button.style.color = `${_.settings.btnColor}`
        _.button.textContent = "Copy to clipboard"
        _.button.addEventListener('click', selectTextInElem.bind(_))
        
        _.wrapper.insertAdjacentElement('afterbegin', _.link)
        _.wrapper.insertAdjacentElement('beforeend', _.button)
    }

    /* Internal helper methods  */
    function selectTextInElem() {
        let _ = this

        if(window.getSelection) {
            const selection = window.getSelection()
            const range = document.createRange()
            range.selectNodeContents(_.link)
            selection.removeAllRanges()
            selection.addRange(range)

            // copy the text
            document.execCommand('copy', false, _.link.textContent)
        }
    }
    
    function extendSettings(defaults, properties) {
        for(let prop in properties) {
            if(defaults.hasOwnProperty(prop))
                defaults[prop] = properties[prop]
        }
        return defaults
    }

})()