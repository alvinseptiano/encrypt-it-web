<template>
    <svg
        v-if="isOpen"
        :fill="color"
        :width="size"
        :height="size"
        viewBox="0 -960 960 960"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M660-320v-320L500-480l160 160ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm120-80v-560H200v560h120Zm80 0h360v-560H400v560Zm-80 0H200h120Z"
        />
    </svg>
    <svg
        v-else
        :fill="color"
        :width="size"
        :height="size"
        viewBox="0 -960 960 960"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path
            d="M500-640v320l160-160-160-160ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm120-80v-560H200v560h120Zm80 0h360v-560H400v560Zm-80 0H200h120Z"
        />
    </svg>
</template>

<script setup>
defineProps({
    isOpen: {
        type: Boolean,
        default: true,
    },
    color: {
        type: String,
        default: 'currentColor',
    },
    size: {
        type: [Number, String],
        default: 24,
    },
});
</script>
