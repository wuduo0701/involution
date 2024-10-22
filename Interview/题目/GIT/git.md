# git

## git merge 和 rebase

1. git merge
   通过 merge 合并分支会新增一个 merge commit，然后将两个分支的历史联系起来
   commit 比较频繁时，看到分支很杂乱
2. git rebase
   rebase 会将整个分支移动到另一个分支上，有效地整合了所有分支上的提交
   问题：如果合并出现代码问题不容易定位，因为 重写了 history

## git reset 和 revert

1. git reset
   （重置）用于回退版本，可以遗弃不再使用的提交，会改变历史
2. git revert
   新增一次提交，抵消掉上一次提交导致的所有变化，不会改变历史

两个都是回退分支。如果代码以后还要用则用 `git revert`。如果提错分支了想回退则用 `git reset`

## git pull 和 git fetch

1. git pull
   相当于 git fetch + git merge
2. git fetch
   把远程分支拉取过来，相对来说更安全

## git 有最近两次 commit a,b 。b 为最新的 commit。如和修改到 a 上面的 commit 内容，并且不会变动最新的 commit

1. rebase 到 a 的历史 commit 上
2. 编辑提交
   1. pick <commit-a-hash> Commit message for a
   2. pick <commit-b-hash> Commit message for b
3. 修改提交 a：
4. git rebase --continue
