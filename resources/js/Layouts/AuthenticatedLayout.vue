<script setup>
import NavItem from '@/Components/NavItem.vue';
import TopBar from '@/Components/TopBar.vue';
import { ref, watch } from 'vue';

const isOpen = ref(localStorage.getItem('sidebarOpen') === 'true' || false);

watch(isOpen, (newValue) => {
    localStorage.setItem('sidebarOpen', newValue);
});
</script>

<template>
    <div class="bg-base-100 fixed size-full min-h-svh">
        <!-- TopBar -->
        <div class="bg-base-300 fixed top-0 right-0 left-0 z-50 m-4 rounded-lg">
            <TopBar />
        </div>

        <!-- Desktop Navigation (Left Side) -->
        <div
            class="md:bg-base-300 hidden justify-center md:fixed md:top-24 md:left-0 md:ml-4 md:flex md:h-[calc(100vh-7rem)] md:flex-col md:rounded-lg"
        >
            <ul class="menu w-14 gap-5">
                <NavItem />
            </ul>
        </div>

        <!-- Main Content Wrapper -->
        <div
            class="mt-5 flex h-full flex-col gap-4 overflow-auto pt-10 md:pl-20"
        >
            <!-- Main Content with proper padding -->
            <main class="h-full w-full flex-1 p-8 md:ml-4 md:pb-8 md:pl-4">
                <slot />
            </main>

            <!-- Mobile Navigation (Bottom) -->
            <div
                class="bg-base-300 fixed right-0 bottom-0 left-0 z-50 md:hidden"
            >
                <div class="flex flex-row justify-center p-2">
                    <ul
                        class="menu menu-horizontal bg-base-300 rounded-box justify-center gap-5"
                    >
                        <NavItem />
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
