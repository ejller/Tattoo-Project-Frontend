import React from "react";
import { useList } from "react-use";
import _ from "lodash";

import {
  ContainerListUsers,
  InputFind,
  ButtonFind,
  WrapperFind,
  Table,
  Icon,
  BtnDisconnect,
  BtnDelete,
  Tittle,
} from "./styles/TableUsersStyle";
import { getUserList } from "../../../../data/fakeUserList";

function TableUsers() {
  const [users, { updateAt, removeAt }] = useList(getUserList(15));

  const handleDisconnect = (n: number) => {
    let user = users[n];
    updateAt(n, {
      ...user,
      status: { info: "Offline", isOnline: false },
    });
  };

  const handleDelete = (n: number) => {
    removeAt(n);
  };

  const table = users.map((el, index) => (
    <tr key={index}>
      <td>
        <Icon src={el.avatar} alt="Icon" />
      </td>
      <td> {el.login}</td>
      <td> {el.role} </td>
      <td> {el.status.info} </td>
      <td>
        <BtnDisconnect
          disabled={!el.status.isOnline}
          onClick={() => {
            handleDisconnect(index);
          }}
        >
          Dissconect
        </BtnDisconnect>
        <BtnDelete
          onClick={() => {
            handleDelete(index);
          }}
        >
          X
        </BtnDelete>
      </td>
    </tr>
  ));

  return (
    <ContainerListUsers>
      <WrapperFind>
        <Tittle>All Users</Tittle>
        <InputFind placeholder="Search" />
        <ButtonFind> Find</ButtonFind>
      </WrapperFind>
      <Table>
        <tbody>{table}</tbody>
      </Table>
    </ContainerListUsers>
  );
}

export default TableUsers;
