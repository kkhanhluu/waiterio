import {
  IonButton,
  IonDatetime,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonTextarea,
} from '@ionic/react';
import React, { useState } from 'react';

const TableReserve: React.FC<{ onReserveTable: any; onCloseModal: any }> = (
  props
) => {
  const [name, setName] = useState('');
  const [numberPerson, setNumberPersons] = useState(0);
  const [time, setTime] = useState('');
  const [note, setNote] = useState('');

  const reserveTableHandler = () => {
    props.onReserveTable(
      `Tên: ${name}. Số người: ${numberPerson}. Thời gian: ${new Date(
        time
      ).toDateString()}. Ghi chú: ${note}`
    );
  };

  return (
    <IonList>
      <IonItem>
        <IonLabel position='stacked'>Tên người đặt: </IonLabel>
        <IonInput
          value={name}
          onIonChange={(e) => setName(e.detail.value!)}
          type='text'
        ></IonInput>
      </IonItem>
      <IonItem>
        <IonLabel position='stacked'>Số lượng người: </IonLabel>
        <IonInput
          value={numberPerson}
          onIonChange={(e) => setNumberPersons(+e.detail.value!)}
          type='number'
        ></IonInput>
      </IonItem>
      <IonItem>
        <IonLabel position='stacked'>Thời gian: </IonLabel>
        <IonDatetime
          value={time}
          onIonChange={(e) => setTime(e.detail.value!)}
          pickerFormat='D MMM YYYY H:mm'
          displayFormat='D MMM YYYY H:mm'
        />
      </IonItem>
      <IonItem>
        <IonLabel position='stacked'>Ghi chú: </IonLabel>
        <IonTextarea
          value={note}
          onIonChange={(e) => setNote(e.detail.value!)}
        />
      </IonItem>
      <IonButton
        style={{ marginTop: '5rem' }}
        expand='block'
        onClick={reserveTableHandler}
        color='secondary'
      >
        Đặt bàn
      </IonButton>
      <IonButton expand='block' onClick={props.onCloseModal} color='danger'>
        Huỷ
      </IonButton>
    </IonList>
  );
};
export default TableReserve;
