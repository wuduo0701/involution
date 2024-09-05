# git

## git merge 和 rebase

1. git merge
   通过 merge 合并分支会新增一个 merge commit，然后将两个分支的历史联系起来
   commit 比较频繁时，看到分支很杂乱
2. rebase
   rebase 会将整个分支移动到另一个分支上，有效地整合了所有分支上的提交
   问题：如果合并出现代码问题不容易定位，因为 重写了 history
