import React from 'react';
import { Pie } from 'react-chartjs-2';

const generatePastelColors = (count) => {
  const colors = [];
  const saturation = 70;
  const lightness = 80;

  for (let i = 0; i < count; i++) {
    const hue = (360 / count) * i + Math.random() * 30;
    colors.push(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
  }

  return colors;
};

const PieChart = ({
  data = [30, 50, 20], // Default data values
  labels = ['Red', 'Blue', 'Yellow'], // Default labels
  title = 'Pie Chart',
  options = {}, // Allow extra customization
}) => {
  const colors = generatePastelColors(data.length);

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: colors,
        hoverBackgroundColor: colors.map((color) =>
          color.replace('80%', '70%')
        ), // Darken on hover
      },
    ],
  };

  const defaultOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: title,
        color: '#f79400',
        font: { size: 24 },
      },
      legend: { position: 'right' },
    },
    ...options, // Allow users to override options
  };

  return <Pie data={chartData} options={defaultOptions} />;
};

export default PieChart;
