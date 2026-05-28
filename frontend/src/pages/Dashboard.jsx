import Card from "../components/Card";
import cardData from "../data/cardData.json"

const Dashboard = () => {
  const name = "Harsh Kumar";

  return (
    <>
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col gap-2">
        <p className="text-sm font-medium text-slate-500 tracking-wide">
          Welcome Back
        </p>

        <h1 className="text-3xl font-bold text-slate-800">Hi, {name} 👋</h1>

        <p className="text-slate-600 text-sm">
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "long",
            day: "numeric",
            year: "numeric",
          })}
        </p>

        <div className="mt-3 w-20 h-1 rounded-full bg-blue-600"></div>
      </div>

        <div className="grid  grid-cols-2 gap-2 mt-4 md:flex md:justify-evenly">
            {cardData.map((item)=>(
            <Card key={item.id}
                  title={item.title}
                  value={item.value}
                  change={item.change}
                  description={item.description}/>
            ))}
        </div>

      

      
    </>
  );
};

export default Dashboard;
