import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import {
  IonCard,
  IonHeader,
  IonLabel,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import classes from './TableOrderGeneral.module.css';

const TableOrderGeneral: React.FC<{ match: any }> = (props) => {
  console.log(props);
  const [status, setStatus] = useState('');
  const [orders, setOrders] = useState([] as any);
  const [id, setId] = useState('');
  const [note, setNote] = useState('');

  const getTableOrder = useCallback(() => {
    const firebaseId = props.match.params.id;
    const area = props.match.params.area;
    if (firebaseId) {
      axios
        .get(
          `https://waiterio.firebaseio.com/tables/${area}/${firebaseId}.json`
        )
        .then((res) => {
          setStatus(res.data.status);
          setId(res.data.id);
          setOrders(res.data.orders);
          setNote(res.data.note);
        });
    }
  }, [props.match.params.id, props.match.params.area]);

  const displayOrders = () => {
    if (orders) {
      const totalPrice = orders.reduce(
        (totalSum: any, currentOrder: any) =>
          totalSum + currentOrder.amount * currentOrder.price,
        0
      );
      return (
        <IonCard className={classes.orderInformation}>
          <div className={classes.ordersContainer}>
            {orders.map((o: any) => (
              <div key={o.title} className={classes.order}>
                <p style={{ fontWeight: 700 }}>{o.title}</p>
                <p>{o.amount}</p>
              </div>
            ))}
          </div>
          <div className={classes.totalPrice}>
            <p style={{ fontWeight: 700 }}>Total price: </p>
            <p>{totalPrice}€</p>
          </div>
        </IonCard>
      );
    }
    return <div className={classes.item}>No orders</div>;
  };

  useEffect(() => getTableOrder(), [getTableOrder]);

  if (id && status) {
    return (
      <div className={classes.container}>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Bàn: {id}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className={classes.item + ' ion-padding'}>
          <IonLabel>Status: </IonLabel> {status}
        </div>
        {note ? (
          <div className={classes.item + ' ion-padding'}>
            <IonLabel>Note: </IonLabel> {note}
          </div>
        ) : null}
        {displayOrders()}
      </div>
    );
  }
  return null;
};

export default TableOrderGeneral;
