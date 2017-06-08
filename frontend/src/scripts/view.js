/**
 * Mitsift Sift. Frontend view entry point.
 */
import {
  SiftView,
  registerSiftView
} from '@redsift/sift-sdk-web';

export default class MyView extends SiftView {
  constructor() {
    // You have to call the super() method to initialize the base class.
    super();

    // Listens for 'count' events from the Controller
    this.controller.subscribe('messageSummarys', this.onMsgSummarys.bind(this));
  }

  // for more info: http://docs.redsift.com/docs/client-code-siftview
  presentView(value) {
    console.log('mitsift: presentView: ', value);
    let data = this.onMsgSummarys(value.data);
    //https://raw.githubusercontent.com/TomNeyland/angular-dc/master/example/stocks/morley.csv
        var yearHeat = dc.heatMap("#yearHeat");
        console.log("YEARHEAT ", yearHeat, data)
        var monthHeat = dc.heatMap("#monthHeat");
        var dayHeat = dc.heatMap("#dayHeat");
        var daynameHeat = dc.heatMap("#daynameHeat");
        var yearChart = dc.rowChart("#yearChart");
        var monthChart = dc.rowChart("#monthChart");
        var dayChart = dc.rowChart("#dayChart");
        var daynameChart = dc.rowChart("#daynameChart");
        var hourChart = dc.barChart("#hourChart");

        var sentChart = dc.rowChart("#sentChart"),
          receiveChart = dc.rowChart("#receiveChart"),
          messageIdChart = dc.rowChart("#messageIdChart"),
          fercChart = dc.rowChart("#fercChart"),
          affairChart = dc.rowChart("#affairChart"),
          investigationChart = dc.rowChart("#investigationChart"),
          meetingChart = dc.rowChart("#meetingChart"),
          planChart = dc.rowChart("#planChart"),
          servicesChart = dc.rowChart("#servicesChart");

        //Crossfilter
        var ndx = crossfilter(data),
          hourYearDim = ndx.dimension(function(d) {
            return [+d.Hour, +d.Year];
          }),
          hourYearGroup = hourYearDim.group().reduceSum(function(d) {
            return +d.email_Value;
          }),
          hourMonthDim = ndx.dimension(function(d) {
            return [+d.Hour, +d.Month];
          }),
          hourMonthGroup = hourMonthDim.group().reduceSum(function(d) {
            return +d.email_Value;
          }),
          hourDayDim = ndx.dimension(function(d) {
            return [+d.Hour, +d.Day];
          }),
          hourDayGroup = hourDayDim.group().reduceSum(function(d) {
            return +d.email_Value;
          }),
          hourDaynameDim = ndx.dimension(function(d) {
            return [+d.Hour, d.DayName];
          }),
          hourDaynameGroup = hourDaynameDim.group().reduceSum(function(d) {
            return +d.email_Value;
          }),
          yearDimension = ndx.dimension(function(d) {
            return d.Year;
          }),
          yearGroup = yearDimension.group().reduceSum(function(d) {
            return +d.email_Value;
          }),
          monthDimension = ndx.dimension(function(d) {
            return d.Month;
          }),
          monthGroup = monthDimension.group().reduceSum(function(d) {
            return +d.email_Value;
          }),
          dayDimension = ndx.dimension(function(d) {
            return d.Day;
          }),
          dayGroup = dayDimension.group().reduceSum(function(d) {
            return d.email_Value;
          }),
          daynameDimension = ndx.dimension(function(d) {
            return d.DayName;
          }),
          daynameGroup = daynameDimension.group().reduceSum(function(d) {
            return d.email_Value;
          }),
          hourDimension = ndx.dimension(function(d) {
            return d.Hour;
          }),
          hourGroup = hourDimension.group().reduceSum(function(d) {
            return d.email_Value;
          }),
          messageIdDimension = ndx.dimension(function(d) {
            return d.MessageID;
          }),
          messageIdGroup = messageIdDimension.group().reduceSum(function(d) {
            return d.email_Value;
          }),
          sentDimension = ndx.dimension(function(d) {
            return d.SenderEmail;
          }),
          sentGroup = sentDimension.group().reduceSum(function(d) {
            return d.email_Value;
          }),
          receiveDimension = ndx.dimension(function(d) {
            return d.RecieverEmail;
            //{ return d.individuals == "kay"; })
          }),
          receiveGroup = receiveDimension.group().reduceSum(function(d) {
            return d.email_Value;
          }),
          fercDimension = ndx.dimension(function(d) {
            return d.has_FERC;
          }),
          fercGroup = fercDimension.group(),
          affairDimension = ndx.dimension(function(d) {
            return d.has_Affair;
          }),
          affairGroup = affairDimension.group(),
          investigationDimension = ndx.dimension(function(d) {
            return d.has_Investigation;
          }),
          investigationGroup = investigationDimension.group(),
          meetingDimension = ndx.dimension(function(d) {
            return d.has_Meeting;
          }),
          meetingGroup = meetingDimension.group(),
          planDimension = ndx.dimension(function(d) {
            return d.has_Plan;
          }),
          planGroup = planDimension.group(),
          servicesDimension = ndx.dimension(function(d) {
            return d.has_Services;
          }),
          servicesGroup = servicesDimension.group();

        var color1 = d3.scale
          .linear()
          // .domain([0, 1, 10, 100, 1000])
          //  .domain([0, 1700])
          .domain([
            0,
            d3.max(data, function(d) {
              return d.Year;
            })
          ])
          //.interpolate(d3.interpolateRgb)
          //.range(['#edf8fb','#ccece6','#99d8c9','#66c2a4','#2ca25f','#006d2c']);
          .range(["#edf8fb", "#006d2c"]);

        var color2 = d3.scale
          .linear()
          // .domain([0, 1, 10, 100, 1000])
          .domain([0, 525])
          //.domain([0, d3.max(data, function(d) {return d.Month})])
          //.range(['#edf8fb','#ccece6','#99d8c9','#66c2a4','#2ca25f','#006d2c']);
          .range(["#edf8fb", "#006d2c"]);

        var color3 = d3.scale
          .linear()
          // .domain([0, 1, 10, 100, 1000])
          .domain([0, 350])
          // .domain([0, d3.max(data, function(d) {return +d.Day})])
          //.range(['#edf8fb','#ccece6','#99d8c9','#66c2a4','#2ca25f','#006d2c']);
          .range(["#edf8fb", "#006d2c"]);

        var color4 = d3.scale
          .linear()
          // .domain([0, 1, 10, 100, 1000])
          .domain([0, 1000])
          //.range(['#edf8fb','#ccece6','#99d8c9','#66c2a4','#2ca25f','#006d2c']);
          .range(["#edf8fb", "#006d2c"]);

        //Year-hour Heatmap
        console.log("BEFORE YH RENDER ", yearHeat)
        document.yearHeat = yearHeat;
        yearHeat
          .width(980)
          .height(160)
          .dimension(hourYearDim)
          .group(hourYearGroup)
          .keyAccessor(function(d) {
            return +d.key[0];
          })
          .valueAccessor(function(d) {
            return +d.key[1];
          })
          .colorAccessor(function(d) {
            return +d.value;
          })
          .title(function(d) {
            return (
              "Hour:   " +
              d.key[0] +
              "\n" +
              "Year:  " +
              d.key[1] +
              "\n" +
              "Emails: " +
              d.value
            );
          })
          //(365 + d.value) + " %";})
          //.colors(['#edf8fb','#ccece6','#99d8c9','#66c2a4','#2ca25f','#006d2c'])
          //.calculateColorDomain()
          .xBorderRadius(0) //for non-roundedness (rectangle)
          .yBorderRadius(0) //for non-roundedness (rectangle)
          .colors(color1)
          .render();

        //Month-hour Heatmap
        monthHeat
          .width(980)
          .height(260)
          .dimension(hourMonthDim)
          .group(hourMonthGroup)
          .keyAccessor(function(d) {
            return +d.key[0];
          })
          .valueAccessor(function(d) {
            return +d.key[1];
          })
          .colorAccessor(function(d) {
            return +d.value;
          })
          .title(function(d) {
            return (
              "Hour:   " +
              d.key[0] +
              "\n" +
              "Month:  " +
              d.key[1] +
              "\n" +
              "Emails: " +
              d.value
            );
          })
          //(365 + d.value) + " %";})
          // .colors(['#edf8fb','#ccece6','#99d8c9','#66c2a4','#2ca25f','#006d2c'])
          // .calculateColorDomain()
          .xBorderRadius(0) //for non-roundedness (rectangle)
          .yBorderRadius(0) //for non-roundedness (rectangle)
          .colors(color2)
          .render();

        //Day-hour Heatmap
        dayHeat
          .width(980)
          .height(510)
          .dimension(hourDayDim)
          .group(hourDayGroup)
          .keyAccessor(function(d) {
            return +d.key[0];
          })
          .valueAccessor(function(d) {
            return +d.key[1];
          })
          .colorAccessor(function(d) {
            return +d.value;
          })
          .title(function(d) {
            return (
              "Hour:   " +
              d.key[0] +
              "\n" +
              "Day:  " +
              d.key[1] +
              "\n" +
              "Emails: " +
              d.value
            );
          })
          //(365 + d.value) + " %";})
          // .colors(['#edf8fb','#ccece6','#99d8c9','#66c2a4','#2ca25f','#006d2c'])
          // .calculateColorDomain()
          .xBorderRadius(0) //for non-roundedness (rectangle)
          .yBorderRadius(0) //for non-roundedness (rectangle)
          .colors(color3)
          .render();

        //DayName-hour Heatmap
        daynameHeat
          .width(980)
          .height(210)
          .dimension(hourDaynameDim)
          .group(hourDaynameGroup)
          .keyAccessor(function(d) {
            return +d.key[0];
          })
          .valueAccessor(function(d) {
            if (d.key[1] == "Monday") return 1;
            else if (d.key[1] == "Tuesday") return 2;
            else if (d.key[1] == "Wednesday") return 3;
            else if (d.key[1] == "Thursday") return 4;
            else if (d.key[1] == "Friday") return 5;
            else if (d.key[1] == "Saturday") return 6;
            else if (d.key[1] == "Sunday") return 7;
          })
          .colorAccessor(function(d) {
            return +d.value;
          })
          .title(function(d) {
            return (
              "Hour:   " +
              d.key[0] +
              "\n" +
              "Day Name:  " +
              d.key[1] +
              "\n" +
              "Emails: " +
              d.value
            );
          })
          //(365 + d.value) + " %";})
          // .colors(['#edf8fb','#ccece6','#99d8c9','#66c2a4','#2ca25f','#006d2c'])
          // .calculateColorDomain()
          .xBorderRadius(0) //for non-roundedness (rectangle)
          .yBorderRadius(0) //for non-roundedness (rectangle)
          .colors(color4)
          .render();

        //Years Chart
        yearChart
          .width(500)
          .height(150)
          .margins({
            top: 5,
            left: 3,
            right: 10,
            bottom: 20
          })
          .elasticX(true) //updates x-asis values
          .dimension(yearDimension)
          .group(yearGroup)
          //.label(function (d) { return d.key })
          // .title(function (d) { return d.value })
          .ordering(function(d) {
            return -d.key;
          })
          .colors(["#66c2a4"])
          .render();

        //Months Chart
        monthChart
          .width(500)
          .height(250)
          .margins({
            top: 5,
            left: 3,
            right: 10,
            bottom: 20
          })
          .elasticX(true)
          .dimension(monthDimension)
          .group(monthGroup)
          //.label(function (d) { return d.key })
          // .title(function (d) { return d.value })
          .ordering(function(d) {
            return -d.key;
          })
          .colors(["#66c2a4"])
          .render();

        //Days Chart
        dayChart
          .width(500)
          .height(500)
          .margins({
            top: 5,
            left: 3,
            right: 10,
            bottom: 20
          })
          .elasticX(true)
          .ordering(function(d) {
            return -d.key;
          })
          .dimension(dayDimension)
          .group(dayGroup)
          .colors(["#66c2a4"])
          .render();

        //Day Names Chart
        daynameChart
          .width(500)
          .height(200)
          .margins({
            top: 5,
            left: 3,
            right: 10,
            bottom: 20
          })
          .elasticX(true)
          //.ordering(function(d) { return -d.key })
          .ordering(function(d) {
            if (d.key == "Monday") return 7;
            else if (d.key == "Tuesday") return 6;
            else if (d.key == "Wednesday") return 5;
            else if (d.key == "Thursday") return 4;
            else if (d.key == "Friday") return 3;
            else if (d.key == "Saturday") return 2;
            else if (d.key == "Sunday") return 1;
          })
          .dimension(daynameDimension)
          .group(daynameGroup)
          .colors("#66c2a4")
          .render();

        //Hour Chart
        /*hourChart
        .width(500)
        .height(500)
        .margins({top: 5, left: 3, right: 10, bottom: 20})
        .ordering(function(d) { return -d.key })
        .dimension(hourDimension)
        .group(hourGroup)
        .colors("#66c2a4")
        .render();*/

        hourChart
          .width(980)
          .height(200)
          .elasticY(true)
          //.margins({top: 0, left: 30, right: 0, bottom: 0})
          .x(d3.scale.ordinal())
          .xUnits(dc.units.ordinal)
          .dimension(hourDimension)
          .group(hourGroup)
          // .orientation('bottom')
          .ordering(function(d) {
            return +d.key;
          })
          .elasticY(true) //updates y-axis values
          .barPadding(0.1)
          .outerPadding(0.05)
          .colors("#66c2a4")
          .render();

        //Message ID Chart
        messageIdChart
          .width(500)
          .height(300)
          .elasticX(true)
          .dimension(messageIdDimension)
          .group(messageIdGroup)
          .colors("#fc8d59")
          .render();

        messageIdChart.data(function(messageIdGroup) {
		 console.log("MSGID: ", messageIdGroup.top(10));
          return messageIdGroup.top((10));
        });

        //Individuals Sent Chart
        sentChart
          .width(500)
          .height(300)
          .elasticX(true)
          .dimension(sentDimension)
          .group(sentGroup)
          .colors("#fc8d59")
          .render();

        sentChart.data(function(sentGroup) {
          console.log("SENTG ", sentGroup)
          return sentGroup.top((10));
        });

        //Individuals Receive Chart
        receiveChart
          .width(500)
          .height(300)
          .elasticX(true)
          .dimension(receiveDimension)
          .group(receiveGroup)
          .colors("#fc8d59")
          .render();

        receiveChart.data(function(receiveGroup) {
          return receiveGroup.top((10));
        });

        //affair Chart
        affairChart
          .width(500)
          .height(100)
          .elasticX(true)
          .dimension(affairDimension)
          .group(affairGroup)
          .colors("#74a9cf")
          .render();

        //ferc Chart
        fercChart
          .width(500)
          .height(100)
          .elasticX(true)
          .dimension(fercDimension)
          .group(fercGroup)
          .colors("#74a9cf")
          .render();

        //investigation Chart
        investigationChart
          .width(500)
          .height(100)
          .elasticX(true)
          .dimension(investigationDimension)
          .group(investigationGroup)
          .colors("#74a9cf")
          .render();

        //meeting Chart
        meetingChart
          .width(500)
          .height(100)
          .elasticX(true)
          .dimension(meetingDimension)
          .group(meetingGroup)
          .colors("#74a9cf")
          .render();

        //plan Chart
        planChart
          .width(500)
          .height(100)
          .elasticX(true)
          .dimension(planDimension)
          .group(planGroup)
          .colors("#74a9cf")
          .render();

        //services Chart
        servicesChart
          .width(500)
          .height(100)
          .elasticX(true)
          .dimension(servicesDimension)
          .group(servicesGroup)
          .colors("#74a9cf")
          .render();

        dc.renderAll();
  };

  willPresentView(value) {
    console.log('mitsift: willPresentView: ', value);
  };

  onMsgSummarys(data) {
    let sums = data.map(d=>{
      return JSON.parse(d.value)
    });
    console.log('VIEW SUMMARYS: ', sums);
    return sums
    // Object.keys(data).forEach((k) => {
    //   document.getElementById(k).textContent = data[k];
    // });
  }
}

registerSiftView(new MyView(window));
