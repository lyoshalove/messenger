import { useMutation, useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { CREATE_CHAT } from "../../graphql/chats";
import { GET_ALL_USERS } from "../../graphql/users";
import { RootState } from "../../store";
import { IChat } from "../../types/chats";
import { IUser } from "../../types/users";
import "./styles.sass";
import { checkUserAvatar } from "../../features/helpers/checkUserAvatar";
import { useThemeContext } from "../../hooks/useThemeContext";
import ReactDOM from "react-dom";

interface IProps {
  handleCreateChat: () => void;
  closeModal: () => void;
}

export const CreateChatModal: React.FC<IProps> = ({
  closeModal,
  handleCreateChat,
}) => {
  const [theme] = useThemeContext();
  const currentUser = useSelector((state: RootState) => state.user.value);
  const [usersChats, setUsersChats] = useState<IChat[]>([]);
  const { data: users } = useQuery(GET_ALL_USERS);
  const [create] = useMutation(CREATE_CHAT);

  async function createChat(id: string | undefined) {
    if (!id) return;

    await create({
      variables: {
        userToId: id,
      },
    }).then(() => {
      closeModal();
      handleCreateChat();
    });
  }

  useEffect(() => {
    if (users && currentUser.id) {
      setUsersChats(
        users.getAllUsers.filter((user: IUser) => user.id !== currentUser.id)
      );
    }
  }, [users, currentUser]);

  return ReactDOM.createPortal(
    <>
      <div className={theme === "dark" ? "modal dark" : "modal"}>
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
                    src={checkUserAvatar(user.avatar)}
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
    </>,
    document.body
  );
};
