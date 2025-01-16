<script setup>
import Checkbox from '@/Components/Checkbox.vue';
import GuestLayout from '@/Layouts/GuestLayout.vue';
import InputError from '@/Components/InputError.vue';
import { Head, Link, useForm, usePage } from '@inertiajs/vue3';

const page = usePage();

defineProps({
    canResetPassword: {
        type: Boolean,
    },
    status: {
        type: String,
    },
});

const form = useForm({
    email: '',
    password: '',
    remember: false,
    _token: page.props.csrf,
});

const submit = () => {
    form.post(route('login'), {
        onFinish: () => form.reset('password'),
    });
};
</script>

<template>
    <GuestLayout>
        <Head title="Log in" />
        <div v-if="$page.props.flash.message" class="alert">
            {{ $page.props.flash.message }}
        </div>
        <div v-if="status" class="mb-4 text-sm font-medium">
            {{ status }}
        </div>

        <div class="bg-base-100 flex justify-center">
            <div class="mx-64 mt-10 min-w-96 rounded-xl p-4">
                <form @submit.prevent="submit">
                    <fieldset
                        class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
                    >
                        <legend class="fieldset-legend text-2xl">Login</legend>

                        <label class="fieldset-label">Email</label>
                        <input
                            id="email"
                            type="email"
                            class="input"
                            v-model="form.email"
                            placeholder="Email"
                            autocomplete="username"
                            required
                            autofocus
                        />

                        <label class="fieldset-label">Password</label>
                        <input
                            id="password"
                            type="password"
                            class="input"
                            v-model="form.password"
                            placeholder="Password"
                            autocomplete="current-password"
                            required
                        />
                        <InputError
                            class="mt-2"
                            :message="form.errors.password"
                        />
                        <div class="mt-2 block">
                            <label class="flex items-center">
                                <Checkbox
                                    name="remember"
                                    v-model:checked="form.remember"
                                />
                                <span class="ms-2 text-sm">Remember me</span>
                            </label>
                        </div>
                        <div class="mt-8 block">
                            <div class="flex items-center justify-between">
                                <div class="flex flex-col items-start gap-3">
                                    <Link
                                        href="/register"
                                        class="text-sm underline"
                                        >Create new account</Link
                                    >
                                    <Link
                                        v-if="canResetPassword"
                                        :href="route('password.request')"
                                        class="text-sm underline"
                                    >
                                        Forgot your password?
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <button
                            class="btn btn-neutral mt-4"
                            :class="{ 'opacity-25': form.processing }"
                            :disabled="form.processing"
                        >
                            Login
                        </button>
                    </fieldset>
                </form>
            </div>
        </div>
    </GuestLayout>
</template>
