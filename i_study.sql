-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 20, 2022 at 12:28 PM
-- Server version: 10.4.20-MariaDB
-- PHP Version: 8.0.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `i_study`
--

DELIMITER $$
--
-- Procedures
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_class` (`class_id` INT)  BEGIN
DELETE FROM class WHERE class.class_id = class_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_class_student` (IN `class_student_id` INT)  DELETE FROM class_student WHERE class_student.class_student_id = class_student_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_class_subject` (IN `class_subject_id` INT)  DELETE FROM class_subject WHERE class_subject.class_subject_id = class_subject_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_forum` (IN `forum_id` INT)  DELETE FROM forum WHERE forum.forum_id = forum_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_forum_comment` (IN `forum_comment_id` INT)  DELETE FROM forum_comment 
WHERE forum_comment.forum_comment_id = forum_comment_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_material` (IN `material_id` INT)  DELETE FROM material WHERE material.material_id = material_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_noification` (IN `notification_id` INT)  DELETE FROM notification WHERE notification.notification_id = notification_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_rich_text` (IN `rich_text_id` INT)  DELETE FROM rich_text WHERE rich_text.rich_text_id = rich_text_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_student_submission` (IN `student_submission_id` INT)  DELETE FROM student_submission WHERE student_submission.student_submission_id = student_submission_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_subject` (IN `subject_id` INT)  DELETE FROM subject WHERE subject.subject_id = subject_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_submission` (IN `submission_id` INT)  DELETE FROM submission WHERE submission.submission_id = submission_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_teacher` (`user_id` INT)  BEGIN
        DELETE user, teacher FROM user JOIN teacher USING (teacher_id) WHERE user.user_id = user_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_timetable_slot` (IN `timetable_slot_id` INT)  DELETE FROM timetable_slot WHERE timetable_slot.timetable_slot_id = timetable_slot_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_topic` (IN `topic_id` INT)  DELETE FROM topic WHERE topic.topic_id = topic_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `delete_user` (`user_id` INT)  BEGIN
	START TRANSACTION;
    IF (SELECT user_type from user u where u.user_id = user_id) = 1 THEN
        DELETE user, teacher FROM user JOIN teacher USING (teacher_id) WHERE user.user_id = user_id;
    ELSEIF (SELECT user_type from user u where u.user_id = user_id) = 2 THEN
    	DELETE user, student FROM user JOIN student USING (student_id) WHERE user.user_id = user_id;
        END IF;
    COMMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `get_user_info` (IN `user_id` INT)  BEGIN
	IF (SELECT user_type FROM user u WHERE  u.user_id = user_id) = 1 THEN 
     SELECT 
        name,
        birthday,
        gender,
        race,
        religion,
        address,
        tel_no,
        hp_no,
        email,
        work_since,
        office_no,
        education,
        grade
        FROM user u 
        JOIN teacher t
        USING (teacher_id)
        WHERE u.user_id = user_id;
    ELSEIF (SELECT user_type FROM user u WHERE  u.user_id = user_id) = 2 THEN 
        SELECT 
        u.name,
        birthday,
        gender,
        race,
        religion,
        address,
        tel_no,
        hp_no,
        email,
        school_id,
        disability,
        c.name AS class_name
        FROM user u 
        JOIN student s
        USING (student_id)
        LEFT JOIN class_student cs USING (student_id)
        LEFT JOIN class c ON cs.class_id=c.class_id
        WHERE u.user_id = user_id;
    ELSE
     SELECT 
        name,
        birthday,
        gender,
        race,
        religion,
        address,
        tel_no,
        hp_no,
        email
        FROM user u WHERE u.user_id = user_id;
    END IF;
 END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_class_student` (IN `class_id` INT, IN `student_id` INT)  INSERT INTO class_student(class_id, student_id) VALUES( class_id,student_id)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_class_subject` (IN `class_id` INT, IN `subject_id` INT, IN `teacher_id` INT)  INSERT INTO class_subject(class_id,subject_id,teacher_id) VALUES (class_id,subject_id,teacher_id)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_forum` (IN `title` VARCHAR(255), IN `description` TEXT, IN `topic_id` INT)  BEGIN
START TRANSACTION;
INSERT INTO forum(title, description) VALUES (title, description);
INSERT INTO topic_component(`component_type`, `arrangement`, `topic_id`, `rich_text_id`, `forum_id`, `submission_id`, `material_id`) VALUES(3,1,topic_id,NULL,LAST_INSERT_ID(),NULL,NULL);
CALL select_latest_topic_component();
COMMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_forum_comment` (IN `comment` TEXT, IN `added_date_time` DATETIME, IN `forum_id` INT, IN `user_id` INT)  INSERT INTO forum_comment(comment,added_date_time,forum_id,user_id) VALUES(comment,added_date_time,forum_id,user_id)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_material` (IN `url` VARCHAR(255), IN `file_name` VARCHAR(255), IN `topic_id` INT)  BEGIN
    START TRANSACTION;
    INSERT INTO material(url,file_name) VALUES(url,file_name);
    INSERT INTO topic_component(`component_type`, `arrangement`, `topic_id`, `rich_text_id`, `forum_id`, `submission_id`, `material_id`)
    VALUES(2,1,topic_id,NULL,NULL,NULL,LAST_INSERT_ID());
    COMMIT;
    END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_new_class` (IN `name` VARCHAR(255), IN `teacher_id` INT, IN `form` INT, IN `year` INT)  BEGIN
INSERT INTO class(name,class_teacher_id, form, year) VALUES(name, teacher_id, form, year);
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_new_student` (IN `username` VARCHAR(255), IN `password` VARCHAR(255), IN `name` VARCHAR(255), IN `birthday` DATE, IN `gender` VARCHAR(50), IN `race` VARCHAR(50), IN `religion` VARCHAR(50), IN `address` TEXT, IN `tel_no` VARCHAR(50), IN `hp_no` VARCHAR(50), IN `email` VARCHAR(255), IN `disability` VARCHAR(255), IN `school_id` VARCHAR(50))  BEGIN
START TRANSACTION;

INSERT INTO student (disability,school_id)
VALUES (disability, school_id);

INSERT INTO user (username,
        password,
        user_type,
        name,
        birthday,
        gender,
        race,
        religion,
        address,
        tel_no,
        hp_no,
        email,
                  teacher_id,
        student_id)
VALUES (username,
        password,
        2,
        name,
        birthday,
        gender,
        race,
        religion,
        address,
        tel_no,
        hp_no,
        email,
        NULL,
        LAST_INSERT_ID());

COMMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_new_teacher` (IN `username` VARCHAR(255), IN `password` VARCHAR(255), IN `name` VARCHAR(255), IN `birthday` DATE, IN `gender` VARCHAR(50), IN `race` VARCHAR(50), IN `religion` VARCHAR(50), IN `address` TEXT, IN `tel_no` VARCHAR(50), IN `hp_no` VARCHAR(50), IN `email` VARCHAR(255), IN `work_since` DATE, IN `office_no` VARCHAR(50), IN `education` VARCHAR(255), IN `grade` VARCHAR(50))  BEGIN
START TRANSACTION;

INSERT INTO teacher
VALUES (0,
    work_since,
    office_no,
    education,
    grade);

INSERT INTO user
VALUES (0,
        username,
        password,
        1,
        name,
        birthday,
        gender,
        race,
        religion,
        address,
        tel_no,
        hp_no,
        email,
        LAST_INSERT_ID(),
        NULL);

COMMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_notification` (IN `student_id` INT, IN `topic_component_id` INT)  INSERT INTO notification(notification.student_id,notification.topic_component_id) VALUES (student_id,topic_component_id)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_rich_text` (IN `content` TEXT, IN `topic_id` INT)  BEGIN
    START TRANSACTION;
    INSERT INTO rich_text(content) VALUES(content);
    INSERT INTO topic_component(`component_type`, `arrangement`, `topic_id`, `rich_text_id`, `forum_id`, `submission_id`, `material_id`) VALUES(1,1,topic_id,LAST_INSERT_ID(),NULL,NULL,NULL);
    COMMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_student_submission` (IN `url` VARCHAR(255), IN `file_name` VARCHAR(255), IN `submission_date` DATETIME, IN `student_id` INT, IN `submission_id` INT)  INSERT INTO student_submission(url,file_name,submission_date,student_id,submission_id) VALUES(url,file_name,submission_date,student_id,submission_id)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_subject` (IN `name` VARCHAR(255), IN `code` VARCHAR(50))  INSERT INTO subject(name,code) VALUES (name,code)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_submission` (IN `title` VARCHAR(255), IN `description` TEXT, IN `due_date` DATETIME, IN `topic_id` INT)  BEGIN
START TRANSACTION;
INSERT INTO submission(title, description,due_date) VALUES (title, description,due_date);
INSERT INTO topic_component
(`component_type`, `arrangement`, `topic_id`, `rich_text_id`, `forum_id`, `submission_id`, `material_id`) 
VALUES(4,1,topic_id,NULL,NULL,LAST_INSERT_ID(),NULL);
CALL select_latest_topic_component();
COMMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_timetable_slot` (IN `class_subject_id` INT, IN `day` INT, IN `starting_slot` INT, IN `no_of_slots` INT)  INSERT INTO timetable_slot
(class_subject_id, 
day, 
starting_slot,
no_of_slots) 
VALUES(
class_subject_id, 
day, 
starting_slot,
no_of_slots)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_topic` (IN `name` VARCHAR(255), IN `arrangement` INT, IN `class_subject_id` INT)  INSERT INTO topic(name,arrangement,class_subject_id) VALUES (name,arrangement,class_subject_id)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `insert_user` (IN `p_username` VARCHAR(255), IN `p_password` VARCHAR(255))  INSERT INTO user (user_id, username,password) VALUES(DEFAULT,p_username,p_password)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `login` (IN `username` VARCHAR(255), IN `password` VARCHAR(255))  BEGIN
	SELECT user_id,
    u.name,
    user_type,
    teacher_id,
    u.student_id,
    c.name AS class_name,
    c.class_id FROM user u 
    LEFT JOIN class_student cs USING (student_id)
    LEFT JOIN class c USING (class_id)
    WHERE u.username = username 
    AND u.password = password;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `search_student_by_name` (IN `name` VARCHAR(255))  SELECT u.name, student_id
FROM user u 
JOIN student s
USING(student_id)
WHERE
u.name LIKE CONCAT('%',name,'%') AND 
student_id NOT IN(SELECT student_id from class_student)
LIMIT 15$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `search_teacher_by_name` (IN `name` VARCHAR(255))  SELECT t.teacher_id,u.name FROM teacher t JOIN user u USING(teacher_id) WHERE u.name LIKE CONCAT('%',name,'%') LIMIT 15$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `select_class` ()  SELECT * FROM class c WHERE c.year = YEAR(CURDATE())$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `select_class_by_id` (IN `class_id` INT)  SELECT c.class_id, c.name,c.class_teacher_id,c.form,c.year,u.name AS class_teacher_name FROM class c LEFT JOIN user u ON c.class_teacher_id = u.teacher_id WHERE c.class_id = class_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `select_class_student` (IN `class_id` INT)  SELECT class_student_id, class_id, student_id, u.name as student_name
FROM class_student cst
JOIN user u
USING (student_id)
WHERE cst.class_id = class_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `select_class_subject` (IN `class_id` INT)  SELECT cs.class_subject_id,
cs.class_id,
cs.subject_id,
cs.teacher_id,
c.name AS class_name,
s.name AS subject_name,
u.name AS teacher_name
FROM class_subject cs 
JOIN class c USING (class_id) 
JOIN user u USING (teacher_id) 
JOIN subject s USING (subject_id)
WHERE cs.class_id = class_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `select_class_subject_by_student_id` (IN `student_id` INT)  SELECT
cs.class_subject_id,
cs.class_id,
cs.subject_id,
cs.teacher_id,
s.name AS subject_name,
s.code AS subject_code,
u.name AS teacher_name
FROM class_subject cs
JOIN class_student cstu
USING (class_id)
JOIN subject s
USING (subject_id)
JOIN user u
ON u.teacher_id = cs.teacher_id
WHERE cstu.student_id = student_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `select_class_subject_by_teacher_id` (IN `teacher_id` INT)  SELECT 
cs.class_subject_id,
cs.class_id,
cs.subject_id,
cs.teacher_id,
s.name AS subject_name,
s.code AS subject_code,
c.name AS class_name,
c.form
FROM class_subject cs
JOIN subject s USING (subject_id)
JOIN class c USING (class_id)
WHERE cs.teacher_id = teacher_id AND c.year=YEAR(CURDATE())$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `select_class_timetable` (IN `class_id` INT)  SELECT * FROM timetable_slot ts
JOIN class_subject cs USING (class_subject_id)
JOIN subject s USING (subject_id) 
WHERE cs.class_id=class_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `select_class_timetable_by_student_id` (IN `student_id` INT)  SELECT 
ts.timetable_slot_id,
ts.class_subject_id,
ts.day,
ts.starting_slot,
ts.no_of_slots,
cs.subject_id,
s.name AS subject_name,
s.code AS subject_code,
u.name AS teacher_name
FROM timetable_slot ts
JOIN class_subject cs USING(class_subject_id)
JOIN subject s USING(subject_id)
JOIN user u USING(teacher_id)
JOIN class USING(class_id)
JOIN class_student cstu USING(class_id)
WHERE cstu.student_id = student_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `select_class_timetable_by_teacher_id` (IN `teacher_id` INT)  SELECT 
ts.timetable_slot_id,
ts.class_subject_id,
ts.day,
ts.starting_slot,
ts.no_of_slots,
s.subject_id,
c.name AS class_name,
s.name AS subject_name,
s.code AS subject_code
FROM timetable_slot ts
JOIN class_subject cs USING (class_subject_id)
JOIN class c USING (class_id)
JOIN subject s USING (subject_id)
WHERE cs.teacher_id=teacher_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `select_forum_comment` (IN `forum_id` INT)  SELECT 
forum_comment_id,
comment,
added_date_time,
forum_id,
user_id,
u.name
FROM forum_comment fc 
JOIN user u USING (user_id)
WHERE fc.forum_id = forum_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `select_latest_topic_component` ()  SELECT * FROM topic_component  JOIN topic USING (topic_id) JOIN class_subject USING (class_subject_id) WHERE topic_component.topic_component_id = (SELECT MAX(topic_component_id) FROM topic_component)$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `select_notification` (IN `student_id` INT)  SELECT 
notification_id,
created_date,
is_opened,
component_type,
f.forum_id,
f.title as forum_title,
f.description as forum_description,
s.submission_id,
s.title as submission_title,
s.description as submission_description,
s.due_date,
class_subject_id,
topic_component_id,
subject.name as subject_name
FROM notification n 
JOIN topic_component USING (topic_component_id)
JOIN topic USING (topic_id)
JOIN class_subject USING (class_subject_id)
JOIN subject USING (subject_id)
LEFT JOIN forum f USING (forum_id)
LEFT JOIN submission s USING (submission_id)
WHERE n.student_id = student_id AND DATEDIFF(NOW(),n.created_date) <= 7
ORDER BY created_date DESC$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `select_occupied_timetable_slots_with_class_subject_id` (IN `class_subject_id` INT, IN `day` INT, IN `slot_no` INT)  SELECT 
u.name AS teacher_name,
ts.timetable_slot_id,
ts.class_subject_id,
ts.day,
ts.starting_slot,
ts.no_of_slots,
s.name AS subject_name,
c.class_id,
c.name AS class_name,
s.subject_id
FROM timetable_slot ts
JOIN class_subject USING (class_subject_id)
JOIN class c USING (class_id)
JOIN user u USING (teacher_id)
JOIN subject s USING (subject_id)
WHERE u.teacher_id = 
(SELECT teacher_id FROM teacher
JOIN class_subject cs USING (teacher_id)
WHERE cs.class_subject_id = class_subject_id)
AND
ts.day = day AND
slot_no BETWEEN starting_slot AND starting_slot + no_of_slots - 1$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `select_student_submission` (IN `student_id` INT, IN `submission_id` INT)  SELECT * FROM student_submission ss
WHERE ss.student_id = student_id AND ss.submission_id = submission_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `select_student_submission_by_submission_id` (IN `submission_id` INT)  SELECT 
u.name, 
u.student_id,
ss.student_submission_id,
ss.submission_date,
ss.url,
ss.file_name
FROM class_student
JOIN user u USING (student_id)
JOIN class USING (class_id)
JOIN class_subject USING (class_id)
JOIN topic USING (class_subject_id)
JOIN topic_component USING (topic_id)
JOIN submission s USING (submission_id)
LEFT JOIN student_submission ss USING (submission_id,student_id)
WHERE s.submission_id = submission_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `select_subject` ()  SELECT * FROM subject$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `select_subject_by_id` (IN `subject_id` INT)  SELECT * FROM subject s WHERE s.subject_id = subject_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `select_topic` (IN `class_subject_id` INT)  SELECT * FROM topic t WHERE t.class_subject_id=class_subject_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `select_topic_component` (IN `topic_id` INT)  SELECT 
submission_id,
forum_id,
material_id,
rich_text_id,
topic_component_id,
component_type,
arrangement,
topic_id,
content,
url,
file_name,
f.title AS forum_title,
f.description AS forum_description,
s.title AS submission_title,
s.description AS submission_description,
due_date
from topic_component tc 
LEFT JOIN rich_text USING (rich_text_id) 
LEFT JOIN material USING (material_id) 
LEFT JOIN forum f USING (forum_id)
LEFT JOIN submission s USING (submission_id)
WHERE tc.topic_id = topic_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `select_unfinished_homework` (IN `student_id` INT)  SELECT submission.submission_id,
submission.title,
submission.description,
submission.due_date,
subject.name AS subject_name,
subject.code AS subject_code
FROM student s
JOIN class_student USING (student_id)
JOIN class_subject USING (class_id)
JOIN subject USING (subject_id)
JOIN topic USING (class_subject_id)
JOIN topic_component USING (topic_id)
JOIN submission USING (submission_id)
LEFT JOIN student_submission ss USING (submission_id,student_id)
WHERE student_submission_id IS NULL AND s.student_id = student_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `select_user` (IN `user_type` INT, IN `name` VARCHAR(255))  BEGIN
	IF user_type = 1 THEN SELECT * FROM user JOIN teacher USING (teacher_id);
    ELSEIF user_type = 2 THEN SELECT * FROM user JOIN student USING (student_id);
    ELSE SELECT * FROM user LEFT JOIN teacher USING (teacher_id) LEFT JOIN student USING (student_id) WHERE user.user_type != 3 AND user.name LIKE CONCAT('%',IfNULL(name,user.name),'%');
	END IF;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_class` (`class_id` INT, `name` VARCHAR(255), `teacher_id` INT, `form` INT, `year` INT)  BEGIN
UPDATE class c SET c.name=IFNULL(name,c.name), c.class_teacher_id = IFNULL(teacher_id,c.class_teacher_id), c.form=IFNULL(form,c.form), c.year=IFNULL(year,c.year) WHERE c.class_id=class_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_forum` (IN `title` VARCHAR(255), IN `description` TEXT, IN `forum_id` INT)  UPDATE forum f SET f.title = title, f.description = description WHERE f.forum_id = forum_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_forum_comment` (IN `comment` TEXT, IN `added_date_time` DATETIME, IN `forum_comment_id` INT)  UPDATE forum_comment fc SET fc.comment = comment, fc.added_date_time= IFNULL(added_date_time,fc.added_date_time) WHERE fc.forum_comment_id = forum_comment_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_material` (IN `url` VARCHAR(255), IN `file_name` VARCHAR(255), IN `material_id` INT)  UPDATE material SET url=url, material.file_name = file_name WHERE material_id = material_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_notification_is_opened` (IN `notification_id` INT)  UPDATE notification SET notification.is_opened = true WHERE notification.notification_id = notification_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_password` (IN `username` VARCHAR(255), IN `password` VARCHAR(255))  UPDATE user u 
SET u.password = password 
WHERE u.username=username$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_rich_text` (IN `content` TEXT, IN `rich_text_id` INT)  UPDATE rich_text rt SET rt.content = content WHERE rt.rich_text_id = rich_text_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_student_info` (`student_id` INT, `name` VARCHAR(255), `birthday` DATE, `gender` VARCHAR(50), `race` VARCHAR(50), `religion` VARCHAR(50), `address` TEXT, `tel_no` VARCHAR(50), `hp_no` VARCHAR(50), `email` VARCHAR(255), `disability` VARCHAR(255), `school_id` VARCHAR(50))  BEGIN
	START TRANSACTION;
    UPDATE user u
    SET 
    u.name = IFNULL(name,u.name),
    u.birthday = IFNULL(birthday,u.birthday),
    u.gender = IFNULL(gender,u.gender),
    u.race = IFNULL(race,u.race),
    u.religion = IFNULL(religion,u.religion),
    u.address = IFNULL(address,u.address),
    u.tel_no = IFNULL(tel_no,u.tel_no),
    u.hp_no = IFNULL(hp_no,u.hp_no),
    u.email = IFNULL(email,u.email)
    WHERE u.student_id = student_id;
    
	UPDATE student s
    SET s.disability = IFNULL(disability,s.disability),
    s.school_id = IFNULL(school_id,s.school_id)
    WHERE s.student_id = student_id;
    COMMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_student_submission` (IN `url` VARCHAR(255), IN `file_name` VARCHAR(255), IN `submission_date` DATETIME, IN `student_submission_id` INT)  UPDATE student_submission ss SET 
ss.url = IFNULL(url,ss.url),
ss.file_name = IFNULL(file_name,ss.file_name),
ss.submission_date = IFNULL(submission_date,ss.submission_date)
WHERE ss.student_submission_id = student_submission_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_subject` (IN `subject_id` INT, IN `name` VARCHAR(255), IN `code` VARCHAR(50))  BEGIN
	START TRANSACTION;

    UPDATE subject s 
    SET s.name = IFNULL(name,s.name), 
    s.code = IFNULL(code,s.code) 
    WHERE s.subject_id = subject_id;
	
    COMMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_submission` (IN `title` VARCHAR(255), IN `description` TEXT, IN `due_date` DATETIME, IN `submission_id` INT)  UPDATE submission s SET s.title = IFNULL(title,s.title), s.description = IFNULL(description,s.description), s.due_date = IFNULL(due_date,s.due_date) WHERE s.submission_id = submission_id$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_teacher_info` (`teacher_id` INT, `name` VARCHAR(255), `birthday` DATE, `gender` VARCHAR(50), `race` VARCHAR(50), `religion` VARCHAR(50), `address` TEXT, `tel_no` VARCHAR(50), `hp_no` VARCHAR(50), `email` VARCHAR(255), `work_since` DATE, `office_no` VARCHAR(50), `education` VARCHAR(255), `grade` VARCHAR(50))  BEGIN
	START TRANSACTION;
    UPDATE user u
    SET 
    u.name = IFNULL(name,u.name),
    u.birthday = IFNULL(birthday,u.birthday),
    u.gender = IFNULL(gender,u.gender),
    u.race = IFNULL(race,u.race),
    u.religion = IFNULL(religion,u.religion),
    u.address = IFNULL(address,u.address),
    u.tel_no = IFNULL(tel_no,u.tel_no),
    u.hp_no = IFNULL(hp_no,u.hp_no),
    u.email = IFNULL(email,u.email)
    WHERE u.teacher_id = teacher_id;
    
	UPDATE teacher t
    SET 
    work_since = IFNULL(work_since,t.work_since),
    office_no = IFNULL(office_no,t.office_no),
    education = IFNULL(education,t.education),
    grade = IFNULL(grade,t.grade) 
    WHERE t.teacher_id = teacher_id;
    COMMIT;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `update_topic` (IN `name` VARCHAR(255), IN `arrangement` INT, IN `topic_id` INT)  UPDATE topic t SET t.name = IFNULL(name,t.name), t.arrangement = IFNULL(arrangement,t.arrangement) WHERE t.topic_id = topic_id$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `class`
--

CREATE TABLE `class` (
  `class_id` int(11) NOT NULL,
  `name` varchar(50) NOT NULL,
  `class_teacher_id` int(11) DEFAULT NULL,
  `form` int(11) NOT NULL,
  `year` year(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `class`
--

INSERT INTO `class` (`class_id`, `name`, `class_teacher_id`, `form`, `year`) VALUES
(2, '1A1', 2, 1, 2022);

-- --------------------------------------------------------

--
-- Table structure for table `class_student`
--

CREATE TABLE `class_student` (
  `class_student_id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `class_student`
--

INSERT INTO `class_student` (`class_student_id`, `class_id`, `student_id`) VALUES
(5, 2, 1),
(6, 2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `class_subject`
--

CREATE TABLE `class_subject` (
  `class_subject_id` int(11) NOT NULL,
  `class_id` int(11) NOT NULL,
  `subject_id` int(11) NOT NULL,
  `teacher_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `class_subject`
--

INSERT INTO `class_subject` (`class_subject_id`, `class_id`, `subject_id`, `teacher_id`) VALUES
(3, 2, 2, 2);

-- --------------------------------------------------------

--
-- Table structure for table `forum`
--

CREATE TABLE `forum` (
  `forum_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `forum`
--

INSERT INTO `forum` (`forum_id`, `title`, `description`) VALUES
(1, 'Forum 1', '123'),
(2, 'Forum 1', 'adsf');

-- --------------------------------------------------------

--
-- Table structure for table `forum_comment`
--

CREATE TABLE `forum_comment` (
  `forum_comment_id` int(11) NOT NULL,
  `comment` text NOT NULL,
  `added_date_time` datetime NOT NULL,
  `forum_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `forum_comment`
--

INSERT INTO `forum_comment` (`forum_comment_id`, `comment`, `added_date_time`, `forum_id`, `user_id`) VALUES
(1, 'Hi student', '2022-06-19 17:40:06', 2, 2),
(2, 'hi teacher', '2022-06-19 17:40:10', 2, 5);

-- --------------------------------------------------------

--
-- Table structure for table `material`
--

CREATE TABLE `material` (
  `material_id` int(11) NOT NULL,
  `url` varchar(255) NOT NULL,
  `file_name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `material`
--

INSERT INTO `material` (`material_id`, `url`, `file_name`) VALUES
(1, './public/material/4/20220619T085903496ZShortest path algorithm -Assignment Computational Complexity.pdf', 'Shortest path algorithm -Assignment Computational Complexity.pdf');

-- --------------------------------------------------------

--
-- Table structure for table `notification`
--

CREATE TABLE `notification` (
  `notification_id` int(11) NOT NULL,
  `student_id` int(11) NOT NULL,
  `created_date` datetime NOT NULL DEFAULT current_timestamp(),
  `topic_component_id` int(11) NOT NULL,
  `is_opened` tinyint(1) NOT NULL DEFAULT 0,
  `opened_date` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `notification`
--

INSERT INTO `notification` (`notification_id`, `student_id`, `created_date`, `topic_component_id`, `is_opened`, `opened_date`) VALUES
(1, 1, '2022-06-19 17:29:13', 5, 1, NULL),
(2, 2, '2022-06-19 17:29:13', 5, 0, NULL),
(3, 1, '2022-06-19 17:44:16', 6, 1, NULL),
(4, 2, '2022-06-19 17:44:16', 6, 0, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `rich_text`
--

CREATE TABLE `rich_text` (
  `rich_text_id` int(11) NOT NULL,
  `content` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `rich_text`
--

INSERT INTO `rich_text` (`rich_text_id`, `content`) VALUES
(1, '{\"blocks\":[{\"key\":\"57g6l\",\"text\":\"Hi students\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}'),
(2, '{\"blocks\":[{\"key\":\"ad4fa\",\"text\":\"HI Student!\",\"type\":\"unstyled\",\"depth\":0,\"inlineStyleRanges\":[],\"entityRanges\":[],\"data\":{}}],\"entityMap\":{}}');

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `student_id` int(11) NOT NULL,
  `school_id` varchar(50) NOT NULL,
  `disability` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `student`
--

INSERT INTO `student` (`student_id`, `school_id`, `disability`) VALUES
(1, 'A001', ''),
(2, 'A002', '');

-- --------------------------------------------------------

--
-- Table structure for table `student_submission`
--

CREATE TABLE `student_submission` (
  `student_submission_id` int(11) NOT NULL,
  `url` varchar(255) NOT NULL,
  `file_name` varchar(255) NOT NULL,
  `submission_date` datetime NOT NULL,
  `student_id` int(11) NOT NULL,
  `submission_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `student_submission`
--

INSERT INTO `student_submission` (`student_submission_id`, `url`, `file_name`, `submission_date`, `student_id`, `submission_id`) VALUES
(1, './public/submission/1/1/20220619T100804311ZEvent Report - Haymakers.docx', 'Event Report - Haymakers.docx', '2022-06-19 18:08:04', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `subject`
--

CREATE TABLE `subject` (
  `subject_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `code` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `subject`
--

INSERT INTO `subject` (`subject_id`, `name`, `code`) VALUES
(2, 'Bahasa Malaysia', 'BM');

-- --------------------------------------------------------

--
-- Table structure for table `submission`
--

CREATE TABLE `submission` (
  `submission_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `due_date` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `submission`
--

INSERT INTO `submission` (`submission_id`, `title`, `description`, `due_date`) VALUES
(1, 'Submission 1', 'submission test', '2022-06-20 00:00:00');

-- --------------------------------------------------------

--
-- Table structure for table `teacher`
--

CREATE TABLE `teacher` (
  `teacher_id` int(11) NOT NULL,
  `work_since` date NOT NULL,
  `office_no` varchar(50) NOT NULL,
  `education` varchar(255) NOT NULL,
  `grade` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `teacher`
--

INSERT INTO `teacher` (`teacher_id`, `work_since`, `office_no`, `education`, `grade`) VALUES
(2, '2018-01-01', 'D05', 'Bachelor of Education (TESL)', 'G42');

-- --------------------------------------------------------

--
-- Table structure for table `timetable_slot`
--

CREATE TABLE `timetable_slot` (
  `timetable_slot_id` int(11) NOT NULL,
  `class_subject_id` int(11) NOT NULL,
  `day` int(11) NOT NULL,
  `starting_slot` int(11) NOT NULL,
  `no_of_slots` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `topic`
--

CREATE TABLE `topic` (
  `topic_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `arrangement` int(11) NOT NULL DEFAULT 1,
  `class_subject_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `topic`
--

INSERT INTO `topic` (`topic_id`, `name`, `arrangement`, `class_subject_id`) VALUES
(5, 'Chapter 1', 1, 3);

-- --------------------------------------------------------

--
-- Table structure for table `topic_component`
--

CREATE TABLE `topic_component` (
  `topic_component_id` int(11) NOT NULL,
  `component_type` int(11) NOT NULL,
  `arrangement` int(11) NOT NULL,
  `topic_id` int(11) NOT NULL,
  `rich_text_id` int(11) DEFAULT NULL,
  `forum_id` int(11) DEFAULT NULL,
  `submission_id` int(11) DEFAULT NULL,
  `material_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `topic_component`
--

INSERT INTO `topic_component` (`topic_component_id`, `component_type`, `arrangement`, `topic_id`, `rich_text_id`, `forum_id`, `submission_id`, `material_id`) VALUES
(4, 1, 1, 5, 2, NULL, NULL, NULL),
(5, 3, 1, 5, NULL, 2, NULL, NULL),
(6, 4, 1, 5, NULL, NULL, 1, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `user_id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `user_type` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `birthday` date NOT NULL,
  `gender` varchar(50) NOT NULL,
  `race` varchar(50) NOT NULL,
  `religion` varchar(50) NOT NULL,
  `address` text NOT NULL,
  `tel_no` varchar(50) DEFAULT NULL,
  `hp_no` varchar(50) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `teacher_id` int(11) DEFAULT NULL,
  `student_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`user_id`, `username`, `password`, `user_type`, `name`, `birthday`, `gender`, `race`, `religion`, `address`, `tel_no`, `hp_no`, `email`, `teacher_id`, `student_id`) VALUES
(1, 'admin', 'admin', 3, '', '0000-00-00', '', '', '', '', NULL, NULL, NULL, NULL, NULL),
(2, 'student1', '123456', 2, 'Student 1', '2003-01-01', 'Female', 'Malay', 'Islam', 'Jalan ABC, Taman XYZ', '0161234567', '', 'stu1@abc.com', NULL, 1),
(4, 'student2', '123456', 2, 'Student 2', '2015-01-01', 'Female', 'Chinese', 'Christianity', 'Jalan abc, taman 123', '012345678', '', 'stu2@abc.com', NULL, 2),
(5, 'teacher1', '123456', 1, 'Teacher 1', '1990-01-01', 'Female', 'Malay', 'Islam', 'Jalan acd, Taman 123', '0123456789', '', 'teacher1@abc.com', 2, NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `class`
--
ALTER TABLE `class`
  ADD PRIMARY KEY (`class_id`),
  ADD KEY `fk_class_teacher` (`class_teacher_id`);

--
-- Indexes for table `class_student`
--
ALTER TABLE `class_student`
  ADD PRIMARY KEY (`class_student_id`),
  ADD KEY `fk_class_student_student` (`student_id`),
  ADD KEY `fk_class_student_class` (`class_id`);

--
-- Indexes for table `class_subject`
--
ALTER TABLE `class_subject`
  ADD PRIMARY KEY (`class_subject_id`),
  ADD KEY `fk_class_subject_class` (`class_id`),
  ADD KEY `fk_class_subject_subject` (`subject_id`),
  ADD KEY `fk_class_subject_teacher` (`teacher_id`);

--
-- Indexes for table `forum`
--
ALTER TABLE `forum`
  ADD PRIMARY KEY (`forum_id`);

--
-- Indexes for table `forum_comment`
--
ALTER TABLE `forum_comment`
  ADD PRIMARY KEY (`forum_comment_id`),
  ADD KEY `fk_forum_comment_forum` (`forum_id`),
  ADD KEY `fk_forum_comment_user` (`user_id`);

--
-- Indexes for table `material`
--
ALTER TABLE `material`
  ADD PRIMARY KEY (`material_id`);

--
-- Indexes for table `notification`
--
ALTER TABLE `notification`
  ADD PRIMARY KEY (`notification_id`),
  ADD KEY `fk_notification_student` (`student_id`),
  ADD KEY `fk_notification_topic_component` (`topic_component_id`);

--
-- Indexes for table `rich_text`
--
ALTER TABLE `rich_text`
  ADD PRIMARY KEY (`rich_text_id`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`student_id`);

--
-- Indexes for table `student_submission`
--
ALTER TABLE `student_submission`
  ADD PRIMARY KEY (`student_submission_id`),
  ADD KEY `fk_student_submission_student` (`student_id`),
  ADD KEY `fk_student_submission_submission` (`submission_id`);

--
-- Indexes for table `subject`
--
ALTER TABLE `subject`
  ADD PRIMARY KEY (`subject_id`);

--
-- Indexes for table `submission`
--
ALTER TABLE `submission`
  ADD PRIMARY KEY (`submission_id`);

--
-- Indexes for table `teacher`
--
ALTER TABLE `teacher`
  ADD PRIMARY KEY (`teacher_id`);

--
-- Indexes for table `timetable_slot`
--
ALTER TABLE `timetable_slot`
  ADD PRIMARY KEY (`timetable_slot_id`),
  ADD KEY `fk_timetable_slot_class_subject` (`class_subject_id`);

--
-- Indexes for table `topic`
--
ALTER TABLE `topic`
  ADD PRIMARY KEY (`topic_id`),
  ADD KEY `fk_class_subject_topic` (`class_subject_id`);

--
-- Indexes for table `topic_component`
--
ALTER TABLE `topic_component`
  ADD PRIMARY KEY (`topic_component_id`),
  ADD KEY `fk_topic_component_rich_text` (`rich_text_id`),
  ADD KEY `fk_topic_component_forum` (`forum_id`),
  ADD KEY `fk_topic_component_material` (`material_id`),
  ADD KEY `fk_topic_component_topic` (`topic_id`),
  ADD KEY `fk_topic_component_submission` (`submission_id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`user_id`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `fk_user_teacher` (`teacher_id`),
  ADD KEY `fk_user_student` (`student_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `class`
--
ALTER TABLE `class`
  MODIFY `class_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `class_student`
--
ALTER TABLE `class_student`
  MODIFY `class_student_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `class_subject`
--
ALTER TABLE `class_subject`
  MODIFY `class_subject_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `forum`
--
ALTER TABLE `forum`
  MODIFY `forum_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `forum_comment`
--
ALTER TABLE `forum_comment`
  MODIFY `forum_comment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `material`
--
ALTER TABLE `material`
  MODIFY `material_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `notification`
--
ALTER TABLE `notification`
  MODIFY `notification_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `rich_text`
--
ALTER TABLE `rich_text`
  MODIFY `rich_text_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `student_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `student_submission`
--
ALTER TABLE `student_submission`
  MODIFY `student_submission_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `subject`
--
ALTER TABLE `subject`
  MODIFY `subject_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `submission`
--
ALTER TABLE `submission`
  MODIFY `submission_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `teacher`
--
ALTER TABLE `teacher`
  MODIFY `teacher_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `timetable_slot`
--
ALTER TABLE `timetable_slot`
  MODIFY `timetable_slot_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `topic`
--
ALTER TABLE `topic`
  MODIFY `topic_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `topic_component`
--
ALTER TABLE `topic_component`
  MODIFY `topic_component_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `user_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `class`
--
ALTER TABLE `class`
  ADD CONSTRAINT `fk_class_teacher` FOREIGN KEY (`class_teacher_id`) REFERENCES `teacher` (`teacher_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `class_student`
--
ALTER TABLE `class_student`
  ADD CONSTRAINT `fk_class_student_class` FOREIGN KEY (`class_id`) REFERENCES `class` (`class_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_class_student_student` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `class_subject`
--
ALTER TABLE `class_subject`
  ADD CONSTRAINT `fk_class_subject_class` FOREIGN KEY (`class_id`) REFERENCES `class` (`class_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_class_subject_subject` FOREIGN KEY (`subject_id`) REFERENCES `subject` (`subject_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_class_subject_teacher` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`teacher_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `forum_comment`
--
ALTER TABLE `forum_comment`
  ADD CONSTRAINT `fk_forum_comment_forum` FOREIGN KEY (`forum_id`) REFERENCES `forum` (`forum_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_forum_comment_user` FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `notification`
--
ALTER TABLE `notification`
  ADD CONSTRAINT `fk_notification_student` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_notification_topic_component` FOREIGN KEY (`topic_component_id`) REFERENCES `topic_component` (`topic_component_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `student_submission`
--
ALTER TABLE `student_submission`
  ADD CONSTRAINT `fk_student_submission_student` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_student_submission_submission` FOREIGN KEY (`submission_id`) REFERENCES `submission` (`submission_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `timetable_slot`
--
ALTER TABLE `timetable_slot`
  ADD CONSTRAINT `fk_timetable_slot_class_subject` FOREIGN KEY (`class_subject_id`) REFERENCES `class_subject` (`class_subject_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `topic`
--
ALTER TABLE `topic`
  ADD CONSTRAINT `fk_class_subject_topic` FOREIGN KEY (`class_subject_id`) REFERENCES `class_subject` (`class_subject_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `topic_component`
--
ALTER TABLE `topic_component`
  ADD CONSTRAINT `fk_topic_component_forum` FOREIGN KEY (`forum_id`) REFERENCES `forum` (`forum_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_topic_component_material` FOREIGN KEY (`material_id`) REFERENCES `material` (`material_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_topic_component_rich_text` FOREIGN KEY (`rich_text_id`) REFERENCES `rich_text` (`rich_text_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_topic_component_submission` FOREIGN KEY (`submission_id`) REFERENCES `submission` (`submission_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_topic_component_topic` FOREIGN KEY (`topic_id`) REFERENCES `topic` (`topic_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `fk_user_student` FOREIGN KEY (`student_id`) REFERENCES `student` (`student_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk_user_teacher` FOREIGN KEY (`teacher_id`) REFERENCES `teacher` (`teacher_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
