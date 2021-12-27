## 概述
满足小众场景的 select 组件，支持多选与删除，可搜索过滤目标项，极其适合HTML上使用，源码简单易读，可拷贝主目录下的 select.js 进行二次开发。

## API
| Field              | Type                      | Default              | Description                              |
| ------------------ | --------------------------| ---------------------| ---------------------------------------- |
| `id`               | `string`                  | `-`                  | 容器ID |
| `list`             | `string`                  | `-`                  | 下拉选择列表 |
| `disabled?`        | `boolean`                 | `false`              | 是否禁用 |
| `valueKey?`        | `string`                  | `-`                  | 下拉项标识的键名，list 子项为对象类型时必填 |
| `multiple?`        | `boolean`                 | `false`              | 是否多选 |
| `multipleLimit?`   | `number`                  | `-`                  | 多选时最多选多少项 |
| `inputClass?`      | `array`                   | `-`                  | 最外层选择框的 class 样式名 |
| `contentClass?`    | `array`                   | `-`                  | 下拉选择框的 class 样式名 |
| `chioceItemClass?` | `array`                   | `-`                  | 选择项的 class 样式名 |
| `onInput?`         | `function (value)`        | `-`                  | 输入框输入触发回调 |
| `onChange?`        | `function (item)`         | `-`                  | 点击选择项回调 |
| `getData?`         | `function ()`             | `-`                  | 获取选择结果 |

## 说明
select.js 中有预设值的 style 样式，设置以下样式一般建议加上：
```css
/* contentClass */
.content {
  position: absolute; 
  border: 1px solid black; 
  width: 100%; 
  box-sizing: border-box;
}
```

## 使用
```javascript
let total = [
  { name: '111' },
  { name: '222' },
  { name: '333' },
  { name: '444' },
  { name: '555' },
  { name: '666' },
  { name: '777' },
  { name: '888' },
  { name: '999' },
]
const search = new Search({
  id: 'search',
  list: total,
  multiple: true,
  valueKey: 'name',
  multipleLimit: 5,
  contentClass: ['content'],
  chioceItemClass: ['chioce'],
  onInput: onInput,
  onChange: onChange,
})
function onInput(val) {
  search.list = total.filter(item => item.includes(val))
}
function onChange(item) {
  console.log('==> onChange', item);
}
```

## 写在最后
喜欢的可以点个 star✨，谢谢！