class researchType {
    constructor(name,foodCost,woodCost,rockCost,foodMulti,woodMulti,rockMulti,prereq,bought){
      this.name = name
      this.foodCost = foodCost
      this.woodCost = woodCost
      this.rockCost = rockCost
      this.foodMulti = foodMulti
      this.woodMulti = woodMulti
      this.rockMulti = rockMulti
      this.prereq = prereq
      this.bought = bought
    }
}


var gameData = {
  food: 0,
  alltimeFood: 0,
  foodPerClick: 1,
  
  rakeCount: 0,
  foodPerRake: 0,
  foodPerRakeCost: 10,
  
  wood: 0,
  alltimeWood: 0,
  woodPerClick: 1,
  
  axeCount: 0,
  woodPerAxe: 0,
  woodPerAxeCost: 10,
  
  rock: 0,
  alltimeRock: 0,
  rockPerClick: 1,
  
  pickCount: 0,
  rockPerPick: 0,
  rockPerPickCost: 10,
} 

/* format 
  [food cost, wood cost, rock cost, food multiplier, wood multiplier, rock multiplier, prereq, bought]
  */
var researchInit = 0
var researchData = {
}

function createResearch() {
  let  newResearch = new researchType('ag',10,0,0,2,0,0,'',false)
  let  newResearch2 = new researchType('ag2',20,10,0,2,0,0,'ag',false)
  
  researchData[newResearch.name]=newResearch
  researchData[newResearch2.name]=newResearch2
}

function research(name) {
  console.log(name)
  
  if (researchInit == 0) {
     createResearch()
     researchInit = 1
  }
  
  for (const property in researchData) {
      var keyname = property
      if (keyname == name) {
        let rData = researchData[keyname]
        
        if ( gameData.food >= rData.foodCost && 
             gameData.wood >= rData.woodCost && 
             gameData.rock >= rData.rockCost &&
             (rData.prereq =='' || researchData[rData.prereq].bought == true) ) {
               gameData.food -= rData.foodCost
               gameData.wood -= rData.woodCost
               gameData.rock -= rData.rockCost
               rData.bought = true
               gameData.foodPerClick = gameData.foodPerClick * rData.foodMulti
               document.getElementById("rsrch_"+name).hidden = true
        }
      }
  }
}

function mine() {
  gatherFoodRake()
  gatherWoodAxe()
  gatherRockPick()
  
  document.getElementById("alltime-food").innerHTML = gameData.alltimeFood 
  document.getElementById("alltime-wood").innerHTML = gameData.alltimeWood 
  document.getElementById("alltime-rock").innerHTML = gameData.alltimeRock 
}

/* primary gather functions (click) */
function gatherFood() {
  gameData.food += gameData.foodPerClick 
  gameData.alltimeFood += gameData.foodPerClick 

  document.getElementById("foodGathered").innerHTML = gameData.food
}

function gatherWood() {
  gameData.wood += gameData.woodPerClick 
  gameData.alltimeWood += gameData.woodPerClick 

  document.getElementById("woodGathered").innerHTML = gameData.wood
}

function gatherRock() {
  gameData.rock += gameData.rockPerClick 
  gameData.alltimeRock += gameData.rockPerClick 

  document.getElementById("rockGathered").innerHTML = gameData.rock
}


/* Upgrade auto harvest functions */
function gatherFoodRake() {
  gameData.food += gameData.foodPerRake
  gameData.alltimeFood += gameData.foodPerRake
  document.getElementById("foodGathered").innerHTML = gameData.food
}

function buyRake() {
  if (gameData.food >= gameData.foodPerRakeCost) {
    gameData.food -= gameData.foodPerRakeCost
    gameData.rakeCount += 1
    gameData.foodPerRake += 1
    gameData.foodPerRakeCost *= 2
    document.getElementById("rakeUpgrade").innerHTML = "Rake (" + gameData.rakeCount + ")"
    document.getElementById("rakeUpgrade").title = " Cost: " + gameData.foodPerRakeCost + " Food"
    document.getElementById("foodPerSec").innerHTML = gameData.foodPerRake + " /sec"
  }
}

function gatherWoodAxe() {
  gameData.wood += gameData.woodPerAxe
  gameData.alltimeWood += gameData.woodPerAxe
  document.getElementById("woodGathered").innerHTML = gameData.wood
}

function buyAxe() {
  if (gameData.wood >= gameData.woodPerAxeCost) {
    gameData.wood -= gameData.woodPerAxeCost
    gameData.axeCount += 1
    gameData.woodPerAxe += 1
    gameData.woodPerAxeCost *= 2
    document.getElementById("axeUpgrade").innerHTML = "Axe (" + gameData.axeCount + ")"
    document.getElementById("axeUpgrade").title = " Cost: " + gameData.woodPerAxeCost + " Wood"
    document.getElementById("woodPerSec").innerHTML = gameData.woodPerAxe + " /sec"
  }
}

function gatherRockPick() {
  gameData.rock += gameData.rockPerPick
  gameData.alltimeRock += gameData.rockPerPick
  document.getElementById("rockGathered").innerHTML = gameData.rock
}

function buyPick() {
  if (gameData.rock >= gameData.rockPerPickCost) {
    gameData.rock -= gameData.rockPerPickCost
    gameData.pickCount += 1
    gameData.rockPerPick += 1
    gameData.rockPerPickCost *= 2
    document.getElementById("pickUpgrade").innerHTML = "Pick (" + gameData.pickCount + ")"
    document.getElementById("pickUpgrade").title = " Cost: " + gameData.rockPerPickCost + " Rock"
    document.getElementById("rockPerSec").innerHTML = gameData.rockPerPick + " /sec"
  }
}









function updateButtonState() {
  if (gameData.food < gameData.foodPerRakeCost) {
     document.getElementById("rakeUpgrade").disabled = true
  } else {
     document.getElementById("rakeUpgrade").disabled = false
  }
  
  if (gameData.wood < gameData.woodPerAxeCost) {
     document.getElementById("axeUpgrade").disabled = true
  } else {
     document.getElementById("axeUpgrade").disabled = false
  }
  
  if (gameData.rock < gameData.rockPerPickCost) {
     document.getElementById("pickUpgrade").disabled = true
  } else {
     document.getElementById("pickUpgrade").disabled = false
  }
  
}


function openTab(tabName) {
  var i;
  var x = document.getElementsByClassName("tab");
  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none";
  }
  document.getElementById(tabName).style.display = "block";
}


function updateTotals() {
  document.getElementById("foodGathered").innerHTML = gameData.food
  document.getElementById("woodGathered").innerHTML = gameData.wood
  document.getElementById("rockGathered").innerHTML = gameData.rock
  
}

var mainGameLoop = window.setInterval(function() {
  updateTotals()
  mine()
  updateButtonState()
  updateTotals()
  
}, 1000)