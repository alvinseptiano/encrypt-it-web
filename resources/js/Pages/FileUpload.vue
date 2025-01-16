<script setup>
import axios from 'axios';
import { ref, onMounted } from 'vue';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout.vue';
import Heading from '@/Components/Heading.vue';
import { Head, useForm } from '@inertiajs/vue3';
import { TrashIcon } from '@heroicons/vue/24/solid';
// import Checkbox from '@/Components/Checkbox.vue';

const loading = ref(false);
const success = ref(false);
const error = ref(null);
const uploading = ref(false);
const fileInput = ref(null);
const progress = ref(0);
const startTime = ref(null);
const processingTime = ref(0);
const uploadSpeed = ref(0);
const estimatedTimeRemaining = ref(0);

const emit = defineEmits(['upload-success']);

onMounted(() => {
    const token = document.querySelector('meta[name="csrf-token"]')?.content;
    if (token) {
        axios.defaults.headers.common['X-CSRF-TOKEN'] = token;
    }
});

const form = useForm({
    files: [], // Holds the files for upload
    passphrase: '',
    nonce: '',
});

const formatTime = (seconds) => {
    if (seconds < 60) {
        return `${seconds.toFixed(1)} seconds`;
    }
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds.toFixed(0)}s`;
};

const calculateSpeed = (loaded, elapsed) => {
    const speed = loaded / (elapsed / 1000); // bytes per second
    if (speed > 1000000) {
        return `${(speed / 1000000).toFixed(2)} MB/s`;
    }
    if (speed > 1000) {
        return `${(speed / 1000).toFixed(2)} KB/s`;
    }
    return `${speed.toFixed(2)} B/s`;
};

const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

// Handle file selection
const handleFileSelect = (event) => {
    const files = Array.from(event.target.files);
    form.files = files; // Assign the selected files to the form
    error.value = null;
    success.value = false;
    progress.value = 0;
    processingTime.value = null;
    uploadSpeed.value = 0;
    estimatedTimeRemaining.value = null;
};

// Remove a file from the list
const removeFile = (index) => {
    form.files.splice(index, 1);
    if (form.files.length === 0) {
        fileInput.value.value = ''; // Clear input if no files
    }

    processingTime.value = null;
    uploadSpeed.value = 0;
    estimatedTimeRemaining.value = null;
};

const uploadFile = async () => {
    if (!form.files.length) return;

    uploading.value = true;
    loading.value = true;

    form.post('/api/file-manager/upload', {
        onUploadProgress: (progressEvent) => {
            progress.value = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total,
            );
            const currentTime = Date.now();
            const elapsed = (currentTime - startTime.value) / 1000; // seconds
            progress.value = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total,
            );

            // Calculate upload speed
            uploadSpeed.value = calculateSpeed(
                progressEvent.loaded,
                currentTime - startTime.value,
            );

            // Calculate ETA
            const remainingBytes = progressEvent.total - progressEvent.loaded;
            const bytesPerSecond = progressEvent.loaded / elapsed;
            estimatedTimeRemaining.value = remainingBytes / bytesPerSecond;
        },
        preserveScroll: true, // Prevent scrolling on submission
        onFinish: () => {
            uploading.value = false;
            progress.value = 0;
            fileInput.value.value = ''; // Reset file input
            form.reset(); // Clear the form after submission
            success.value = true;
            loading.value = false;
            emit('upload-success', []);

            // Calculate total processing time
            processingTime.value = (Date.now() - startTime.value) / 1000;
        },
    });
};
</script>

<template>
    <AuthenticatedLayout>
        <Head title="Upload File" />
        <Heading> Upload (Unggah) </Heading>
        <div class="flex h-screen w-full flex-col">
            <!-- Parent Container for Form and Selected Files -->
            <div class="flex flex-col gap-8 overflow-auto md:flex-row">
                <!-- Form Section -->
                <div class="flex flex-1 flex-col gap-4 pt-2 pl-2">
                    <label class="input">
                        <span class="label min-w-24">Passphrase</span>
                        <input
                            type="text"
                            id="passphrase"
                            v-model="form.passphrase"
                            :disabled="!form.files.length"
                            placeholder=". . . ."
                        />
                    </label>
                    <label class="input">
                        <span class="label min-w-24">Nonce</span>
                        <input
                            class=""
                            type="text"
                            id="nonce"
                            v-model="form.nonce"
                            :disabled="!form.files.length"
                            placeholder=". . . ."
                        />
                    </label>
                    <input
                        ref="fileInput"
                        type="file"
                        multiple
                        class="file-input file-input-bordered"
                        @change="handleFileSelect"
                    />
                    <form
                        action="/file-upload"
                        class="dropzone"
                        id="my-awesome-dropzone"
                    />

                    <div class="form-control">
                        <label class="label cursor-pointer gap-4">
                            <span class="label-text"
                                >Samakan dengan password akun</span
                            >
                            <input
                                type="checkbox"
                                checked="checked"
                                class="checkbox"
                            />
                        </label>
                    </div>
                    <div class="flex gap-4">
                        <button class="btn btn-accent w-fit">Upload</button>
                        <button
                            @click.prevent="uploadFile"
                            class="btn btn-primary w-fit"
                            :disabled="form.files.length === 0 || uploading"
                        >
                            {{
                                uploading ? 'Uploading...' : 'Upload & Encrypt'
                            }}
                        </button>
                    </div>

                    <!-- Upload Information -->
                    <div class="my-4 flex-1">
                        <div class="bg-base-300 min-h-48 w-full rounded-lg p-4">
                            <div class="flex flex-col">
                                <div class="mb-4 flex items-center gap-2">
                                    <div class="badge font-bold">Output:</div>
                                </div>
                                <div
                                    class="flex flex-1 flex-col justify-between md:flex-row"
                                >
                                    <div class="flex flex-col gap-4">
                                        <div>
                                            <span>
                                                {{
                                                    progress === 0
                                                        ? 'Tidak ada proses..'
                                                        : progress < 100
                                                          ? 'Mengunggah berlangsung..'
                                                          : 'Selesai mengunggah..'
                                                }}
                                            </span>
                                            <span
                                                v-if="loading"
                                                class="loading loading-spinner text-primary ml-4"
                                            ></span>
                                        </div>
                                        <div>
                                            <span
                                                >Speed: {{ uploadSpeed }}</span
                                            >
                                        </div>
                                        <div class="font-mono">
                                            ETA:
                                            {{
                                                formatTime(
                                                    estimatedTimeRemaining ?? 0,
                                                )
                                            }}
                                        </div>
                                    </div>

                                    <div
                                        class="radial-progress text-primary mr-10"
                                        :style="{
                                            '--value': progress,
                                            '--size': '6rem',
                                            '--thickness': '1rem',
                                        }"
                                        role="progressbar"
                                    >
                                        {{ progress }}%
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Selected Files Section -->
                <div class="flex flex-1 flex-col">
                    <div class="h-full w-full rounded-lg">
                        <div v-if="form.files.length > 0" class="w-full">
                            <h3 class="text-center text-lg font-semibold">
                                Selected Files
                            </h3>
                            <div class="h-[500px] overflow-y-auto">
                                <ul
                                    class="menu menu-md rounded-box w-full justify-start"
                                >
                                    <li
                                        v-for="(file, index) in form.files"
                                        :key="index"
                                        class="flex flex-row items-center justify-start rounded-lg p-3"
                                    >
                                        <div
                                            class="flex min-w-0 flex-1 flex-col items-start justify-start gap-1"
                                        >
                                            <span
                                                class="max-w-[200px] truncate overflow-hidden text-left text-sm text-ellipsis hover:overflow-visible hover:whitespace-normal"
                                                :title="file.name"
                                            >
                                                {{ file.name }}
                                            </span>
                                            <span
                                                class="badge badge-outline text-left text-xs"
                                            >
                                                {{ formatFileSize(file.size) }}
                                            </span>
                                        </div>
                                        <button
                                            @click="removeFile(index)"
                                            class="btn btn-ghost"
                                            type="button"
                                        >
                                            <TrashIcon
                                                class="text-error size-5"
                                            />
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div
                            v-else
                            class="mt-4 w-full text-center text-gray-500"
                        >
                            No files selected.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>
