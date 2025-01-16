<script setup>
import { Link as InertiaLink } from '@inertiajs/vue3';

defineProps({
    icon: {
        type: Object,
        required: true,
    },
    isOpen: { type: Boolean },
    link: { type: String },
    tip: { type: String },
    name: { type: String, required: true },
});

const isActive = (path) => {
    return (
        window.location.pathname.startsWith(path) ||
        window.location.pathname === ''
    );
};
</script>

<template>
    <button class="tooltip tooltip-top z-50 text-center" :data-tip="tip">
        <InertiaLink
            :href="`/${link}`"
            :class="[
                'flex flex-col items-center justify-center rounded-lg text-center',
                {
                    'bg-primary/10': isActive(`/${link}`),
                },
            ]"
        >
            <!-- Center the icon -->
            <component
                :is="icon"
                :class="[
                    'size-6',
                    {
                        'text-primary': isActive(`/${link}`),
                    },
                ]"
            />

            <!-- Center the name below the icon -->
            <span
                :class="{ 'text-primary': isActive(`/${link}`) }"
                class="mt-1 text-xs"
            >
                {{ name }}
            </span>
        </InertiaLink>
    </button>
</template>
