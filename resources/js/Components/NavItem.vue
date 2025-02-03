<script setup>
import MenuItem from '@/Components/MenuItem.vue';
import {
    UserIcon,
    DocumentDuplicateIcon,
    ArrowUpOnSquareStackIcon,
    HomeIcon,
} from '@heroicons/vue/24/solid';
</script>

<template>
    <MenuItem
        :icon="HomeIcon"
        :link="'dashboard'"
        :tip="'Dashboard'"
        name="Home"
    />
    <MenuItem
        :icon="ArrowUpOnSquareStackIcon"
        :link="'uploadfile'"
        :tip="'Upload File'"
        name="Upload"
    />
    <MenuItem
        :icon="DocumentDuplicateIcon"
        :link="'myfiles'"
        :tip="'My Files'"
        name="Files"
    />
    <MenuItem
        :icon="UserIcon"
        :link="'profile'"
        :tip="'Profile'"
        name="Profile"
    />
</template>
