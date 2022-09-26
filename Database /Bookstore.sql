create database bookstore;

use bookstore;

create table book(
id int primary key,
id_product varchar(45),
`name` varchar(45),
total_pages int,
size varchar(45),
year_public date,
author_id int,
publisher_id int,
category_id int,
is_deleted bit(1),
foreign key (author_id) references author(id),
foreign key (publisher_id) references publisher(id),
foreign key (category_id) references category(id)
);

create table category(
id int primary key,
`name` varchar(45)
);

create table publisher(
id int primary key,
`name` varchar(45)
);

create table author(
id int primary key,
`name` varchar(45)
);

create table `order`(
id int primary key,
book_id int,
user_id int,
foreign key (book_id) references book(id),
foreign key (user_id) references `user`(id)
);

create table order_detail(
id int primary key,
quantity int,
order_id int,
foreign key (order_id) references `order`(id)
);

create table `user`(
id int primary key,
`username` varchar(45),
`password` varchar(45)
);

create table `role`(
id int primary key,
role_name varchar(45)
);

create table user_role(
id int primary key,
role_id int,
username_id int,
foreign key (role_id) references role(id),
foreign key (username_id) references user(id)
);






