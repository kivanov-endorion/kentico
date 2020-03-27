-- Hierachical queries
-- Anchor queries (WITH AS)
-- Recursive queries
-- Partition

-- IN
SELECT * FROM orders WHERE UsState IN ('Ca', 'Wa', 'In')

SELECT * FROM orders WHERE UsState IN (
    SELECT DISTINCT UsState FROM Customers
)

-- CASE
SELECT Name, 
CASE WHEN isMember = 1 THEN 'Member'
     WHEN isMember = 2 THEN 'Member 2'
     ELSE 'NotMember'
END Membership

SELECT Name, 
IIF(isMember = 0,'NotMember','Member') Membership

SELECT SUBSTRING(name,0,5) AS abbr, CONCAT(LOWER(name),'@ingrammicro.com') AS email
FROM student 
WHERE UPPER(name) LIKE 'KAL%'

--------------------------------------------------

-- Average GPA per course, higher than 3.9
-- (first calculation, then condition)
SELECT AVG(s.gpa) AS avg_gpa, e.cid, s.name
FROM enrolled AS e, student AS s
WHERE e.sid = s.sid
GROUP BY e.cid, s.name
HAVING avg_gpa > 3.9

-- Nested table
-- IN --> =ANY() [ANY,ALL,EXISTS]
SELECT name FROM student
WHERE sid = ANY(
    SELECT sid FROM enrolled
    WHERE cid = '15-445'
)
-- OR:
SELECT (
    SELECT s.name FROM student AS s
    WHERE s.sid = e.sid
    ) AS sname
FROM enrolled as e
WHERE cid = '15-445'

-- Find student with highest id enrolled in at least one course
SELECT sid, name FROM student
WHERE sid => ALL(
    SELECT sid FROM enrolled
)
-- OR
SELECT sid, name FROM student
WHERE sid IN (
    SELECT MAX(sid) FROM enrolled
)
-- OR 
SELECT sid, name FROM student
WHERE sid IN (
    SELECT sid FROM enrolled
    ORDER BY sid DESC LIMIT 1
)

-- Only inner queries can reference the outer queries
-- Select courses with no students enrolled 
SELECT * FROM course
WHERE NOT EXISTS(
    SELECT * FROM enrolled
    WHERE course.cid = enrolled.cid
)


-- WINDOW FUNCTIONS

SELECT cid, sid, ROW_NUMBER() OVER(PARTITION BY cid)
FROM enrolled
ORDER BY cid

SELECT * FROM (
    SELECT *, RANK() OVER(PARTITION BY cid ORDER BY grade ASC) AS rank
    FROM enrolled
) AS ranking
WHERE ranking.rank = 1

-- COMMON TABLE EXPRESSIONS (CTE)

WITH cteName (col1, col2) AS (
    SELECT 1, 2
)
SELECT col1 + col2 FROM cteName

WITH cteSource (maxId) AS (
    SELECT MAX(sid) FROM enrolled
)
SELECT name FROM student, cteSource
WHERE student.sid = cteSource.maxId

-- CTE RECURSION
WITH RECURSIVE cteSource (counter) AS {
    (SELECT 1)
    UNION ALL
    (SELECT counter + 1 FROM cteSource WHERE counter < 10)
}
SELECT * FROM cteSource

