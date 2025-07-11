// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchUsersRequest } from '../../../redux/actions/userAction';
// import { RootState } from '../../../redux/reducers/rootReducer';
// import { User } from '../../../type/user/user';

// const UserList = () => {
//   const dispatch = useDispatch();
//   const { users, loading, error } = useSelector((state: RootState) => state.user);

//   useEffect(() => {
//     dispatch(fetchUsersRequest());
//   }, [dispatch]);

//   if (loading) return <p>Đang tải...</p>;
//   if (error) return <p>Lỗi: {error}</p>;

//   return (
//     <ul>
//       {users.map((user: User) => <li key={user.id}>{user.name}</li>)}
//     </ul>
//   );
// };

// export default UserList;
