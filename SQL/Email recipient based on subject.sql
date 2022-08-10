SELECT TOP 1 Email, Email
FROM [KENTICO].[dbo].[oneIM_CategoryEmail]
WHERE SiteID = {% CurrentSite.SiteID #%}
AND	Category = '{% Subject.Value #%}'
