/****** Script for SelectTopNRows command from SSMS  ******/
SELECT [TimeStamp]
      ,FirstName + ' ' + LastName As FullName
	  ,D.UserID
      ,[FileGUID]
	  ,[AttachmentName]
	  ,[AttachmentGroupGUID]
      ,[Referrer]
      ,[SiteID]
      ,[Source]
	  ,RANK() OVER (ORDER BY FileGUID) FileRank
  FROM [KENTICO].[dbo].[CMS_Attachment] A 
  INNER JOIN [KENTICO].[dbo].[Analytics_FileDownloads] D ON A.AttachmentGUID = D.FileGUID
  INNER JOIN [KENTICO].[dbo].[CMS_User] U ON D.UserID = U.UserID
  WHERE SiteID = 2


SELECT * 
FROM View_CMS_Tree_Joined INNER JOIN oneIM_Campaign ON View_CMS_Tree_Joined.DocumentForeignKeyValue = oneIM_Campaign.CampaignID
WHERE (ClassName = 'oneIM.Campaign')

