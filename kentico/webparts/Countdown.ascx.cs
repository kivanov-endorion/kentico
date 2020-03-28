using System;
using System.Data;
using System.Collections;
using System.Globalization;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using System.Text;

using CMS.Controls;
using CMS.ExtendedControls;
using CMS.DataEngine;
using CMS.Helpers;
using CMS.PortalControls;
using CMS.PortalEngine;
using CMS.Base;
using CMS.DocumentEngine;


public partial class Countdown : CMSAbstractWebPart
{
    #region "Properties"

    /// <summary>
    /// For public or authenticated users.
    /// </summary>

    public DateTime CountdownDate
    {
        get
        {
             return ValidationHelper.GetDateTime(GetValue("CountdownDate"), DateTimeHelper.ZERO_TIME, "en-us");

        }
        set
        {
            SetValue("CountdownDate", value);
        }
    }


        #endregion

    #region "Methods"

    /// <summary>
    /// Page load.
    /// </summary>
    protected void Page_Load(object sender, EventArgs e)
    {
        if (!StopProcessing)
        {
            SetupControl();
        }
    }


    /// <summary>
    /// Initializes the control properties.
    /// </summary>
    protected void SetupControl()
    {
        // If Content Slider is in design mode do not start scripts (IE z-index problem)
        if (PortalContext.ViewMode != ViewModeEnum.Design)
        {
            // Register DateTime.js script file
            //ScriptHelper.RegisterScriptFile(Page, "~/CMSWebParts/Viewers/DateTime_files/DateTime.js");
            
            string dt = CountdownDate.ToString("yyyy-MM-dd HH:mm:ss");


            Int32 unixTimestamp = (Int32)(CountdownDate.ToUniversalTime().Subtract(new DateTime(1970, 1, 1))).TotalSeconds;

            string jScript = @"
            var endtime_stamp='" + unixTimestamp + @"'
            var endtime = '" + dt + @"'
            function getTimeRemaining(endtime){
                var t = Date.parse(endtime) - Date.parse(new Date());
                //var t = endtime - Date.parse(new Date());
                var seconds = Math.floor( (t/1000) % 60 );
                var minutes = Math.floor( (t/1000/60) % 60 );
                var hours = Math.floor( (t/(1000*60*60)) % 24 );
                var days = Math.floor( t/(1000*60*60*24) );
                return {
                'total': t,
                'days': days,
                'hours': hours,
                'minutes': minutes,
                'seconds': seconds
                };
            }
            
            function initializeClock(id, endtime){
                var id = $('#clockdiv'); 
                function updateClock(){
                var t = getTimeRemaining(endtime);
                
                    $('.days').html(t.days);
                    $('.hours').html(t.hours);
                    $('.minutes').html(t.minutes);
                    $('.seconds').html(t.seconds);

                if(t.total<=0){
                    clearInterval(timeinterval);
                }
                }
                
                updateClock(); // run function once at first to avoid delay
                var timeinterval = setInterval(updateClock,1000);
                }
            initializeClock('clockdiv', endtime);
            
            ";
            ScriptHelper.RegisterClientScriptBlock(this, typeof(string), ("timerScript"), ScriptHelper.GetScript(jScript));
        }
    }

    #endregion
}