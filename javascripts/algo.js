class Runner{}

Runner.run = function(platformsToDecommission, availableYards){
  this.yards = this.importYards(availableYards);

  this.platforms = this.importPlatforms(platformsToDecommission);

  this.platforms.sort(function(p1,p2){
    return p2.tonnage - p1.tonnage;
  })

  for (let platform of this.platforms) {
    if(!this.addPlatformToYardPref(platform)){
      console.log("Platform not added to any yards : " + platform);
    }
  }

  return Runner;
}

Runner.importYards = function(availableYards){
  let yards = new Map();

  for (let yard of availableYards) {
    yards.set(yard.properties.ID_Yard, new Yard(yard.properties.ID_Yard, yard.properties.Name, yard.properties.Annual_Cap, yard));
  }

  return yards;
}

Runner.importPlatforms = function(platformsToDecommission){
  let platforms = [];
  for (let platform of platformsToDecommission) {
    platforms.push(new Platform(platform));
  }
  return platforms;
}

Runner.addPlatformToYardPref = function(platform){
  for (let yardName of platform.yardPrefs) {
    let yard = this.yards.get(yardName);
    if(yard && platform.tonnage < yard.annualCapacity && yard.addToOrderBook(platform)){
      return true;
    }
  }
  return false;
}

Runner.getSummaryToDisplayForYear = function(year){
  let result = {
    numProcessedPlatforms: 0,
    processedTonnage: 0,
    spareCapa: 0,
    totalCapa: 0
  };

  for (var [key,yard] of this.yards) {
    result.numProcessedPlatforms += yard.getNumProcessedYardsForYear(year);
    result.processedTonnage += yard.getProcessedTonnageForYear(year);
    result.totalCapa += yard.annualCapacity;
  }

  result.spareCapa = result.totalCapa - result.processedTonnage;

  return result;
}

Runner.printToHTML = function(){
  for (var [key,yardToPrint] of this.yards) {
    yardToPrint.toHtml();
  }

  return this;
}

Runner.printToJSON = function(){
  let features = [];
  for (var [key,yardToPrint] of this.yards) {
    yardToPrint.toJson(features);
  }
  document.getElementById("JsonPrint").innerHTML = JSON.stringify(features);

  return this;
}

Runner.printPlatformsOperationnal = function(){
  let features = [];
  for (platform of this.platforms) {
    features.push(platform.toJson());
  }

  return { "features": features};
}

Runner.printPlatformsDecommissioned = function(){
  let features = [];
  for (platform of this.platforms) {
    let json = platform.toJson();
    json.properties.start = json.properties.end;
    json.properties.end = "2049";
    features.push(json);
  }

  return { "features": features};
}

Runner.printPlatformsDecommissionedCurrent = function(){
  let features = [];
  for (platform of this.platforms) {
    let json = platform.toJson();
    json.properties.start = json.properties.end;
    let end = ++json.properties.end;
    json.properties.end = end + "";
    features.push(json);
  }

  return { "features": features};
}

Runner.findOversizedPlatforms = function(){
  var biggestYard;

  for (var [key,yard] of this.yards) {
    if(!biggestYard || biggestYard.annualCapacity < yard.annualCapacity){
      biggestYard = yard;
    }
  }

  console.log("Biggest yard is " + biggestYard);
  for (let platform of this.platforms) {
    if(platform.tonnage > biggestYard.annualCapacity){
      console.log("platform too big: " + platform);
    }
  }
}

class Yard{
  constructor(id, name, annualCapacity, value){
    this.id = id;
    this.annualCapacity = annualCapacity;
    this.orderBook = new Map();
    this.name = name;
    this.value = value;
  }

  getProcessedTonnageForYear(year){
    let order = this.orderBook.get(year);
    return (order) ? order.annualDemand : 0;
  }

  getSpareCapaForYear(year){
    let order = this.orderBook.get(year);
    return (order) ? this.annualCapacity - order.annualDemand : 0;
  }

  getNumProcessedYardsForYear(year){
      let order = this.orderBook.get(year);
      return (order) ? order.platforms.length : 0;
  }

  addToOrderBook(platform){
    let order = this.orderBook.get(platform.decommissionedYear);
    if(!order){
      order = new Order();
      this.orderBook.set(platform.decommissionedYear, order);
    }
    if(order.annualDemand + platform.tonnage > this.annualCapacity){
      order.markAsFull();
      return false;
    }else {
      order.addPlatform(platform);
      return true;
    }
  }

  toString(){
    let details = this.name + " " + this.annualCapacity + " ";
    return details;
  }

toHtml(){
  let html = "<div id="+this.name+">" + "<h1>" + this.name + "</h1><ul>";

  for (let [year,order] of this.orderBook) {
    html += "<li>ORDER FOR year: " + year + " with annual demand : " + order.annualDemand;
    html += order.toHtml();
    html += "</li><br/>";
  }

  html += "</ul></div>";
  document.getElementById("htmlPrint").innerHTML += html;
}

toJson(features){

  for (let year=2016;year<2049;year++) {
    let key = year + "";
    let order = this.orderBook.get(key);

    let fullPerc = 0;
    if(order){
      fullPerc = 1;
    }

    let toAdd = this.value;

    let yardJson = {
      properties : {
        "ID_Yard" : this.id,
        "Name" : this.name,
        "start" : year + "-01-01",
        "end" : (year+1) + "-01-01",
        "full" : fullPerc,
        "Annual_Cap" : this.annualCapacity,
        "start_1" : "2016-01-01",
        "end_1" : "2048-01-01",
        "Annual_CaT" : this.value.properties.Annual_Cap/1000 + "",
        "Contact" : this.value.properties.Contact,
        "Phone" : this.value.properties.Phone,
        "Email" : this.value.properties.Email,
        "Quay_depth": this.value.properties.Quay_depth,
        "Quay_stren": this.value.properties.Quay_stren,
        "Hydrocarbo": this.value.properties.Hydrocarbo,
        "PCBS": this.value.properties.PCBS,
        "Chemicals": this.value.properties.Chemicals,
        "HeavyMetal": this.value.properties.HeavyMetal,
        "Radioactiv": this.value.properties.Radioactiv,
        "Asbestos": this.value.properties.Asbestos,
        "Metal": this.value.properties.Metal,
        "Concrete": this.value.properties.Concrete,
        "Electrical": this.value.properties.Electrical,
        "Plastics": this.value.properties.Plastics,
        "Wood": this.value.properties.Wood,
        "Norm": this.value.properties.Norm,
        "Verified": this.value.properties.Verified,
      }
    };

    yardJson.geometry = {};
    yardJson.geometry.coordinates= [this.value.geometry.coordinates[0], this.value.geometry.coordinates[1]];
    yardJson.geometry.type = this.value.geometry.type;
    yardJson.type = this.value.type;

    features.push(yardJson);
  }
}
}

class Order{
  constructor(){
    this.platforms = [];
    this.isFull = false;
    this.annualDemand = 0;
  }

  addPlatform(platformToAdd){
    this.platforms.push(platformToAdd);
    this.annualDemand += platformToAdd.tonnage;
  }

  markAsFull(){
    this.isFull = true;
  }

  toString(){
    let details = this.isFull + " " + this.annualDemand;
    for (platform of this.platforms) {
      details += platform + " ";
    }
    return details;
  }

  toHtml(){
    let html = "<table>";
    html += "<tr>";
    html += "<th>ID</th>";
    html += "<th>Tonnage</th>";
    html += "<th>decommissioned year</th>";

    html += "</tr>";

    for (let platform of this.platforms) {
      html += "<tr>";
      html += "<td>" + platform.id + "</td>";
      html += "<td>" + platform.tonnage + "</td>";
      html += "<td>" + platform.decommissionedYear + "</td>";
      html += "</tr>"
    }

    html += "</table>";

    return html;
  }
}

class Platform{
  constructor(platform){
    this.id = platform.properties.Platform;
    this.tonnage = Math.floor(platform.properties.Weight);
    this.decommissionedYear = platform.properties.end.substring(0,4);
    // !!!!! yard prefs were reversed due to Aiden's lack of rigour
    this.yardPrefs = platform.properties.Yard_prefs.reverse();

    this.name = platform.properties.Name;
    this.current_st = platform.properties.Current_St;
    this.weight_top= platform.properties.Weight_top;
    this.weight_sub = platform.properties.Weight_sub;
    this.start = platform.properties.start.substring(0,4);
    this.geometry = platform.geometry;
  }

  toString(){
    return this.id + " " + this.decommissionedYear + " " + this.tonnage;
  }

  toJson(){
    let platform = {
      properties: {
        "Name" : this.name,
        "Current_St": this.current_st,
        "Weight_top": this.weight_top,
        "Weight_sub": this.weight_sub,
        "start": this.start,
        "end": this.decommissionedYear
      },
      geometry:{
        "type": "Point",
        "coordinates" : [this.geometry.coordinates[0], this.geometry.coordinates[1]]
      },
      "type": "Feature"
    };

    return platform;
  }
}
