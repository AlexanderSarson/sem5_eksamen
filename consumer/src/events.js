import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];
export default function Events() {
  const [events, setEvents] = useState([]);
  const [visitorsToday, setVisitorsToday] = useState([]);

  const handleVisitorsToday = (allVisitors) => {
    const filterVisitorsToday = allVisitors.filter((visitor) => {
      const date = new Date(visitor.date);
      const currentDate = new Date();
      const differenceInTime = date.getTime() - currentDate.getTime();
      const differenceInDays = differenceInTime / (1000 * 3600 * 24);
      return differenceInDays < 1 ? true : false;
    });
    let visitorsCount = new Map();
    filterVisitorsToday.forEach((visitor) => {
      const date = new Date(visitor.date);
      const currentDate = new Date();
      const differenceInTime = parseInt(
        currentDate.getHours() - date.getHours()
      );
      let count = visitorsCount.get(differenceInTime);
      if (count) {
        visitorsCount.set(differenceInTime, count + 1);
      } else {
        visitorsCount.set(differenceInTime, 1);
      }
    });
    let arr = [];
    for (let index = 0; index < 24; index++) {
      let visitors = visitorsCount.get(index);
      if (visitors) {
        arr[index] = { hour: index, visitors };
      } else {
        arr[index] = { hour: index, visitors: 0 };
      }
    }
    setVisitorsToday(arr);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      fetch("https://analytics.sarson.me/analytics/api/events/all")
        .then((res) => res.json())
        .then((data) => {
          setEvents(data);
          handleVisitorsToday(data);
        });
    }, 5000);
    return () => clearInterval(interval);
  });

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>date</th>
            <th>origin</th>
            <th>entityId</th>
          </tr>
        </thead>
        <tbody>
          {events.map((event) => (
            <tr key={event._id}>
              <td>{event.date}</td>
              <td>{event.origin}</td>
              <td>{event.entityId}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <BarChart
        width={1000}
        height={200}
        data={visitorsToday}
        margin={{
          top: 5,
          right: 15,
          left: 5,
          bottom: 5,
        }}
      >
        <XAxis dataKey="hour" />
        <YAxis type="number" domain={[0, 10]} name="Visitors last 24 hours" />
        <Tooltip />
        <Legend name="Visitors last 24 hours" />
        <Bar dataKey="visitors" fill="#8884d8" name="Visitors" />
      </BarChart>
    </div>
  );
}
