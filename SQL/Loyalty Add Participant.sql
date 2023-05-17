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

UPDATE [MARCOM].[dbo].[tbl_arc_teilnehmer]
SET zielwert = 250, verguetung = 1
WHERE fgn_aktion = 1568