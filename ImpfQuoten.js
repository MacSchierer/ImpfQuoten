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
// Script by MacSchierer, 22.01.2021, v1.0
// Download der aktuellen Version hier: GitHub https://github.com/MacSchierer/ImpfQuote
// 
// Verwendet die bereitgestellte JSON API von ThisIsBenny GitHub
// https://github.com/ThisIsBenny/rki-vaccination-data
// Datenbasis: https://www.rki.de/DE/Content/InfAZ/N/Neuartiges_Coronavirus/Daten/Impfquoten-Tab.html
//
// Optionale Konfiguration
//

// Individuelle Farbstufen für die Impfquote:
// Rot = Step1st < 20, Grün = Step2nd > 60, Dazwischen Orange, Ziel > 70 = Herdenimunität
const Step1st = 20
const Step2nd = 60
const StepFin = 70

//
// Ab hier nichts ändern
//
let APIurl = "https://rki-vaccination-data.vercel.app/api"
let hasError = false
let ErrorTxt = ""  
let RegionKey= "Deutschland"

const BarWidth = 15
const BarHeigth = 105

let param = args.widgetParameter 	// Abfrage des Parameters vom Widget
// let param = "Mv" // Debug
if (param != null && param.length > 0) {
	param = param.toLowerCase()
	if (setRegionKey(param) != false) {
		RegionKey = setRegionKey(param)
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
	// Daten der Region zuordnen
	if (RegionKey == "Deutschland") {
		Citizen = AllItems.total 
		Vacc1st = AllItems.vaccinated	
		Vacc2nd = AllItems['2nd_vaccination'].vaccinated
		Quote1st = (Vacc1st/AllItems.total*100).toFixed(2)
		Quote2nd = (Vacc2nd/AllItems.total*100).toFixed(2)
		Diff1st = AllItems.difference_to_the_previous_day
		Diff2nd = AllItems['2nd_vaccination'].difference_to_the_previous_day
		Vacc1k = AllItems.vaccinations_per_1000_inhabitants
		RegionName = RegionKey
	}
	else {
		Citizen = AllItems.states[RegionKey].total 
		Vacc1st = AllItems.states[RegionKey].vaccinated
		Vacc2nd = AllItems.states[RegionKey]['2nd_vaccination'].vaccinated
		Quote1st = (Vacc1st/AllItems.states[RegionKey].total*100).toFixed(2)
		Quote2nd = (Vacc2nd/AllItems.states[RegionKey].total*100).toFixed(2)
		Diff1st = AllItems.states[RegionKey].difference_to_the_previous_day
		Diff2nd = AllItems.states[RegionKey]['2nd_vaccination'].difference_to_the_previous_day	
		Vacc1k = AllItems.states[RegionKey].vaccinations_per_1000_inhabitants
		RegionName = RegionKey
	}
	log("Region: " + RegionKey)
	log("Geimpft 1st: " + Vacc1st)
	log("Geimpft 2nd: " + Vacc2nd)
	log("Diff. 1st: +" + Diff1st)
	log("Diff. 2nd: +" + Diff2nd)
	log("Quote 1st: " + Quote1st + "%")
	log("Quote 2nd: " + Quote2nd + "%")
	log("pro 1000: " + Vacc1k)
	log("Stand: " + AllItems.lastUpdate)
} catch (e) {
	hasError = true
	ErrorTxt += "Beim Verarbeiten der Daten ist ein fehler aufgetreten." 
}	

// Fraben definieren	
WidgetBgColor = Color.dynamic(new Color("#ffffff"), new Color("#000000"))	
ContentBGColor = Color.dynamic(new Color("#efefef"), new Color("#444444"))	
MainTextColor = Color.dynamic(new Color("#000000"), new Color("#ffffff"))
SubTextColor = Color.dynamic(new Color("#666666"), new Color("#aaaaaa"))
TitelColor = MainTextColor
BarTextColor1 = Color.dynamic(new Color("#ffffff"), new Color("#000000"))
BarTextColor2 = Color.dynamic(new Color("#000000"), new Color("#ffffff"))

//Vacc1st = 59058972
//Quote1st = 65.58
//Quote2nd = 12.99


// Ausgabe aufgelaufene Fehler oder Widget
if (hasError == true) {
	let widget = errorWidget(ErrorTxt)
	Script.setWidget(widget)
	widget.presentMedium()
	Script.complete()	
} else { 
	if (config.runsInWidget || true) {
		const widget = new ListWidget()
		widget.backgroundColor = WidgetBgColor
		widget.setPadding(15, 15, 15, 15)
		const Title = widget.addStack()  
		let TitleText = Title.addText("COVID-19 Impfungen")
			TitleText.textColor = TitelColor
			TitleText.font = Font.boldSystemFont(12)
			TitleText.centerAlignText()
			TitleText.minimumScaleFactor = 0.5
		Title.addSpacer()	
		let DateText = Title.addDate(new Date(AllItems.lastUpdate))
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
					let Title1stText = Stack1Head.addText("Erstimpfung")
						Title1stText.textColor = MainTextColor
						Title1stText.font = Font.boldSystemFont(14)
					Stack1Head.addSpacer()
				Stack1.addSpacer(4)
				const Stack1Vacc = Stack1.addStack()
					Stack1Vacc.addSpacer()
					let Vacc1stText = Stack1Vacc.addText(Vacc1st.toLocaleString('de-DE'))
						Vacc1stText.textColor = MainTextColor
						Vacc1stText.font = Font.boldSystemFont(14)
					Stack1Vacc.addSpacer()	
				const Stack1Diff = Stack1.addStack()
					Stack1Diff.addSpacer()
					let Diff1stText = Stack1Diff.addText("+" + Diff1st.toLocaleString('de-DE'))
						Diff1stText.textColor  = SubTextColor
						Diff1stText.font = Font.systemFont(12)
					Stack1Diff.addSpacer()
				Stack1.addSpacer(4)
				const Stack1Percent = Stack1.addStack()	
				Stack1Percent.layoutHorizontally()
				Stack1Percent.centerAlignContent()
				Stack1Percent.addSpacer()
					let Quote1stText = Stack1Percent.addText(Quote1st.toLocaleString('de-DE'))
						Quote1stText.textColor = MainTextColor
						Quote1stText.font = Font.boldSystemFont(28)
						Quote1stEin = Stack1Percent.addText("%")
						Quote1stEin.textColor = SubTextColor
						Quote1stEin.font = Font.systemFont(14)	
				Stack1Percent.addSpacer()		
			Stack1.addSpacer()
		Content.addSpacer()
		const BarContent1 = Content.addStack() 
		BarContent1.layoutVertically()	
			const progressBar1st = BarContent1.addImage(creatProgress(Quote1st))
			progressBar1st.imageSize = new Size(BarWidth, BarHeigth)
		
		Content.addSpacer()		

		const BarContent2 = Content.addStack() 
		BarContent2.layoutVertically()	
			const progressBar2nd = BarContent2.addImage(creatProgress(Quote2nd))
			progressBar2nd.imageSize = new Size(BarWidth, BarHeigth)
		Content.addSpacer()		
		
			const Stack2 = Content.addStack() 
				Stack2.layoutVertically()
				Stack2.backgroundColor = ContentBGColor		
				Stack2.cornerRadius = 4
				Stack2.setPadding(4,4,4,4)
				const Stack2Head = Stack2.addStack() 	
					Stack2Head.addSpacer()
					let Title2ndText = Stack2Head.addText("Zweitimpfung")
						Title2ndText.textColor = MainTextColor
						Title2ndText.font = Font.boldSystemFont(14)
					Stack2Head.addSpacer()
				Stack2.addSpacer(4)
				const Stack2Vacc = Stack2.addStack()
					Stack2Vacc.addSpacer()
					let Vacc2ndText = Stack2Vacc.addText(Vacc2nd.toLocaleString('de-DE'))
						Vacc2ndText.textColor = MainTextColor
						Vacc2ndText.font = Font.boldSystemFont(14)
					Stack2Vacc.addSpacer()	
				const Stack2Diff = Stack2.addStack()
					Stack2Diff.addSpacer()
					let Diff2ndText = Stack2Diff.addText("+" + Diff2nd.toLocaleString('de-DE'))
						Diff2ndText.textColor  = SubTextColor
						Diff2ndText.font = Font.systemFont(12)
					Stack2Diff.addSpacer()
				Stack2.addSpacer(4)
				const Stack2Percent = Stack2.addStack()	
				Stack2Percent.layoutHorizontally()
				Stack2Percent.centerAlignContent()
				Stack2Percent.addSpacer()
					let Quote2ndText = Stack2Percent.addText(Quote2nd.toLocaleString('de-DE'))
						Quote2ndText.textColor = MainTextColor
						Quote2ndText.font = Font.boldSystemFont(28)
						Quote2ndEin = Stack2Percent.addText("%")
						Quote2ndEin.textColor = SubTextColor
						Quote2ndEin.font = Font.systemFont(14)	
				Stack2Percent.addSpacer()		
			Stack2.addSpacer()

		// Ausgabe		
		Script.setWidget(widget)
		widget.presentMedium()
		Script.complete()
	}
	else {
		Script.complete()	
	}
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

function creatProgress(BarValue) {
	BarValue = Math.round(BarValue)
	const context = new DrawContext()
	context.size = new Size(BarWidth, BarHeigth)
	context.opaque = false
	context.respectScreenScale = true
	// BG
	context.setFillColor(ContentBGColor)
	const path = new Path()
	path.addRoundedRect(new Rect(0, 0, BarWidth, BarHeigth),2,2)
	context.addPath(path)
	context.fillPath()
	// BarValue
	if (BarValue < Step1st) {
		BarColor = new Color("#bb1e10")
	} 
	if (BarValue >= Step1st && BarValue < Step2nd) {
		BarColor = new Color("#f7b500")
	} 
	else if (BarValue >= Step2nd) {
		BarColor = new Color("#00b347")
	}
	context.setFillColor(BarColor)  
	const path1 = new Path()
	const path1BarHeigth = (BarHeigth * (BarValue / StepFin) > BarHeigth) ? BarHeigth : BarHeigth * (BarValue / StepFin)
	path1.addRoundedRect(new Rect(0, BarHeigth, BarWidth, -path1BarHeigth),2,2)
	context.addPath(path1)
	context.fillPath()
	
	context.setFont(Font.boldSystemFont(8))
	context.setTextColor(SubTextColor)
	context.setTextAlignedCenter()
	if (BarValue < 65) {
		context.drawTextInRect("%", new Rect(0, 2, BarWidth, BarHeigth))
	}
	if (BarValue < 10) {
		PosCorr = -10
		context.setTextColor(BarTextColor2)
	}
	else {
		PosCorr = 2
		context.setTextColor(BarTextColor1)
	}
	context.drawTextInRect(BarValue.toString(), new Rect(0, BarHeigth-path1BarHeigth+PosCorr, BarWidth, path1BarHeigth-PosCorr))
	return context.getImage()
}

//
// Regionen und Widgetparameter
//
function setRegionKey(Region) {
	let Regions = { bw: "Baden-Württemberg", by: "Bayern", be: "Berlin", bb: "Brandenburg", hb: "Bremen", hh: "Hamburg", he: "Hessen", mv: "Mecklenburg-Vorpommern", ni: "Niedersachsen", nw: "Nordrhein-Westfalen", rp: "Rheinland-Pfalz", sl: "Saarland", sn: "Sachsen", st: "Sachsen-Anhalt", sh: "Schleswig-Holstein", th: "Thüringen" };
	if (Regions.hasOwnProperty(Region)) { 
		result = Regions[Region]
	} else { 
		result = false 
	} 
	return result
}


// End of Script