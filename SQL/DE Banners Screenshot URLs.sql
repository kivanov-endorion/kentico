SELECT 
	CONCAT(YEAR(GETDATE()),'CW', DATEPART(WEEK,GETDATE())-1,'-VENDOR-',REPLACE(platz_name,' ','-'),'-TYPE-') AS [Banner Name]
	,[Home Page Screenshot URL] = 
		  CASE
			WHEN id_b_aktion IN (35, 36, 37, 38, 51, 49) THEN 'https://de.ingrammicro.com/Site/Home'
		  END
	,[Search Page Screenshot URL] = 
		  CASE 
			WHEN id_b_aktion IN (50, 52) THEN CONCAT('https://de.ingrammicro.eu/scrn=',opt_wert)
			WHEN id_b_aktion IN (40, 43, 44) THEN CONCAT('https://de.ingrammicro.com/Site/search#category%3a',platz_name)
			WHEN id_b_aktion IN (48, 41, 42) THEN
				CASE
					WHEN platz_name LIKE 'Printer%' THEN CONCAT('https://de.ingrammicro.com/Site/search#category:',platz_name)
					WHEN platz_name LIKE 'Display%' THEN CONCAT('https://de.ingrammicro.com/Site/search#category:',platz_name)
					ELSE CONCAT('https://de.ingrammicro.com/Site/search#category%3aComputer%20Systems~subCategory:',platz_name)
				END
			WHEN id_b_aktion IN (45, 46, 47) THEN CONCAT('https://de.ingrammicro.com/Site/search#vendorname%3a',platz_name)
		  END
	  ,[Product Details Page Screenshot URL] = 
		  CASE
			WHEN id_b_aktion IN (38, 39, 41, 42, 43, 44) THEN CONCAT('https://de.ingrammicro.com/Site/search#category:',platz_name)
		  END
FROM [WEBMANAGER].[dbo].[Vw_PublishDetails]
WHERE 
GETDATE() BETWEEN ISNULL(von_dat, GETDATE()) AND ISNULL(bis_dat, GETDATE())
AND id_b_aktion NOT IN (8, 17, 55, 57)
AND [status] in (5, 6)
AND CampaignID NOT LIKE '%Intern%'

AND name = 'Link 1'
AND opt_wert IS NOT NULL

ORDER BY von_kw, id_banner
