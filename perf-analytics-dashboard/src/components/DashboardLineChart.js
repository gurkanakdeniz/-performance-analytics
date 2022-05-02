import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

export default function DashboardLineChart(props) {
  const pageLines = [];
  const data = props.data;
  const title = props.title;

  if (data) {
    for (const [key, item] of Object.entries(data)) {
      pageLines.push(
        <Line
          key={key}
          data={item.data}
          type="monotone"
          name={item.name}
          dataKey="duration"
          stroke={item.stroke}
          activeDot={{ r: 8 }}
        />
      );
    }
  }

  return (
    <div className="App">
      <h3>{title}</h3>
      <LineChart
        width={800}
        height={300}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="date" />
        <YAxis type="number" />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        {pageLines}
      </LineChart>
    </div>
  );
}
