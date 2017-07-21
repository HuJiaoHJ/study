### CentOS 6.5 安装Node环境

#### CentOS 6.5安装Node

参考：http://blog.leanote.com/post/darker/CentOS-6.5%E5%AE%89%E8%A3%85Node.js-npm

> Node.js and npm are available from the Fedora Extra Packages for Enterprise Linux (EPEL) repository. If you haven't already done so, firstenable EPEL.

1、检查是否有EPEL

```
yum repolist
```

2、如果没有EPEL，通过RPM安装：

```
rpm -Uvh http://download-i2.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm
```

3、通过以下命令安装node、npm：

```
sudo yum install nodejs npm --enablerepo=epel
```

4、查看node、npm是否安装成功：

```
node --version

npm --version
```

5、注意：此时node的版本较低，可以使用n或者nvm安装新版本的node

```
npm install -g n

n latest
```

6、安装yarn，直接按照官网的安装教程：https://yarnpkg.com/en/docs/install#linux-tab

```
sudo wget https://dl.yarnpkg.com/rpm/yarn.repo -O /etc/yum.repos.d/yarn.repo

curl --silent --location https://rpm.nodesource.com/setup_6.x | bash -

sudo yum install yarn

yarn --version
```

#### CentOS 6.5安装Git

1、方法一：

```
yum install git
```

此方法安装的git版本较低，如果需要安装新版本需要通过下载源码的方式进行安装，因为在主机上不用做复杂的git操作，所以现有的git版本基本能满足需求，就没有试过源码安装的方式

2、配置

```
git config --global user.name "Your Name"

git config --global user.email "email@example.com"
```

3、生成key

```
ssh-keygen -t rsa -C "youremail@example.com"
```

#### CentOS 6.5安装mysql

参考：https://github.com/HuJiaoHJ/study/issues/2
