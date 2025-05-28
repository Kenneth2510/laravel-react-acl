import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import { can } from '@/lib/can';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Users',
        href: '/users',
    },
];

type Roles = {
    id: number;
    name: string;
}

type User = {
    id: number;
    name: string;
    email: string;
    roles: Roles[];
};

type IndexProps = {
    users: User[];
};

export default function Index({ users }: IndexProps) {
    function handleDelete(id: number) {
        if (confirm('Are you sure you want to delete this user?')) {
            router.delete(route('users.destroy', id));
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Users" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                {can('users.create') &&
                    <div>
                        <Link
                            href="/users/create"
                            className="cursor-pointer rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none"
                        >
                            Create
                        </Link>
                    </div>
                }
                <div className="mt-3 overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Email</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">{user.id}</TableCell>
                                    <TableCell>{user.name}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>
                                        {user.roles.map((role) => (
                                            <Badge key={role.id} variant="outline">{role.name}</Badge>
                                        ))}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Link
                                            href={route('users.show', user.id)}
                                            className="mx-1 cursor-pointer rounded-lg bg-gray-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none"
                                        >
                                            View
                                        </Link>
                                        {can('users.edit') &&
                                            <Link
                                                href={route('users.edit', user.id)}
                                                className="mx-1 cursor-pointer rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none"
                                            >
                                                Edit
                                            </Link>
                                        }
                                        {can('users.delete') &&
                                            <Button
                                                onClick={() => handleDelete(user.id)}
                                                className="ml-2 cursor-pointer rounded-lg bg-red-600 px-3 py-2 text-xs font-medium text-white hover:bg-red-700 focus:ring-4 focus:ring-red-300 focus:outline-none"
                                            >
                                                Delete
                                            </Button>
                                        }
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
