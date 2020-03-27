/* instead of PUBLISHED = 1 */
SELECT * 
FROM View_CMS_Tree_Joined
WHERE DocumentCanBePublished = 1 
AND GETDATE() BETWEEN ISNULL(DocumentPublishFrom, GETDATE()) 
AND ISNULL(DocumentPublishTo, GETDATE())


-- FROM View_OneIM_News_Joined
(
    SELECT * 
    FROM View_CMS_Tree_Joined INNER JOIN oneIM_News ON View_CMS_Tree_Joined.DocumentForeignKeyValue = oneIM_News.NewsID
    WHERE (ClassName = 'OneIM.News')
) AS View_OneIM_News_Joined

--FROM View_EU_Starter_Event_Joined
(
    SELECT * 
    FROM View_CMS_Tree_Joined INNER JOIN EU_Starter_Event ON View_CMS_Tree_Joined.DocumentForeignKeyValue = EU_Starter_Event.EventID
    WHERE (ClassName = 'OneIM.Event')
) AS View_EU_Starter_Event_Joined

-- FROM View_BLXBE_Article_Joined
(
    SELECT * 
    FROM View_CMS_Tree_Joined INNER JOIN BLXBE_Article ON View_CMS_Tree_Joined.DocumentForeignKeyValue = BLXBE_Article.BEArticleID
    WHERE (ClassName = 'BLXCSBE.BEArticle')
) AS View_BLXBE_Article_Joined

-- FROM KENTICO.dbo.View_DE_VendorPortale_Joined
(
    SELECT * 
    FROM View_CMS_Tree_Joined INNER JOIN KENTICO.dbo.DE_VendorPortale ON View_CMS_Tree_Joined.DocumentForeignKeyValue = KENTICO.dbo.DE_VendorPortale.VendorPortaleID
    WHERE (ClassName = 'DE.VendorPortale')
) AS View_DE_VendorPortale_Joined

--View_oneIM_Loyaltyprogram_Joined
(
    SELECT * 
    FROM View_CMS_Tree_Joined INNER JOIN oneIM_Loyaltyprogram ON View_CMS_Tree_Joined.DocumentForeignKeyValue = oneIM_Loyaltyprogram.LoyaltyprogramID
    WHERE (ClassName = 'OneIM.Loyaltyprogram')
) AS View_oneIM_Loyaltyprogram_Joined

-- FROM View_BE_Event_Joined
(
    SELECT * 
    FROM View_CMS_Tree_Joined INNER JOIN BE_Event ON View_CMS_Tree_Joined.DocumentForeignKeyValue = KENTICO.dbo.BE_Event.EventID
    WHERE (ClassName = 'BE.Event')
) AS View_BE_Event_Joined

-- FROM View_custom_ArticleBLX_Joined
(
    SELECT * 
    FROM View_CMS_Tree_Joined INNER JOIN custom_ArticleBLX ON View_CMS_Tree_Joined.DocumentForeignKeyValue = custom_ArticleBLX.BLXArticleID
    WHERE (ClassName = 'BLX.Article')
) AS View_custom_ArticleBLX_Joined

-- FROM View_BookingSystem_Joined
(
    SELECT * 
    FROM View_CMS_Tree_Joined INNER JOIN custom_ArticleBLX ON View_CMS_Tree_Joined.DocumentForeignKeyValue = custom_ArticleBLX.BLXArticleID
    WHERE (ClassName = 'BLX.Article')
) AS View_BookingSystem_Joined

-- View_RS_Event_Joined
(
    SELECT * 
    FROM View_CMS_Tree_Joined INNER JOIN RS_Event ON View_CMS_Tree_Joined.DocumentForeignKeyValue = RS_Event.EventID
    WHERE (ClassName = 'RS.Event')
) AS View_RS_Event_Joined

-- view_proav_vendors_joined
(
    SELECT * 
    FROM View_CMS_Tree_Joined INNER JOIN proav_vendors ON View_CMS_Tree_Joined.DocumentForeignKeyValue = proav_vendors.VendorsID
) AS view_proav_vendors_joined

-- view_eu_country_joined
(
    SELECT * 
    FROM View_CMS_Tree_Joined INNER JOIN eu_country ON View_CMS_Tree_Joined.DocumentForeignKeyValue = eu_country.CountryID
    WHERE (ClassName = 'EU.country')
) AS view_eu_country_joined

-- View_oneIM_PressRelease_Joined
(
    SELECT * 
    FROM View_CMS_Tree_Joined INNER JOIN oneIM_PressRelease ON View_CMS_Tree_Joined.DocumentForeignKeyValue = oneIM_PressRelease.PressReleaseID
    WHERE (ClassName = 'oneIM.PressRelease')
) AS View_oneIM_PressRelease_Joined

-- View_oneIM_Campaign_Joined
(
    SELECT * 
    FROM View_CMS_Tree_Joined INNER JOIN oneIM_Campaign ON View_CMS_Tree_Joined.DocumentForeignKeyValue = oneIM_Campaign.CampaignID
    WHERE (ClassName = 'oneIM.Campaign')
) AS View_oneIM_Campaign_Joined