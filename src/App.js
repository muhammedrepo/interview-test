import { useEffect, useState } from "react";
import axios from "axios";
import logs from "./logs.json";

import Card from "./components/Card";

const config = {
  headers: {
    Authorization: `Bearer key4v56MUqVr9sNJv`,
  },
};

const url =
  "https://api.airtable.com/v0/appBTaX8XIvvr6zEC/Users?maxRecords=Grid%20view";

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
    <section className="pt-20 bg-gray-400">
      <div className="container mx-auto p-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map((user) => {
            const { id, Name, avatar, occupation } = user;

            return (
              <Card
                id={id}
                Name={Name}
                avatar={avatar}
                occupation={occupation}
                user={user}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default App;
