### RabbitMQ 安装

https://www.rabbitmq.com/documentation.html

#### mac安装RabbitMQ

1、使用homebrew进行安装

```
brew install rabbitmq
```

> The RabbitMQ server scripts are installed into /usr/local/sbin. This is not automatically added to your path, so you may wish to add
PATH=$PATH:/usr/local/sbin to your .bash_profile or .profile. The server can then be started with rabbitmq-server.

添加方法：

```
vi ~/.bash_profile

// export PATH=$PATH:/usr/local/sbin

source ~/.bash_profile

echo $PATH
```

参考：

* https://www.rabbitmq.com/install-homebrew.html
* https://www.cyberciti.biz/faq/appleosx-bash-unix-change-set-path-environment-variable/

#### CentOS 6.5安装RabbitMQ

参考：http://www.qaulau.com/linux-centos-install-rabbitmq/

> 由于RabbitMQ是基于Erlang语言开发的，所以要使用RabbitMQ的前提当然是要安装其运行环境

1、安装Erlang

```
yum install erlang

// erl查看是否安装成功
```

2、安装RabbitMQ

```
wget http://www.rabbitmq.com/releases/rabbitmq-server/v3.3.5/rabbitmq-server-3.3.5-1.noarch.rpm

yum install rabbitmq-server-3.3.5-1.noarch.rpm
```

3、加入开机启动服务

```
chkconfig rabbitmq-server on
```

4、启动

```
service rabbitmq-server start

service rabbitmq-server stop

service rabbitmq-server reload
```

以上，RabbitMQ就安装成功了，为了方便对消息更方便的查看和监控，启用RaabitMQ的web管理页面，该服务默认是不启用的，需要手动开启

5、查看当前插件启用列表

```
rabbitmq-plugins list -e
```

6、启用rabbitmq_management插件

```
rabbitmq-plugins enable rabbitmq_management
```

7、需要创建账号用于调用连接

```
rabbitmqctl delete_user  guest

rabbitmqctl add_user user_name password

rabbitmqctl set_user_tags user_name administrator
```

参考：http://www.rabbitmq.com/man/rabbitmqctl.1.man.html

8、在配置文件/etc/rabbitmq/rabbitmq.config中（可能不存在，新建即可使用）添加

```
[{rabbit, [{loopback_users, []}]}].
```

9、重启服务

```
service rabbitmq-server reload
```

最后，就可以通过访问http://{server_name}:15672/进行访问，输入用户名和密码对消息进行管理
