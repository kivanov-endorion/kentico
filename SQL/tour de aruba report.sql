DECLARE @CampaignID INT,
        @CustomerNumber VARCHAR(6),
		@Stage VARCHAR(12)

SET @CampaignID = 1612

SELECT *,
CAST(Gl.Berg + Gl.Sprint + ISNULL(Boxenstopp, 0) + ISNULL(Newcomer, 0) AS INT) [Total Kilometer]

FROM (
SELECT      DISTINCT  
            T.NName, 
            T.VName,
			T.branche,
			T.KDNr,
			T.firma, 
			T.email,
            T.Anmeldedat,
            T.zwv,
            CAST(T.Zielwert AS INT) Zielwert,
            CAST(SUM(ISNULL(U.GesamtUmsatz, 0)) OVER(
                PARTITION BY T.id_teilnehmer
            )AS INT) GesUm,
            IIF(SUM(ISNULL(U.GesamtUmsatz, 0)) OVER(PARTITION BY T.id_teilnehmer) < T.Zielwert,
				CAST(T.Zielwert - SUM(ISNULL(U.GesamtUmsatz, 0)) OVER(
                PARTITION BY T.id_teilnehmer
            )AS INT), 0) Rueckstand,
            --(SUM(ISNULL(U.GesamtUmsatz, 0)) OVER(
                --PARTITION BY T.id_teilnehmer ) - T.Zielwert
            --) AboveTarget,
            --FORMAT(SUM(ISNULL(U.GesamtUmsatz, 0)) OVER(
            --    PARTITION BY T.id_teilnehmer
            --) / T.Zielwert * 100, '0', 'de') Zielerfuellung,
            --((SUM(ISNULL(U.GesamtUmsatz, 0)) OVER(
              --  PARTITION BY T.id_teilnehmer
            --) / T.Zielwert * 1000)- 1000) AboveTargetKM,
			DATEDIFF(DAY, GETDATE(), T.vertrag_bis) DaysLeft,
			IIF(SUM(ISNULL(U.GesamtUmsatz, 0)) OVER(PARTITION BY T.id_teilnehmer) > T.Zielwert, 1000, 0) Berg,
            IIF(SUM(ISNULL(U.GesamtUmsatz, 0)) OVER(PARTITION BY T.id_teilnehmer) > T.Zielwert, 
				FORMAT(((SUM(ISNULL(U.GesamtUmsatz, 0)) OVER(
                PARTITION BY T.id_teilnehmer
            ) / T.Zielwert * 1000)- 1000), 'N0', 'de'), 0) Sprint,
            (SELECT DISTINCT CAST(SUM(ISNULL(K.betrag, 0)) OVER ( PARTITION BY K.kdnr) AS INT)
			FROM MARCOM.dbo.tbl_arc_konto K WHERE K.fgn_aktion = @CampaignID AND K.kdnr = T.KDNr AND buchungstyp = 'Newcomer') Newcomer,
			(SELECT DISTINCT CAST(SUM(ISNULL(K.betrag, 0)) OVER ( PARTITION BY K.kdnr) AS INT)
			FROM MARCOM.dbo.tbl_arc_konto K WHERE K.fgn_aktion = @CampaignID AND K.kdnr = T.KDNr AND buchungstyp = 'Boxenstopp') Boxenstopp
			
			
FROM         MARCOM.dbo.tbl_arc_teilnehmer T 
INNER JOIN  MARCOM.dbo.tbl_arc_aktionen A
    ON      T.fgn_aktion = A.id_aktionen
INNER JOIN  MARCOM.dbo.tbl_arc_vendor V
    ON      T.vendor = V.id_vendor
LEFT JOIN   MARCOM.dbo.tbl_arc_tln_umsatz U
    ON      U.fgn_teilnehmer = T.id_teilnehmer 

WHERE (A.id_aktionen=@CampaignID) AND getdate() BETWEEN vertrag_von AND vertrag_bis
) as Gl