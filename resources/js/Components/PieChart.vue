<script setup>
import { ref, onMounted } from 'vue';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PieController,
} from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement, PieController);

const chartCanvas = ref(null);
const storageData = ref([]); // Data for pie chart
const labels = ['Images', 'Videos', 'Documents']; // Labels for the pie chart
const colors = ['#FF6384', '#36A2EB', '#FFCE56']; // Colors for each category

const fetchStorageData = async () => {
    try {
        const response = await fetch('/api/file-manager/fileratio');
        const { filetype } = await response.json();

        // Prepare the data for the pie chart
        storageData.value = Object.values(filetype); // Extract the counts
        // labels = Object.keys(filetype);               // Extract the file types

        drawChart(); // Redraw the chart with new data
    } catch (error) {
        console.error('Failed to fetch storage sizes:', error);
    }
};

const drawChart = () => {
    if (!chartCanvas.value) return;

    const ctx = chartCanvas.value.getContext('2d');
    new ChartJS(ctx, {
        type: 'pie',
        data: {
            labels,
            datasets: [
                {
                    data: storageData.value,
                    backgroundColor: colors,
                },
            ],
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'top',
                },
                tooltip: {
                    callbacks: {
                        label: (tooltipItem) => {
                            const value =
                                storageData.value[tooltipItem.dataIndex];
                            return value;
                            // return `${labels[tooltipItem.dataIndex]}: ${formatSize(
                            //     value,
                        },
                    },
                },
            },
        },
    });
};

// Fetch data and draw chart when the component is mounted
onMounted(() => {
    fetchStorageData();
});
</script>

<template>
    <div>
        <canvas ref="chartCanvas"></canvas>
    </div>
</template>

<style scoped>
canvas {
    max-width: 500px;
    margin: auto;
}
</style>
