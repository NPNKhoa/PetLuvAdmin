import React from 'react';
import { Bar } from 'react-chartjs-2';

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

const BarChart = ({
  data = [30, 50, 20],
  labels = ['Red', 'Blue', 'Yellow'],
  title = 'Bar Chart',
  datasetLabel = 'Dữ liệu',
  unitX = '',
  unitY = '',
  orientation = 'vertical',
  options = {},
}) => {
  const colors = generatePastelColors(data.length);
  const isHorizontal = orientation === 'horizontal';

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: datasetLabel,
        data: data,
        backgroundColor: colors,
        hoverBackgroundColor: colors.map((color) =>
          color.replace('80%', '70%')
        ),
        borderWidth: 1,
      },
    ],
  };

  const defaultOptions = {
    indexAxis: isHorizontal ? 'y' : 'x',
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: title,
        color: '#f79400',
        font: { size: 20 },
      },
      legend: {
        position: 'top',
      },
    },
    scales: {
      x: isHorizontal
        ? {
            beginAtZero: true,
            ticks: {
              callback: function (value) {
                return `${unitX} ${value}`.trim();
              },
            },
          }
        : {
            beginAtZero: false,
            ticks: {
              callback: function (value) {
                return `${value} ${unitX}`.trim();
              },
            },
          },
      y: isHorizontal
        ? {}
        : {
            beginAtZero: true,
            suggestedMax: Math.max(...data) * 1.2,
            ticks: {
              stepSize: Math.ceil(Math.max(...data) / 5),
              callback: function (value) {
                return `${value} ${unitY}`.trim();
              },
            },
          },
    },
    ...options,
  };

  return <Bar data={chartData} options={defaultOptions} />;
};

export default BarChart;
