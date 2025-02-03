<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import Heading from '@/Components/Heading.vue';
import PieChart from '@/Components/PieChart.vue';
</script>

<template>
    <AuthenticatedLayout>
        <Heading>Rasio Penyimpanan</Heading>
        <div class="h-96 w-full">
            <PieChart />
        </div>
    </AuthenticatedLayout>
</template>
