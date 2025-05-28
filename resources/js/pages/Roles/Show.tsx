import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, useForm } from '@inertiajs/react';
import React from 'react';

type Permission = {
    id: number;
    name: string;
}

type Role = {
    id: number;
    name: string;
    permissions: Permission[];
}

type EditRoleProps = {
    role: Role;
    rolePermissions: string[];
    permissions: string[];
}

export default function Edit({ role, permissions }: EditRoleProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Roles',
            href: '/roles',
        },
        {
            title: 'Show Role',
            href: `/roles/${role}/show`,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Role" />
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
                        <div>
                            <p>
                                <strong>Name: </strong>
                                {role.name}
                            </p>
                            <p>
                                <strong>Permissions: </strong>
                                {permissions.map((permission) => (
                                    <Badge key={permission} variant="outline">{permission}</Badge>
                                ))}
                            </p>
                        </div>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
