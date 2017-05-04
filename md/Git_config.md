#### git config

用来设置控制git外观和行为的配置变量。有三个不同的配置文件：

* `/etc/gitconfig` 包含系统上每一个用户及他们仓库的通用配置，`git config --system xxx xxx`
* `~/.gitconfig`或`~/.config/git/config` 只针对当前用户，`git config --global xxx xxx`
* 仓库的 `.git/config`，针对该仓库

每一个级别覆盖上一级别的配置

通过 `git config --list` 列出所有配置

通过 `git config xxx` 检查git某一项配置

常用配置：

```
[alias]
	st = status -bsu
	lg = log --color --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit
	ll = log --graph --decorate --oneline -10
	l = log --graph --decorate --format=format:'%C(auto)%h%Creset <%C(blue)%an%Creset@%C(cyan)%ad%Creset>%C(auto)%d%Creset   %s'
	lc = log --graph --decorate --format=format:'%C(auto)%h%Creset <%C(blue)%cn%Creset@%C(cyan)%cd%Creset>%C(auto)%d%Creset   %s'
```
