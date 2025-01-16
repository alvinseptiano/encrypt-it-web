<script setup>
import { ref, onMounted } from 'vue';
import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PieController, // Import PieController
} from 'chart.js';
import Heading from './Heading.vue';

// Register Chart.js components, including the PieController
ChartJS.register(Title, Tooltip, Legend, ArcElement, PieController);

const chartCanvas = ref(null);
const storageData = ref([]);
const labels = ['Images', 'Videos', 'Documents'];
const colors = ['#FF6384', '#36A2EB', '#FFCE56'];

const totalStorage = ref(0); // Total storage in bytes
const usedStorage = ref(0); // Used storage in bytes
const availableStorage = ref(0); // Available storage in byte

const fetchStorageData = async () => {
    try {
        const response = await fetch('/api/file-manager/storage-sizes');
        const { usedStorage, availableStorage } = await response.json();
        usedStorage.value =
            usedStorage.images + usedStorage.documents + usedStorage.videos;

        // Combine used storage and available storage
        storageData.value = [
            // usedStorage.images,
            // usedStorage.videos,
            50,
            30,
            60,
            // usedStorage.documents,
            // availableStorage,
        ];

        drawChart();
    } catch (error) {
        console.error('Failed to fetch storage sizes:', error);
    }
};

const formatSize = (bytes) => {
    const units = ['B', 'KB', 'MB', 'GB'];
    let size = bytes;
    let unitIndex = 0;

    while (size >= 1024 && unitIndex < units.length - 1) {
        size /= 1024;
        unitIndex++;
    }

    return `${size.toFixed(1)} ${units[unitIndex]}`;
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
        <!-- <p>Total Storage: {{ formatSize(totalStorage) }}</p>
        <p>Used Storage: {{ formatSize(usedStorage) }}</p>
        <p>Available Storage: {{ formatSize(availableStorage) }}</p> -->
    </div>
</template>

<style scoped>
canvas {
    max-width: 500px;
    margin: auto;
}
</style>
