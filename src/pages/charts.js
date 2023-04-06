import dynamic from "next/dynamic";
import BaseLayout from "../../components/BaseLayout/BaseLayout";
import { FaChartBar, FaChartLine, FaChartPie } from "react-icons/fa";

const DynamicBarChart = dynamic(
  () => import("../../components/Charts/BarChart"),
  { ssr: false }
);
const DynamicLineChart = dynamic(
  () => import("../../components/Charts/LineChart"),
  { ssr: false }
);
const DynamicPieChart = dynamic(
  () => import("../../components/Charts/PieChart"),
  { ssr: false }
);

const Charts = () => {
  return (
    <BaseLayout title="Charts" footer={false}>
      <div className="flex justify-center flex-wrap mt-10">

        <div className="flex items-center justify-between bg-white p-4 w-full md:w-5/12 mb-4">
          <div>
            <div className="w-20 h-20 bg-green-200 rounded-full flex items-center justify-center">
              <FaChartBar className="text-4xl text-green-600" />
            </div>
            <div className="text-center mt-4 font-bold text-lg">Bar Chart</div>
          </div>
          <DynamicBarChart 
          width={300}
          />
        </div>

        <div className="flex items-center justify-between bg-white p-4 w-full md:w-6/12 mb-4">
          <div>
            <div className="w-20 h-20 bg-yellow-200 rounded-full flex items-center justify-center">
              <FaChartLine className="text-4xl text-yellow-600" />
            </div>
            <div className="text-center mt-4 font-bold text-lg">Line Chart</div>
          </div>
          <DynamicLineChart />
        </div>
        <div className="flex items-center justify-between bg-white p-4 w-full md:w-3/5 mb-4">
          <div>
            <div className="w-20 h-20 bg-red-200 rounded-full flex items-center justify-center">
              <FaChartPie className="text-4xl text-red-600" />
            </div>
            <div className="text-center mt-4 font-bold text-lg">Pie Chart</div>
          </div>
          <DynamicPieChart />
        </div>
      </div>
    </BaseLayout>
  );
};

export default Charts;
