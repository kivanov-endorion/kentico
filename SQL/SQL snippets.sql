/* instead of PUBLISHED = 1 */
SELECT *
FROM View_CMS_Tree_Joined
WHERE DocumentCanBePublished = 1
    AND GETDATE() BETWEEN ISNULL(DocumentPublishFrom, GETDATE() - 1) AND ISNULL(DocumentPublishTo, GETDATE() + 1)
    /* EVENTS */
    OR DATEFROMPARTS(YEAR(EventDateStart),MONTH(EventDateStart),1) > DATEFROMPARTS(YEAR(GETDATE()),MONTH(GETDATE()),1)

-- Related pages conditions
SELECT *
FROM EU_Starter_Event
WHERE NodeID in (
    SELECT DISTINCT R.LeftNodeID
    FROM dbo.View_CMS_Relationship_Joined AS R INNER JOIN
        dbo.View_CMS_Tree_Joined AS T ON R.RightNodeID = T.NodeID
    WHERE (R.RightNodeID = 79879) AND (R.LeftClassID = 4995)
)


-- AS View_OneIM_News_Joined
(
    SELECT *
FROM View_CMS_Tree_Joined INNER JOIN oneIM_News ON View_CMS_Tree_Joined.DocumentForeignKeyValue = oneIM_News.NewsID
WHERE (ClassName = 'OneIM.News')
)

-- AS View_EU_Starter_Event_Joined
(
    SELECT *
FROM View_CMS_Tree_Joined INNER JOIN EU_Starter_Event ON View_CMS_Tree_Joined.DocumentForeignKeyValue = EU_Starter_Event.EventID
WHERE (ClassName = 'OneIM.Event')
)

-- Documents in categories Digitalpatk and Cisco
SELECT TOP 100 *
FROM View_CMS_Tree_Joined INNER JOIN oneIM_News ON View_CMS_Tree_Joined.DocumentForeignKeyValue = oneIM_News.NewsID
JOIN CMS_DocumentCategory ON View_CMS_Tree_Joined.DocumentID = CMS_DocumentCategory.DocumentID 
WHERE (ClassName = 'OneIM.News')
AND CategoryID  in (652, 841)

-- Documents in just 2 categories:
SELECT D.DocumentID, D.DocumentName, NodeAlias, NodeAliasPath, NewsReleaseDate, NewsTarget, NewsTeaser, NewsTitle, NewsSummary, COUNT(CategoryID)
FROM View_CMS_Tree_Joined AS D INNER JOIN oneIM_News ON D.DocumentForeignKeyValue = oneIM_News.NewsID
JOIN CMS_DocumentCategory AS C ON D.DocumentID = C.DocumentID 
WHERE (ClassName = 'OneIM.News')
AND CategoryID  in (652, 841)
GROUP BY  D.DocumentID, D.DocumentName, NodeAlias, NodeAliasPath, NewsReleaseDate, NewsTarget, NewsTeaser, NewsTitle, NewsSummary
HAVING COUNT(CategoryID) = 2


-- Downloads from FR Apple DPP
SELECT TimeStamp, AttachmentName, FullName, Email
  FROM [KENTICO].[dbo].[Analytics_FileDownloads] D

  INNER JOIN [KENTICO].[dbo].[CMS_Attachment] A ON A.AttachmentGUID = D.FileGUID

  INNER JOIN [KENTICO].[dbo].[CMS_User] U ON  U.UserID = D.UserID
  
  WHERE Referrer LIKE '%Apple-DPP%'
  --AND MONTH(TimeStamp) = 02 
  AND YEAR(TimeStamp) = 2021
  AND SiteID = 23

  

SELECT TOP 1 AvatarURL
FROM [KENTICO].[dbo].[View_DE_Inside_Avatars]
WHERE UserName = 'bgivak08'