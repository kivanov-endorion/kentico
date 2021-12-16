SELECT DISTINCT TOP 999 
CONCAT(RIGHT(YEAR(B.DateFrom), 2), 'CW', DATEPART(ISO_WEEK, B.DateFrom), '-', REPLACE(B.SK_Booking,' ','-'), '-', REPLACE(V.Name,' ','-'), '-', REPLACE(S.SlotName,' ','-'), '-', P.PlacementCode) Name
,S.SK_BannerSlot
,DATEPART(ISO_WEEK, B.DateFrom) Week
,DATEADD(hour, -14, B.DateFrom) DateStart
,DATEADD(hour, 18, B.DateTo) DateEnd
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
INNER JOIN WEBMANAGER.dbo.Tbl_BannerDetail D WITH (NOLOCK)
ON D.SK_Banner = B.SK_Banner

WHERE B.SK_Status = 5
AND G.SK_BannerGroup NOT IN (8, 17, 27, 35, 36, 37, 38, 39, 49, 50, 51, 52, 55, 57)
AND BannerName NOT LIKE '%Intern%'
AND D.Value IS NOT NULL
AND DATEPART(ISO_WEEK, B.DateFrom) = DATEPART(ISO_WEEK, DATEADD(WEEK, 1, GETDATE()))
