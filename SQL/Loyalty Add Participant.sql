SELECT *
FROM [MARCOM].[dbo].[tbl_arc_teilnehmer]
WHERE fgn_aktion = 1568
AND KDNr = '869821'

SELECT *
FROM [MARCOM].[dbo].[tbl_arc_teilnehmer]
WHERE KDNr = '869821'

DELETE FROM [MARCOM].[dbo].[tbl_arc_teilnehmer]
WHERE id_teilnehmer = 472530

INSERT INTO [MARCOM].[dbo].[tbl_arc_teilnehmer] (CCd, branche, KDNr, firma, anmeldedat, fgn_aktion, vendor, vertrag_von, vertrag_bis, zielwert)
VALUES ('DE', 44, '869821', 'BITS', GETDATE(), 1568, 2036, DATEFROMPARTS(2023, 5, 1), DATEFROMPARTS(2023, 7, 31), 250)

INSERT INTO [MARCOM].[dbo].[tbl_arc_vendor_nbr] (fgn_vendor, strVendorNbr, BoostFactor, SK_Vend)
SELECT 2057, strVendorNbr, BoostFactor, SK_Vend
FROM [MARCOM].[dbo].[tbl_arc_vendor_nbr]
WHERE fgn_vendor = 2052

UPDATE [MARCOM].[dbo].[tbl_arc_teilnehmer]
SET zielwert = 250, verguetung = 1
WHERE fgn_aktion = 1568

--ADD SKUs TO PROGRAM:
INSERT INTO [MARCOM].[dbo].[tbl_arc_aktionsartikel] 
(fgn_aktionen, fgn_hersteller, gueltig_von, gueltig_bis, sku, createdate)
VALUES 
(1567, 2035, DATEFROMPARTS(2023, 5, 1), DATEFROMPARTS(2023, 7, 31), 'XXXXXX', GETDATE()),
(1567, 2035, DATEFROMPARTS(2023, 5, 1), DATEFROMPARTS(2023, 7, 31), 'XXXXXX', GETDATE())


  INSERT INTO [MARCOM].[dbo].[tbl_arc_konto]  (
	   [ccd]
      ,[branch]
      ,[kdnr]
      ,[fgn_teilnehmer]
      ,[buchungstyp]
      ,[buchungstext]
      ,[betrag]
      ,[fgn_aktion]
      ,[datum])
VALUES ('DE', '44', '459998', 475121, 'Gutschrift', 'Quiz Daily', 2, 1585, GETDATE() )