<script setup>
import { Link } from '@inertiajs/vue3';
</script>

<template>
    <div class="flex min-h-screen min-w-0.5 flex-col items-center pt-6">
        <div>
            <Link href="/"> </Link>
        </div>

        <div class="flex w-full flex-col overflow-hidden rounded-lg px-6 py-4">
            <slot />
        </div>
    </div>
</template>
