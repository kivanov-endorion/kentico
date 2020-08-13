// GSTRegistrationNumber
{% (GSTRegistered.Value.Contains("No")) ? "n/a" : "" #%}

// RecommendedBy
{% (HowDoYouKnowIngramMicro.Value.Contains("callcenter") || HowDoYouKnowIngramMicro.Value.Contains("email")) ? "n/a" : "" %}

// BusinessProfileOther
{% BusinessProfile.Value.Contains("Retail") || BusinessProfile.Value.Contains("SMB") || BusinessProfile.Value.Contains("SI") || BusinessProfile.Value.Contains("ISV") || BusinessProfile.Value.Contains("Supplies") || BusinessProfile.Value.Contains("OEM") || BusinessProfile.Value.Contains("Vendor")) ? "" : "n/a" #%}

// SolutionsAndApplication
{% BusinessProfile.Value.Contains("Retail") || BusinessProfile.Value.Contains("Supplies") || BusinessProfile.Value.Contains("OEM") || BusinessProfile.Value.Contains("Vendor")) ? "" : "n/a" #%}

// EndMarketOthers
{% (BusinessProfile.Value.Contains("Consumer") || BusinessProfile.Value.Contains("SMB") || BusinessProfile.Value.Contains("Government") || BusinessProfile.Value.Contains("Commercial") || BusinessProfile.Value.Contains("Supplies/OEM")) ? "n/a" : "" %}

// RelatedCompanies, OwnersShareholders, Directors
{%  IfCompare(CountryOfIncorporation.Value, "Singapore", "n/a", "") #%}

// Currency, CreditLineRequested, CreditTerm
{% (RequestingCreditTerm.Value.Contains("No")) ? "n/a" : "" %}

// CaseNumber, ClaimantName, DateProceedingsCommenced, CaseDesciption
{% (PendingCourtCase.Value.Contains("No")) ? "n/a" : "" %}

// IMContactName, IMContactEmail
{% (IngramMicroContact.Value.Contains("No")) ? "n/a" : "" %}