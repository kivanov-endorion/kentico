use MARCOM
DECLARE @ID INT = 0,
        @TOPN INT = 0

SET @TOPN = 10
SET @ID=456

##WHERE##

SELECT TOP(@TOPN) FORMAT(anmeldedat, 'yyyy-MM-dd') as Day, COUNT(DISTINCT SK_Cust) Cnt,
sum(COUNT(DISTINCT SK_Cust)) over (order by FORMAT(anmeldedat, 'yyyy-MM-dd') rows unbounded preceding) as CumulativeTotal 
FROM MARCOM.dbo.tbl_arc_teilnehmer PAX WITH (NOLOCK) 
WHERE fgn_aktion=@ID
GROUP by FORMAT(anmeldedat, 'yyyy-MM-dd')
Order by FORMAT(anmeldedat, 'yyyy-MM-dd') desc





use MARCOM
DECLARE @ID INT = 0

--SET @ID=456
##WHERE##

SELECT COUNT(DISTINCT TN.SK_CUST) CNT, 'Registered CustNbr' as Label, 1 as [Order]
FROM tbl_arc_teilnehmer TN WITH (NOLOCK)
WHERE fgn_aktion=@ID

	 
-- Excluded Customer
UNION SELECT COUNT(DISTINCT B1.CUST_NBR) CNT, 'Excluded CustNbr' as Label, 32 as [Order]  
FROM tbl_arc_basis B1  WITH (NOLOCK)
WHERE status = 'exclused' AND fgn_aktion=@ID
	 
-- Qualified Customer
UNION SELECT  COUNT(DISTINCT B2.CUST_NBR) CNT, 'Qualified CustNbr' as Label, 2 as [Order] 
FROM tbl_arc_basis B2  WITH (NOLOCK)
WHERE  status = 'qualified' AND fgn_aktion=@ID

Order by [Order] 



SELECT ##TOPN## *,
COUNT(CUST_NBR) OVER (
  PARTITION BY CUST_NBR
) AS CNT 
FROM MARCOM.dbo.tbl_arc_basis
WHERE ##WHERE##
ORDER by ##ORDERBY##




DECLARE    @ProgramId VARCHAR(255)

##WHERE##

SELECT      DISTINCT  A.id_aktionen,
            A.aktions_name,
            A.aktion_von,
            A.aktion_bis,
            V.vendor_name,
            T.id_teilnehmer,
            T.NName, 
            T.VName,
			T.branche,
			T.KDNr,
			T.firma, 
			T.email,
			KU.FullName, 
			KU.UserName,
            T.Anmeldedat,
            T.Vertrag_von,
            T.Vertrag_bis,
            T.vendor,
            T.zwv,
            T.ranking, 
            FORMAT(T.nextbest, '0', 'de') nextbest, 
            T.myscore,
            T.PeerGroup,
            FORMAT(T.Zielwert, '0', 'de') Zielwert,
            FORMAT(T.Verguetung, '0', 'de') Verguetung,
            FORMAT(T.Zielwert2, '0', 'de') Zielwert2,
            FORMAT(T.Verguetung2, '0', 'de') Verguetung2,
            FORMAT(SUM(ISNULL(U.pkt_anzahl, 0)) OVER(
                PARTITION BY T.id_teilnehmer
            ), '0', 'de') pkt_anzahl,
            FORMAT(SUM(ISNULL(U.GesamtUmsatz, 0)) OVER(
                PARTITION BY T.id_teilnehmer
            ), '0', 'de') GesUm,
            FORMAT(T.Zielwert - SUM(ISNULL(U.GesamtUmsatz, 0)) OVER(
                PARTITION BY T.id_teilnehmer
            ), '0', 'de') Rueckstand,
            FORMAT(T.Zielwert2 - SUM(ISNULL(U.GesamtUmsatz, 0)) OVER(
                PARTITION BY T.id_teilnehmer
            ), '0', 'de') Rueckstand2,
            FORMAT(SUM(ISNULL(U.GesamtUmsatz, 0)) OVER(
                PARTITION BY T.id_teilnehmer
            ) / T.Zielwert * 100, '0', 'de') Zielerfuellung,
            DATEDIFF(DAY, GETDATE(), T.vertrag_bis) DaysLeft,
			Atc.PageViews,
			Atc.LastVisit

FROM         MARCOM.dbo.tbl_arc_teilnehmer T 
INNER JOIN  MARCOM.dbo.tbl_arc_aktionen A
    ON      T.fgn_aktion = A.id_aktionen
INNER JOIN  MARCOM.dbo.tbl_arc_vendor V
    ON      T.vendor = V.id_vendor

LEFT JOIN   MARCOM.dbo.tbl_arc_tln_umsatz U
    ON      U.fgn_teilnehmer = T.id_teilnehmer  
LEFT JOIN (
		SELECT paxID, COUNT(L.id) PageViews, MAX(L.datum) as LastVisit 
        FROM MARCOM.dbo.tbl_arc_log L
		GROUP by paxid
		) Atc  ON Atc.paxID = T.id_teilnehmer
LEFT JOIN KENTICO.dbo.CMS_User KU With (NOLOCK) ON T.UserID = KU.UserID

WHERE  T.fgn_aktion = @ProgramId


ORDER BY  T.id_teilnehmer


-- LOYALTY + QUIZ


use MARCOM
DECLARE @UserID Int,
    @Campaign Int
--SET @UserID=265 -- Alex T
SET @UserID=219 -- me dash
--SET @UserID=207 -- me dot
SET @Campaign=1585
--##WHERE##
SELECT *  FROM tbl_arc_tagesfrage_antwort where id in(
--DELETE FROM tbl_arc_tagesfrage_antwort where id in(
SELECT TA.ID from tbl_arc_tagesfrage_antwort TA
INNER JOIN tbl_arc_tagesfrage TF on TA.fgn_frage=TF.id
WHERE TF.fgn_aktion=@Campaign
--AND TA.UserID=@UserID 
)

SELECT @@ROWCOUNT as result