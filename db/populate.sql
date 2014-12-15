--increase the sequence
insert into users (id, username, password, avatar, token) values ('a1', 'a', 'a.png', 'tok');
insert into users (id, username, password, avatar, token) values ('a2', 'a', 'a.png', 'tok');

--make a test user
insert into users (id, username, password, avatar, token) values (1, 'Bob', '$2a$08$IceXWWlDjnAIn8LPS7xf5eU0o/NI131PFMMvzd.A7BMDl25buI9Am', 'a.png', 'tok');

--give the rest user some notes for testing
select add_note(1, 'Note1', 'Note1Body', 'Tag1, Tag2');
select add_note(1, 'Note2', 'Note2Body', 'Tag3, Tag4');