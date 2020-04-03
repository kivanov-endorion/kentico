SELECT [TimeStamp]
      , FirstName + ' ' + LastName As FullName
	  , D.UserID
      , [FileGUID]
	  , [AttachmentName]
	  , [AttachmentGroupGUID]
      , [Referrer]
      , [SiteID]
      , [Source]
	  , RANK() OVER (ORDER BY FileGUID) FileRank
FROM [KENTICO].[dbo].[CMS_Attachment] A
  INNER JOIN [KENTICO].[dbo].[Analytics_FileDownloads] D ON A.AttachmentGUID = D.FileGUID
  INNER JOIN [KENTICO].[dbo].[CMS_User] U ON D.UserID = U.UserID
WHERE SiteID = 2


SELECT *
FROM View_CMS_Tree_Joined INNER JOIN oneIM_Campaign ON View_CMS_Tree_Joined.DocumentForeignKeyValue = oneIM_Campaign.CampaignID
WHERE (ClassName = 'oneIM.Campaign')




/*DEFAULT*/
SELECT [TimeStamp]
      , [FirstName] + ' ' + [LastName] AS FullName
	  , D.UserID
      , [FileGUID]
	  , [AttachmentDocumentID]
	  , [AttachmentName]	  
	  , [DocumentID]
	  , [DocumentName]
	  , RANK() OVER (PARTITION BY DocumentName ORDER BY FileGUID) FileRank
FROM CMS_Attachment AS A
  INNER JOIN Analytics_FileDownloads AS D ON A.AttachmentGUID = D.FileGUID
  INNER JOIN CMS_User AS U ON D.UserID = U.UserID
  INNER JOIN View_CMS_Tree_Joined AS T ON T.DocumentID = A.AttachmentDocumentID
WHERE SiteID = 2

/*HIT COUNT*/

SELECT DISTINCT FileGUID
	  , [AttachmentName]	  
	  , [DocumentID]
	  , [DocumentName]
	  , COUNT(FileGUID) HitCount
	  , CampaignValidFrom
  , NodeParentID
  , CampaignImage
  , CampaignName
FROM CMS_Attachment AS A
  INNER JOIN Analytics_FileDownloads AS D ON A.AttachmentGUID = D.FileGUID
  INNER JOIN CMS_User AS U ON D.UserID = U.UserID
  INNER JOIN View_CMS_Tree_Joined AS T ON T.DocumentID = A.AttachmentDocumentID
  INNER JOIN oneIM_Campaign C ON T.DocumentForeignKeyValue = C.CampaignID
WHERE SiteID = 2
--AND DocumentID = 89003
GROUP BY FileGUID, AttachmentName, DocumentID, DocumentName,CampaignValidFrom,NodeParentID,CampaignImage,CampaignName
ORDER BY HitCount DESC
