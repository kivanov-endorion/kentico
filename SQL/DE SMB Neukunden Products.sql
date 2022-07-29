WITH CTE AS (
	SELECT DISTINCT
            ROW_NUMBER() OVER(PARTITION BY CONCAT(PF.ContentManufacturer, PF.CatalogID) ORDER BY PF.PriceDealer DESC) AS RowNumber
            ,PF.SKU
            ,C.CatalogID
            ,PF.ContentManufacturer
            ,PF.SK_Vend
			,C.Group1
            ,PF.PriceDealer
			,PF.Description1
			,PF.Description2
			,PF.ContentPicture
			,CASE
			WHEN C.Group1 IN('Displays','Printer/Copier/Fax','Consumables') THEN C.Group1
			ELSE C.Group2
			END AS Category
      FROM	OIS_PRODUCT.dbo.Tbl_Product_Full PF (NOLOCK)
	  LEFT JOIN OIS_PRODUCT.dbo.Tbl_Catalog_Full C (NOLOCK)
	  ON PF.CatalogId = C.CatalogId
      WHERE C.SK_Valid=5
	  AND   PF.FlagRestricted IN ('', 'N')
	  AND	ContentPicture IS NOT NULL
	  AND	(
			Group1 IN('Displays','Printer/Copier/Fax','Consumables')
			OR Group2 IN ('Desktop / Tower','Server','Notebook')
			)
	  AND	ContentManufacturer IN (
			'Acer',
			'Apple',
			'Brother',
			'Canon',
			'Cisco',
			'Dell EMC',
			'Fujitsu',
			'HP Inc.',
			'Iiyama',
			'Kyocera',
			'Lenovo',
			'Lexmark',
			'Microsoft',
			'Samsung',
			'Tandberg Data',
			'V7',
			'Xerox'
			)
      )

SELECT		SKU, Description1, Description2, ContentPicture, LOWER(ContentManufacturer), Category
FROM		CTE
WHERE		RowNumber <= 2
ORDER BY	CatalogId, ContentManufacturer


SELECT      *
FROM        dbo.Vw_ProductsOnline
WHERE       SK_Valid = 5
    AND     FlagClass = 'A'
    AND     AvailQty != 0
    AND     FlagRestricted IN ('', ' ', 'N')
ORDER BY    CatalogId
