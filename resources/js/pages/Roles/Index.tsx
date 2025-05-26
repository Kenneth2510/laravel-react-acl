import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Roles',
        href: '/roles',
    },
];

type Role = {
    id: number;
    name: string;
};

type IndexProps = {
    roles: Role[];
};

export default function Index({ roles }: IndexProps) {
    function handleDelete(id: number) {
        if (confirm('Are you sure you want to delete this role?')) {
            router.delete(route('roles.destroy', id));
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Roles" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div>
                    <Link
                        href="/roles/create"
                        className="cursor-pointer rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none"
                    >
                        Create
                    </Link>
                </div>
                <div className="mt-3 overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[100px]">ID</TableHead>
                                <TableHead>Name</TableHead>
                                <TableHead>Permissions</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {roles.map(({id, name, permissions}) => (
                                <TableRow key={id}>
                                    <TableCell className="font-medium">{id}</TableCell>
                                    <TableCell>{name}</TableCell>
                                    <TableCell>
                                        {permissions.map((permission) => (
                                            <Badge key={permission.id} variant="outline">{permission.name}</Badge>
                                        ))}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Link
                                            href={route('roles.show', id)}
                                            className="mx-1 cursor-pointer rounded-lg bg-gray-600 px-3 py-2 text-xs font-medium text-white hover:bg-gray-700 focus:ring-4 focus:ring-gray-300 focus:outline-none"
                                        >
                                            View
                                        </Link>
                                        <Link
                                            href={route('roles.edit', id)}
                                            className="mx-1 cursor-pointer rounded-lg bg-blue-600 px-3 py-2 text-xs font-medium text-white hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 focus:outline-none"
                                        >
                                            Edit
                                        </Link>
                                        <Button
                                            onClick={() => handleDelete(id)}
                                            className="ml-2 cursor-pointer rounded-lg bg-red-600 px-3 py-2 text-xs font-medium text-white hover:bg-red-700 focus:ring-4 focus:ring-red-300 focus:outline-none"
                                        >
                                            Delete
                                        </Button>
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
