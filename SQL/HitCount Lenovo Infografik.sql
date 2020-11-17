SELECT ISNULL(U.imBranchNbr,0) BranchNbr, ISNULL(U.imCustomerNbr,0) CustNbr, U.FullName, U.Email, D.TimeStamp
FROM [KENTICO].[dbo].[Analytics_FileDownloads] D
    LEFT JOIN [KENTICO].[dbo].[CMS_User] U
    ON D.UserID = U.UserID
WHERE D.SiteID = '4'
    AND D.Referrer LIKE '%/lenovo-modern-workplace%'