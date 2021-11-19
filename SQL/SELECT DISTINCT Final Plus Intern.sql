SELECT DISTINCT TOP 999 
CONCAT(RIGHT(YEAR(B.DateFrom), 2), 'CW', DATEPART(ISO_WEEK, B.DateFrom), '-', REPLACE(B.SK_Booking,' ','-'), '-', REPLACE(V.Name,' ','-'), '-', REPLACE(S.SlotName,' ','-'), '-', P.PlacementCode) ScreenshotName,
ScreenshotURL = 
    CASE
		WHEN PG.SK_BannerGroup IN (35, 36, 37, 38, 51, 49) AND (P.PlacementCode LIKE '%H' OR P.PlacementCode LIKE 'IMO' OR P.PlacementCode LIKE 'HM%') THEN 'https://de.ingrammicro.com/Site/Home'
		WHEN PG.SK_BannerGroup IN (59) AND P.PlacementCode LIKE 'TGF%' THEN CONCAT('https://de.ingrammicro.com/Site/search#keywords:',S.Url)

        WHEN PG.SK_BannerGroup IN (50, 52) THEN CONCAT('https://de.ingrammicro.eu/?scrn=', I.SK_Banner)
        WHEN PG.SK_BannerGroup IN (38, 39, 40, 43, 44) AND (P.PlacementCode LIKE '%S' OR P.PlacementCode LIKE 'CB') THEN CONCAT('https://de.ingrammicro.com/Site/search#category:',S.Url)
        WHEN PG.SK_BannerGroup IN (48, 41, 42) AND (P.PlacementCode LIKE '%S' OR P.PlacementCode LIKE 'CB') THEN
            CASE
                WHEN S.Url LIKE 'Printer%' THEN CONCAT('https://de.ingrammicro.com/Site/search#category:',S.Url)
                WHEN S.Url LIKE 'Display%' THEN CONCAT('https://de.ingrammicro.com/Site/search#category:',S.Url)
                ELSE CONCAT('https://de.ingrammicro.com/Site/search#category:Computer Systems~subCategory:',S.Url)
            END
        WHEN PG.SK_BannerGroup IN (45, 46, 47) AND (P.PlacementCode LIKE '%S' OR P.PlacementCode LIKE 'SKY') THEN CONCAT('https://de.ingrammicro.com/Site/search#vendorname:',S.Url)
        WHEN PG.SK_BannerGroup IN (38, 39, 41, 42, 43, 44) AND (P.PlacementCode LIKE '%D' OR P.PlacementCode LIKE 'CB') THEN CONCAT('https://de.ingrammicro.com/Site/search#category:',S.Url)
    END
	,S.SK_BannerSlot
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

WHERE B.SK_Status IN (5, 6)
AND G.SK_BannerGroup NOT IN (8, 17, 55, 57)
AND BannerName NOT LIKE '%Intern%'
AND D.Value IS NOT NULL
AND CAST(GETDATE() AS DATE) BETWEEN B.DateFrom AND B.DateTo
