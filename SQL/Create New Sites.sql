-- CREATE NEW SITE IN KENTICO

EXEC KENTICO.dbo.Usp_CMSSiteCreate
    @SiteName = 'mig2.ingrammicro.eu',
    @SiteDomain = 'mig2-ingrammicro-eu',
    @SiteDisplay = '1IM -  EMEA - CZ - Czechia (NEW)',
    @CultureCode = 'cz-CZ',
    @SkValid = 50