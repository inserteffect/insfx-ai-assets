
var iOSExportPath = "/iOS";
var androidExportPath = "/Android/res";

var folder = Folder.selectDialog();
var document = app.activeDocument;

if (document && folder) {
	var fileName = createFileName(document.name);
	saveAndroidAssets(fileName, folder);
	saveIOSAssets(fileName, folder);
}

function saveIOSAssets(fileName, folder) {

	save(100, fileName + ".png", folder, iOSExportPath);
	save(200, fileName + "@2x.png", folder, iOSExportPath);
	save(300, fileName + "@3x.png", folder, iOSExportPath);
}

function saveAndroidAssets(fileName, folder) {

	var androidFilename = fileName.toLowerCase().replace(/([^a-z0-9_.]+)/gi, '_') + ".png";

	save(75, androidFilename, folder,  androidExportPath + "/drawable-ldpi");
	save(100, androidFilename, folder, androidExportPath + "/drawable-mdpi");
	save(150, androidFilename, folder, androidExportPath + "/drawable-hdpi");
	save(200, androidFilename, folder, androidExportPath + "/drawable-xhdpi");
	save(300, androidFilename, folder, androidExportPath + "/drawable-xxhdpi");
	save(400, androidFilename, folder, androidExportPath + "/drawable-xxxhdpi");
}

function createFileName(fileName) {
	if (fileName.match(".ai")) {
		fileName = fileName.replace(".ai","");
	} else if (fileName.match(".svg")) {
		fileName = fileName.replace(".svg","");
	}
	return prompt("Please enter grafic assets export filename.", fileName, "Export SVG " + document.name);
}

function save(scaleTo, fileName, folder, folderPostfix) {

	var i, ab, file, options;

	var directory = new Folder(folder.absoluteURI + folderPostfix);
	if(!directory.exists) directory.create();

	options = new ExportOptionsPNG24();
	options.antiAliasing = true;
	options.transparency = true;
	options.artBoardClipping = true;
	options.verticalScale = scaleTo;
	options.horizontalScale = scaleTo;

	for (i = document.artboards.length - 1; i >= 0; i--) {
		document.artboards.setActiveArtboardIndex(i);
		ab = document.artboards[i];

		file = new File(directory.fsName + "/" + fileName);
		document.exportFile(file, ExportType.PNG24, options);
	}
}
