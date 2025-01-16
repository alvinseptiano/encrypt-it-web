<script setup>
import { Link as InertiaLink } from '@inertiajs/vue3';
import { ref } from 'vue';

const isOpen = ref(false);
</script>

<template>
    <div
        :class="[
            'bg-base-100 fixed top-20 left-4 z-10 mt-4 h-[calc(100vh-8rem)] rounded-lg pl-3 transition-all duration-200',
            isOpen ? 'w-48' : 'w-18',
        ]"
    >
        <div class="flex items-center p-2">
            <button
                @click="isOpen = !isOpen"
                class="btn-circle mt-6 rounded-lg"
            >
                <i
                    :class="['pi', isOpen ? 'pi-arrow-left' : 'pi-arrow-right']"
                ></i>
            </button>
            <h2
                :class="[
                    'mt-6 ml-2 text-xl font-bold transition-opacity',
                    isOpen ? 'opacity-100' : 'hidden opacity-0',
                ]"
            >
                Dashboard
            </h2>
        </div>
        <nav class="flex">
            <ul class="menu font-bold">
                <li class="rounded">
                    <InertiaLink
                        href="/dashboard"
                        :class="[
                            'flex items-center py-4',
                            {
                                'font-bold underline':
                                    $page.component.name === 'dashboard',
                            },
                            !isOpen && 'justify-center',
                        ]"
                    >
                        <i class="pi pi-home"></i>
                        <span :class="['ml-2', !isOpen && 'hidden']">Home</span>
                    </InertiaLink>
                </li>
                <li class="rounded">
                    <InertiaLink
                        href="/uploadfile"
                        :class="[
                            'flex items-center py-4',
                            {
                                'font-bold underline':
                                    $page.component.name === 'dashboard',
                            },
                            !isOpen && 'justify-center',
                        ]"
                    >
                        <i class="pi pi-file"></i>
                        <span :class="['ml-2', !isOpen && 'hidden']"
                            >Upload File</span
                        >
                    </InertiaLink>
                </li>
                <li class="rounded">
                    <InertiaLink
                        href="/myfiles"
                        :class="[
                            'flex items-center py-4',
                            {
                                'font-bold underline':
                                    $page.component.name === 'dashboard',
                            },
                            !isOpen && 'justify-center',
                        ]"
                    >
                        <i class="pi pi-folder"></i>
                        <span :class="['ml-2', !isOpen && 'hidden']"
                            >My Files</span
                        >
                    </InertiaLink>
                </li>
                <li class="rounded">
                    <InertiaLink
                        href="/profile"
                        :class="[
                            'flex items-center py-4',
                            !isOpen && 'justify-center',
                        ]"
                    >
                        <i class="pi pi-user"></i>
                        <span :class="['ml-2', !isOpen && 'hidden']">Akun</span>
                    </InertiaLink>
                </li>
            </ul>
        </nav>
    </div>
</template>
