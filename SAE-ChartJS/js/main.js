const req = new XMLHttpRequest();
req.addEventListener("load", (evt) => {
  let json = JSON.parse(req.responseText);
  let donnees = json[2].data;

  statusChart(donnees);
  meilleurSolver(donnees);
  tempsmoyen(donnees);
  familyChart(donnees);
});
req.open("GET", "results.json");
req.send();

document.addEventListener("DOMContentLoaded", (evt) => {
  localStorage.setItem("ChartIterate", 1);
});

function moyenneTab(tab) {
  let sum = 0;
  tab.forEach(function (item, idx) {
    sum += item;
  });
  return sum / tab.length;
}

function createcanva() {
  let i = localStorage.getItem("ChartIterate");
  let newdiv = document.createElement("div");
  let newCanva = document.createElement("canvas");
  newCanva.setAttribute("id", "chart" + i);
  newdiv.setAttribute("id", "chartD" + i);
  document.querySelector(".container").append(newdiv);
  newdiv.appendChild(newCanva);
  i++;
  localStorage.setItem("ChartIterate", i);
  return "chart" + (i - 1);
}

function statusChart(data) {
  let tabT = {
    SAT: 0,
    UNSAT: 0,
    UNKNOWN: 0,
    UNSUPPORTED: 0,
  };
  data.forEach((elt) => {
    tabT[elt.status]++;
  });
  let tab = Object.keys(tabT).map((k) => tabT[k]);

  let tabN = new Array();
  for (var key in tabT) {
    tabN.push(key + " : " + tabT[key]);
  }


  let chart = createcanva();
  const ctx = document.getElementById(chart);
  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: tabN,
      datasets: [{
        label: "Résultats des solvers",
        data: tab,
        backgroundColor: ["#13678A", "#45C4B0", "#DAFDBA", "#04D939"],
        hoverOffset: 15,
        borderWidth: 0,
      }, ],
    },
    options: {
      layout: {

        padding: 2,
      },
      plugins: {
        legend: {
          labels: {
            color: "white",
            font: {
              size: 18
            }
          }
        }
      },
    },
  });
}

function meilleurSolver(data) {
  let tab = new Array();
  data.forEach((elt) => {
    if (elt.status == "SAT" && tab[elt.name] == null) {
      tab[elt.name] = 1;
    } else if (elt.status == "SAT" && tab[elt.name] != null) {
      tab[elt.name]++;
    }
  });


  let chart = createcanva();
  const ctx = document.getElementById(chart);

  new Chart(ctx, {
    type: "bar",

    data: {
      labels: Object.keys(tab),
      datasets: [{
        label: "Nombre de problèmes résolus par le solveur",
        data: Object.keys(tab).map((k) => tab[k]),
        borderWidth: 0.5,
        backgroundColor: ["#13678A", "#45C4B0", "#DAFDBA", "#04D939"],

      }, ],
    },
    options: {
      layout: {
        padding: 2,
      },
      scales: {
        y: {
            ticks: {
                color: "white"
            }
        },
          x: {
          ticks: {
              color: "white"
          }
      }
      },
      
      plugins: {  
        legend: {
          labels: {
            boxWidth:0,
            color: "white",
            font: {
              size: 18 
            }
          }
        },
      }
    },
  });
}

function tempsmoyen(data) {
  let tab = new Array();
  data.forEach((elt) => {
    if (elt.status === "SAT" || elt.status === "UNSAT") {
      let nom = elt.name;
      if (tab[elt.name] == null) {
        tab[nom] = [elt.time];
      } else {
        tab[nom].push(elt.time);
      }
    }
  });

  let dataset = new Array();
  for (var key in tab) {
    dataset[key] = new Array();
    tab[key].forEach(elt => {
      dataset[key].push(parseInt(elt));
    });
  }

  let datatraited = new Array();
  for (let key in dataset) {
    datatraited[key] = Math.round(moyenneTab(dataset[key]) * 100) / 100;
  }
  datatraited.sort();
  let test = getSortedKeys(datatraited);
  test = test.reverse();
  let tabD = new Array();
  test.forEach(elt => {
    tabD.push(datatraited[elt])
  });
  let chart = createcanva();
  const ctx = document.getElementById(chart);
  new Chart(ctx, {
    type: "bar",

    data: {
      labels: test,
      datasets: [{
        label: "Temps moyen de résolution par solver (en secondes)",
        data: tabD,
        backgroundColor: ["#13678A", "#45C4B0", "#DAFDBA", "#04D939"],
        borderWidth: 0.5,
      }, ],
    },
    options: {
      layout: {
        padding: 2,
      },
      scales: {
        y: {
            ticks: {
                color: "white"
            }
        },
          x: {
          ticks: {
              color: "white",
              fontsize:12,
          }
      }
      },
      plugins: {
        legend: {
          labels: {
            boxWidth:0,
            color: "white",
            font: {
              size: 18
            }
          }
        },
      }
    },
  });
}

function getSortedKeys(obj) {
  var keys = keys = Object.keys(obj);
  return keys.sort(function (a, b) {
    return obj[b] - obj[a]
  });
}

function familyChart(data) {
  let tabT = {
    AztecDiamond: 0,
    BlockedQueens: 0,
    CarSequencing: 0,
    CostasArray: 0,
    Crossword: 0,
    Crypto1: 0,
    DiamondFree: 0,
    Eternity: 0,
    Hadamard: 0,
    Hidato: 0,
    KnightTour2: 0,
    Molnar: 0,
    NurseRostering: 0,
    Ortholatin: 0,
    Pb: 0,
    QuasiGroup: 0,
    NumberPartitioning: 0,
    RoomMate: 0,
    SolitaireBattleship: 0,
    SportsScheduling: 0,
    Superpermutation: 0,

  };
  data.forEach((elt) => {
    tabT[elt.family]++;
  });
  let tab = Object.keys(tabT).map((k) => tabT[k]);

  let tabN = new Array();
  for (var key in tabT) {
    tabN.push(key + " : " + tabT[key]);
  }


  let chart = createcanva();
  const ctx = document.getElementById(chart);
  new Chart(ctx, {
    type: "line",
    data: {
      labels: tabN,
      datasets: [{
        label: "Nombre de familles",
        data: tab,
        backgroundColor: ["#13678A", "#45C4B0", "#DAFDBA", "#04D939"],
        hoverOffset: 15,
        borderWidth: 0,
      }, ],
    },
    options: {
      layout: {
        padding: 2,
      },
      scales: {
        yAxes:[{
          display:true,
          ticks: {
            suggestedMin: 0, 
        }
        }],
        y: {
          max:200,
          min:0,
            ticks: {
                color: "white",
            }
        },
          x: {
          ticks: {
              color: "white",
              fontsize:12,
          }
      }
      },
      plugins: {
        legend: {
          labels: {
            boxWidth:0,
            color: "white",
            font: {
              size: 18
            }
          }
        }
      },
    },
  });
}
