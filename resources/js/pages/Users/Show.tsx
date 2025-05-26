import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';

type User = {
    id: number;
    name: string;
    email: string;
    password: string;
};

type ShowProps = {
    user: User;
};

export default function Edit({ user }: ShowProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Users',
            href: '/users',
        },
        {
            title: 'Show User',
            href: `/users/${user.id}/show`,
        },
    ];

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
                    <p><strong>Name: </strong>{user.name}</p>
                    <p><strong>Email </strong>{user.email}</p>
                </div>
            </div>
        </AppLayout>
    );
}
