DECLARE @CurrentMonth INT
DECLARE @CurrentYear INT
DECLARE @StatsID INT
DECLARE @SiteID INT

SET @CurrentMonth = MONTH(GETDATE())
SET @CurrentYear = YEAR(GETDATE())
SET @StatsID = 987894
SET @SiteID = 23

SELECT Fir.Months, Total 'Total number of partners registered', CNT 'Number of new partners registered:', Hits 'Number of page views:',  AvgTime 'Average time on site:', Downloads 'Number of downloads:' FROM (

SELECT Count(AppleDppID) CNT, DATENAME(MONTH, DATEFROMPARTS(@CurrentYear,@CurrentMonth,'01')) AS Months, 1 Ordered
FROM [KENTICO].[dbo].[Form_fr_ingrammicro_eu_Apple_DPP] F
WHERE MONTH(FormInserted) = @CurrentMonth 
AND YEAR(FormInserted) = @CurrentYear


UNION SELECT Count(AppleDppID) CNT, DATENAME(MONTH, DATEFROMPARTS(@CurrentYear,(@CurrentMonth - 1),'01')) AS Months, 2 Ordered
FROM [KENTICO].[dbo].[Form_fr_ingrammicro_eu_Apple_DPP] F
WHERE MONTH(FormInserted) = @CurrentMonth - 1
AND YEAR(FormInserted) = @CurrentYear

UNION SELECT Count(AppleDppID) CNT, DATENAME(MONTH, DATEFROMPARTS(@CurrentYear,(@CurrentMonth - 2),'01')) AS Months, 3 Ordered
FROM [KENTICO].[dbo].[Form_fr_ingrammicro_eu_Apple_DPP] F
WHERE MONTH(FormInserted) = @CurrentMonth - 2
AND YEAR(FormInserted) = @CurrentYear
) Fir

INNER JOIN (
SELECT Count(AppleDppID) Total, DATENAME(MONTH, DATEFROMPARTS(@CurrentYear,@CurrentMonth,'01')) AS Months, 1 Ordered
FROM [KENTICO].[dbo].[Form_fr_ingrammicro_eu_Apple_DPP] F
WHERE FormInserted <= DATEFROMPARTS(@CurrentYear,@CurrentMonth,'01')


UNION SELECT Count(AppleDppID) Total, DATENAME(MONTH, DATEFROMPARTS(@CurrentYear,(@CurrentMonth - 1),'01')) AS Months, 2 Ordered
FROM [KENTICO].[dbo].[Form_fr_ingrammicro_eu_Apple_DPP] F
WHERE FormInserted <= DATEFROMPARTS(@CurrentYear,(@CurrentMonth - 1),'01')

UNION SELECT Count(AppleDppID) Total, DATENAME(MONTH, DATEFROMPARTS(@CurrentYear,(@CurrentMonth - 2),'01')) AS Months, 3 Ordered
FROM [KENTICO].[dbo].[Form_fr_ingrammicro_eu_Apple_DPP] F
WHERE FormInserted <= DATEFROMPARTS(@CurrentYear,(@CurrentMonth - 2),'01')

) Fir2
ON Fir.Months = Fir2.Months

INNER JOIN (
SELECT [HitsCount] Hits, DATENAME(MONTH, DATEFROMPARTS(@CurrentYear,@CurrentMonth,'01')) AS Months, 1 Ordered
FROM [KENTICO].[dbo].[Analytics_MonthHits] A
WHERE HitsStatisticsID = @StatsID
AND YEAR(HitsStartTime) = @CurrentYear
AND MONTH(HitsStartTime) = @CurrentMonth

UNION SELECT [HitsCount] Hits, DATENAME(MONTH, DATEFROMPARTS(@CurrentYear,(@CurrentMonth - 1),'01')) AS Months, 2 Ordered
FROM [KENTICO].[dbo].[Analytics_MonthHits] A
WHERE HitsStatisticsID = @StatsID
AND YEAR(HitsStartTime) = @CurrentYear
AND MONTH(HitsStartTime) = @CurrentMonth - 1

UNION SELECT [HitsCount] Hits, DATENAME(MONTH, DATEFROMPARTS(@CurrentYear,(@CurrentMonth - 2),'01')) AS Months, 3 Ordered
FROM [KENTICO].[dbo].[Analytics_MonthHits] A
WHERE HitsStatisticsID = @StatsID
AND YEAR(HitsStartTime) = @CurrentYear
AND MONTH(HitsStartTime) = @CurrentMonth - 2
) Sec
ON Fir.Months = Sec.Months

INNER JOIN (

SELECT Count(ItemID) Downloads, DATENAME(MONTH, DATEFROMPARTS(@CurrentYear,@CurrentMonth,'01')) AS Months, 1 Ordered
FROM [KENTICO].[dbo].[Analytics_FileDownloads] D
WHERE Referrer LIKE '%Apple-DPP%'
AND MONTH(TimeStamp) = @CurrentMonth 
AND YEAR(TimeStamp) = @CurrentYear
AND SiteID = @SiteID

UNION SELECT Count(ItemID) Downloads, DATENAME(MONTH, DATEFROMPARTS(@CurrentYear,(@CurrentMonth - 1),'01')) AS Months, 2 Ordered
FROM [KENTICO].[dbo].[Analytics_FileDownloads] D
WHERE Referrer LIKE '%Apple-DPP%'
AND MONTH(TimeStamp) = @CurrentMonth - 1
AND YEAR(TimeStamp) = @CurrentYear
AND SiteID = @SiteID

UNION SELECT Count(ItemID) Downloads, DATENAME(MONTH, DATEFROMPARTS(@CurrentYear,(@CurrentMonth - 2),'01')) AS Months, 3 Ordered
FROM [KENTICO].[dbo].[Analytics_FileDownloads]
WHERE Referrer LIKE '%Apple-DPP%'
AND MONTH(TimeStamp) = @CurrentMonth - 2
AND YEAR(TimeStamp) = @CurrentYear
AND SiteID = @SiteID
) Thi

ON Fir.Months = Thi.Months

INNER JOIN (
SELECT ISNULL(CONVERT(VARCHAR, DATEADD(s, 
(SELECT SUM(HitsValue)/SUM(HitsCount)
FROM Analytics_HourHits JOIN
      Analytics_Statistics ON HitsStatisticsID = StatisticsID
      WHERE 
	  HitsStartTime >= DATEFROMPARTS(@CurrentYear,@CurrentMonth,'01') AND HitsEndTime <= GETDATE() AND 
	  StatisticsObjectID = 90036 AND
	  StatisticsCode ='avgtimeonpage' AND
	  StatisticsSiteID = 23)
, 0), 108),'00:00:00') AvgTime, DATENAME(MONTH, DATEFROMPARTS(@CurrentYear,@CurrentMonth,'01')) AS Months, 1 Ordered

UNION SELECT ISNULL(CONVERT(VARCHAR, DATEADD(s, 
(SELECT SUM(HitsValue)/SUM(HitsCount)
FROM Analytics_HourHits JOIN
      Analytics_Statistics ON HitsStatisticsID = StatisticsID
      WHERE 
	  HitsStartTime >= DATEFROMPARTS(@CurrentYear,(@CurrentMonth - 1),'01') AND HitsEndTime <= GETDATE() AND 
	  StatisticsObjectID = 90036 AND
	  StatisticsCode ='avgtimeonpage' AND
	  StatisticsSiteID = 23)
, 0), 108),'00:00:00') AvgTime, DATENAME(MONTH, DATEFROMPARTS(@CurrentYear,(@CurrentMonth - 1),'01')) AS Months, 22 Ordered

UNION SELECT ISNULL(CONVERT(VARCHAR, DATEADD(s, 
(SELECT SUM(HitsValue)/SUM(HitsCount)
FROM Analytics_HourHits JOIN
      Analytics_Statistics ON HitsStatisticsID = StatisticsID
      WHERE 
	  HitsStartTime >= DATEFROMPARTS(@CurrentYear,(@CurrentMonth - 2),'01') AND HitsEndTime <= GETDATE() AND 
	  StatisticsObjectID = 90036 AND
	  StatisticsCode ='avgtimeonpage' AND
	  StatisticsSiteID = 23)
, 0), 108),'00:00:00') AvgTime, DATENAME(MONTH, DATEFROMPARTS(@CurrentYear,(@CurrentMonth - 2),'01')) AS Months, 3 Ordered
) Fou

ON Fir.Months = Fou.Months
ORDER BY Fir.Ordered DESC 