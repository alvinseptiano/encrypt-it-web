<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import Heading from '@/Components/Heading.vue';
import { Head } from '@inertiajs/vue3';
import PieChart from '@/Components/PieChart.vue';
</script>

<template>
    <AuthenticatedLayout>
        <Head title="Dashboard" />
        <Heading>Penyimpanan</Heading>

        <div>
            <PieChart />
        </div>
    </AuthenticatedLayout>
</template>
