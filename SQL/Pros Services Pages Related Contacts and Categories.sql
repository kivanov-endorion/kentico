SELECT 
	  T.[DocumentName]
	  ,T.[NodeAliasPath]	
      ,[Description]
      ,[UseCases]
      ,[Exclusions]
      ,[CostsInternal]
      ,[HowToOrderInternal]
      ,[DeliverModel]
      ,[InfoInternal]
      ,[InfoPartner]
      ,[InfoEndCustomer]
      ,[TargetCustomers]
	  ,(SELECT STRING_AGG(R.RightNodeName, ';') FROM [KENTICO].[dbo].[View_CMS_Relationship_Joined] R WHERE T.NodeID = R.LeftNodeID AND R.RelationshipNameID = 4) AS Contact
	  ,STRING_AGG(C.CategoryDisplayName, ';') Category

FROM view_cms_tree_joined T 

LEFT JOIN [KENTICO].[dbo].[oneIMProfServicesCatalog_1] PC
ON T.DocumentForeignKeyValue = PC.ProfServicesCatalogID

LEFT JOIN [KENTICO].[dbo].[View_CMS_Relationship_Joined] R
		--ON T.NodeID = R.LeftNodeID
		ON T.DocumentForeignKeyValue = R.RelationshipID

LEFT JOIN CMS_DocumentCategory DC 
ON T.DocumentID = DC.DocumentID


LEFT JOIN [KENTICO].[dbo].[CMS_Category] C
ON DC.CategoryID = C.CategoryID

WHERE
	T.NodeSiteID = 74
	AND T.NodeAliasPath like '/Professional-Services%'

GROUP BY
T.DocumentName
,T.NodeID
	  ,[NodeAliasPath]
	  ,[Description]
      ,[UseCases]
      ,[Exclusions]
      ,[CostsInternal]
      ,[HowToOrderInternal]
      ,[DeliverModel]
      ,[InfoInternal]
      ,[InfoPartner]
      ,[InfoEndCustomer]
      ,[TargetCustomers]

ORDER BY NodeAliasPath, DocumentName