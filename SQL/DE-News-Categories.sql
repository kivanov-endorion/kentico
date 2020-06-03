SELECT TOP 10  *
FROM        [KENTICO].[dbo].[View_CMS_Tree_Joined] T WITH (NOLOCK)
INNER JOIN  [KENTICO].[dbo].[oneIM_News] N WITH (NOLOCK)
ON          T.DocumentForeignKeyValue = N.NewsID
INNER JOIN  [KENTICO].[dbo].[CMS_DocumentCategory] DC WITH (NOLOCK)
ON	        T.DocumentID = DC.DocumentID
INNER JOIN  [KENTICO].[dbo].[CMS_Category] C WITH (NOLOCK)
ON          DC.CategoryID = C.CategoryID
WHERE       T.ClassName = 'oneIM.News' 
AND			T.NodeSiteID = '4'
AND			C.CategoryName = 'Talk'
ORDER BY    N.NewsReleaseDate