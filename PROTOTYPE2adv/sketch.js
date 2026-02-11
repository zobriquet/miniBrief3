// let state;
// function setup() {
//     createCanvas(400, 400);
//     bridge = new SerialBridge();
//     bridge.onData('arduino_1', (data) => {
//         // Split by "Predicted: " and take the second part
//         if (data.includes("Predicted: ")) {
//             let parts = data.split("Predicted: ")[1];
//             // Then split by " (" to get just the gesture name
//             let prediction = parts.split(" (")[0];
            
//             console.log(prediction); // e.g., "circle" or "figure8"
            
//             // Use in conditions
//             if (prediction === "wave") {
//                 state = 1;
//                 // Do something
//             } else if (prediction === "tap") {
//                 // Do something else
//                     state = 0;
//             }
//         }
//     });
// }
let state;
let ml;
let currentLabel = "Waiting...";
let currentPercent;

function setup() {
  createCanvas(400, 400);
  
  // Auto-connects to localhost:3100
  ml = new MLBridge();
  
  // Listen for predictions
  ml.onPrediction((data) => {
    if (data.label) {
      currentLabel = data.label;
      currentPercent = int(data.confidence * 100);
    } else if (data.regression) {
      // Handle Regression
      currentLabel = "";
      for (let key in data.regression) {
        currentLabel += key + ": " + nf(data.regression[key], 1, 2) + "\n";
      }
    }
  });
  
}

function draw() {
  background("black");
  fill(255);
  textSize(14);
  textAlign(CENTER, CENTER);
//   text(currentLabel + " (" + currentPercent + "%)", width/2, height/2);
console.log(currentLabel);
let state = (currentLabel.split('_')[1]);
console.log(state);
fill("black");
stroke(255);
rect(0, 360, 90, 40);
noStroke();
textSize(10);
fill("#00FF00");
text("METROPLOITAN", 10, 370);
text("POLICE", 10, 380);
fill(255);
     if (state == 1) {
background("black");
    fill("black");
stroke(255);
rect(0, 360, 90, 40);
noStroke();
textSize(10);
fill("#00FF00");
text("METROPLOITAN", 44, 375);
text("POLICE", 40, 385);
fill("#00FF00");
textSize(14);
    text("[NOTHING SUSPECT]", width/2, height/2);
    text("[DELETE DATA]", width/2, (height/2 + 50));
    textSize(30);
    text("STREET WATCH", width/2, 50);
} else if (state == 2) {
    background("black");
    fill("black");
stroke(255);
rect(0, 360, 90, 40);
noStroke();
textSize(10);
fill("#00FF00");
text("METROPLOITAN", 44, 375);
text("POLICE", 40, 385);
fill("#00FF00");
textSize(14);
    text("[NOTHING SUSPECT]", width/2, height/2);
    text("[DELETE DATA]", width/2, (height/2 + 50));
    textSize(30);
    text("STREET WATCH", width/2, 50);
}
}

// function draw() {

//     if (state == 1) {
//     circle(100, 100, 100);
//     } else if (state == 0) {
//         quad(20, 20, 80, 20, 80, 80, 20, 80);
// }
// }