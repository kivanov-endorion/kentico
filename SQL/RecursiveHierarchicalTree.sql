WITH MyCTE
AS ( SELECT NodeID, NodeName, NodeAliasPath, NodeParentID, NodeLevel, FORMAT(NodeOrder, '0000') NodeIDPath
FROM dbo.CMS_Tree
WHERE 
  --NodeParentID = 4
  --AND 
  NodeLevel=1
  AND NodeSiteID = 33
  --AND NodeID=10680

UNION ALL
SELECT T1.NodeID, T1.NodeName, T1.NodeAliasPath, T1.NodeParentID, T1.NodeLevel, CONCAT(MyCTE.NodeIDPath,'/',FORMAT(T1.NodeOrder, '0000')) NodeIDPath
FROM dbo.CMS_Tree T1
INNER JOIN MyCTE ON T1.NodeParentID = MyCTE.NodeID
WHERE T1.NodeParentID IS NOT NULL

)
SELECT 
	CONCAT('''',REPLACE(SPACE(3 * E.NodeLevel), ' ', '-'), E.NodeName) Ident,
	E.NodeID,
	T.ClassName,
	ISNULL(T.DocumentPublishFrom,GETDATE()) PublishFrom,
	ISNULL(T.DocumentPublishTo,GETDATE()+1) PublishTo,
	IIF(GETDATE()>= ISNULL(T.DocumentPublishFrom,GETDATE()) AND GETDATE()<= ISNULL(T.DocumentPublishTo,GETDATE()+1),iif(T.DocumentCanBePublished=1,'Published','Offline'),'Expired') PublishStatus
	--,ISNULL(PageViews.Hits,0) CountPageViews
	, T.DocumentName
	, T.NodeAliasPath
FROM MyCTE E
INNER JOIN view_cms_tree_joined T
	ON T.NodeID = E.NodeID

--WHERE IIF(GETDATE()>= ISNULL(T.DocumentPublishFrom,GETDATE()) AND GETDATE()<= ISNULL(T.DocumentPublishTo,GETDATE()+1),iif(T.DocumentCanBePublished=1,'Published','Offline'),'Expired')='Published'
Order by NodeIDPath