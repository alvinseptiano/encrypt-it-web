<script setup>
import { Head } from '@inertiajs/vue3';
import { Link as LinkInertia } from '@inertiajs/vue3';
import GuestLayout from '@/Layouts/GuestLayout.vue';
</script>

<template>
    <GuestLayout>
        <Head title="Dashboard" />
        <div class="hero min-h-screen">
            <div class="hero-content -mt-50 text-center">
                <div class="max-w-lg">
                    <h1 class="text-5xl font-bold capitalize">
                        Sistem Keamanan Data dengan menggunakan
                        <i>ChaCHa20-Poly1305</i>
                    </h1>
                    <p class="py-6">
                        Aplikasi berbasis web untuk enkripsi dan dekripsi file
                        menggunakan algoritma
                        <a
                            href="https://tools.ietf.org/html/rfc8439"
                            target="_blank"
                            class="text-blue-500 underline"
                            >ChaCha20-Poly1305</a
                        >.
                    </p>
                    <LinkInertia href="/uploadfile" class="btn btn-primary"
                        >Upload File</LinkInertia
                    >
                </div>
            </div>
        </div>
    </GuestLayout>
</template>
