(function() {
    const ONE_SECOND = 1000
    const InputEvent = window.Event || window.InputEvent
    
    const executeFirstReturnSecond = (callback, returnedValue) => { callback(); return returnedValue; }
    const createMouseEvent = () => document.createEvent('MouseEvents')
    const eventInit = (eventName, event) => { event.initEvent(eventName, true, true); return event; }
    const mouseEvent = (element, eventName) => element.dispatchEvent(eventInit(eventName, createMouseEvent()))
    const getTextBox = () => document.querySelector('#main > footer > div.block-compose > div.input-container > div.pluggable-input.pluggable-input-compose > div.pluggable-input-body.copyable-text.selectable-text')
    const executeAfterOneSecond = callback => setTimeout(callback, ONE_SECOND)
    const getNewInputEvent = () => new InputEvent('input', {bubbles: true})
    const getSendButton = () => document.querySelector("button.compose-btn-send")
    const sendMessage = () => getSendButton() ? getSendButton().click() : null

    const setTextboxMessage = (message) => {
        const textBox = getTextBox()
        textBox.textContent = message
        textBox.dispatchEvent(getNewInputEvent())
    }

    const getTarget = (target) => Array.prototype.filter.call(document.querySelectorAll('.chat-title span'), (span) => ~span.getAttribute('title').toLowerCase().indexOf(target))
    const prepareTargetList = (targetList) => targetList && targetList.length && targetList.toLowerCase().replace(/\s/gi, '').split(',').reduce((acc, curr) => { if(curr.length) { acc.push(curr) } return acc }, [])
    const targetList = prepareTargetList(window.prompt('Type the targets name separated by comma')).map(el => getTarget(el)).reduce((acc, curr) => acc.concat(curr), [])
    const message = window.prompt('What shall be the annoying message, dear sir-madam?');
        
    const mainLoop = () => targetList
    .map(chat => executeFirstReturnSecond(
        mouseEvent.bind(null, chat, 'mousedown'),
        chat
    ))
    .forEach(chat => {
        executeAfterOneSecond(() => {
            setTextboxMessage(message)
            sendMessage()
        })
    })

    setInterval(mainLoop, ONE_SECOND / 2)
})()