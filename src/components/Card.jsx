import Chart from './Chart';

const Card = ({ data }) => {
  return (
    <>
      {data.map((item) => (
        <div
          key={item.id}
          className="w-full bg-white rounded-2xl border-4 border-black shadow-md"
        >
          <div className="flex flex-col p-4">
            <div className="flex items-center gap-4">
              {item.firstLetter ? (
                <div className="grid place-items-center w-24 h-24 rounded-full shadow-lg">
                  <h2 className="text-4xl text-black ">{item.firstLetter}</h2>
                </div>
              ) : (
                <img
                  className="w-24 h-24 rounded-full shadow-lg"
                  src="https://static-cse.canva.com/blob/914998/1600w-EW4cggXkgbc.jpg"
                  alt="avatar"
                />
              )}

              <div className="flex flex-col items-center">
                <h5 className="text-2xl font-bold text-[#2C3F50]">
                  {item.Name}
                </h5>
                <span className="text-base text-gray-400 font-bold">
                  {item.occupation}
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <Chart data={item} />

              <div className="text-white">
                <div className="flex flex-col mb-2">
                  <span className="text-xl font-bold text-[#E67F24]">
                    {item.impressionSum.toLocaleString()}
                  </span>

                  <span className="text-gray-400">impressions</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-xl font-bold text-[#2D82BA]">
                    {item.conversionSum.toLocaleString()}
                  </span>
                  <span className="text-gray-400 ">conversions</span>
                </div>
                <div className="font-bold text-2xl text-[#64C388]">
                  ${Math.ceil(item.revenueSum).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default Card;
