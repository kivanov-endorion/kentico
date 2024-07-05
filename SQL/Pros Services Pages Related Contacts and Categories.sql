USE KENTICO

SELECT 
	  T.[DocumentName]
	  ,T.[NodeAliasPath]	
      ,[Description]
      ,[UseCases]
      ,[Exclusions]
      ,[CostsInternal]
      ,[HowToOrderInternal]
      ,[DeliverModel]
      ,[Contact]
      ,[InfoInternal]
      ,[RelatedServices]
      ,[InfoPartner]
      ,[InfoEndCustomer]
      ,[TargetCustomers]
	  ,(SELECT DocumentName FROM view_cms_tree_joined WHERE NodeID = R.RightNodeID AND R.RelationshipNameID = 4) ContactName
	  --,(SELECT STRING_AGG(DocumentName, ', ') FROM view_cms_tree_joined WHERE NodeID = R.RightNodeID AND R.RelationshipNameID = 3) RelService
	  ,STRING_AGG(C.CategoryDisplayName, ';') Category

FROM view_cms_tree_joined T 

LEFT JOIN [KENTICO].[dbo].[oneIMProfServicesCatalog_1] PC
ON T.DocumentForeignKeyValue = PC.ProfServicesCatalogID

LEFT JOIN [KENTICO].[dbo].[CMS_Relationship] R
ON R.LeftNodeID = T.NodeID

LEFT JOIN CMS_DocumentCategory DC 
ON T.DocumentID = DC.DocumentID


LEFT JOIN [KENTICO].[dbo].[CMS_Category] C
ON DC.CategoryID = C.CategoryID

WHERE
	T.NodeSiteID = 74
	AND T.NodeAliasPath like '/Professional-Services%'
	--AND T.ClassName = 'oneIM.ProfServicesCatalog'
	--AND (R.RelationshipNameID = 4)

Group by
T.DocumentName, 
	   [NodeAliasPath]
	  ,[RightNodeID]
	  ,[RelationshipNameID]
	  ,[Description]
      ,[UseCases]
      ,[Exclusions]
      ,[CostsInternal]
      ,[HowToOrderInternal]
      ,[DeliverModel]
      ,[Contact]
      ,[InfoInternal]
      ,[RelatedServices]
      ,[InfoPartner]
      ,[InfoEndCustomer]
      ,[TargetCustomers]

ORDER BY NodeAliasPath, DocumentName


==============


USE KENTICO

SELECT 
	  T.[DocumentName]
	  ,PARSENAME(REPLACE(SUBSTRING(C.CategoryNamePath, 0, CHARINDEX('/', C.CategoryNamePath, CHARINDEX('/', C.CategoryNamePath, CHARINDEX('/', C.CategoryNamePath) + 1) + 1)), '/', '.'), 1) ParentCategory
	  ,STRING_AGG(C.CategoryDisplayName, ';') Category
	  

FROM view_cms_tree_joined T 

LEFT JOIN CMS_DocumentCategory DC 
ON T.DocumentID = DC.DocumentID


LEFT JOIN [KENTICO].[dbo].[CMS_Category] C
ON DC.CategoryID = C.CategoryID

WHERE
	T.NodeSiteID = 74
	AND T.NodeAliasPath like '/Professional-Services%'

Group by
T.DocumentName, 
	   [NodeAliasPath]
	  ,DC.[CategoryID]
	  ,C.[CategoryID]
	  ,C.CategoryParentID
	  ,C.CategoryDisplayName
	  ,T.DocumentID
	  ,C.CategoryNamePath
	  ,C.CategoryLevel

ORDER BY DocumentName, ParentCategory