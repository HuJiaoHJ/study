### CentOS 6.5、MAC安装mysql方法、远程登录mysql

#### CentOS 6.5安装mysql

参考：

* https://segmentfault.com/a/1190000003049498
* http://www.cnblogs.com/xiaoluo501395377/archive/2013/04/07/3003278.html

1、检测系统是否自带安装mysql

```
yum list installed | grep mysql
```
2、删除系统自带的mysql及其依赖命令

不做这个操作，就会出现如下错误：

<img width="882" alt="linux-mysql-error1" src="https://user-images.githubusercontent.com/11912260/28203522-af7ba964-68ac-11e7-82c9-7bd8fe87688b.png">

```
yum -y remove mysql-libs.x86_64
```

3、给CentOS添加rpm源

```
wget dev.mysql.com/get/mysql-community-release-el6-5.noarch.rpm
yum localinstall mysql-community-release-el6-5.noarch.rpm
yum repolist all | grep mysql
yum repolist all | grep mysql
```

4、安装mysql服务器命令

```
yum install mysql-community-server
```

5、启动mysql命令

```
service mysqld start

service mysqld stop

service mysqld restart
```

6、查看mysql是否自启动,并且设置开启自启动命令

```
chkconfig --list | grep mysqld

chkconfig mysqld on
```

7、为root账号设置密码

```
mysqladmin -u root password 'xxx'
```

8、登录数据库

```
mysql -u root -p
```

#### mac安装mysql

参考：https://aaaaaashu.gitbooks.io/mac-dev-setup/content/MySql/index.html

1、homebrew安装mysql

```
brew install mysql
```

2、启动

```
mysql.server start

mysql.server stop
```

#### 远程登录mysql

在本地机器中输入如下：

```
mysql -h 10.x.xxx.xx -P3306 -u root -p
```

需要在远程mysql上添加白名单：

参考：http://ask.uoota.com/infodetail-2049803.html

1、登录

```
mysql -u root -p
```

2、操作数据库

```
use mysql;
select host,user from user;
// 删除表中不需要的ip和用户
delete from user where user='username' and host='host'
// 增加表中不存在的ip和用户
grant all privileges on *.* to 'username'@'host' identified by 'password' with grant option;
// 是更新配置生效
flush privileges;
```
