<script setup>
import { router, usePage } from '@inertiajs/vue3';
import { onMounted, ref } from 'vue';
import {
    SunIcon,
    MoonIcon,
    ExclamationCircleIcon,
} from '@heroicons/vue/24/solid';

const user = usePage().props.auth.user;
const page = usePage();

const logout = () => {
    router.post('/logout', {
        _token: page.props.csrf_token,
    });
};

const currentTheme = ref('nord');

const toggleTheme = () => {
    const newTheme = currentTheme.value === 'nord' ? 'dim' : 'nord';
    applyTheme(newTheme);
};

const initializeTheme = () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme && (savedTheme === 'nord' || savedTheme === 'dim')) {
        applyTheme(savedTheme);
    } else {
        applyTheme('nord');
    }
};

const applyTheme = (theme) => {
    document.documentElement.setAttribute('data-theme', theme);
    currentTheme.value = theme;
    localStorage.setItem('theme', theme);
};

onMounted(() => {
    initializeTheme();
});
</script>

<template>
    <div class="navbar">
        <div class="navbar-start">
            <div class="dropdown">
                <div
                    tabindex="0"
                    role="button"
                    class="btn btn-circle btn-ghost pl-1"
                >
                    <ExclamationCircleIcon class="h-6 w-6" />
                </div>
                <ul
                    tabindex="0"
                    class="menu dropdown-content rounded-box bg-base-200 z-[1] mt-3 w-52 p-2"
                >
                    <li>
                        <button onclick="about_modal.showModal()">
                            Tentang
                        </button>
                    </li>
                </ul>
            </div>
        </div>

        <div class="navbar-center">
            <a class="btn btn-ghost text-xl">Encrypt it</a>
        </div>

        <div class="navbar-end">
            <div class="dropdown dropdown-end">
                <div tabindex="0" role="button" class="btn rounded-btn">
                    {{ user.name }}
                </div>
                <ul
                    tabindex="0"
                    class="menu dropdown-content rounded-box bg-base-200 z-[1] mt-4 w-52 p-2"
                >
                    <li>
                        <form @submit.prevent="logout">
                            <button type="submit">Logout</button>
                        </form>
                    </li>
                </ul>
            </div>
            <label class="swap swap-rotate mx-4">
                <!-- this hidden checkbox controls the state -->
                <input
                    type="checkbox"
                    class="theme-controller hidden"
                    :checked="currentTheme === 'dim'"
                    @change="toggleTheme"
                />
                <!-- sun icon -->
                <SunIcon class="swap-off size-5" />
                <!-- moon icon -->
                <MoonIcon class="swap-on size-5" />
            </label>
        </div>
    </div>
    <dialog id="about_modal" class="modal">
        <div class="modal-box">
            <h3 class="text-lg font-bold">Tentang Encrypt It</h3>
            <p class="py-4">
                Aplikasi web untuk mengenkripsi dan dekripsi file menggunakan
                algoritma <b><i>ChaCha20-Poly1305</i></b
                >.

                <br /><br />
                <cite>Alvin Septiano</cite>
            </p>
            <div class="modal-action">
                <form method="dialog">
                    <button class="btn">Tutup</button>
                </form>
            </div>
        </div>
    </dialog>
</template>
