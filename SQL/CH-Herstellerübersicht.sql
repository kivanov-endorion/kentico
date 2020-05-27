/*
SELECT      DISTINCT LTRIM(P.VendorName) VendorName,
            IIF(LEFT(VendorName, 1) BETWEEN '0' AND '9', '0', UPPER(LEFT(VendorName, 1))) Label
FROM        OIS_PRODUCT.dbo.Tbl_Product_AT P 
WHERE       P.Status != 'X'
    AND     P.FlagRestricted IN ('', 'C', 'L')
ORDER BY    VendorName
*/

DECLARE
    @ParentID INT = 50101

SELECT      DISTINCT LTRIM(P.VendorName) VendorName,
            ISNULL(T.Published, 0) PortalPublished,
            T.NodeAliasPath,
            IIF(LEFT(P.VendorName, 1) BETWEEN '0' AND '9', '0', UPPER(LEFT(P.VendorName, 1))) Label
FROM        OIS_PRODUCT.dbo.Tbl_Product_AT P WITH (NOLOCK)
LEFT JOIN   (
                SELECT      NodeName,
                            IIF(DocumentCanBePublished = 1 AND GETDATE() BETWEEN ISNULL(DocumentPublishFrom, GETDATE()) AND ISNULL(DocumentPublishTo, GETDATE()), 1, 0) Published,
                            NodeAliasPath
                FROM        dbo.View_CMS_Tree_Joined
                WHERE       NodeParentID = @ParentID
            ) T
       ON           LTRIM(P.VendorName) = T.NodeName
WHERE       P.Status<>'X'
    AND     P.FlagRestricted IN ('', 'C', 'L')
    --AND     ASCII(UPPER(IIF(LEFT(P.VendorName, 1) BETWEEN '0' AND '9', '#', LEFT(P.VendorName, 1)))) = {? Link.ToInt() #?}
    --AND     NodeLinkedNodeID IS NULL
ORDER BY    VendorName