INSERT INTO department (name)
VALUES ("Theatre"),
       ("Social Media"),
       ("Sports Marketing"),
       ("Engineering");


INSERT INTO role (title, salary, department_id)
VALUES ("Lead Actor", 30000, 1),
       ("Ensemble", 23000, 1),

       ("Content Creator", 215000, 2),
       ("Video Editor", 100000, 2),

       ("Sports Manager", 200000, 3),
       ("Marketing Intern", 80000, 3),

       ("Lead Engineer", 150000, 4),
       ("Software Engineer", 100000, 4);




INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("John", "Doe", 1, NULL),
       ("Jane", "Doe", 2, 1),
       ("Glen", "Powell", 3, NULL), 
       ("Kaitlyn", "Mooney", 4, 3),
       ("Robert", "Downey Jr",5, NULL),
       ("Derek", "Klena", 6, 5),
       ("Jenna", "Tiso", 7, NULL);