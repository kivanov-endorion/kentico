SELECT ##TOPN## DocumentNamePath, NodeName, NodeAliasPath, ArticleName, ArticleTeaserImage, DocumentCreatedWhen, SUM(HitsCount) FROM 
Analytics_Statistics, Analytics_DayHits, 
(
    SELECT * 
    -- Page type view
    FROM View_CMS_Tree_Joined INNER JOIN BLXBE_Article ON View_CMS_Tree_Joined.DocumentForeignKeyValue = BLXBE_Article.BEArticleID
    WHERE (ClassName = 'BLXCSBE.BEArticle')
) AS A 
WHERE (StatisticsSiteID = 8) AND (StatisticsCode='pageviews') AND 
(StatisticsID = HitsStatisticsID) AND (StatisticsObjectID = NodeID) 
AND (StatisticsObjectCulture = DocumentCulture) 
AND (NodeAliasPath LIKE '/impartner/%')
AND (HitsStartTime >= DATEADD(dd,-60, GETDATE()))
AND TopArticle = 1
AND DocumentCanBePublished = 1
AND GETDATE() BETWEEN ISNULL(DocumentPublishFrom, GETDATE()) AND ISNULL(DocumentPublishTo, GETDATE()) 
 
GROUP BY DocumentNamePath, NodeName, NodeAliasPath, ArticleName, ArticleTeaserImage, DocumentCreatedWhen 
ORDER BY SUM(HitsCount) DESC