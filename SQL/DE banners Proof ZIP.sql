SELECT DISTINCT B.SK_Booking,
        CONCAT(RIGHT(YEAR(B.DateFrom), 2),
         'CW', DATEPART(WW, B.DateFrom), ' - ', P.PlacementCode, ' - ', B.SK_Booking, ' - ', V.Name, ' - ', S.SlotName) PDF,
		 CONCAT('\\DEDONETAPP\IMToolsStorage\WebManager\PoE\', FORMAT(B.DateFrom, 'yyyy\\MM'), '\', RIGHT(YEAR(B.DateFrom), 2), 'CW', DATEPART(WW, B.DateFrom), ' - ', B.SK_Booking, ' - ', V.Name, ' - ', S.SlotName, '.zip') ZIP
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
LEFT JOIN 
    (SELECT DISTINCT D.SK_Banner,
        1 NeedPaging,
        MAX(D.CreatedWhen) LastEntry
        FROM WEBMANAGER.dbo.Tbl_BannerDetail D WITH (NOLOCK)
        INNER JOIN WEBMANAGER.dbo.Tbl_BannerOption O WITH (NOLOCK)
    ON D.SK_BannerOption = O.SK_BannerOption
    WHERE O.OptionName LIKE 'SKU%'
    AND D.Value IS NOT NULL
	GROUP BY D.SK_Banner) D
	ON B.SK_Banner = D.SK_Banner
    INNER JOIN MARCOM.dbo.ad_hersteller V WITH (NOLOCK)
    ON B.SK_Manufacturer = V.id
WHERE CONCAT(P.ReportUrl, S.Url) LIKE 'http%://%'
AND B.SK_Status IN (5, 6)
AND ABS(S.ShowWeb) = 1
AND ABS(G.ShowWeb) = 1
AND ISNULL(S.Url, '') != ''
AND CAST(GETDATE() AS DATE)
    BETWEEN B.DateFrom
        AND B.DateTo
		AND (DATEDIFF(D, ISNULL(I.ImportDate, 0), GETDATE()) <= 1
		OR DATEDIFF(D, ISNULL(B.DateFrom, 0), GETDATE()) <= 1
		OR DATEDIFF(D, ISNULL(D.LastEntry, 0), GETDATE()) <= 1)
        ORDER BY SK_Booking,PDF 