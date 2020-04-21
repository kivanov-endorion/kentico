function localizePrice(dDecimal) {
  return parseFloat(dDecimal).toLocaleString("{% LocalizationContext.CurrentCulture.CodeName %}", { style: "currency", currency: "{% CurrentUser.imCurrencyCd %}" })
}