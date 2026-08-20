import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Register({ teams }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        last_name: '',
        email: '',
        password: '',
        password_confirmation: '',
        favorite_team_id: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('register'), {
            onFinish: () => reset('password', 'password_confirmation'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Registrarse" />

            <form onSubmit={submit} className="space-y-4">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-white">Crear Cuenta</h2>
                    <p className="text-gray-400 text-sm mt-1">Únete a la Antillas Premier League</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Nombre */}
                    <div>
                        <InputLabel htmlFor="name" value="Nombre" />
                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            autoComplete="given-name"
                            isFocused={true}
                            onChange={(e) => setData('name', e.target.value)}
                            required
                        />
                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    {/* Apellidos */}
                    <div>
                        <InputLabel htmlFor="last_name" value="Apellidos" />
                        <TextInput
                            id="last_name"
                            name="last_name"
                            value={data.last_name}
                            className="mt-1 block w-full"
                            autoComplete="family-name"
                            onChange={(e) => setData('last_name', e.target.value)}
                            required
                        />
                        <InputError message={errors.last_name} className="mt-2" />
                    </div>
                </div>

                {/* Email */}
                <div>
                    <InputLabel htmlFor="email" value="Email" />
                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        onChange={(e) => setData('email', e.target.value)}
                        required
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                {/* Contraseña */}
                <div>
                    <InputLabel htmlFor="password" value="Contraseña" />
                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        required
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                {/* Confirmar Contraseña */}
                <div>
                    <InputLabel htmlFor="password_confirmation" value="Confirmar Contraseña" />
                    <TextInput
                        id="password_confirmation"
                        type="password"
                        name="password_confirmation"
                        value={data.password_confirmation}
                        className="mt-1 block w-full"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        required
                    />
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                {/* Equipo Favorito */}
                <div>
                    <InputLabel htmlFor="favorite_team_id" value="⚽ Equipo Favorito (opcional)" />
                    <select
                        id="favorite_team_id"
                        name="favorite_team_id"
                        value={data.favorite_team_id}
                        onChange={(e) => setData('favorite_team_id', e.target.value)}
                        className="mt-1 block w-full bg-[#0D1B3E] text-white border border-[#1A2F5A] rounded-lg px-4 py-2 focus:outline-none focus:border-[#F5C518]"
                    >
                        <option value="">Ninguno</option>
                        {teams.map((team) => (
                            <option key={team.id} value={team.id}>
                                {team.name}
                            </option>
                        ))}
                    </select>
                    <p className="text-gray-400 text-xs mt-1">
                        Recibirás notificaciones sobre tu equipo favorito.
                    </p>
                    <InputError message={errors.favorite_team_id} className="mt-2" />
                </div>

                {/* Botón y enlace */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                    <Link
                        href={route('login')}
                        className="text-sm text-gray-400 hover:text-[#F5C518] transition"
                    >
                        ¿Ya tienes cuenta? Inicia sesión
                    </Link>

                    <PrimaryButton className="w-full sm:w-auto" disabled={processing}>
                        {processing ? 'Registrando...' : 'Registrarse'}
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
}