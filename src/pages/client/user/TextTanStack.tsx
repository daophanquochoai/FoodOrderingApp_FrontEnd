// import { useUsers, useDeleteUser } from '../../../hooks/tanstack/useUsers';

// const UserListTanstack = () => {
//     const { data: users, isLoading } = useUsers();
//     const deleteMutation = useDeleteUser();

//     if (isLoading) return <p>Đang tải người dùng...</p>;

//     const deleteUser = (id: number) => {
//         console.log(id);
//         deleteMutation.mutate(id);
//     };

//     return (
//         <ul>
//             {users?.data.map((user: any) => (
//                 <li key={user.id}>
//                     {user.name} ({user.email}){' '}
//                     <button onClick={() => deleteUser(user.id)}>Xoá</button>
//                 </li>
//             ))}
//         </ul>
//     );
// };

// export default UserListTanstack;
