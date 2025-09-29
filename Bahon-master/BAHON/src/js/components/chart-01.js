import ApexCharts from "apexcharts";

// ===== chartOne
const chart01 = () => {
  const chartOneOptions = {
    series: [
      {
        name: "Journeys",
        data: [27, 8, 29, 4],
      },

      {
        name: "Revenue",
        data: [120,75,178,49],
      },
    ],
    legend: {
      show: false,
      position: "top",
      horizontalAlign: "left",
    },
    colors: ["#B91C1C", "#015FC9"],
    chart: {
      fontFamily: "Satoshi, sans-serif",
      height: 335,
      type: "area",
      dropShadow: {
        enabled: true,
        color: "#623CEA14",
        top: 10,
        blur: 4,
        left: 0,
        opacity: 0.0,
      },

      toolbar: {
        show: false,
      },
    },
    fill: {
      type: "solid",
      opacity: [0.1, 0.05], // Sets the fill opacity to 0 for both series
    },
    responsive: [
      {
        breakpoint: 1024,
        options: {
          chart: {
            height: 300,
          },
        },
      },
      {
        breakpoint: 1366,
        options: {
          chart: {
            height: 350,
          },
        },
      },
    ],
    stroke: {
      width: [2, 2],
      curve: "straight",
    },

    markers: {
      size: 0,
    },
    labels: {
      show: false,
      position: "top",
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      colors: "#fff",
      strokeColors: ["#B91C1C ", "#015FC9"],
      strokeWidth: 4,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 0,
      discrete: [],
      hover: {
        size: undefined,
        sizeOffset: 5,
      },
    },
    xaxis: {
      type: "category",
      categories: [
        
        "Nov",
        "Dec",
        "Jan",
        "Feb",
        
      ],
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      title: {
        style: {
          fontSize: "0px",
        },
      },
      min: 0,
      max: 200,
    },
  };

  const chartSelector = document.querySelectorAll("#chartOne");

  if (chartSelector.length) {
    const chartOne = new ApexCharts(
      document.querySelector("#chartOne"),
      chartOneOptions
    );
    chartOne.render();
  }
};

export default chart01;
