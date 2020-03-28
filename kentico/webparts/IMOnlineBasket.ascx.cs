using System;
using System.Data;
using System.Collections;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Web.UI.HtmlControls;
using System.Linq;

using CMS.ExtendedControls;
using CMS.MacroEngine;
using CMS.Helpers;
using CMS.PortalControls;
using CMS.SiteProvider;
using CMS.Base;
using CMS.DataEngine;

public partial class IMOnlineBasket : CMSAbstractWebPart
{
    #region "Properties"

    /// <summary>
    /// Gets or sets the text to be displayed.
    /// </summary>
    public string SKU
    {
        get
        {
            return HTMLHelper.ResolveUrls(ValidationHelper.GetString(GetValue("SKU"), ""), null);
        }
        set
        {
            SetValue("SKU", value);
        }
    }

    public int Qty
    {
        get
        {
            return ValidationHelper.GetInteger(GetValue("Qty"), 0);
        }
        set
        {
            SetValue("Qty", value);
        }
    }

    public string ButtonText
    {
        get
        {
            return HTMLHelper.ResolveUrls(ValidationHelper.GetString(GetValue("ButtonText"), ""), null);
        }
        set
        {
            SetValue("ButtonText", value);
        }
    }

    /// <summary>
    /// Enables or disables save of OK click in browser.
    /// </summary>
    public string ButtonCSSClass
    {
      get
      {
        return ValidationHelper.GetString(GetValue("ButtonCSSClass"), "btn btn-primary");
      }
      set
      {
        SetValue("ButtonCSSClass", value);
      }
    }

    public string CheckBoxCSSClass
    {
        get
        {
            return ValidationHelper.GetString(GetValue("CheckBoxCSSClass"), "form-check-input");
        }
        set
        {
            SetValue("CheckBoxCSSClass", value);
        }
    }

    public string TextCSSClass
    {
        get
        {
            return ValidationHelper.GetString(GetValue("TextCSSClass"), "form-text-input form-inline");
        }
        set
        {
            SetValue("TextCSSClass", value);
        }
    }

 
    #endregion


    public bool IsInstanceGreaterOneFound
    {
        get
        {
            return PagePlaceholder.FindAllWebParts(typeof(IMOnlineBasket)).Count>1 ? true : false;
        }
    }

    public bool ShowQty
    {
        get
        {
            return Qty>0 ? true : false;
        }
    }

    /// <summary>
    /// Content loaded event handler.
    /// </summary>
    public override void OnContentLoaded()
    {
        base.OnContentLoaded();
        SetupControl();
    }


    /// <summary>
    /// Initializes the control properties.
    /// </summary>
    protected void SetupControl()
    {
        if (StopProcessing)
        {
            // Do not process
        }
        else
        {
            Btn_Add2IMOnlineBasket.ID = this.GetValue("WebPartControlID").ToString() + this.Btn_Add2IMOnlineBasket.ID;
            Chkbox.ID = this.GetValue("WebPartControlID").ToString() + this.Chkbox.ID;
            TxtQty.ID = this.GetValue("WebPartControlID").ToString() + this.TxtQty.ID;
            Btn_Add2IMOnlineBasket.Text = ButtonText;
            Btn_Add2IMOnlineBasket.Attributes["class"] = ButtonCSSClass;
            TxtQty.Text = Qty.ToString();
            TxtQty.Attributes["class"] = TextCSSClass;
            Chkbox.Attributes["class"] = CheckBoxCSSClass;

            if (IsInstanceGreaterOneFound) Chkbox.Visible = true; else Chkbox.Visible = false;
        }
    }

    protected void Btn_Add2IMOnlineBasket_Click(object sender, EventArgs e)
    {
        string tt = @"{""items"": [";  
        foreach (IMOnlineBasket item in PagePlaceholder.FindAllWebParts(typeof(IMOnlineBasket))) 
        {
            if ((item != null && item.Chkbox.Visible && item.Chkbox.Checked) || !IsInstanceGreaterOneFound)
            {
                string sQty = "1";
                var isNumeric = !string.IsNullOrEmpty(item.TxtQty.Text) && item.TxtQty.Text.All(Char.IsDigit);
                if (isNumeric && item.TxtQty.Text != "0") sQty = item.TxtQty.Text;
                tt+=@"{""sku"": """ + item.SKU + @""", ""qty"": "+sQty+"},";
            }
        }
        if (PagePlaceholder.FindAllWebParts(typeof(IMOnlineBasket)).Count>0) tt = tt.Substring(0, tt.Length-1);
        tt+="]}";

        string encoded = HttpUtility.UrlEncode(IMTools.CryptoUtil.Encrypt(tt));
        string ShopURL = SettingsKeyInfoProvider.GetValue(SiteContext.CurrentSiteName + ".ShopURL");
        string pfidurl = MacroResolver.Resolve(SettingsKeyInfoProvider.GetValue(SiteContext.CurrentSiteName + ".pfIDPUrl"));

        if (ShopURL != null && ShopURL != "") ShopURL = GetParentUriString(new Uri(ShopURL.Split('?').FirstOrDefault()));
        Page.ClientScript.RegisterStartupScript(this.GetType(), "FncWindowOpen", "window.open('" + pfidurl + "%3freturnurl%3d" + HttpUtility.UrlEncode(HttpUtility.UrlEncode(ShopURL + "ExtConfiguratorHandler.ashx?Bom=" + encoded)) + "', '_blank')", true);
    }

    static string GetParentUriString(Uri uri)
    {
        return uri.AbsoluteUri.Remove(uri.AbsoluteUri.Length - uri.Segments.Last().Length);
    }
  
    /// <summary>
    /// Reloads the control data.
    /// </summary>
    public override void ReloadData()
    {
        base.ReloadData();

        SetupControl();
    }
}