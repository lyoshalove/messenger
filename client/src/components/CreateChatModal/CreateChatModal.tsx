import { useMutation, useQuery } from "@apollo/client";
import React from "react";
import { CREATE_CHAT } from "../../graphql/chats";
import { GET_ALL_USERS } from "../../graphql/users";
import { IUser } from "../../types/users";
import "./styles.sass";

interface IProps {
  closeModal: () => void;
}

export const CreateChatModal: React.FC<IProps> = ({ closeModal }) => {
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

  return (
    <>
      <div className="modal">
        <h3 className="modal__title">Выберите собеседника</h3>
        <ul className="modal__users">
          {users?.getAllUsers &&
            users.getAllUsers.map((user: Partial<IUser>) => {
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
                        : "https://images.unsplash.com/photo-1671685100852-444eef22f697?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
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
