function renderTemplate(template, data) {
  return template.replace(/{{(.*?)}}/g, (match, key) => {
    // 去除前后空格并返回对应的数据值
    return data[key.trim()] !== undefined ? data[key.trim()] : match
  })
}
const template = `
    <div>
        <h1>Hello, {{ name }}!</h1>
        <p>Your age is {{ age }}.</p>
    </div>
`

const data = {
  name: 'Alice',
  age: 30
}

// 渲染模板
const renderedHTML = renderTemplate(template, data)
console.log(renderedHTML)
