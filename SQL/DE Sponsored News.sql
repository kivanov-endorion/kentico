/****** Script for SelectTopNRows command from SSMS  ******/
SELECT TOP 1000 [id]
      ,[id_banner]
      ,[name]
      ,[opt_name]
      ,[opt_wert]
      ,[id_b_aktion]
      ,[datei]
      ,[id_b_art]
      ,[von_kw]
      ,[platz_name]
      ,[CampaignID]
      ,[von_dat]
      ,[bis_dat]
      ,[status]
      ,[id_b_platz]
      ,[OneIM]
      ,[IMOnlineV1]
      ,[IMOnlineV2]
	  ,CONCAT('//de.ingrammicro.eu/scrn=',opt_wert) AS URL
  FROM [WEBMANAGER].[dbo].[Vw_PublishDetails]
  WHERE GETDATE() BETWEEN ISNULL(von_dat, GETDATE()) 
    AND ISNULL(bis_dat, GETDATE())
	AND name = 'Link 1'
	AND opt_wert IS NOT NULL
	AND status in (5, 6)
	--AND id_b_platz = 786
	AND platz_name LIKE 'Sponsored News%'