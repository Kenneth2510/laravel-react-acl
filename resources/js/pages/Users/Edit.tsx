import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import React from 'react';

type User = {
    id: number;
    name: string;
    email: string;
    password: string;
}

type EditProps = {
    user: User;
}

export default function Edit({ user }: EditProps) {
    const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
    {
        title: 'Edit User',
        href: `/users/${user.id}/edit`,
    },
];

    type UserFormData = {
        name: string;
        email: string;
        password: string;
    }

    const { data, setData, put, processing, errors } = useForm<UserFormData>({
        name: user.name,
        email: user.email,
        password: user.password,
    });

    function submit(e:React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        put(route('users.update', user.id));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit User" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div>
                    <Link
                        href="/users"
                        className="cursor-pointer rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none"
                    >
                        Back
                    </Link>
                </div>
                <div>
                    <Card>
                        <form onSubmit={submit} className="space-y-4">
                            <CardHeader>
                                <CardTitle>Edit User</CardTitle>
                                <CardDescription>Edit a User</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="name">Name</Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            placeholder="Name"
                                        />
                                        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="email">Email</Label>
                                        <Input
                                            id="email"
                                            value={data.email}
                                            onChange={(e) => setData('email', e.target.value)}
                                            type="email"
                                            placeholder="Email Address"
                                        />
                                        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="password">Password</Label>
                                        <Input
                                            id="password"
                                            value={data.password}
                                            onChange={(e) => setData('password', e.target.value)}
                                            type="password"
                                            placeholder="Password"
                                        />
                                        {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between">
                                <Button variant="outline">Cancel</Button>
                                <Button type="submit" disabled={processing}>
                                    {processing ? 'Submitting...' : 'Submit'}
                                </Button>
                            </CardFooter>
                        </form>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
