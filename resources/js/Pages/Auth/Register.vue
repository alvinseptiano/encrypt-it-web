<script setup>
import GuestLayout from '@/Layouts/GuestLayout.vue';
import InputError from '@/Components/InputError.vue';
import { Link, useForm } from '@inertiajs/vue3';

const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
});

const submit = () => {
    form.post(route('register'), {
        onFinish: () => form.reset('password', 'password_confirmation'),
    });
};
</script>

<template>
    <GuestLayout>
        <div class="flex justify-center">
            <div class="mx-64 mt-10 min-w-96 rounded-xl p-4">
                <form @submit.prevent="submit">
                    <fieldset
                        class="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4"
                    >
                        <legend class="fieldset-legend text-2xl">
                            Sign Up
                        </legend>
                        <label class="fieldset-label">Name</label>
                        <input
                            id="name"
                            type="text"
                            class="input"
                            v-model="form.name"
                            placeholder="name"
                            required
                        />
                        <label class="fieldset-label">Email</label>
                        <input
                            id="email"
                            type="email"
                            class="input"
                            v-model="form.email"
                            placeholder="Email"
                            required
                        />

                        <label class="fieldset-label">Password</label>
                        <input
                            id="password"
                            type="password"
                            class="input"
                            v-model="form.password"
                            required
                        />
                        <label class="fieldset-label">Confirm Password</label>
                        <input
                            id="password_confirmation"
                            type="password"
                            class="input"
                            v-model="form.password_confirmation"
                            required
                        />
                        <InputError
                            class="mt-2"
                            :message="form.errors.password"
                        />
                        <InputError class="mt-2" :message="form.errors.name" />
                        <InputError class="mt-2" :message="form.errors.email" />
                        <InputError
                            class="mt-2"
                            :message="form.errors.password"
                        />
                        <InputError
                            class="mt-2"
                            :message="form.errors.password_confirmation"
                        />
                        <div class="mt-8 block">
                            <div class="flex items-center justify-between">
                                <div class="flex flex-col items-start gap-3">
                                    <Link
                                        :href="route('login')"
                                        class="rounded-md text-sm underline"
                                    >
                                        Already registered?
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <button
                            class="btn btn-neutral mt-4"
                            :class="{ 'opacity-25': form.processing }"
                            :disabled="form.processing"
                        >
                            Register
                        </button>
                    </fieldset>

                    <!-- <div>
                        <InputLabel for="name" value="Name" />

                        <TextInput
                            id="name"
                            type="text"
                            class="mt-1 block w-full"
                            v-model="form.name"
                            required
                            autofocus
                            autocomplete="name"
                        />

                    </div>
                    
                    <div class="mt-4">
                        <InputLabel for="email" value="Email" />

                        <TextInput
                            id="email"
                            type="email"
                            class="mt-1 block w-full"
                            v-model="form.email"
                            required
                            autocomplete="username"
                            />
                            
                            
                    </div>

                    <div class="mt-4">
                        <InputLabel for="password" value="Password" />

                        <TextInput
                            id="password"
                            type="password"
                            class="mt-1 block w-full"
                            v-model="form.password"
                            required
                            autocomplete="new-password"
                        />

                    </div>

                    <div class="mt-4">
                        <InputLabel
                            for="password_confirmation"
                            value="Confirm Password"
                        />

                        <TextInput
                            id="password_confirmation"
                            type="password"
                            class="mt-1 block w-full"
                            v-model="form.password_confirmation"
                            required
                            autocomplete="new-password"
                        />

                        
                    </div>

                    <div class="mt-8 flex items-center justify-between">
                        

                        
                    </div> -->
                </form>
            </div>
        </div>
    </GuestLayout>
</template>
