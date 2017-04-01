#### Git有用命令

* `git blame [file]` 查看某个文件中每行代码最近一次的修改作者信息，其他：
    * -l 显示长hash
    * -t 显示时间戳
    * -s 不输出名字和时间
    * -n 显示初始的行号
    * -e 显示作者邮箱代替名字
    * -L 规定每行的范围，可以用正则
* `git log -p [file]` 查看某个文件的历史提交情况
* `git stash` `git stash list` `git stash pop` 暂存修改而不提交修改
* `git checkout develop build` 复制develop分支的build文件到当前分支
* `git log` 查看提交历史

```
git log -p // 显示每次提交的修改
git log -p -2 // 仅显示最近的两次更新
git log --pretty=online --graph // 以图形的形式展示提交历史
...
```
