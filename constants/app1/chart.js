/* eslint-disable no-console */
import Chart from "chart.js";
const math = require("mathjs");
const chartColors = {
  red: "rgb(255, 99, 132)",
  orange: "rgb(255, 159, 64)",
  yellow: "rgb(255, 205, 86)",
  green: "rgb(75, 192, 192)",
  blue: "rgb(54, 162, 235)",
  purple: "rgb(153, 102, 255)",
  grey: "rgb(201, 203, 207)"
};
var color = Chart.helpers.color;
Chart.plugins.register({
  afterDatasetsDraw: function(chart) {
    var ctx = chart.ctx;
    chart.data.datasets.forEach(function(dataset, i) {
      var meta = chart.getDatasetMeta(i);
      if (!meta.hidden && dataset.labels) {
        meta.data.forEach(function(element, index) {
          // Draw the text in black, with the specified font

          var fontSize = 16;
          var fontStyle = "normal";
          var fontFamily = "Helvetica Neue";
          ctx.font = Chart.helpers.fontString(fontSize, fontStyle, fontFamily);
          // Just naively convert to string for now
          var lb = dataset.labels[index];
          // Make sure alignment settings are correct
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          var padding = 6;
          var position = element.tooltipPosition();
          if (lb.dsp) {
            var dataString = lb.dsp;
            if (dataString["name"]) {
              ctx.fillStyle = dataset.borderColor;
              ctx.fillText(
                dataString["name"],
                position.x,
                position.y - 0.5 * fontSize - padding
              );
            }
            if (dataString["up"]) {
              ctx.fillStyle = "rgb(255, 51, 51)";
              ctx.fillText(
                dataString["up"],
                position.x,
                position.y - fontSize - 2 * padding
              );
            }
            if (dataString["down"]) {
              ctx.fillStyle = "rgb(102, 0, 0)";
              ctx.fillText(
                dataString["down"],
                position.x,
                position.y + 0.5 * fontSize + padding
              );
            }
          }
        });
      }
    });
  }
});

function opfn(L) {
  let ops;
  ops = {
    pan: {
      // Boolean to enable panning
      enabled: true,

      // Panning directions. Remove the appropriate direction to disable
      // Eg. 'y' would only allow panning in the y direction
      mode: "xy",
      rangeMin: {
        // Format of min pan range depends on scale type
        x: null,
        y: null
      },
      rangeMax: {
        // Format of max pan range depends on scale type
        x: null,
        y: null
      }
    },

    // Container for zoom options
    zoom: {
      // Boolean to enable zooming
      enabled: true,

      // Enable drag-to-zoom behavior
      drag: true,

      // Zooming directions. Remove the appropriate direction to disable
      // Eg. 'y' would only allow zooming in the y direction
      mode: "xy",
      rangeMin: {
        // Format of min zoom range depends on scale type
        x: null,
        y: null
      },
      rangeMax: {
        // Format of max zoom range depends on scale type
        x: null,
        y: null
      }
    },
    legend: {
      labels: {
        generateLabels: function(chart) {
          var goodDataset = chart.data.datasets.filter(
            dataset => dataset.labels
          );
          return goodDataset.map(function(dataset, i) {
            return {
              text: dataset.label,
              fillStyle: dataset.backgroundColor,
              hidden: !chart.isDatasetVisible(i),
              lineCap: dataset.borderCapStyle,
              lineDash: dataset.borderDash,
              lineDashOffset: dataset.borderDashOffset,
              lineJoin: dataset.borderJoinStyle,
              lineWidth: dataset.borderWidth,
              strokeStyle: dataset.borderColor,
              pointStyle: dataset.pointStyle,
              // Below is extra data used for toggling the datasets
              datasetIndex: i
            };
          }, this);
        }
      },
      onClick: function(e, legendItem) {
        var index = legendItem.datasetIndex;
        var ci = this.chart;
        var meta = ci.getDatasetMeta(index);
        if (index == 1) {
          for (let i = 2; i < ci.data.datasets.length; i++) {
            var meta1 = ci.getDatasetMeta(i);
            meta1.hidden =
              meta.hidden === null ? !ci.data.datasets[i].hidden : null;
          }
        }
        meta.hidden =
          meta.hidden === null ? !ci.data.datasets[index].hidden : null;

        ci.update();
      },
      responsive: true
    },
    /*title: {
            display: true,
            text: 'Structure'
        },*/
    tooltips: {
      callbacks: {
        label: function(ti, data) {
          // eslint-disable-next-line no-unused-vars
          var dslb = data.datasets[ti.datasetIndex].label;
          if (data.datasets[ti.datasetIndex].labels) {
            var label = data.datasets[ti.datasetIndex].labels[ti.index].tltp;
            // eslint-disable-next-line no-unused-vars
            var x = data.datasets[ti.datasetIndex].data[ti.index].x;
            // eslint-disable-next-line no-unused-vars
            var y = data.datasets[ti.datasetIndex].data[ti.index].y;
          }
          return label;
        }
      }
    },
    scales: {
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: L["xlabel"]
          },
          ticks: { max: L["X__max"], min: L["X__min"] }
        }
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: L["ylabel"]
          },
          ticks: { max: L["Z__max"], min: L["Z__min"] }
        }
      ]
    }
  };

  return ops;
}
function ndfn(L) {
  let nds;
  nds = {
    type: "scatter",
    label: L["label"],
    labels: L["labels"],
    borderColor: chartColors.red,
    backgroundColor: color(chartColors.red)
      .alpha(0.2)
      .rgbString(),
    data: L["data"]
  };
  return nds;
}
function brfn(L) {
  var brg = { brm: {}, brs: [] };
  var i = 0;
  var len = L.data.length;
  brg.brm = {
    type: "scatter",
    label: L["label"],
    labels: L["labels"],
    borderColor: chartColors.blue,
    backgroundColor: color(chartColors.red)
      .alpha(0.2)
      .rgbString(),
    data: L.dtm
  };
  for (; i < len; ) {
    brg.brs.push({
      pointRadius: 1,
      pointBorderColor: "red",
      pointBackgroundColor: "red",
      type: "scatter",
      showLine: true,
      fill: false,
      borderColor: chartColors.blue,
      backgroundColor: color(chartColors.blue)
        .alpha(0.2)
        .rgbString(),
      data: L.data[i]
    });
    i++;
  }
  return brg;
}
export function cht(pr, dt) {
  let dtj;
  dtj = { nd: null, br: null, op: null };
  if (pr.nodes) {
    let xmin, xmax, zmin, zmax;
    xmin = Math.min(...pr.nodes.map(cv => cv.X));
    xmax = Math.max(...pr.nodes.map(cv => cv.X));
    zmin = Math.min(...pr.nodes.map(cv => cv.Z));
    zmax = Math.max(...pr.nodes.map(cv => cv.Z));
    dtj.op = {
      X__min: Math.min(xmin, 0),
      X__max: Math.max(xmax + 0.1 * (xmax - xmin), 0.1),
      Z__min: Math.min(zmin, 0),
      Z__max: Math.max(zmax + 0.2 * (zmax - zmin), 0.1)
    };
  } else {
    dtj.op = { X__max: 3, Z__max: 3, X__min: 0, Z__min: 0 };
  }
  dtj.op = Object.assign(dtj.op, { xlabel: "X [m]", ylabel: "Z [m]" });
  dtj.nd = { label: "Node", data: [], labels: [] };
  pr.nodes.forEach(nd => {
    dtj.nd.data.push({ x: nd.X, y: nd.Z });
    let lb;
    lb = {
      dsp: { name: nd.name.toString() },
      tltp: [
        " Node : " + nd.name.toString(),
        " x : " + nd.X.toString(),
        " z : " + nd.Z.toString()
      ]
    };
    if (nd.Support.name != "None") {
      if (dt.cdn.includes("Support")) {
        lb.dsp.down = nd.Support.name;
      }
      lb.tltp.push(" Support : " + nd.Support.name);
    }
    if (nd.pls.length > 0) {
      if (dt.cdn.includes("Point Loads")) {
        lb.dsp.up = nd.pls.map(cv => cv.name).join(",");
      }
      lb.tltp.push(" Point Loads : " + nd.pls.map(cv => cv.name).join(","));
    }
    dtj.nd.labels.push(lb);
  });
  dtj.br = {
    label: dt.cdb.includes("Section") ? "Bar(Section)" : "Bar",
    data: [],
    dtm: [],
    labels: []
  };
  pr.bars.forEach(br => {
    dtj.br.data.push([{ x: br.N1.X, y: br.N1.Z }, { x: br.N2.X, y: br.N2.Z }]);
    dtj.br.dtm.push({
      x: 0.5 * (br.N1.X + br.N2.X),
      y: 0.5 * (br.N1.Z + br.N2.Z)
    });
    let lb;
    lb = {
      dsp: {
        name: dt.cdb.includes("Section")
          ? br.name.toString() + "(" + br.Section.name + ")"
          : br.name.toString()
      },
      tltp: [
        " Bar : " + br.name.toString(),
        " Section(" +
          br.Section.type.replace("_", " ") +
          ") : " +
          br.Section.name
      ]
    };
    if (br.Release.name != "None") {
      if (dt.cdb.includes("Release")) {
        lb.dsp.down = br.Release.name;
      }
      lb.tltp.push(" Release : " + br.Release.name);
    }
    if (br.dls.length > 0) {
      if (dt.cdb.includes("Distributed Loads")) {
        lb.dsp.up = br.dls.map(cv => cv.name).join(",");
      }
      lb.tltp.push(" *Distributed_loads* :");
      ["Uniform_Load", "Trapezoidal_Load", "Self_Weight"].forEach(ch => {
        let chl;
        chl = br.dls.filter(cv => cv.type === ch);
        if (chl.length > 0) {
          lb.tltp.push(
            "      " +
              ch.replace("_", " ") +
              "s : " +
              chl.map(cv => cv.name).join(",")
          );
        }
      });
    }
    dtj.br.labels.push(lb);
  });
  return dtj;
}

export function DChfn(pr, dt) {
  let brg, dtch, DCh, dtj;
  dtj = cht(pr, dt);
  dtch = { datasets: [] };
  dtch.datasets.push(ndfn(dtj["nd"]));
  brg = brfn(dtj["br"]);
  dtch.datasets.push(brg.brm);
  Array.prototype.push.apply(dtch.datasets, brg.brs);
  DCh = { data: dtch, options: opfn(dtj["op"]) };
  return DCh;
}

export function chdt(br, fld, fct, xm) {
  const chbr = {
    data: [{ x: 0, y: 0 }, { x: br.L, y: 0 }],
    label: "Bar " + String(br.name),
    labels: [["0"], [String(br.L)]]
  };
  const x_vals = Array(math.round(br.L, 2) * 100 + 1)
    .fill()
    .map((_, i) => math.round(0.01 * i, 2));
  const y_vals = x_vals.map(cv => math.round(fct(cv), fld.unite.rd));
  const data = x_vals.map((cv, i) => {
    return { x: cv, y: y_vals[i] };
  });
  const ym = xm.map(cv => math.round(fct(cv), fld.unite.rd));
  const datam = xm.map((cv, i) => {
    return { x: cv, y: ym[i] };
  });
  const lb = xm.map((cv, i) => {
    return {
      dsp: {
        [![0, xm.length - 1].includes(i) ? "name" : "down"]:
          "(" + String(cv) + ";" + String(ym[i]) + ")"
      }
    };
  });
  const fc = { data: data, label: fld.name + " = f (x)" };
  const fcm = { data: datam, label: "extremes", labels: lb };
  const ops = {
    xlabel: "X[m]",
    ylabel: fld.name + fld.unite.lb,
    X__min: 0,
    Z__min: Math.min(...y_vals, 0) - 0.2 * Math.abs(Math.min(...y_vals, 0)),
    X__max: 1.1 * br.L,
    Z__max: Math.max(...y_vals, 0) + 0.4 * Math.abs(Math.max(...y_vals, 0))
  };
  const dtjfc = { br: chbr, fc: fc, fcm: fcm, ops: ops };
  return dtjfc;
}

function opsfn(L) {
  const ops = {
    scales: {
      xAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: L["xlabel"]
          },
          ticks: { max: L["X__max"], min: L["X__min"] }
        }
      ],
      yAxes: [
        {
          scaleLabel: {
            display: true,
            labelString: L["ylabel"]
          },
          ticks: { max: L["Z__max"], min: L["Z__min"] }
        }
      ]
    }
  };

  return ops;
}
export function Plfn(dtj) {
  var dtch = { datasets: [] };
  const Lbr = dtj["br"];
  const br = {
    label: Lbr["label"],
    labels: Lbr["labels"],
    pointRadius: 4,
    pointBorderColor: "blue",
    pointBackgroundColor: "blue",
    type: "scatter",
    showLine: true,
    fill: true,
    borderColor: chartColors.blue,
    backgroundColor: color(chartColors.blue)
      .alpha(0.2)
      .rgbString(),
    data: Lbr["data"]
  };
  const Lfc = dtj["fc"];
  const fc = {
    label: Lfc["label"],
    pointRadius: 1,
    pointBorderColor: "green",
    pointBackgroundColor: "green",
    type: "scatter",
    showLine: true,
    fill: true,
    borderColor: chartColors.green,
    backgroundColor: color(chartColors.green)
      .alpha(0.2)
      .rgbString(),
    data: Lfc["data"]
  };
  var Lfcm = dtj["fcm"];
  const fcm = {
    label: Lfcm["label"],
    labels: Lfcm["labels"],
    pointRadius: 4,
    pointBorderColor: "red",
    pointBackgroundColor: "red",
    type: "scatter",
    showLine: false,
    fill: false,
    borderColor: chartColors.red,
    backgroundColor: color(chartColors.red)
      .alpha(0.2)
      .rgbString(),
    data: Lfcm["data"]
  };
  dtch.datasets.push(fcm);
  dtch.datasets.push(fc);
  dtch.datasets.push(br);

  const ops = opsfn(dtj["ops"]);
  const DCh = { data: dtch, options: ops };
  return DCh;
}
