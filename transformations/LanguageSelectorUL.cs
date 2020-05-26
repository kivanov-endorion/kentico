// Content before
<ul class="navbar-nav align-items-center align-items-xl-start lang">
    <li class="nav-item dropdown">
        <a aria-expanded="false" aria-haspopup="true" class="nav-link dropdown-toggle"
            data-scroll-ignore="" data-toggle="dropdown" href="#" id="lang-link" title="{$1IM.ChangeLanguage$}" aria-label="Language selector">
            <i class="fas fa-globe">&hairsp;</i>
        </a>
        <div aria-labelledby="lang-link" class="dropdown-menu dropdown-menu-right shadow" style="min-width: 16em;">
            <h6 class="dropdown-header text-uppercase text-white d-none d-xl-block"><i class="fas fa-language fa-lg">&hairsp;</i>&emsp;{$ 1IM.ChangeLanguage $}</h6>
            <div class="lang-selector">
                <div class="language-selection pl-4 py-3 caps">
                {% if (settings.CustomSettings.languageSelectorShowCountry == 1){
                        GetResourceString("1IM.CountryName", CultureCode) + " - ";
                    }
                %} 
                {% LocalizationContext.CurrentCulture.CultureShortName #%}
                {% if (settings.CustomSettings.LanguageSelectorShowCountry == 2){
                        " - " + GetResourceString("1IM.CountryName", CultureCode);
                    }
                %} 
                </div>
                <nav role="navigation">
                    <ul class="language-items list-unstyled d-flex flex-column">


                        // Transformation
                        <li id="Ctry_{% GetResourceString("1IM.CountryName",CultureCode).ToString().Substring(0,1) %}">
                            <a class="align-items-center d-flex dropdown-item justify-content-between" title="{% CultureName %}" href="{% HTMLEncode(URL) %} ">
                                {% if (settings.CustomSettings.languageSelectorShowCountry == 1){
                                    GetResourceString("1IM.CountryName", CultureCode) + " - ";
                                }
                                %} 
                                {% CultureName %}
                                
                                {% if(settings.CustomSettings.LanguageSelectorShowCountry == 2){
                                    " - " + GetResourceString("1IM.CountryName", CultureCode);
                                }
                                %}                             
                            </a>
                        </li>

                    // Content after
                    </ul>
                </nav>
            </div>
        </div>
    </li>
</ul>


// CSS
#Ctry_A{order:1}
#Ctry_B{order:2}
#Ctry_C{order:3}
#Ctry_D{order:4}
#Ctry_E{order:5}
#Ctry_F{order:6}
#Ctry_G{order:7}
#Ctry_H{order:8}
#Ctry_I{order:9}
#Ctry_M{order:10}
#Ctry_N{order:11}
#Ctry_O{order:12}
#Ctry_Ö{order:12}
#Ctry_P{order:13}
#Ctry_Q{order:14}
#Ctry_R{order:15}
#Ctry_S{order:16}
#Ctry_T{order:17}
#Ctry_U{order:18}
#Ctry_V{order:19}
#Ctry_W{order:20}
#Ctry_X{order:21}
#Ctry_Y{order:22}
#Ctry_Z{order:23}

