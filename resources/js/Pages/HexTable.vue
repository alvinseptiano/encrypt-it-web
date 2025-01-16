<script setup>
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import { ref, onMounted } from 'vue';
import { router, usePage } from '@inertiajs/vue3';
import axios from 'axios';
import { DocumentIcon, ArrowLeftIcon } from '@heroicons/vue/24/solid';
import Heading from '@/Components/Heading.vue';

const hexData = ref([]);
const error = ref(null);
const fileName = ref('');
const loading = ref(true);
const { props } = usePage();

const loadFileContent = async () => {
    try {
        loading.value = true;
        const filePath = props.filePath;
        const response = await axios.get(
            `/api/file-manager/content/${encodeURIComponent(filePath)}`,
            {
                path: encodeURIComponent(filePath),
                responseType: 'arraybuffer',
            },
        );

        const buffer = new Uint8Array(response.data);
        const hexRows = [];

        for (let i = 0; i < buffer.length; i += 16) {
            const chunk = buffer.slice(i, i + 16);
            const hex = Array.from(chunk).map((byte) =>
                byte.toString(16).padStart(2, '0').toUpperCase(),
            );
            const text = Array.from(chunk)
                .map((byte) =>
                    byte >= 32 && byte <= 126 ? String.fromCharCode(byte) : '.',
                )
                .join('');

            hexRows.push({
                offset: i.toString(16).padStart(8, '0').toUpperCase(),
                hex,
                text,
            });
        }

        hexData.value = hexRows;
        fileName.value = props.filePath.split('/').pop();
        error.value = null;
    } catch (err) {
        error.value =
            err.response?.data?.error ||
            'An error occurred while loading the file';
        hexData.value = [];
    } finally {
        loading.value = false;
    }
};

const goBack = () => {
    router.visit('/myfiles');
};

onMounted(async () => {
    try {
        const response = await loadFileContent(); // Assume fetchData is an async function
        hexData.value = response; // Modify reactive state after data is ready
    } catch (error) {
        console.error('Error fetching data:', error);
    }
});
</script>

<template>
    <AuthenticatedLayout>
        <div class="flex h-[85vh] w-full flex-col">
            <Heading>Hex</Heading>
            <!-- Header -->
            <div
                class="bg-base-200 flex justify-between overflow-hidden rounded-lg p-4"
            >
                <button @click="goBack" class="btn btn-ghost gap-2">
                    <ArrowLeftIcon class="size-5" />
                    Back
                </button>
                <div class="flex items-center gap-2">
                    <DocumentIcon class="size-5" />
                    <div class="text- w-32 flex-1 truncate text-lg font-medium">
                        {{ fileName }}
                    </div>
                </div>
            </div>

            <!-- Loading State -->
            <div v-if="loading" class="flex flex-1 items-center justify-center">
                <span class="loading loading-spinner loading-lg"></span>
            </div>

            <!-- Error State -->
            <div
                v-else-if="error"
                class="text-error bg-error/10 rounded-lg p-4"
            >
                {{ error }}
            </div>

            <!-- Hex Viewer -->
            <div v-else-if="hexData.length" class="mt-10 flex-1 overflow-auto">
                <table
                    class="table-pin-cols table-pin-rows table-sm table w-full font-mono"
                >
                    <thead class="bg-base-200">
                        <tr>
                            <th class="p-2 text-left">Offset</th>
                            <template v-for="i in 16" :key="i">
                                <th class="p-2 text-center">
                                    {{
                                        (i - 1)
                                            .toString(16)
                                            .padStart(2, '0')
                                            .toUpperCase()
                                    }}
                                </th>
                            </template>
                            <th class="p-2 pl-4 text-left">ASCII</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="row in hexData"
                            :key="row.offset"
                            class="hover:bg-base-200"
                        >
                            <td class="text-accent p-2">{{ row.offset }}</td>
                            <template
                                v-for="(byte, index) in row.hex"
                                :key="index"
                            >
                                <td class="p-2 text-center font-medium">
                                    {{ byte }}
                                </td>
                            </template>
                            <template
                                v-for="i in 16 - row.hex.length"
                                :key="'empty-' + i"
                            >
                                <td
                                    class="text-base-content/30 p-2 text-center"
                                >
                                    --
                                </td>
                            </template>
                            <td class="p-2 pl-4 font-medium">
                                <div class="flex gap-[3.5px]">
                                    <span
                                        v-for="(char, index) in row.text"
                                        :key="index"
                                        class="w-[8.5px] text-center"
                                        >{{ char }}</span
                                    >
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
