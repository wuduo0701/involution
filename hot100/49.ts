// 给你一个字符串数组，请你将 字母异位词 组合在一起。可以按任意顺序返回结果列表。

// 字母异位词 是由重新排列源单词的所有字母得到的一个新单词。

// 示例 1:

// 输入: strs = ["eat", "tea", "tan", "ate", "nat", "bat"]
// 输出: [["bat"],["nat","tan"],["ate","eat","tea"]]
// 示例 2:

// 输入: strs = [""]
// 输出: [[""]]
// 示例 3:

// 输入: strs = ["a"]
// 输出: [["a"]]

// 提示：

// 1 <= strs.length <= 104
// 0 <= strs[i].length <= 100
// strs[i] 仅包含小写字母

/**
 * 字母异位词组合
 * NOTE: 无论是不是新单词，把乱序的单词sort排序一遍都是一个单词。这样就可以使用hash结构，把sort后单词作为key，乱序后的单词拼成一个数组
 *
 * NOTE:
 *  1、uniqWordMap.values返回的是Iterator迭代对象，需要转化成相应的数组。可使用Array.from、[...Iterator]的方式。详细可参考：https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Iterator
 */
const groupAnagrams = (strs: string[]): string[][] => {
  const uniqWordMap = new Map<string, string[]>() // 单词hashMap

  for (const word of strs) {
    let sortWord = word.split('').sort().join('')
    if (uniqWordMap.get(sortWord)) {
      uniqWordMap.get(sortWord).push(word)
    } else {
      uniqWordMap.set(sortWord, [word])
    }
  }
  // console.log([...uniqWordMap.values()])
  // console.log(Array.from(uniqWordMap.values()))
  return [...uniqWordMap.values()]
}
const strs1 = ['eat', 'tea', 'tan', 'ate', 'nat', 'bat']
const strs2 = ['']
const strs3 = ['a']
console.log(groupAnagrams(strs1))
console.log(groupAnagrams(strs2))
console.log(groupAnagrams(strs3))
