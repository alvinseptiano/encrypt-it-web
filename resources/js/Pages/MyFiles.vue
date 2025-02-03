<script setup>
import { ref, computed, onMounted } from 'vue';
import { Head, router } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import {
    DocumentIcon,
    EllipsisVerticalIcon,
    ArrowDownCircleIcon,
    TrashIcon,
    MagnifyingGlassCircleIcon,
    LockClosedIcon,
    XCircleIcon,
} from '@heroicons/vue/24/outline';

const props = defineProps({
    items: {
        type: Array,
        required: true,
        default: () => [],
    },
});

// Local state
const fileItems = ref([]);
const searchQuery = ref('');
const selectedItems = ref([]);

const downloadQueue = ref([]);
const currentDownload = ref(null);
const decryptionKey = ref('');
const decryptionNonce = ref('');
const isDownloading = ref(false);
const downloadError = ref('');

// Filtered items computed property
const filteredItems = computed(() => {
    if (!searchQuery.value) return fileItems.value;
    const query = searchQuery.value.toLowerCase();
    return fileItems.value.filter((item) =>
        item.name.toLowerCase().includes(query),
    );
});

// Selection handling
const allSelected = computed(() => {
    return (
        filteredItems.value.length > 0 &&
        selectedItems.value.length === filteredItems.value.length
    );
});

const toggleSelectAll = () => {
    selectedItems.value = allSelected.value ? [] : [...filteredItems.value];
};

const toggleSelectItem = (item) => {
    const index = selectedItems.value.findIndex((i) => i.path === item.path);
    if (index === -1) {
        selectedItems.value.push(item);
    } else {
        selectedItems.value.splice(index, 1);
    }
};

// Download handling
const addToDownloadQueue = (items) => {
    const itemsToAdd = Array.isArray(items) ? items : [items];

    itemsToAdd.forEach((item) => {
        if (
            !downloadQueue.value.find(
                (queueItem) => queueItem.path === item.path,
            )
        ) {
            downloadQueue.value.push(item);
        }
    });

    if (!isDownloading.value) {
        processNextDownload();
    }
};

const processNextDownload = () => {
    if (downloadQueue.value.length === 0 || isDownloading.value) return;

    isDownloading.value = true;
    currentDownload.value = downloadQueue.value[0];
    document.getElementById('download_modal').showModal();
};

const handleDownload = async () => {
    if (!currentDownload.value || !decryptionKey.value) {
        downloadError.value = 'Please provide a password';
        return;
    }

    downloadError.value = '';

    try {
        const response = await axios.post(
            '/api/file-manager/download',
            {
                path: currentDownload.value.path,
                passphrase: decryptionKey.value,
                nonce: decryptionNonce.value,
                fileName: currentDownload.value.name,
            },
            {
                responseType: 'blob',
            },
        );

        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.download = currentDownload.value.name;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);

        completeCurrentDownload();
    } catch (error) {
        downloadError.value =
            'Download failed. Please check your password and try again.';
        console.error('Download error:', error);
    }
};

const completeCurrentDownload = () => {
    downloadQueue.value.shift();
    decryptionKey.value = '';
    decryptionNonce.value = '';
    downloadError.value = '';
    document.getElementById('download_modal').close();

    isDownloading.value = false;
    if (downloadQueue.value.length > 0) {
        processNextDownload();
    }
};

const skipCurrentDownload = () => {
    completeCurrentDownload();
};

onMounted(() => {
    fileItems.value = props.items;
    fetchItems();
});

const fetchItems = async () => {
    try {
        const response = await axios.get(`/api/file-manager?path=${''}`);
        fileItems.value = response.data.items;
        selectedItems.value = []; // Clear selections on fetch
    } catch (error) {
        console.error('Error fetching items:', error);
    }
};

const deleteItems = async (itemsToDelete) => {
    if (
        !confirm(
            `Are you sure you want to delete ${itemsToDelete.length} item(s)?`,
        )
    )
        return;

    try {
        await axios.delete('/api/file-manager/delete', {
            data: {
                items: itemsToDelete.map((item) => ({
                    path: item.path,
                    is_file: item.is_file,
                })),
            },
        });
        fetchItems();
    } catch (error) {
        console.error('Error deleting items:', error);
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

const formatDate = (timestamp) => {
    return new Date(timestamp * 1000).toLocaleString();
};
</script>

<template>
    <Head title="My Files" />
    <AuthenticatedLayout>
        <div class="flex h-full w-full flex-col gap-4">
            <!-- Searchbar -->
            <div class="my-4 flex justify-center gap-2">
                <label class="input">
                    <span class="label">
                        <MagnifyingGlassCircleIcon class="size-6" />
                    </span>
                    <input
                        v-model="searchQuery"
                        type="text"
                        placeholder="Cari.."
                    />
                </label>
                <!-- Mass Action Bar - Fixed batch download button -->
                <button
                    v-if="selectedItems.length > 0"
                    @click="addToDownloadQueue(selectedItems)"
                    class="btn btn-success"
                >
                    <ArrowDownCircleIcon class="mr-2 size-5" />
                    Download Selected
                </button>
                <button
                    v-if="selectedItems.length > 0"
                    @click="deleteItems(selectedItems)"
                    class="btn btn-error"
                >
                    <TrashIcon class="mr-2 size-5" />
                    Delete Selected
                </button>
            </div>

            <div
                v-if="filteredItems.length === 0"
                class="justify-center pt-30 text-center text-3xl font-bold"
            >
                Tidak ada file
            </div>
            <!-- Files and Folders List -->
            <div v-else class="h-[85vh] flex-1 overflow-auto">
                <table
                    class="table-pin-rows table-pin-cols table-sm table w-full"
                >
                    <thead class="bg-base-300">
                        <tr>
                            <th style="width: 5%">
                                <input
                                    type="checkbox"
                                    class="checkbox"
                                    :checked="allSelected"
                                    @click="toggleSelectAll"
                                />
                            </th>
                            <th
                                class="py-3 text-left text-xs font-medium uppercase"
                            >
                                Name
                            </th>
                            <th
                                class="py-3 text-left text-xs font-medium uppercase"
                                style="width: 10%"
                            >
                                Size
                            </th>
                            <th
                                class="py-3 text-left text-xs font-medium uppercase"
                                style="width: 10%"
                            >
                                Last Modified
                            </th>
                            <th
                                class="py-3 text-left text-xs font-medium uppercase"
                                style="width: 5%"
                            >
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr
                            v-for="item in filteredItems"
                            :key="item.path"
                            class="hover"
                        >
                            <td>
                                <input
                                    type="checkbox"
                                    class="checkbox"
                                    :checked="selectedItems.includes(item)"
                                    @click="toggleSelectItem(item)"
                                />
                            </td>
                            <td
                                class="max-w-[250px] cursor-pointer truncate py-4 text-ellipsis whitespace-nowrap"
                            >
                                <div class="flex items-center gap-2">
                                    <span v-if="item.is_locked">
                                        <LockClosedIcon class="size-5" />
                                    </span>
                                    <span v-else>
                                        <DocumentIcon
                                            class="text-accent size-5"
                                        />
                                    </span>
                                    <span
                                        class="tooltip tooltip-bottom"
                                        :data-tooltip="item.name"
                                    >
                                        {{ item.name }}
                                    </span>
                                </div>
                            </td>
                            <td class="py-4 text-sm">
                                {{ formatSize(item.size) }}
                            </td>
                            <td class="py-4 text-sm">
                                {{ formatDate(item.last_modified) }}
                            </td>
                            <td class="py-4 text-sm">
                                <div class="dropdown dropdown-end">
                                    <button tabindex="0" class="btn btn-ghost">
                                        <EllipsisVerticalIcon class="size-5" />
                                    </button>
                                    <ul
                                        tabindex="0"
                                        class="menu dropdown-content rounded-box bg-base-200 p-2 shadow"
                                    >
                                        <li>
                                            <button
                                                @click="
                                                    router.get(
                                                        `/hextable/${encodeURIComponent(item.path)}`,
                                                    )
                                                "
                                            >
                                                <MagnifyingGlassCircleIcon
                                                    class="text-info size-5"
                                                />
                                                Inspect
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                @click="
                                                    addToDownloadQueue(item)
                                                "
                                            >
                                                <ArrowDownCircleIcon
                                                    class="text-success size-5"
                                                />
                                                Download
                                            </button>
                                        </li>
                                        <li>
                                            <button
                                                @click="deleteItems([item])"
                                                class="text-error"
                                            >
                                                <TrashIcon
                                                    class="text-error size-5"
                                                />
                                                Delete
                                            </button>
                                        </li>
                                    </ul>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!-- Download Modal -->
        <dialog id="download_modal" class="modal">
            <div class="modal-box max-w-96">
                <form method="dialog">
                    <button
                        class="btn btn-sm btn-circle btn-ghost absolute top-2 right-2"
                        @click="skipCurrentDownload"
                    >
                        <XCircleIcon class="size-5" />
                    </button>
                </form>

                <div class="mb-4">
                    <h3 class="text-lg font-bold">Download</h3>
                    <p class="line-clamp-1">{{ currentDownload?.name }}</p>
                </div>

                <div class="modal-content">
                    <form
                        @submit.prevent="handleDownload"
                        class="flex flex-col gap-4"
                    >
                        <div class="flex flex-col gap-4">
                            <label class="flex flex-col gap-2">
                                <span>Password</span>
                                <input
                                    v-model="decryptionKey"
                                    type="password"
                                    class="input input-bordered"
                                    placeholder="Enter password"
                                    required
                                />
                            </label>
                            <label class="flex flex-col gap-2">
                                <span>Nonce (Optional)</span>
                                <input
                                    v-model="decryptionNonce"
                                    type="password"
                                    class="input input-bordered"
                                    placeholder="Enter nonce if required"
                                />
                            </label>
                        </div>

                        <div v-if="downloadError" class="text-error text-sm">
                            {{ downloadError }}
                        </div>

                        <div class="modal-action flex justify-between">
                            <div class="text-sm text-gray-500">
                                {{
                                    downloadQueue.length > 1
                                        ? `${downloadQueue.length - 1} more files queued`
                                        : ''
                                }}
                            </div>
                            <div class="flex gap-2">
                                <button type="submit" class="btn btn-success">
                                    Download
                                </button>
                                <button
                                    type="button"
                                    class="btn btn-error"
                                    @click="skipCurrentDownload"
                                >
                                    Skip
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </dialog>
    </AuthenticatedLayout>
</template>
