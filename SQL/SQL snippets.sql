/* instead of PUBLISHED = 1 */
SELECT *
FROM View_CMS_Tree_Joined
WHERE DocumentCanBePublished = 1
    AND GETDATE() BETWEEN ISNULL(DocumentPublishFrom, GETDATE()) 
    AND ISNULL(DocumentPublishTo, GETDATE())
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

