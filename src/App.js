import { useEffect, useState } from "react";
import axios from "axios";

const config = {
  headers: {
    Authorization: `Bearer key4v56MUqVr9sNJv`,
  },
};

const url =
  "https://api.airtable.com/v0/appBTaX8XIvvr6zEC/Users?maxRecords=3&view=Grid%20view";

const App = () => {
  const [user, setUser] = useState([]);

  axios
    .get(url, config)
    .then((res) => {
      const data = res.data;
      console.log(data);
    })
    .catch((error) => {
      console.log(error);
    });

  return (
    <div className="grid grid-cols-3 gap-4">
      <div className="w-full max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
        <div className="flex flex-col p-4 pb-10">
          <div className="flex items-center gap-3">
            <img
              className="mb-3 w-24 h-24 rounded-full shadow-lg"
              src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
              alt="avatar"
            />
            <div className="flex flex-col">
              <h5 className="mb-1 text-4xl font-medium text-gray-900 dark:text-white">
                Williams
              </h5>
              <span className="text-xl text-gray-500 dark:text-gray-400">
                Web Developer
              </span>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-between">
            <div className="graph text-white">
              <div>graph</div>
              <div>
                Conversions <span>4/12 - 4/30</span>
              </div>
            </div>

            <div className="mt-4 space-x-3 md:mt-6 text-white">
              <div>
                <div className="flex flex-col">
                  20, 345
                  <span>impressions</span>
                </div>
                <div className="flex flex-col">
                  1, 987
                  <span>conversions</span>
                </div>
                <div>$53,982</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
