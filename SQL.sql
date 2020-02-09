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
