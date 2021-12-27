function Search(options) {
  const boom = (text) => {
    throw new Error(text)
  }
  const isType = (value, type) => Object.prototype.toString.call(value) === type
  const isString = (value) => isType(value, "[object String]")
  const isNumber = (value) => isType(value, "[object Number]")
  const isBoolean = (value) => isType(value, "[object Boolean]")
  const isObject = (value) => isType(value, "[object Object]")
  const isArray = (value) => isType(value, "[object Array]")
  const isFunction = (value) => isType(value, "[object Function]")

  /* 校验参数 */
  function _validate(options) {
    let { id, list, valueKey, multiple, disabled, multipleLimit, inputClass, contentClass, chioceItemClass, onInput, onChange } = options
    if (!(id && isString(id))) boom('id is not a string!')
    if (!(list && isArray(list))) boom('list is not a array!')
    if (!(isObject(list[0]) && valueKey && isString(valueKey))) boom('list item is a object but valueKey is not a string!')
    if (multiple && !isBoolean(multiple)) boom('multiple is not a boolean!')
    if (disabled && !isBoolean(disabled)) boom('disabled is not a boolean!')
    if (multipleLimit && !isNumber(multipleLimit)) boom('multipleLimit is not a number!')
    if (inputClass && !isArray(inputClass)) boom('inputClass is not a array!')
    if (contentClass && !isArray(contentClass)) boom('contentClass is not a array!')
    if (chioceItemClass && !isArray(chioceItemClass)) boom('chioceItemClass is not a array!')
    if (onInput && !isFunction(onInput)) boom('onInput is not a function!')
    if (onChange && !isFunction(onChange)) boom('onChange is not a function!')
  }

  _validate(options)
  const container = document.querySelector(`#${options.id}`)
  const [inputContainer, input] = _attach(options)

  const SEARCH_CONTANT = 'search-content'
  let data = []
  let content = null

  input.addEventListener('focus', (event) => {
    _showList()
  })
  
  input.addEventListener('input', (event) => {
    options.onInput(event.target.value)
  })

  document.addEventListener('mousedown', (event) => {
    _closeList()
  })

  container.addEventListener('mousedown', (event) => {
    event.stopPropagation()
  })

  function _attach(options) {
    const { disabled, inputClass } = options
    const inputContainer = document.createElement('div')
    inputContainer.style = 'width:100%; height: 100%; display:flex; flex-wrap:wrap;'
    inputClass && inputContainer.classList.add(...inputClass)
    const input = document.createElement('input')
    input.style = 'width:100%; flex:1; box-sizing:border-box; border:none;'
    if (disabled) input.disabled = disabled
    inputContainer.appendChild(input)
    container.appendChild(inputContainer)
    return [inputContainer, input]
  }

  function _showList() {
    _closeList()
    if (options.list.length < 1) return
    content = document.createElement('div')
    content.id = SEARCH_CONTANT
    options.contentClass ? content.classList.add(...options.contentClass) : content.style = 'position:absolute; border:1px solid black; width:100%; box-sizing:border-box;'
    for (const item of options.list) {
      const target = document.createElement('div')
      target.innerText = options.valueKey ? item[options.valueKey] : item
      options.chioceItemClass && target.classList.add(...options.chioceItemClass)
      target.addEventListener('click', event => _clickItem(event, item))
      content.appendChild(target)
    }
    inputContainer.parentNode.insertBefore(content, inputContainer.nextSibling)
  }

  function _closeList() {
    content && content.parentNode.removeChild(content)
    content = null
  }

  function _clickItem(event, value) {
    const text = event.target.innerText
    if (data.includes(value)) return
    if (options.multiple) {
      if (data.length > options.multipleLimit - 1) return console.warn('所选项达到设置上限')
      data.push(value)
      const tag = _createTag(text, value)
      inputContainer.insertBefore(tag, inputContainer.querySelector('input'))
    } else {
      input.value = text
      data = [value]
    }
    options.onChange(value)
  }

  function _createTag(text, value) {
    const tagContainer = document.createElement('span')
    tagContainer.style = 'margin:2px;  padding:2px; display:flex; flex-warp:nowarp; align-items:center; background:#f2f2f3; font-size:12px; color:#909399;'
    const tag = document.createElement('span')
    tag.style = 'display:inline-block;'
    tag.innerText = text
    tagContainer.appendChild(tag)
    const close = document.createElement('span')
    close.style = 'border-radius:50%; background:#b8bcc5; margin-left:2px; width:12px; height:12px; display:flex; align-items:center; justify-content:center; cursor:pointer;'
    close.innerText = '×'
    tagContainer.appendChild(close)
    close.addEventListener('click', (event) => {
      event.stopPropagation()
      tagContainer.parentNode.removeChild(tagContainer)
      data = data.filter(item => item !== value)
    })
    return tagContainer
  }

  return {
    set list(val) {
      options.list = val
      _validate(options)
      _showList()
    },

    get list() {
      return list
    },

    set disabled(val) {
      options.disabled = val
      _validate(options)
      input.disabled = val
    },
    
    get disabled() {
      return options.disabled
    },

    set onInput(val) {
      options.onInput = onInput
      _validate(options)
    },

    getData() {
      return data
    }
  }
}