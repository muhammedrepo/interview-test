import { useEffect, useState } from 'react';
import axios from 'axios';
import logs from './logs.json';

import Card from './components/Card';
import SearchBar from './components/SearchBar';
import Loading from './components/Loading';

const config = {
  headers: {
    Authorization: `Bearer key4v56MUqVr9sNJv`,
  },
};

const url =
  'https://api.airtable.com/v0/appBTaX8XIvvr6zEC/Users?maxRecords=Grid%20view';

function App() {
  const [users, setUsers] = useState([]);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(url, config);
        const items = response.data.records;
        const fields = items.map((item) => {
          const { Name, occupation, avatar, Id } = item.fields;
          const firstLetter = Name.charAt(0);

          const userLogs = logs.filter((log) => log.user_id === Id);
          const chartData = getUserChartData(userLogs);

          return {
            Name,
            occupation,
            avatar,
            revenueSum: getUserRevenue(userLogs),
            conversionSum: getUserLogCount(userLogs, 'conversion'),
            impressionSum: getUserLogCount(userLogs, 'impression'),
            chartData,
            firstLetter,
          };
        });
        setUsers(fields);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  function getUserRevenue(logs) {
    return logs.reduce((sum, log) => sum + log.revenue, 0);
  }

  function getUserLogCount(logs, type) {
    return logs.filter((log) => log.type === type).length;
  }

  function getUserChartData(logs) {
    const chartData = [];
    const checkedDates = [];

    logs.forEach((log) => {
      let dateOccurrence = 1;
      let curDate = log.time.split(' ')[0];

      logs.forEach((log) => {
        let date = log.time.split(' ')[0];
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
  }

  function handleSearch(data) {
    return data.filter(
      (item) =>
        item.Name.toLowerCase().includes(query.toLowerCase()) ||
        item.occupation.toLowerCase().includes(query.toLowerCase())
    );
  }

  return (
    <section className="bg-black-gradient w-full overflow-hidden px-6 py-4">
      <div className="flex flex-col justify-center items-center ">
        <div className="xl:max-w-[1280px] w-full">
          <h1 className="font-medium leading-tight text-4xl mt-0 py-4 text-center text-gradient">
            User Accounts Activity
          </h1>
          <SearchBar setQuery={setQuery} />
          {loading ? (
            <Loading />
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 md:gap-8">
              <Card data={handleSearch(users).slice(0, 12)} />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default App;
