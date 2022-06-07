SELECT TOP 1000 [HashValue]
      ,[LastUpdate]
      ,[Source]
      ,[Destination]
	  ,CAST(ROUND(Rate, 2) AS NUMERIC(36,2))
	  ,FORMAT(Rate, 'N2')
  FROM [OIS_ADMINISTRATION].[dbo].[Tbl_Currency]
  WHERE Source = 'USD'
  AND Destination = 'EUR'