(function() {
    const answer = "Mensagem automática";
    
    const ONE_SECOND = 1000
    const TWO_SECONDS = ONE_SECOND * 2
    const InputEvent = window.Event || window.InputEvent
    
    const executeFirstReturnSecond = (callback, returnedValue) => { callback(); return returnedValue; }
    const createMouseEvent = () => document.createEvent('MouseEvents')
    const eventInit = (eventName, event) => { event.initEvent(eventName, true, true); return event; }
    const mouseEvent = (element, eventName) => element.dispatchEvent(eventInit(eventName, createMouseEvent()))
    const isGroup = (element) => !!element.querySelector('.chat-body .chat-secondary .chat-status span._2_LEW span.sender')
    const isNotGroup = (element) => !isGroup(element)
    const getUnreadChats = () => Array.prototype.filter.call(document.querySelectorAll('.chat.unread'), isNotGroup)
    const getLastMessage = () => document.querySelector('#main > .pane-body > .copyable-area > .pane-chat-msgs .msg:last-child > .message')
    const lastMessageContainsMessageIn = () => getLastMessage().classList.contains('message-in')
    const getTextBox = () => document.querySelector('#main > footer > div.block-compose > div.input-container > div.pluggable-input.pluggable-input-compose > div.pluggable-input-body.copyable-text.selectable-text')
    const lastMessageEmoji = () => getLastMessage().querySelector('.emojitext') || getLastMessage().querySelector('.large-emoji-container')
    const repeatLastMessageWithEmoji = () => lastMessageEmoji() && Array.prototype.reduce.call(lastMessageEmoji().querySelectorAll('img'), (acc, curr) => acc.concat(curr.getAttribute('alt')), '')
    const executeAfterOneSecond = callback => setTimeout(callback, ONE_SECOND)
    const getNewInputEvent = () => new InputEvent('input', {bubbles: true})
    const getSendButton = () => document.querySelector("button.compose-btn-send")
    const sendMessage = () => getSendButton() ? getSendButton().click() : null
    const setTextboxMessage = (message) => {
        const textBox = getTextBox()
        textBox.textContent = message
        textBox.dispatchEvent(getNewInputEvent())
    }
        
    const mainLoop = () => getUnreadChats()
    .map(chat => executeFirstReturnSecond(
        mouseEvent.bind(null, chat, 'mousedown'),
        chat
    ))
    .forEach(chat => {
        executeAfterOneSecond(() => {
            if (lastMessageContainsMessageIn()) {
                const message = repeatLastMessageWithEmoji() || answer
                setTextboxMessage(message)
                sendMessage()
            }
        })
    })

    setInterval(mainLoop, TWO_SECONDS)
})()