let initial = window.operationall.features;
let initialPlatforms = {};


for (platform of initial) {
  initialPlatforms[platform.properties.ID] = platform;
}

let modified = window.platformsWithPrefs.features;
for (platform of modified) {
  let name = platform.properties.Platform;
  let initialPlatform = initialPlatforms[name];

  platform.properties.Weight = Math.floor(initialPlatform.properties.Weight_sub) + Math.floor(initialPlatform.properties.Weight_top);
  platform.properties.end = initialPlatform.properties.end;
  platform.properties.start = initialPlatform.properties.start;
  platform.properties.Name = initialPlatform.properties.Name;
  platform.properties.Current_St = initialPlatform.properties.Current_St;
  platform.properties.Weight_top= initialPlatform.properties.Weight_top;
  platform.properties.Weight_sub = initialPlatform.properties.Weight_sub;
  platform.properties.start = initialPlatform.properties.start.substring(0,4);
  platform.geometry = initialPlatform.geometry;
}

document.getElementById("htmlPrint").innerHTML = JSON.stringify(window.platformsWithPrefs);
