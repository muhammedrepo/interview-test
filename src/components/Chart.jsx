import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const Chart = ({ data }) => {
  return (
    <div className="chart">
      <div>
        <HighchartsReact
          highcharts={Highcharts}
          options={{
            xAxis: {
              visible: false,
            },
            yAxis: {
              visible: false,
            },
            credits: {
              text: "",
            },

            title: {
              text: null,
            },

            chart: {
              width: 200,
              height: 110,
              backgroundColor: "transparent",
            },
            legend: {
              enabled: false,
            },
            accessibility: {
              enabled: false,
            },
            series: [
              {
                data: data.chartData,
                color: "#5F5F5F",
              },
            ],
          }}
        />
      </div>
      <div className="text-gray-500">
        Conversions <span>4/12 - 4/30</span>
      </div>
    </div>
  );
};

export default Chart;
