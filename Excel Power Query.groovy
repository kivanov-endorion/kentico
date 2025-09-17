

if [Platform] = "Global" & [Type] = "Page" then [SLA.LOE] + 1


if [Type] = "Page" then [LOE] + 1
else if [Type] = "Resource" then [LOE] + 1
else if [Platform] = "Global" then [LOE] + 1
else [LOE]

 else if Text.Contains([Type], "UAC", Comparer.OrdinalIgnoreCase)

PlannedDuration
= Duration.Days([Due] - [Created])
= Duration.Days([Closed] - [Created])


if [Due] < [Created] then Date.AddDays([Created], 10) else [Due]


GLMS5639
https://podio.com/ingrammicrocom/e-global/apps/milestones/items/5639

REQ3561320
https://ingrammicro.service-now.com/nav_to.do?uri=sc_request.do?sys_id=REQ3561320

6827636b0002325ecd76d9ff24f7801d
https://experience.adobe.com/#/@ingrammicro/so:ingrammicro-Production/workfront/task/6827636b0002325ecd76d9ff24f7801d

XDMK-6863
https://imonline.atlassian.net/jira/software/c/projects/XDMK/issues/XDMK-6863



= Table.ReplaceValue(
    #"Replaced Value Status",
    each [Type],
    each if Text.Contains([Type], "Modify") then "Update"
         else if Text.Contains([Type], "Remove") then "Update"
         else if Text.Contains([Type], "page", Comparer.OrdinalIgnoreCase) then "Page"
         else if Text.Contains([Type], "New") then "Page"
         else if Text.Contains([Type], "Loyalty", Comparer.OrdinalIgnoreCase) then "Loyalty"
         else if Text.Contains([Type], "Other") then "Support"
         else if Text.Contains([Type], "Support", Comparer.OrdinalIgnoreCase) then "Support"
         else if Text.Contains([Type], "Site admin", Comparer.OrdinalIgnoreCase) then "Support"
         else if Text.Contains([Type], "access", Comparer.OrdinalIgnoreCase) then "User access"
         else if Text.Contains([Type], "user", Comparer.OrdinalIgnoreCase) then "User access"
         else if Text.Contains([Type], "troubleshooting", Comparer.OrdinalIgnoreCase) then "Troubleshooting"
         else if Text.Contains([Type], "UAC", Comparer.OrdinalIgnoreCase) then "UAC"
         else [Type],
    Replacer.ReplaceValue,
    {"Type"}
)

=COUNTROWS(FILTER(Data, ISBLANK(Data[Closed])))



= Table.AddColumn(#"Expanded SLA", "Adj.SLA", each if Text.Contains([Platform], "Global") and Text.Contains([Type], "Page") then [SLA.SLA] + 1 else if Text.Contains([Platform], "Global") and Text.Contains([Type], "Growth track") then [SLA.SLA] + 1 else [SLA.SLA])

= Table.AddColumn(#"Added Custom", "Adj.LOE", each if Text.Contains([Platform], "Global") and Text.Contains([Type], "Page") then [SLA.LOE] + 1 else if Text.Contains([Platform], "Global") and Text.Contains([Type], "Growth track") then [SLA.LOE] + 1
else if Text.Contains([Platform], "Global") and Text.Contains([Type], "Resource") then [SLA.LOE] + 1
else [SLA.LOE])