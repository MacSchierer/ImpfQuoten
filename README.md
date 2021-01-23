# ImpfQuoten, Ein Scriptable Widget
Ein Scriptable Widget zur Anzeige der gegen COVID-19 geimpften Personenzahl.
Die Quote der Geimpften mit Bezug auf die Bevölkerung von Deutschland oder eines gewählten Bundeslands.
Zusätzlich werden die Zahlen mit einem Fortschrittsbalken visualisiert.<br/>
<img src="/img/pic1.PNG" width="400" /> &nbsp; <img src="img/pic3.PNG" width="400" /><br/><br/>
<img src="img/pic5.png" width="250" /><br/><br/>

## Verwendung

* Download Scriptable App für iOS Geräte - https://scriptable.app
* Download/Import der ImpfQuoten.js Datei nach iCloud/Scriptable
* Auf dem Homescreen ein neues mittleres Scriptable Widget erstellen - Parameter für Bundesland optional<br/>
<img src="img/widget1.png" width="300" /> &nbsp; <img src="img/widget2.png" width="300" /><br/><br/>
Das Skript ist aktuell für die mittlere Widgetgröße ausgelegt und wurde auf einem iPhone 12Pro, Xs getestet.
Wird das Skript in einem kleinen Widget verwendet, wird die Anzeige auf die Erstimpfungen reduziert.
Auf anderen Geräten oder Widgetgrößen kann es ggf. zu Abweichungen in der Darstellung kommen.


## Features

* Quelle der Daten: https://rki-vaccination-data.vercel.app
* Als Basis der Quelle dient: https://www.rki.de/DE/Content/InfAZ/N/Neuartiges_Coronavirus/Daten/Impfquoten-Tab.html
* Über den Parameter des Widgets kann ein Bundesland vorgegben werden. Kürzel nach ISO 3166-2:DE
* Wechselt gemäß der Geräteeinstellung automatisch in den Darkmode
* Individuelle Farbstufen für die Impfquote: Rot = Step1st < 20%, Grün = Step2nd > 60%, Dazwischen Orange, Ziel = 70% Herdenimunität

## Kürzel für den Parameter des Widgets
BW = Baden-Württemberg<br/>
BY = Bayern<br/>
BE = Berlin<br/>
BB = Brandenburg<br/>
HB = Bremen<br/>
HH = Hamburg<br/>
HE = Hessen<br/>
MV = Mecklenburg-Vorpommern<br/>
NI = Niedersachsen<br/>
NW = Nordrhein-Westfalen<br/>
RP = Rheinland-Pfalz<br/>
SL = Saarland<br/>
SN = Sachsen<br/>
ST = Sachsen-Anhalt<br/>
SH = Schleswig-Holstein<br/>
TH = Thüringen<br/>


## Beispiele
<img src="img/pic2.PNG" width="400" /> &nbsp; <img src="img/pic4.PNG" width="400" /><br/><br/>
<img src="img/pic5.png" width="250" /> &nbsp; <img src="img/pic6.png" width="250" /> 
## Bekannte Probleme

* Fortschrittsbalken wechselt nicht direkt in das zugehörige Erscheinungsbild (hell/dunkel)
* Tritt ein Fehler beim Datenabruf auf, wird eine Fehlermeldung angezeigt:<br/>
<img src="img/error.png" width="400" /><br/><br/>

## Changelog
* v1.1 Anzeige der Erstimpfungen als kleines Widget
* v1.0 Release GitHub

## Hinweis zur Quelle und Datenstand
Die Daten werden werktäglich aktualisiert und stehen hier öffentlich zur Verfügung:
https://www.rki.de/DE/Content/InfAZ/N/Neuartiges_Coronavirus/Daten/Impfquoten-Tab.html<br/>
Es wird ebenfalls darauf hingewiesen, dass die Zahlen nachträglich korrigiert werden können.
Der Abruf erfolgt nicht direkt beim RKI sondern über einen kleinen Umweg: https://rki-vaccination-data.vercel.app <br/>
