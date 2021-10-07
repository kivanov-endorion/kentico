SELECT TOP 100 * ,CONCAT(RIGHT(YEAR(B.DateFrom), 2), 'CW', DATEPART(WW, B.DateFrom), ' - ', P.PlacementCode, ' - ', B.SK_Booking, ' - ', V.Name, ' - ', S.SlotName) PDF
FROM WEBMANAGER.dbo.Tbl_Booking B WITH (NOLOCK)
INNER JOIN WEBMANAGER.dbo.Tbl_BannerSlot S WITH (NOLOCK)
ON B.SK_BannerSlot = S.SK_BannerSlot
INNER JOIN WEBMANAGER.dbo.Tbl_BannerGroup G WITH (NOLOCK)
ON S.SK_BannerGroup = G.SK_BannerGroup
INNER JOIN WEBMANAGER.dbo.Tbl_PlacementBannerGroup PG WITH (NOLOCK)
ON S.SK_BannerGroup = PG.SK_BannerGroup
INNER JOIN WEBMANAGER.dbo.Tbl_Placement P WITH (NOLOCK)
ON PG.SK_Placement = P.SK_Placement
INNER JOIN WEBMANAGER.dbo.Tbl_Banner I WITH (NOLOCK)
ON B.SK_Banner = I.SK_Banner
INNER JOIN MARCOM.dbo.ad_hersteller V WITH (NOLOCK)
ON B.SK_Manufacturer = V.id

WHERE B.SK_Status IN (5, 6)
AND B.SK_Category NOT IN (8, 17, 55, 57)
AND BannerName NOT LIKE '%Intern%'
AND ABS(S.ShowWeb) = 1
AND ABS(G.ShowWeb) = 1
AND CAST(GETDATE() AS DATE) BETWEEN B.DateFrom AND B.DateTo

