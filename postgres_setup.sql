create database moleplay;

\c moleplay

create table Users (uid int primary key, username varchar(50), pass varchar(50), fname varchar(50), lname varchar(50), email varchar(100), affil varchar(250), phone varchar(50));
create table Sites (siteid int primary key, street varchar(50), town varchar(50), state varchar(50), country varchar(80));
create table Roles (uid int references Users(uid), siteid int references Sites(siteid), permission int);
create table Molecules (mid int primary key, uid int references Users(uid), jmol varchar(150), xyz varchar(150), approved boolean, comment varchar(200));
create table Playlists (pid int primary key, mid int references Molecules(mid), title varchar(100), sid int references Sites(siteid), durations int);
create table Schedules (schedid int primary key, siteid int references Sites(siteid), pid int references Playlists(pid), stimes varchar(250), etimes varchar(250));

	