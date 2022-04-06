/* SE LOYALTY */

DECLARE @CurrencyIndex DECIMAL(4,2) = 10.36,
@ProgramID INT,
@CustomerNbr NVARCHAR(6)

SET @ProgramID = 1524
SET @CustomerNbr = '000099'

SELECT      DISTINCT A.id_aktionen,
            A.aktions_name,
            A.aktion_von,
            A.aktion_bis,
            V.vendor_name,
            T.id_teilnehmer,
            T.NName, 
            T.VName,
            T.Anmeldedat,
            T.Vertrag_von,
            T.Vertrag_bis,
            T.vendor,
            FORMAT(T.Zielwert, 'C0', 'sv-SE') Zielwert,
            FORMAT(SUM(ISNULL(U.GesamtUmsatz, 0)) OVER(
                PARTITION BY T.id_teilnehmer
            ), 'C0', 'sv-SE') GesUm,

            FORMAT(T.Zielwert - SUM(ISNULL(U.GesamtUmsatz, 0)) OVER(
                PARTITION BY T.id_teilnehmer
            ), 'C0', 'sv-SE') Rueckstand,
            FORMAT(SUM(ISNULL(U.GesamtUmsatz, 0)) OVER(
                PARTITION BY T.id_teilnehmer
            ) / T.Zielwert, 'P', 'sv-SE') Zielerfuellung,
            DATEDIFF(DAY, GETDATE(), T.vertrag_bis) DaysLeft,
			COUNT(T.Anmeldedat) OVER(
                PARTITION BY T.id_teilnehmer
            ) Invoices,
			U.datum,

			(SELECT buchungstext
				FROM MARCOM.dbo.tbl_arc_konto
				WHERE fgn_aktion = @ProgramID
				AND MONTH(datum) = MONTH(U.datum)
			) Voucher

FROM        MARCOM.dbo.tbl_arc_teilnehmer T 
INNER JOIN  MARCOM.dbo.tbl_arc_aktionen A
    ON      T.fgn_aktion = A.id_aktionen
INNER JOIN  MARCOM.dbo.tbl_arc_vendor V
    ON      T.vendor = V.id_vendor

LEFT JOIN   MARCOM.dbo.tbl_arc_tln_umsatz U
    ON      U.fgn_teilnehmer = T.id_teilnehmer  

LEFT JOIN	MARCOM.dbo.tbl_arc_konto K
    --ON    K.fgn_teilnehmer = T.id_teilnehmer
	ON      K.kdnr = T.KDNr

WHERE       MONTH(U.datum) = MONTH(GETDATE())
AND			(T.KDNr = @CustomerNbr) AND (A.id_aktionen= @ProgramID)
GROUP BY    DATEADD(MONTH, DATEDIFF(MONTH, 0, K.datum), 0),
			A.id_aktionen,
            A.aktions_name,
            A.aktion_von,
            A.aktion_bis,
            V.vendor_name,
            T.id_teilnehmer,
            T.NName, 
            T.VName,
            T.Anmeldedat,
            T.Vertrag_von,
            T.Vertrag_bis,
            T.vendor,
            zielwert,
			gesamtumsatz,
			U.datum,

			K.buchungstext