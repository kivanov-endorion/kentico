USE KENTICO
GO

DECLARE
    @Count  INT = -1,
    @SiteId INT = 0

IF @SiteId = 0
BEGIN
    SELECT      'Assign a valid SiteID to the @SiteId variable! Use following SELECT to find it:'
    SELECT      *
    FROM        KENTICO.dbo.CMS_Site (NOLOCK)
    ORDER BY    SiteDisplayName
    RETURN
END

WHILE @Count != 0
BEGIN
    DELETE      TOP (10000) FROM D
    FROM        dbo.Analytics_FileDownloads D (NOLOCK)
    WHERE       SiteID = @SiteId

    SET @Count = @@ROWCOUNT
END

SET @Count = -1
WHILE @Count != 0
BEGIN
    DELETE      TOP (10000) FROM D
    FROM        dbo.Analytics_YearHits D (NOLOCK)
    INNER JOIN  dbo.Analytics_Statistics S (NOLOCK)
        ON      D.HitsStatisticsID = S.StatisticsID
    WHERE       S.StatisticsSiteID = @SiteId

    SET @Count = @@ROWCOUNT
END

SET @Count = -1
WHILE @Count != 0
BEGIN
    DELETE      TOP (10000) FROM D
    FROM        dbo.Analytics_MonthHits D (NOLOCK)
    INNER JOIN  dbo.Analytics_Statistics S (NOLOCK)
        ON      D.HitsStatisticsID = S.StatisticsID
    WHERE       S.StatisticsSiteID = @SiteId

    SET @Count = @@ROWCOUNT
END

SET @Count = -1
WHILE @Count != 0
BEGIN
    DELETE      TOP (10000) FROM D
    FROM        dbo.Analytics_WeekHits D (NOLOCK)
    INNER JOIN  dbo.Analytics_Statistics S (NOLOCK)
        ON      D.HitsStatisticsID = S.StatisticsID
    WHERE       S.StatisticsSiteID = @SiteId

    SET @Count = @@ROWCOUNT
END

SET @Count = -1
WHILE @Count != 0
BEGIN
    DELETE      TOP (10000) FROM D
    FROM        dbo.Analytics_DayHits D (NOLOCK)
    INNER JOIN  dbo.Analytics_Statistics S (NOLOCK)
        ON      D.HitsStatisticsID = S.StatisticsID
    WHERE       S.StatisticsSiteID = @SiteId

    SET @Count = @@ROWCOUNT
END

SET @Count = -1
WHILE @Count != 0
BEGIN
    DELETE      TOP (10000) FROM D
    FROM        dbo.Analytics_HourHits D (NOLOCK)
    INNER JOIN  dbo.Analytics_Statistics S (NOLOCK)
        ON      D.HitsStatisticsID = S.StatisticsID
    WHERE       S.StatisticsSiteID = @SiteId

    SET @Count = @@ROWCOUNT
END

SET @Count = -1
WHILE @Count != 0
BEGIN
    DELETE      TOP (10000) FROM S
    FROM        dbo.Analytics_Statistics S (NOLOCK)
    WHERE       S.StatisticsSiteID = @SiteId

    SET @Count = @@ROWCOUNT
END
