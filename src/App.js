import { useEffect, useState } from "react";
import axios from "axios";
import logs from "./logs.json";

import Card from "./components/Card";
import SearchBar from "./components/SearchBar";

const config = {
  headers: {
    Authorization: `Bearer key4v56MUqVr9sNJv`,
  },
};

const url =
  "https://api.airtable.com/v0/appBTaX8XIvvr6zEC/Users?maxRecords=Grid%20view";

const App = () => {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState("");

  const keys = ["Name", "occupation"];

  const search = (data) => {
    return data.filter((item) =>
      keys.some((key) => item[key].toLowerCase().includes(query.toLowerCase()))
    );
  };

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
    <section className="bg-black-gradient w-full overflow-hidden px-6 py-4">
      <div className="flex flex-col justify-center items-center ">
        <div className="xl:max-w-[1280px] w-full">
          <h1 className="font-medium leading-tight text-4xl mt-0 py-4 text-center text-gradient">
            User Accounts Activity
          </h1>
          <SearchBar setQuery={setQuery} />

          <div className="grid md:grid-cols-2 xl:grid-cols-3 md:gap-8">
            <Card data={search(users).splice(0, 9)} />
          </div>
        </div>
      </div>
    </section>
  );
};

export default App;
