import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import React from 'react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Roles',
        href: '/roles',
    },
    {
        title: 'Create Roles',
        href: '/roles/create',
    },
];

export default function Create({ permissions }: { permissions: string[] }) {
    type RoleFormData = {
        name: string;
        permissions: string[];
    };

    const { data, setData, post, processing, errors } = useForm<RoleFormData>({
        name: '',
        permissions: [],
    });

    function handleCheckboxChange(permission: string, checked: boolean) {
        if (checked) {
            setData('permissions', [...data.permissions, permission]);
        } else {
            setData(
                'permissions',
                data.permissions.filter((name) => name !== permission),
            );
        }
    }

    function submit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        post(route('roles.store'));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Role" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div>
                    <Link
                        href="/roles"
                        className="cursor-pointer rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none"
                    >
                        Back
                    </Link>
                </div>
                <div>
                    <Card>
                        <form onSubmit={submit} className="space-y-4">
                            <CardHeader>
                                <CardTitle>Create Role</CardTitle>
                                <CardDescription>Create a new Role</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="grid w-full items-center gap-4">
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="name">Name</Label>
                                        <Input id="name" value={data.name} onChange={(e) => setData('name', e.target.value)} placeholder="Name" />
                                        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                                    </div>
                                    <div className="flex flex-col space-y-1.5">
                                        <Label htmlFor="permissions">Permissions</Label>
                                        {permissions.map((permission) => (
                                            <div key={permission} className="flex items-center space-x-2">
                                                <Checkbox
                                                    id={permission}
                                                    value={permission}
                                                    checked={data.permissions.includes(permission)}
                                                    onCheckedChange={(checked: boolean) => handleCheckboxChange(permission, checked)}
                                                />
                                                <label
                                                    htmlFor={permission}
                                                    className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                >
                                                    {permission}
                                                </label>
                                            </div>
                                        ))}
                                        {errors.permissions && <p className="mt-1 text-sm text-red-500">{errors.permissions}</p>}
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="flex justify-between">
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
