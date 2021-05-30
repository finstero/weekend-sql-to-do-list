-- database name: practice_todo
-- (or whatever you want. see pool.js)

CREATE TABLE "tasks" (
	"id" SERIAL PRIMARY KEY,
	"task" VARCHAR(100),
	"priority" VARCHAR (15),
	"notes" VARCHAR(255),
	"complete" BOOLEAN DEFAULT FALSE
);

INSERT INTO "tasks" 
	("task", "priority", "notes") 
VALUES 
('do dishes', 'medium', 'this is the worst task'),
('finish coding homework', 'high', 'fairly enjoyable'),
('go on date with partner', 'high', 'maybe a brewery?')
;