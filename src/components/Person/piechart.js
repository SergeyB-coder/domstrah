import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';


const COLORS = ['#0088FE', '#00C49F', '#FFBB28', ];

export function Piechart(props)  {
    const data = [
      { name: 'Имущество', value: props.week_property },
      { name: 'Жизнь', value: props.week_life },
    ];
    return (
      <PieChart width={100} height={100} >
        <Pie
          data={data}
          cx={45}
          cy={45}
          innerRadius={30}
          outerRadius={50}
          fill="#8884d8"
          paddingAngle={0}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    );
  }
