DECLARE @CategoryParentId int,
@CategoryNamePath NVARCHAR(255),
@Test NVARCHAR(255)

SET @CategoryParentId = 528
SET @CategoryNamePath = '%/Services & Trainings/%'

--SET @Test = SUBSTRING(@CategoryNamePath,1,CHARINDEX('/',@CategoryNamePath))

SELECT *,
    IIF(CategoryLevel=1,CategoryID,CategoryParentID) AS CatGroup,
    IIF(CategoryLevel=1,CategoryNamePath,LEFT(CategoryNamePath,LEN(CategoryNamePath) - charindex('/',reverse(CategoryNamePath),1) + 1))  AS  CatPath,
    LOWER(CategoryDescription) AS CategoryCSSClass
FROM dbo.CMS_Category
--WHERE CategoryParentID = @CategoryParentId
WHERE CategoryNamePath LIKE  @CategoryNamePath
ORDER BY CategoryIDPath



-- CategoryAll Query
DECLARE
    @CategoryParentId   INT = 528,
    @CategoryNamePath   NVARCHAR(255) = '/Services & Trainings/%'

SELECT      C.*,
            IIF(C.CategoryLevel = 1, C.CategoryID, C.CategoryParentID) CatGroup,
            LOWER(C.CategoryDescription) CategoryCSSClass,
            COUNT(*) OVER (
                PARTITION BY C.CategoryParentID
            ) CategoryItems,
            COUNT(*) OVER (
                PARTITION BY C.CategoryParentID
            ) % 2 CategoryOdd
FROM        dbo.CMS_Category C
WHERE       C.CategoryNamePath LIKE @CategoryNamePath 
    AND     C.CategorySiteID = 4
ORDER BY    C.CategoryIDPath