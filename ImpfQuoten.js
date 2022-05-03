// Variables used by Scriptable.
// These must be at the very top of the file. Do not edit.
// icon-color: deep-green; icon-glyph: syringe;
//
// Script für https://scriptable.app
// iOS Widget zur Anzeige der gegen COVID-19 geimpften Personenzahl. 
// Die Quote der Geimpften mit Bezug auf die Bevölkerung von Deutschland oder eines gewählten Bundeslands.
// Zusätzlich werden die Zahlen mit einem Fortschrittsbalken visualisiert.
// Konfiguriert als Widget Medium. Schaltet automatisch auch in den DarkMode.
//
// Script by MacSchierer, 03.05.2022, v2.3
// Download der aktuellen Version hier: GitHub https://github.com/MacSchierer/ImpfQuote
// https://fckaf.de/Bn0
// 
// Verwendet die bereitgestellte Robert Koch-Institut COVID-19 API - von Marlon Lückert
// https://api.corona-zahlen.org, https://github.com/marlon360/rki-covid-api

//
// Optionale Konfiguration
//
// Individuelle Farbstufen für die Impfquote:
// Rot = Step1st < 25, Grün = Step2nd > 85, Dazwischen Orange, Ziel > 85 = "Herdenimmunität"
const Step1st = 25
const Step2nd = 85
const StepFin = 100

debug = false

//
// Ab hier nichts ändern
//
let APIurl = "https://api.corona-zahlen.org/vaccinations"
let hasError = false
let ErrorTxt = ""  
let RegionKey= "Deutschland"

const BarWidth = 15
const BarHeigth = 105

let param = args.widgetParameter 	// Abfrage des Parameters vom Widget
if (debug) {param = "de"}
if (param != null && param.length > 0) {
	param = param.toUpperCase()
	if (setRegionKey(param) != false) {
		RegionKey = setRegionKey(param)
		RegionKey = param
	}
	else { 
		hasError = true
		ErrorTxt += "Bundesland konnte nicht zugeordnet werden.\r\rBitte überprüfe den Parameter im Widget." 
	} 	
}

try {
	AllItems = await loadItems(APIurl)
} catch (e) {
	hasError = true
	ErrorTxt += "Das Widget konnte keine Daten abrufen." 
}
	
try {
	if (RegionKey != "DE") {
		RegItems = AllItems.data.states[RegionKey]
		RegionName = RegItems.name
	} else {
		RegItems = AllItems.data
		RegionName = "Deutschland"
	}

	// Daten zuordnen
	Vacc1st = RegItems.vaccinated
	QuoteVacc1st = RegItems.quote*100
	DeltaVacc1st = RegItems.delta
	Vacc2nd = RegItems.secondVaccination.vaccinated
	QuoteVacc2nd = RegItems.secondVaccination.quote*100
	DeltaVacc2nd = RegItems.secondVaccination.delta
	Booster1st = RegItems.boosterVaccination.vaccinated
	QuoteBooster1st = RegItems.boosterVaccination.quote*100
	DeltaBooster1st = RegItems.boosterVaccination.delta
	Booster2nd = RegItems['2ndBoosterVaccination'].vaccinated
	QuoteBooster2nd = RegItems['2ndBoosterVaccination'].quote*100
	DeltaBooster2nd = RegItems['2ndBoosterVaccination'].delta
	
	if(debug){
		log("Region: " + RegionName)
		log("Vacc1st: " + Vacc1st + ", " + QuoteVacc1st + ", "  +  DeltaVacc1st)
		log("Vacc2nd: " + Vacc2nd + ", " + QuoteVacc2nd + ", "  +  DeltaVacc2nd)
		log("Booster1st: " + Booster1st + ", " + QuoteBooster1st + ", "  +  DeltaBooster1st)
		log("Booster2nd: " + Booster2nd + ", " + QuoteBooster2nd + ", "  +  DeltaBooster2nd)
		log("Stand: " + AllItems.meta.lastCheckedForUpdate)
	}

} catch (e) {
	hasError = true
	ErrorTxt += "Beim Verarbeiten der Daten ist ein Fehler aufgetreten.\r\r" 
    ErrorTxt += "API: " + AllItems.message
}	

// Fraben definieren	
WidgetBgColor = Color.dynamic(new Color("#fefefe"), new Color("#1e1e1e"))	
ContentBGColor = Color.dynamic(new Color("#efefef"), new Color("#444444"))	
MainTextColor = Color.dynamic(new Color("#000000"), new Color("#ffffff"))
SubTextColor = Color.dynamic(new Color("#666666"), new Color("#aaaaaa"))
TitelColor = MainTextColor
BarTextColor1 = Color.dynamic(new Color("#ffffff"), new Color("#000000"))
BarTextColor2 = Color.dynamic(new Color("#000000"), new Color("#ffffff"))

// Ausgabe aufgelaufene Fehler oder Widget
if (hasError == true) {
	let widget = errorWidget(ErrorTxt)
	Script.setWidget(widget)
	widget.presentMedium()
	Script.complete()	
} else { 
	
	const widget = new ListWidget()
	widget.backgroundColor = WidgetBgColor
	widget.setPadding(15, 15, 15, 15)
	const Title = widget.addStack()  
	let TitleText = Title.addText("COVID-19 Impfungen")
		TitleText.textColor = TitelColor
		TitleText.font = Font.boldSystemFont(12)
		TitleText.minimumScaleFactor = 0.5
		TitleText.lineLimit = 1
	Title.addSpacer()	
	widget.borderWidth = 1
	widget.borderColor = MainTextColor
	let DateText = Title.addDate(new Date(AllItems.meta.lastCheckedForUpdate))
		DateText.textColor = SubTextColor
		DateText.applyDateStyle()
		DateText.font = Font.boldSystemFont(8)		
	const SubTitle = widget.addStack()  
	let SubTitleText = SubTitle.addText(RegionName)
		SubTitleText.font = Font.systemFont(10)
		SubTitleText.textColor = SubTextColor
		SubTitleText.lineLimit = 1
	widget.addSpacer(2)	
	
	const Content = widget.addStack() 
	Content.setPadding(2,2,2,2)
	Content.layoutHorizontally()
	
	const Stack1 = Content.addStack() 
		Stack1.layoutVertically()
		Stack1.backgroundColor = ContentBGColor		
		Stack1.cornerRadius = 4
		Stack1.setPadding(4,4,4,4)
		const Stack1Head = Stack1.addStack() 	
			Stack1Head.addSpacer()
			let Title1stText = Stack1Head.addText("Vollständig")
				Title1stText.textColor = MainTextColor
				Title1stText.font = Font.boldSystemFont(14)
			Stack1Head.addSpacer()
		Stack1.addSpacer(4)
		const Stack1Vacc = Stack1.addStack()
			Stack1Vacc.addSpacer()
			let VaccFullText = Stack1Vacc.addText(Vacc2nd.toLocaleString('de-DE'))
				VaccFullText.textColor = MainTextColor
				VaccFullText.font = Font.boldSystemFont(14)
			Stack1Vacc.addSpacer()	
		const Stack1Diff = Stack1.addStack()
			Stack1Diff.addSpacer()
			let DiffFullText = Stack1Diff.addText("+" + DeltaVacc2nd.toLocaleString('de-DE'))
				DiffFullText.textColor  = SubTextColor
				DiffFullText.font = Font.systemFont(12)
			Stack1Diff.addSpacer()
		Stack1.addSpacer(4)
		const Stack1Percent = Stack1.addStack()	
		Stack1Percent.layoutHorizontally()
		Stack1Percent.centerAlignContent()
		Stack1Percent.addSpacer()
			let QuoteFullText = Stack1Percent.addText((QuoteVacc2nd.toLocaleString('de-DE')).replace('.', ','))
				QuoteFullText.textColor = MainTextColor
				QuoteFullText.font = Font.boldSystemFont(28)
				QuoteFullEin = Stack1Percent.addText("%")
				QuoteFullEin.textColor = SubTextColor
				QuoteFullEin.font = Font.systemFont(14)	
		Stack1Percent.addSpacer()		
	Stack1.addSpacer()
	Content.addSpacer()
	const BarContent1 = Content.addStack() 
	BarContent1.layoutVertically()	
		const progressBar1st = BarContent1.addImage(creatProgress(QuoteVacc2nd, QuoteVacc1st))
		progressBar1st.cornerRadius = 4
		progressBar1st.imageSize = new Size(BarWidth, BarHeigth)

	Content.addSpacer()		
	
	const BarContent2 = Content.addStack() 
	BarContent2.layoutVertically()	
		const progressBar2nd = BarContent2.addImage(creatProgress(QuoteBooster1st, QuoteBooster2nd))
		progressBar2nd.cornerRadius = 4
		progressBar2nd.imageSize = new Size(BarWidth, BarHeigth)
	Content.addSpacer()		
		const Stack2 = Content.addStack() 
			Stack2.layoutVertically()
			Stack2.backgroundColor = ContentBGColor		
			Stack2.cornerRadius = 4
			Stack2.setPadding(4,4,4,4)
			const Stack2Head = Stack2.addStack() 	
				Stack2Head.addSpacer()
				let Title2ndText = Stack2Head.addText("Auffrischung")
					Title2ndText.textColor = MainTextColor
					Title2ndText.font = Font.boldSystemFont(14)
				Stack2Head.addSpacer()
			Stack2.addSpacer(4)
			const Stack2Vacc = Stack2.addStack()
				Stack2Vacc.addSpacer()
				let VaccBoosterText = Stack2Vacc.addText(Booster1st.toLocaleString('de-DE'))
					VaccBoosterText.textColor = MainTextColor
					VaccBoosterText.font = Font.boldSystemFont(14)
				Stack2Vacc.addSpacer()	
			const Stack2Diff = Stack2.addStack()
				Stack2Diff.addSpacer()
				let DiffBoosterText = Stack2Diff.addText("+" + DeltaBooster1st.toLocaleString('de-DE'))
					DiffBoosterText.textColor  = SubTextColor
					DiffBoosterText.font = Font.systemFont(12)
				Stack2Diff.addSpacer()
			Stack2.addSpacer(4)
			const Stack2Percent = Stack2.addStack()	
			Stack2Percent.layoutHorizontally()
			Stack2Percent.centerAlignContent()
			Stack2Percent.addSpacer()
				let QuoteBoosterText = Stack2Percent.addText((QuoteBooster1st.toLocaleString('de-DE')).replace('.', ','))
					QuoteBoosterText.textColor = MainTextColor
					QuoteBoosterText.font = Font.boldSystemFont(28)
					QuoteBoosterEin = Stack2Percent.addText("%")
					QuoteBoosterEin.textColor = SubTextColor
					QuoteBoosterEin.font = Font.systemFont(14)	
			Stack2Percent.addSpacer()		
		Stack2.addSpacer()

	// Ausgabe		
	if (!config.runsInWidget) {
		await widget.presentMedium()
	} else {
		Script.setWidget(widget)
	}
	Script.complete()
}

//
// Error Widget
//
function errorWidget(reason){
	let w = new ListWidget()
	w.setPadding(5,5,5,5)
	let myGradient = new LinearGradient()
	w.backgroundColor = new Color("#933")
	myGradient.colors = [new Color("#990000"), new Color("#ff0000")]
	myGradient.locations = [0.0,1]
	w.backgroundGradient = myGradient
	let title = w.addText("Fehler")
	title.centerAlignText()
	title.textColor = Color.white()
	title.font = Font.semiboldSystemFont(24)
	title.minimumScaleFactor = 0.5
		let reasonText = w.addText(reason)
		reasonText.centerAlignText()
		reasonText.textColor = Color.white()
		reasonText.font = Font.semiboldSystemFont(12)
		reasonText.minimumScaleFactor = 0.5
  return w
}

//
// JSON holen
//
async function loadItems(APIurl) {
	let req = new Request(APIurl)
	let json = await req.loadJSON()
	return json
}

function creatProgress(BarValue1, BarValue2) {
	BarValue1 = Math.round(BarValue1)
	BarValue2 = Math.round(BarValue2)
	const context = new DrawContext()
	context.size = new Size(BarWidth, BarHeigth)
	context.opaque = false
	context.respectScreenScale = true
	// BG
	const path = new Path()
	path.addRoundedRect(new Rect(0, 0, BarWidth, BarHeigth),4,4)
	context.addPath(path)
	context.setFillColor(ContentBGColor)
	context.fillPath()
	// BarValue1
	if (BarValue1 < Step1st) {BarColor1 = new Color("#bb1e10")}
	if (BarValue2 < Step1st) {BarColor2 = new Color("#bb1e1075")} 
	
	if (BarValue1 >= Step1st && BarValue1 < Step2nd) {BarColor1 = new Color("#f7b500")}
	else if (BarValue1 >= Step2nd) {BarColor1 = new Color("#00b347")}
	
	if (BarValue2 >= Step1st && BarValue2 < Step2nd) {BarColor2 = new Color("#f7b50075")} 
	else if (BarValue2 >= Step2nd) {BarColor2 = new Color("#00b34775")}
	
	// BarValue2
	context.setFillColor(BarColor2)  
	const path2 = new Path()
	const path2BarHeigth = (BarHeigth * (BarValue2 / StepFin) > BarHeigth) ? BarHeigth : BarHeigth * (BarValue2 / StepFin)
	path2.addRoundedRect(new Rect(0, BarHeigth, BarWidth, -path2BarHeigth),2,2)
	context.addPath(path2)
	context.fillPath()
	
	// BarValue1
	context.setFillColor(BarColor1)  
	const path1 = new Path()
	const path1BarHeigth = (BarHeigth * (BarValue1 / StepFin) > BarHeigth) ? BarHeigth : BarHeigth * (BarValue1 / StepFin)
	path1.addRoundedRect(new Rect(0, BarHeigth, BarWidth, -path1BarHeigth),2,2)
	context.addPath(path1)
	context.fillPath()
	
	context.setFont(Font.boldSystemFont(8))
	context.setTextAlignedCenter()
	if (BarValue1 < 90) {
		context.setTextColor(SubTextColor)
		context.drawTextInRect("%", new Rect(0, 3, BarWidth, BarHeigth))
	} else {
		context.setTextColor(BarTextColor1)
		context.drawTextInRect("%", new Rect(0, BarHeigth-15, BarWidth, BarHeigth))
	}
	if (BarValue1 < 10) {
		PosCorr = -10
		context.setTextColor(BarTextColor2)
	}
	else {
		PosCorr = 2
		context.setTextColor(BarTextColor1)
	}
	context.drawTextInRect(BarValue1.toString(), new Rect(0, BarHeigth-path1BarHeigth+PosCorr, BarWidth, path1BarHeigth-PosCorr))
	return context.getImage()
}

//
// Regionen und Widgetparameter
//
function setRegionKey(Region) {
	let Regions = { BW: "Baden-Württemberg", BY: "Bayern", BE: "Berlin", BB: "Brandenburg", HB: "Bremen", HH: "Hamburg", HE: "Hessen", MV: "Mecklenburg-Vorpommern", NI: "Niedersachsen", NW: "Nordrhein-Westfalen", RP: "Rheinland-Pfalz", SL: "Saarland", SN: "Sachsen", ST: "Sachsen-Anhalt", SH: "Schleswig-Holstein", TH: "Thüringen", DE: "Deutschland" };
	if (Regions.hasOwnProperty(Region)) { 
		result = Regions[Region]
	} else { 
		result = false 
	} 
	return result
}


// End of Script
