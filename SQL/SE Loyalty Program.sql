/* SE LOYALTY */

SELECT      DISTINCT TOP 100 A.id_aktionen,
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
            COUNT(T.Anmeldedat) Invoices,

			K.buchungstext Voucher

FROM        MARCOM.dbo.tbl_arc_teilnehmer T 
INNER JOIN  MARCOM.dbo.tbl_arc_aktionen A
    ON      T.fgn_aktion = A.id_aktionen
INNER JOIN  MARCOM.dbo.tbl_arc_vendor V
    ON      T.vendor = V.id_vendor

LEFT JOIN   MARCOM.dbo.tbl_arc_tln_umsatz U
    ON      U.fgn_teilnehmer = T.id_teilnehmer  

LEFT JOIN MARCOM.dbo.tbl_arc_konto K
    --ON    K.fgn_teilnehmer = T.id_teilnehmer
	ON      K.kdnr = T.KDNr

WHERE       T.fgn_aktion = 1524
GROUP BY    A.id_aktionen,
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
            T.zwv,
            T.ranking,
			nextbest,
			myscore,
			peergroup,
			zielwert,
			verguetung,
			zielwert2,
			verguetung2,
			pkt_anzahl,
			gesamtumsatz,
			ergebnis,

			K.buchungstext
			