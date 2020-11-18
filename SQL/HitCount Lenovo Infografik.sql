SELECT ISNULL(U.imBranchNbr,0) BranchNbr, ISNULL(U.imCustomerNbr,0) CustNbr, U.FullName, U.Email, D.TimeStamp
FROM [KENTICO].[dbo].[Analytics_FileDownloads] D
    LEFT JOIN [KENTICO].[dbo].[CMS_User] U
    ON D.UserID = U.UserID
WHERE D.SiteID = '4'
    AND D.Referrer LIKE '%/lenovo-modern-workplace%'



SELECT F.Kundennummer, F.Vorname, F.Email, D.TimeStamp
FROM [KENTICO].[dbo].[Analytics_FileDownloads] D
    LEFT JOIN [KENTICO].[dbo].[CMS_User] U
    ON D.UserID = U.UserID
	LEFT JOIN [KENTICO].[dbo].[Form_de_ingrammicro_eu_LenovoModernWorkplace] F
	ON CONCAT(ISNULL(U.imBranchNbr,0), ISNULL(U.imCustomerNbr,0)) = F.Kundennummer
WHERE D.SiteID = '4'
    AND D.Referrer LIKE '%/lenovo-modern-workplace%'