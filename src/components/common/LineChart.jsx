import React from 'react';
import { Line } from 'react-chartjs-2';

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

const LineChart = ({
  data = [30, 50, 20, 40, 60, 35],
  labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  title = 'Line Chart',
  datasetLabel = 'Dữ liệu',
  unitX = '',
  unitY = '',
  options = {},
  multipleDatasets = null,
  tension = 0.4,
  fill = false,
  pointRadius = 4,
}) => {
  const colors = generatePastelColors(
    multipleDatasets ? multipleDatasets.length : 1
  );

  const chartData = {
    labels: labels,
    datasets: multipleDatasets
      ? multipleDatasets.map((dataset, index) => ({
          label: dataset.label || `Dataset ${index + 1}`,
          data: dataset.data,
          borderColor: colors[index],
          backgroundColor: fill
            ? colors[index].replace('80%', '20%')
            : 'transparent',
          borderWidth: 2,
          tension: tension,
          fill: fill,
          pointRadius: pointRadius,
          pointBackgroundColor: colors[index],
          pointBorderColor: '#fff',
          pointHoverRadius: 6,
          pointHoverBackgroundColor: colors[index],
          pointHoverBorderColor: '#fff',
        }))
      : [
          {
            label: datasetLabel,
            data: data,
            borderColor: colors[0],
            backgroundColor: fill
              ? colors[0].replace('80%', '20%')
              : 'transparent',
            borderWidth: 2,
            tension: tension,
            fill: fill,
            pointRadius: pointRadius,
            pointBackgroundColor: colors[0],
            pointBorderColor: '#fff',
            pointHoverRadius: 6,
            pointHoverBackgroundColor: colors[0],
            pointHoverBorderColor: '#fff',
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
        font: { size: 20 },
      },
      legend: {
        position: 'top',
      },
      tooltip: {
        mode: 'index',
        intersect: false,
      },
    },
    scales: {
      x: {
        grid: {
          display: true,
          drawBorder: true,
          drawOnChartArea: true,
          drawTicks: true,
        },
        ticks: {
          callback: function (value) {
            return `${value} ${unitX}`.trim();
          },
        },
      },
      y: {
        beginAtZero: true,
        grid: {
          display: true,
          drawBorder: true,
          drawOnChartArea: true,
          drawTicks: true,
        },
        ticks: {
          callback: function (value) {
            return `${value} ${unitY}`.trim();
          },
        },
      },
    },
    interaction: {
      mode: 'nearest',
      axis: 'x',
      intersect: false,
    },
    ...options,
  };

  return <Line data={chartData} options={defaultOptions} />;
};

export default LineChart;
