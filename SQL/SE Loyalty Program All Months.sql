/* SE LOYALTY */

DECLARE @CurrencyRate DECIMAL(4,2),
		@ProgramCurrency NVARCHAR(3),
		@UserCurrency NVARCHAR(3), 
		@Culture NVARCHAR(5),
		
		@ProgramID INT,
		@CustomerNbr NVARCHAR(6),
		@SK_Cust NVARCHAR(10),
		@SK_Valid INT

/* SET VALUES IN KENTICO WITH ##WHERE## */
SET @ProgramID = 1524  --{% CurrentDocument.ProgramID #%}
SET @CustomerNbr = '000099'  --{% CurrentUser.imCustomerNbr #%}
SET @SK_Cust = '407259'  --{% CurrentUser.imSK_Cust %}
SET @SK_Valid = 17  --{% Settings.SK_VALID %}

--SET @ProgramID = 1527
/* Default DE values:*/
--SET @CustomerNbr = '459998'
--SET @SK_Cust = '75089'
--SET @SK_Valid = 5


/* PREPARE CURRENCY CONVERSION */
SET @UserCurrency = (
	SELECT CurrencyCd FROM [OIS_CUSTOMER].[dbo].[Tbl_Customer]
	WHERE SK_Cust = @SK_Cust
	)
(SELECT @ProgramCurrency = CurrencyCd, @Culture = DefaultCulture FROM [OIS_ADMINISTRATION].[dbo].[Tbl_Company]
WHERE SK_Valid = @SK_Valid)

SET @CurrencyRate = (
	SELECT Rate
	FROM [OIS_ADMINISTRATION].[dbo].[Tbl_Currency] 
	WHERE Source = @UserCurrency AND Destination = @ProgramCurrency
	)

SELECT DISTINCT --##TOPN##
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

            FORMAT(T.Zielwert, 'C0', @Culture) Goal,
			FORMAT(SUM(ISNULL(U.GesamtUmsatz, 0)) OVER(
                PARTITION BY T.id_teilnehmer, MONTH(U.datum)
            ), 'C0', @Culture) Total,

			FORMAT(SUM(ISNULL(U.GesamtUmsatz, 0) * @CurrencyRate) OVER(
                PARTITION BY T.id_teilnehmer, MONTH(U.datum)
            ), 'C0', @Culture) TotalConverted,

            FORMAT(T.Zielwert - SUM(ISNULL(U.GesamtUmsatz, 0)) OVER(
                PARTITION BY T.id_teilnehmer, MONTH(U.datum)
            ), 'C0', @Culture) Remaining,
            FORMAT(SUM(ISNULL(U.GesamtUmsatz, 0)) OVER(
                PARTITION BY T.id_teilnehmer, MONTH(U.datum)
            ) / T.Zielwert, 'P', @Culture) Percentage,
            DATEDIFF(DAY, GETDATE(), T.vertrag_bis) DaysLeft,
			COUNT(U.datum) OVER(
                PARTITION BY T.id_teilnehmer, MONTH(U.datum)
            ) Invoices,
			U.datum InvoiceDate,

			MONTH(U.datum) 'Month',

            COUNT(U.datum) OVER(
                PARTITION BY T.id_teilnehmer, DATEPART(QUARTER, U.datum)
            ) InvoicesPerQuarter,

			(SELECT buchungstext
				FROM MARCOM.dbo.tbl_arc_konto
				WHERE fgn_aktion = @ProgramID
				AND kdnr = @CustomerNbr
				AND MONTH(DATEADD(MONTH, 1, datum)) = MONTH(U.datum) /* TODO: CHANGE 1 to -1 */
			) Voucher,

			@Culture Culture,
			@UserCurrency Currency

FROM        MARCOM.dbo.tbl_arc_teilnehmer T 
INNER JOIN  MARCOM.dbo.tbl_arc_aktionen A
    ON      T.fgn_aktion = A.id_aktionen
INNER JOIN  MARCOM.dbo.tbl_arc_vendor V
    ON      T.vendor = V.id_vendor

LEFT JOIN   MARCOM.dbo.tbl_arc_tln_umsatz U
    ON      U.fgn_teilnehmer = T.id_teilnehmer  

LEFT JOIN	MARCOM.dbo.tbl_arc_konto K
    ON    K.fgn_teilnehmer = T.id_teilnehmer
	--ON      K.kdnr = T.KDNr


WHERE        A.id_aktionen = @ProgramID
AND			T.KDNr = @CustomerNbr /* Comment out for the report */
--AND			U.datum IS NOT NULL /* For the report */
			

GROUP BY    U.datum,
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

			K.buchungstext

ORDER BY U.datum DESC