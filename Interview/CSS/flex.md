## flex

> 弹性布局，是响应式布局方式之一

- flex-direction 决定主轴的方向，
  - row（默认值）：主轴为水平方向，起点在左端
  - row-reverse：主轴为水平方向，起点在右端
  - column：主轴为垂直方向，起点在上沿。
  - column-reverse：主轴为垂直方向，起点在下沿
- flex-wrap 决定是否换行
  - nowrap（默认值）：不换行
  - wrap：换行，第一行在下方
  - wrap-reverse：换行，第一行在上方
- flex-flow （上面两种的缩写）
- justify-content
- align-items
- align-content

### flex-item

- order
  定义项目的排列顺序。数值越小，排列越靠前，默认为 0
- flex-grow

  > 即如果存在剩余空间，项目将放大

  定义项目的放大比例（容器宽度 > 元素总宽度时如何伸展）

- flex-shrink

  > 即如果空间不足，该项目将缩小

  定义了项目的缩小比例（容器宽度 < 元素总宽度时如何收缩）

- flex-basis
  > 元素在主轴上的初始(在元素伸缩前)尺寸
- flex（复合属性：放大、缩小、初始尺寸的合计）
- align-self
