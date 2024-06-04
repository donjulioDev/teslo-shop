// https://tailwindcomponents.com/component/hoverable-table
export const revalidate = 0; // Cache

import {  getPaginatedUsers } from '@/src/actions';
import { Title } from '@/src/components';

import { redirect } from 'next/navigation';
import { IoCardOutline } from 'react-icons/io5';
import { UsersTable } from './ui/UsersTable';

export default async function OrdersPage() {

 const { ok, users = [] } = await getPaginatedUsers();

 if( !ok ) {
  redirect('/auth/login')
 }

  return (
    <>
      <Title title="Mantenimiento de usuarios" />

      <div className="mb-10">
            <UsersTable users={ users }  />
      </div>
    </>
  );
}