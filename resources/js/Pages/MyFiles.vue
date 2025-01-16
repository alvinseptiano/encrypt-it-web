<script setup>
import { ref, computed, onMounted } from 'vue';
import { Head, router } from '@inertiajs/vue3';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import {
    DocumentIcon,
    FolderOpenIcon,
    EllipsisVerticalIcon,
    ArrowDownCircleIcon,
    TrashIcon,
    MagnifyingGlassCircleIcon,
    LockClosedIcon,
} from '@heroicons/vue/24/outline';

const props = defineProps({
    items: {
        type: Array,
        required: true,
        default: () => [],
    },
});

// Local state for items
const fileItems = ref([]);
const searchQuery = ref('');
const selectedItems = ref([]);

const filteredItems = computed(() => {
    if (!searchQuery.value) {
        return fileItems.value;
    }

    const query = searchQuery.value.toLowerCase();
    return fileItems.value.filter((item) =>
        item.name.toLowerCase().includes(query),
    );
});

const allSelected = computed(() => {
    return (
        filteredItems.value.length > 0 &&
        selectedItems.value.length === filteredItems.value.length
    );
});

const toggleSelectAll = () => {
    if (allSelected.value) {
        selectedItems.value = [];
    } else {
        selectedItems.value = [...filteredItems.value];
    }
};

const toggleSelectItem = (item) => {
    const index = selectedItems.value.indexOf(item);
    if (index === -1) {
        selectedItems.value.push(item);
    } else {
        selectedItems.value.splice(index, 1);
    }
};

// Methods
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

const downloadItems = (itemsToDownload) => {
    itemsToDownload.forEach((item) => {
        if (item.is_file) {
            window.open(
                `/api/file-manager/download/${encodeURIComponent(item.path)}`,
                '_blank',
            );
        }
    });
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

onMounted(() => {
    // Initialize with props data if available
    fileItems.value = props.items;
    // Then fetch fresh data
    fetchItems();
});
</script>

<template>
    <Head title="My Files" />
    <AuthenticatedLayout>
        <div class="flex h-[85vh] w-full flex-col gap-4">
            <div>
                <!-- Searchbar -->
                <div class="flex justify-center"></div>

                <!-- Mass Action Bar -->
                <div class="mt-4 flex justify-center gap-2">
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
                    <button
                        v-if="selectedItems.length > 0"
                        onclick="download_modal.showModal()"
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
            </div>

            <!-- Files and Folders List -->
            <div class="flex-1 overflow-auto">
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
                                    <span v-if="item.is_encrypted == 'true'">
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
                                        <li v-if="item.is_file">
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
                                        <li v-if="item.is_file">
                                            <button
                                                @click="downloadItems([item])"
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

        <!-- Download modal -->
        <dialog id="download_modal" class="modal">
            <div class="modal-box max-w-96">
                <!-- Modal Header -->
                <h3 class="mb-4 text-lg font-bold">Download</h3>

                <!-- Modal Content -->
                <div class="modal-content">
                    <form method="dialog" class="flex flex-col gap-4">
                        <!-- Input Fields -->
                        <div class="flex flex-col gap-4">
                            <label class="flex flex-col">
                                <span class="label font-semibold"
                                    >Passphrase</span
                                >
                                <input
                                    type="text"
                                    class="input input-bordered"
                                    placeholder="Enter your passphrase"
                                    required
                                />
                            </label>
                            <label class="flex flex-col">
                                <span class="label font-semibold">Nonce</span>
                                <input
                                    type="text"
                                    class="input input-bordered"
                                    placeholder="Enter the nonce in any"
                                    required
                                />
                            </label>
                        </div>

                        <!-- Modal Actions -->
                        <div class="modal-action flex justify-start gap-4">
                            <button type="submit" class="btn btn-success">
                                Download
                            </button>
                            <button
                                type="button"
                                class="btn btn-error"
                                onclick="document.getElementById('download_modal').close();"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </dialog>
    </AuthenticatedLayout>
</template>
