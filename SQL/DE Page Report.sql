use KENTICO

DECLARE
	@FromDate					DATE,
	@ToDate						DATE,
	@StrFromDate				VARCHAR(25),
	@StrToDate					VARCHAR(25),
	@NodeAliasPath				VARCHAR(255),
	@CMSContextCurrentSiteID	INT,
	@TreeFolder					VARCHAR(255)

SET @CMSContextCurrentSiteID = 4
SET @NodeAliasPath = '/ONE-IM-B4/Landing-Pages/%'
SET @TreeFolder = '/ONE-IM-B4/Landing-Pages/'
SET @StrFromDate='8/19/2023'
SET @StrToDate='9/19/2023'
    
SET @FromDate = CAST(@StrFromDate AS DATE)
SET @ToDate = CAST(@StrToDate AS DATE)

SELECT 
	T.DocumentName, 
	T.NodeAliasPath, 
	'Landing pages' Type,
	IIF(GETDATE()>= ISNULL(T.DocumentPublishFrom,GETDATE()) AND GETDATE()<= ISNULL(T.DocumentPublishTo,GETDATE()+1),iif(T.DocumentCanBePublished=1,'Published','Offline'),'Expired') PublishStatus

FROM view_cms_tree_joined T 

LEFT JOIN (
	SELECT
		SUBSTRING(REPLACE(DocumentNamePath,@TreeFolder,''),0,CHARINDEX('/',REPLACE(DocumentNamePath,@TreeFolder,'')))  Portal,
		COUNT(*) CountPages

	FROM view_cms_tree_joined T 
	WHERE 
		T.NodeLevel>3
		AND T.NodeSiteID = 4
		AND T.NodeAliasPath like @NodeAliasPath
		AND NOT (T.ClassName in ('CMS.File','DE.ProductList','CMS.Folder','DE_Corporate.Contact','DE.iframe','EU.slider','oneIM.Contact','oneIM.Slider'))
	Group by
		SUBSTRING(REPLACE(DocumentNamePath,@TreeFolder,''),0,CHARINDEX('/',REPLACE(DocumentNamePath,@TreeFolder,'')))
) Pages
ON Pages.Portal = T.DocumentName

LEFT JOIN (
SELECT      

SUBSTRING(REPLACE(DocumentNamePath,@TreeFolder,''),0,CHARINDEX('/',REPLACE(DocumentNamePath,@TreeFolder,'')))  Portal,
SUM(ISNULL(H.HitsCount, 0)) Hits
                FROM        dbo.View_CMS_Tree_Joined N
                INNER JOIN  dbo.Analytics_Statistics S WITH (NOLOCK)
                    ON      N.NodeID = S.StatisticsObjectID
                    AND     N.NodeSiteId = S.StatisticsSiteID
                    AND     N.DocumentCulture = S.StatisticsObjectCulture
                    AND     S.StatisticsCode = 'PageViews'
                LEFT JOIN   dbo.Analytics_DayHits H WITH (NOLOCK)
                    ON      S.StatisticsID = H.HitsStatisticsID
                    AND     H.HitsStartTime BETWEEN @FromDate AND @ToDate
                WHERE       N.NodeAliasPath LIKE @NodeAliasPath
                    AND     N.NodeSiteId = @CMSContextCurrentSiteID
                GROUP BY    

				SUBSTRING(REPLACE(DocumentNamePath,@TreeFolder,''),0,CHARINDEX('/',REPLACE(DocumentNamePath,@TreeFolder,'')))

) PageViews
ON PageViews.Portal = T.DocumentName


WHERE
	T.NodeSiteID = 4
	AND T.NodeLevel < 4
	AND T.NodeAliasPath like @NodeAliasPath

Order by 
	DocumentName
