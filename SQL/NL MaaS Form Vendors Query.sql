SELECT        T.DocumentName, T.DocumentName
FROM            View_CMS_Tree_Joined AS T INNER JOIN
                         CONTENT_MenuItem AS C ON T.DocumentForeignKeyValue = C.MenuItemID
WHERE        (T.NodeParentID = 79739) 
AND (C.MenuItemGroup = 'inline')
AND T.DocumentCanBePublished = 1
AND GETDATE() BETWEEN ISNULL(T.DocumentPublishFrom, GETDATE()) 
AND ISNULL(T.DocumentPublishTo, GETDATE())