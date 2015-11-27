drop table Users;
drop table Sites;
drop table Roles;
drop table Molecules;
drop table Playlists;
drop table Schedules;

create table Users (uid int primary key, username varchar(50), pass varchar(50), fname varchar(50), lname varchar(50), email varchar(100), affil varchar(250), phone varchar(50));
create table Sites (siteid int primary key, name varchar(50), street varchar(50), town varchar(50), state varchar(50), country varchar(80));
create table Roles (uid int references Users(uid), siteid int references Sites(siteid), permission int);
create table Molecules (mid int primary key, uid int references Users(uid), jmol varchar(150), xyz varchar(150), approved boolean, comment varchar(200));
create table Playlists (pid int primary key, mid int references Molecules(mid), title varchar(100), sid int references Sites(siteid), durations int);
create table Schedules (schedid int primary key, siteid int references Sites(siteid), pid int references Playlists(pid), stimes varchar(250), etimes varchar(250));

insert into Users (username, pass, fname, lname, email, affil, phone) values ("bambrose", "Password1", "Bob", "Ambrose", "rambrose@umass.edu", "Team ThreeTwenty", "508-692-8078");
insert into Users (username, pass, fname, lname, email, affil, phone) values ("mbergandy", "Password1", "Maya", "Bergandy", "mbergandy@umass.edu", "Team ThreeTwenty", "123-123-1234");

insert into Sites (name, street, town, state, country) values ("ISB UMass", "661 North Pleasant Street", "Amherst", "MA", "USA");
insert into Sites (name, street, town, state, country) values ("Bob's House", "123 Main Street", "Taunton", "MA", "USA");

insert into Roles (uid, siteid, permission) values (1, 2, 2);
insert into Roles (uid, siteid, permission) values (2, 2, 2);

