import { useEffect, useState } from "react";
import axios from "axios";
import logs from "./logs.json";

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

const config = {
  headers: {
    Authorization: `Bearer key4v56MUqVr9sNJv`,
  },
};

const url =
  "https://api.airtable.com/v0/appBTaX8XIvvr6zEC/Users?maxRecords=12&view=Grid%20view";

const App = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get(url, config)
      .then((res) => {
        const items = res.data.records;
        const fields = [];
        items.forEach((item) => {
          if (item.fields.avatar) {
            fields.push({
              ...item.fields,
              revenueSum: getRevenue(item.fields.Id),
              conversionSum: getConversion(item.fields.Id),
              impressionSum: getImpression(item.fields.Id),
              chartData: getChartConversionData(item.fields.Id),
            });
          } else {
            fields.push({
              revenueSum: getRevenue(item.fields.Id),
              conversionSum: getConversion(item.fields.Id),
              impressionSum: getImpression(item.fields.Id),
              chartData: getChartConversionData(item.fields.Id),
              firstLetter: item.fields.Name.charAt(0),
              ...item.fields,
            });
          }
        });
        setUsers(fields);
        console.log(fields);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const getConversion = (userId) => {
    const filteredLog = logs.filter(
      (log) => log.user_id === userId && log.type === "conversion"
    );
    return filteredLog.length;
  };

  const getImpression = (userId) => {
    const filteredLog = logs.filter(
      (log) => log.user_id === userId && log.type === "impression"
    );
    return filteredLog.length;
  };

  const getRevenue = (userId) => {
    const filteredLog = logs.filter((log) => log.user_id === userId);
    console.log(filteredLog);
    let sum = 0;
    filteredLog.forEach((log) => {
      const revenue = log.revenue;
      sum += revenue;
    });
    return sum;
  };

  const getChartConversionData = (userId) => {
    const filteredLog = logs.filter(
      (log) => log.user_id === userId && log.type === "conversion"
    );

    const chartData = [];
    const checkedDates = [];
    filteredLog.forEach((log) => {
      let dateOccurrence = 1;
      let curDate = log.time.split(" ");
      curDate = curDate[0];

      filteredLog.forEach((log) => {
        let date = log.time.split(" ");
        date = date[0];
        if (date === curDate) {
          dateOccurrence += 1;
        }
      });
      if (!checkedDates.includes(curDate)) {
        chartData.push(dateOccurrence);
      }
      checkedDates.push(curDate);
    });
    return chartData;
  };

  return (
    <section className="pt-20">
      <div className="container mx-auto p-4">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
          {users.map((user) => {
            const { id, Name, avatar, occupation } = user;

            return (
              <div
                className="w-full max-w-md bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700"
                key={id}
              >
                <div className="flex flex-col p-4 pb-10">
                  <div className="flex items-center gap-3">
                    {user.firstLetter ? (
                      <div className="grid place-items-center w-24 h-24 rounded-full shadow-lg">
                        <h2 className="text-4xl text-white ">
                          {user.firstLetter}
                        </h2>
                      </div>
                    ) : (
                      <img
                        className="mb-3 w-24 h-24 rounded-full shadow-lg"
                        src={avatar}
                        alt="avatar"
                      />
                    )}

                    <div className="flex flex-col">
                      <h5 className="mb-1 text-3xl font-medium text-gray-900 dark:text-white">
                        {Name}
                      </h5>
                      <span className="text-lg text-gray-500 dark:text-gray-400">
                        {occupation}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="graph text-white">
                      <div>
                        <HighchartsReact
                          highcharts={Highcharts}
                          options={{
                            yAxis: {
                              gridLineWidth: 0,
                            },
                            credits: {
                              text: "",
                            },

                            title: {
                              text: null,
                            },

                            chart: {
                              width: 300,
                              height: 200,
                              backgroundColor: "transparent",
                            },
                            series: [
                              {
                                data: user.chartData,
                              },
                            ],
                          }}
                        />
                      </div>
                      <div>
                        Conversions <span>4/12 - 4/30</span>
                      </div>
                    </div>

                    <div className="text-white">
                      <div className="flex flex-col mb-4">
                        <span className="font-bold text-blue-200">
                          {user.impressionSum}
                        </span>

                        <span className="text-gray-400">impressions</span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-bold text-blue-200">
                          {user.conversionSum}
                        </span>
                        <span className="text-gray-400 ">conversions</span>
                      </div>
                      <div className="font-bold text-xl">
                        ${Math.ceil(user.revenueSum)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default App;
