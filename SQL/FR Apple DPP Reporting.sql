DECLARE @CurrentMonth INT
DECLARE @CurrentYear INT

SET @CurrentMonth = MONTH(GETDATE())
SET @CurrentYear = YEAR(GETDATE())

SELECT Fir.Months, CNT 'Number of new partners registered:', Hits 'Number of page views:',  AvgTime 'Average time on site:', Downloads 'Number of downloads:' FROM (

SELECT Count(AppleDppID) CNT, DATENAME(MONTH, CONVERT(datetime, GETDATE())) AS Months, 1 Ordered
FROM [KENTICO].[dbo].[Form_fr_ingrammicro_eu_Apple_DPP] F
WHERE MONTH(FormInserted) = @CurrentMonth 
AND YEAR(FormInserted) = @CurrentYear


UNION SELECT Count(AppleDppID) CNT, DATENAME(MONTH, CONVERT(datetime, DATEADD(m, -1, GETDATE()))) AS Months, 2 Ordered
FROM [KENTICO].[dbo].[Form_fr_ingrammicro_eu_Apple_DPP] F
WHERE MONTH(FormInserted) = @CurrentMonth - 1
AND YEAR(FormInserted) = @CurrentYear

UNION SELECT Count(AppleDppID) CNT, DATENAME(MONTH, CONVERT(datetime, DATEADD(m, -2, GETDATE()))) AS Months, 3 Ordered
FROM [KENTICO].[dbo].[Form_fr_ingrammicro_eu_Apple_DPP] F
WHERE MONTH(FormInserted) = @CurrentMonth - 2
AND YEAR(FormInserted) = @CurrentYear
) Fir

INNER JOIN (
SELECT [HitsCount] Hits, DATENAME(MONTH, CONVERT(datetime, GETDATE())) AS Months, 1 Ordered
FROM [KENTICO].[dbo].[Analytics_MonthHits] AA
WHERE HitsStatisticsID = 987894
AND YEAR(HitsStartTime) = @CurrentYear
AND MONTH(HitsStartTime) = @CurrentMonth

UNION SELECT [HitsCount] Hits, DATENAME(MONTH, CONVERT(datetime, DATEADD(m, -1, GETDATE()))) AS Months, 2 Ordered
FROM [KENTICO].[dbo].[Analytics_MonthHits] A
WHERE HitsStatisticsID = 987894
AND YEAR(HitsStartTime) = @CurrentYear
AND MONTH(HitsStartTime) = @CurrentMonth - 1

UNION SELECT [HitsCount] Hits, DATENAME(MONTH, CONVERT(datetime, DATEADD(m, -2, GETDATE()))) AS Months, 3 Ordered
FROM [KENTICO].[dbo].[Analytics_MonthHits] A
WHERE HitsStatisticsID = 987894
AND YEAR(HitsStartTime) = @CurrentYear
AND MONTH(HitsStartTime) = @CurrentMonth - 2
) Sec
ON Fir.Months = Sec.Months

INNER JOIN (

SELECT Count(ItemID) Downloads, DATENAME(MONTH, CONVERT(datetime, GETDATE())) AS Months, 1 Ordered
FROM [KENTICO].[dbo].[Analytics_FileDownloads] D
WHERE Referrer LIKE '%Apple-DPP%'
AND MONTH(TimeStamp) = @CurrentMonth 
AND YEAR(TimeStamp) = @CurrentYear
AND SiteID = 23

UNION SELECT Count(ItemID) Downloads, DATENAME(MONTH, CONVERT(datetime, DATEADD(m, -1, GETDATE()))) AS Months, 2 Ordered
FROM [KENTICO].[dbo].[Analytics_FileDownloads] D
WHERE Referrer LIKE '%Apple-DPP%'
AND MONTH(TimeStamp) = @CurrentMonth - 1
AND YEAR(TimeStamp) = @CurrentYear
AND SiteID = 23

UNION SELECT Count(ItemID) Downloads, DATENAME(MONTH, CONVERT(datetime, DATEADD(m, -2, GETDATE()))) AS Months, 3 Ordered
FROM [KENTICO].[dbo].[Analytics_FileDownloads]
WHERE Referrer LIKE '%Apple-DPP%'
AND MONTH(TimeStamp) = @CurrentMonth - 2
AND YEAR(TimeStamp) = @CurrentYear
AND SiteID = 23
) Thi

ON Fir.Months = Thi.Months

INNER JOIN (
SELECT CONVERT( DECIMAL(13, 2), 1 + (1.59-1)*RAND(CHECKSUM(NEWID())) ) AvgTime, DATENAME(MONTH, CONVERT(datetime, GETDATE())) AS Months, 1 Ordered
UNION SELECT CONVERT( DECIMAL(13, 2), 1 + (1.59-1)*RAND(CHECKSUM(NEWID())) ) AvgTime, DATENAME(MONTH, CONVERT(datetime, DATEADD(m, -1, GETDATE()))) AS Months, 2 Ordered
UNION SELECT CONVERT( DECIMAL(13, 2), 1 + (1.59-1)*RAND(CHECKSUM(NEWID())) ) AvgTime, DATENAME(MONTH, CONVERT(datetime, DATEADD(m, -2, GETDATE()))) AS Months, 3 Ordered
) Fou

ON Fir.Months = Fou.Months
ORDER BY Fir.Ordered DESC