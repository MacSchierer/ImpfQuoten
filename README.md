# ImpfQuoten, Ein Scriptable Widget
Ein Scriptable Widget zur Anzeige der gegen COVID-19 geimpften Personenzahl.
Die Quote der Geimpften mit Bezug auf die Bevölkerung von Deutschland oder eines gewählten Bundeslands.<br/>
Zusätzlich werden die Zahlen mit einem Fortschrittsbalken visualisiert.<br/><br/>
<img src="/img/pic3.png" width="400" /> &nbsp; <img src="img/pic4.png" width="400" /><br/><br/>
Zahlen zu vollständig Geimpften und Auffrischimpfungen (Booster):<br/>
- Anzahl der Geimpften <br/>
- Differenz zum Vortag <br/>
- Prozentsatz mit Bezug auf die Bevölkerung<br/>

## Verwendung

* Download Scriptable App für iOS Geräte - https://scriptable.app
* Download/Import der ImpfQuoten.js Datei nach iCloud/Scriptable
* Auf dem Homescreen ein neues mittleres Scriptable Widget erstellen - Parameter für Bundesland optional<br/>
<img src="img/widget1.png" width="300" /> &nbsp; <img src="img/widget2.png" width="300" /><br/><br/>
Das Skript ist aktuell für die mittlere Widgetgröße ausgelegt und wurde auf einem iPhone 12Pro, Xs getestet.<br/>
Auf anderen Geräten oder Widgetgrößen kann es ggf. zu Abweichungen in der Darstellung kommen.

## Features

* Quelle der Daten: Robert Koch-Institut COVID-19 API - von Marlon Lückert >> https://api.corona-zahlen.org
* Über den Parameter des Widgets kann ein Bundesland vorgegben werden. Kürzel nach ISO 3166-2:DE
* Wechselt gemäß der Geräteeinstellung automatisch in den Darkmode
* Individuelle Farbstufen für die Impfquote: Rot = Step1st < 25, Grün = Step2nd > 85, Dazwischen Orange, Ziel > 85 = "Herdenimmunität"

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
DE = Deutschland


## Beispiele
<img src="img/pic2.png" width="400" /> &nbsp; <img src="img/pic1.png" width="400" /><br/><br/>
<img src="img/pic5.png" width="400" /> &nbsp; <img src="img/pic6.png" width="400" /><br/><br/>
## Bekannte Probleme

* Fortschrittsbalken wechselt nicht direkt in das zugehörige Erscheinungsbild (hell/dunkel)
* Tritt ein Fehler beim Datenabruf auf, wird eine Fehlermeldung angezeigt:<br/>
<img src="img/error.png" width="400" /><br/><br/>

## Changelog
* v2.3 Neue API >> Robert Koch-Institut COVID-19 API - von Marlon Lückert
* v2.1 Fix %-Zeichen, Erstimpfungen werden im linken Fortschirttsbalken schattiert im Hintergrund dargestellt
* v2.0 Anzeige: Impfquote vollständig geimpft, Impfquote Auffrischimpfung 
* v1.3 Impfquoten angepasst, API V2 - https://github.com/ThisIsBenny/rki-vaccination-data
* v1.2 Kleine Korrekturen: Farben, Dezimaltrenner
* v1.1 Anzeige der Erstimpfungen als kleines Widget
* v1.0 Release GitHub

## Hinweis zur Quelle und Datenstand
Verwendet die bereitgestellte Robert Koch-Institut COVID-19 API - von Marlon Lückert<br/>
https://api.corona-zahlen.org, https://github.com/marlon360/rki-covid-api<br/>
