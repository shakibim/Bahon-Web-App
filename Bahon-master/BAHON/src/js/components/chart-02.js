import ApexCharts from "apexcharts";

// ===== chartTwo
const chart02 = () => {
  const chartTwoOptions = {
    series: [
      {
        name: "Journeys",
        data: [1, 2, 4, 1, 2, 1,3],
      },
      {
        name: "Revenue",
        data: [5, 7, 11, 2, 7, 11,18],
      },
    ],
    colors: ["#B91C1C", "#015FC9"],
    chart: {
      type: "bar",
      height: 335,
      stacked: true,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },

    responsive: [
      {
        breakpoint: 1536,
        options: {
          plotOptions: {
            bar: {
              borderRadius: 0,
              columnWidth: "50%",
            },
          },
        },
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 0,
        columnWidth: "40%",
        borderRadiusApplication: "end",
        borderRadiusWhenStacked: "last",
      },
    },
    dataLabels: {
      enabled: false,
    },

    xaxis: {
      categories: ["M", "T", "W", "T", "F", "S", "S"],
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
      fontFamily: "Satoshi",
      fontWeight: 500,
      fontSize: "14px",

      markers: {
        radius: 99,
      },
    },
    fill: {
      opacity: 1,
    },
  };

  const chartSelector = document.querySelectorAll("#chartTwo");

  if (chartSelector.length) {
    const chartTwo = new ApexCharts(
      document.querySelector("#chartTwo"),
      chartTwoOptions
    );
    chartTwo.render();
  }
};

export default chart02;
