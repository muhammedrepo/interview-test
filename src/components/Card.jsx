import Chart from "./Chart";

const Card = ({ id, avatar, Name, occupation, user }) => {
  return (
    <div
      className="w-full max-w-md bg-white rounded-2xl border-4 border-black shadow-md"
      key={id}
    >
      <div className="flex flex-col p-4">
        <div className="flex items-center gap-4">
          {user.firstLetter ? (
            <div className="grid place-items-center w-24 h-24 rounded-full shadow-lg">
              <h2 className="text-4xl text-black ">{user.firstLetter}</h2>
            </div>
          ) : (
            <img
              className="mb-3 w-24 h-24 rounded-full shadow-lg"
              src={avatar}
              alt="avatar"
            />
          )}

          <div className="flex flex-col items-center">
            <h5 className="text-2xl font-bold text-[#2C3F50]">{Name}</h5>
            <span className="text-base text-gray-400 font-bold">
              {occupation}
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <Chart user={user} />

          <div className="text-white">
            <div className="flex flex-col mb-2">
              <span className="text-xl font-bold text-[#E67F24]">
                {user.impressionSum.toLocaleString()}
              </span>

              <span className="text-gray-400">impressions</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold text-[#2D82BA]">
                {user.conversionSum.toLocaleString()}
              </span>
              <span className="text-gray-400 ">conversions</span>
            </div>
            <div className="font-bold text-2xl text-[#64C388]">
              ${Math.ceil(user.revenueSum).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
