import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CREATE_CHAT } from "../../graphql/chats";
import { GET_ALL_USERS } from "../../graphql/users";
import { RootState } from "../../store";
import { IChat } from "../../types/chats";
import { IUser } from "../../types/users";
import "./styles.sass";
import incognitoAvatar from '../../assets/images/incognito.png';

interface IProps {
  closeModal: () => void;
}

export const CreateChatModal: React.FC<IProps> = ({ closeModal }) => {
  const currentUser = useSelector((state: RootState) => state.user.value);
  const [usersChats, setUsersChats] = useState<IChat[]>([]);
  const { loading: usersLoading, error, data: users } = useQuery(GET_ALL_USERS);
  const [create, { loading: createChatLoading, data: createChatData }] =
    useMutation(CREATE_CHAT);

  async function createChat(id: string | undefined) {
    if (!id) return;

    await create({
      variables: {
        userToId: id,
      },
    }).then((data) => {
      console.log(data);
      closeModal();
    });
  }

  useEffect(() => {
    if (users && currentUser.id) {
      setUsersChats(
        users.getAllUsers.filter((user: IUser) => user.id !== currentUser.id)
      );
    }
  }, [users, currentUser]);

  return (
    <>
      <div className="modal">
        <h3 className="modal__title">Выберите собеседника</h3>
        <ul className="modal__users">
          {usersChats &&
            usersChats.map((user: Partial<IUser>) => {
              return (
                <li
                  key={user.id}
                  className="modal__users-item"
                  onClick={() => createChat(user.id)}
                >
                  <img
                    src={
                      user.avatar
                        ? user.avatar
                        : incognitoAvatar
                    }
                    alt={user.firstName}
                    className="modal__users-image"
                  />
                  <div className="modal__users-info">
                    <span className="modal__users-name">
                      {user.firstName} {user.lastName}
                    </span>
                  </div>
                </li>
              );
            })}
        </ul>
      </div>
      <div className="modal__wrapper" onClick={closeModal} />
    </>
  );
};
