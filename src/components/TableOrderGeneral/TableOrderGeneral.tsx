import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCard,
  IonHeader,
  IonLabel,
  IonLoading,
  IonModal,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import classes from './TableOrderGeneral.module.css';
import TableReserve from './TableReserve/TableReserve';

const TableOrderGeneral: React.FC<{ match: any; history: any }> = (props) => {
  const [status, setStatus] = useState('');
  const [orders, setOrders] = useState([] as any);
  const [id, setId] = useState('');
  const [note, setNote] = useState('');
  const [showLoading, setShowLoading] = useState(false);
  const [showModalReserve, setShowModalReserve] = useState(false);

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

  const finishOrder = () => {
    setShowLoading(true);
    axios
      .patch(
        `https://waiterio.firebaseio.com/tables/${props.match.params.area}/${props.match.params.id}.json`,
        {
          orders: null,
          note: null,
          status: 'free',
        }
      )
      .then((res) => {
        console.log(res);
        setShowLoading(false);
        props.history.replace('/orders');
      });
  };

  const reserveTable = (note: any) => {
    setShowLoading(true);
    axios
      .patch(
        `https://waiterio.firebaseio.com/tables/${props.match.params.area}/${props.match.params.id}.json`,
        {
          note,
          status: 'reserviert',
        }
      )
      .then((res) => {
        console.log(res);
        setShowLoading(false);
        props.history.replace('/orders');
      });
  };

  const closeModal = () => {
    setShowModalReserve(false);
  };

  const cancelReservation = () => {
    setShowLoading(true);
    axios
      .patch(
        `https://waiterio.firebaseio.com/tables/${props.match.params.area}/${props.match.params.id}.json`,
        {
          note: null,
          status: 'free',
        }
      )
      .then((res) => {
        console.log(res);
        setShowLoading(false);
        props.history.replace('/orders');
      });
  };

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

    return <div className={classes.item + ' ion-padding'}>No orders</div>;
  };

  const displayReserveButton = () => {
    if (status === 'free') {
      return (
        <IonButton
          className={classes.reserveButton}
          color='secondary'
          expand='block'
          onClick={() => setShowModalReserve(true)}
        >
          Đặt bàn
        </IonButton>
      );
    }
    if (status === 'reserviert') {
      return (
        <IonButton
          className={classes.reserveButton}
          color='danger'
          expand='block'
          onClick={cancelReservation}
        >
          Huỷ đặt bàn
        </IonButton>
      );
    }
  };

  useEffect(() => getTableOrder(), [getTableOrder]);

  if (id && status) {
    return (
      <div className={classes.container}>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot='start'>
              <IonBackButton defaultHref='/orders' />
            </IonButtons>
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
        {displayReserveButton()}
        <IonButton
          expand='block'
          color='success'
          disabled={!orders}
          onClick={finishOrder}
        >
          Hoàn thành đơn
        </IonButton>

        <IonModal isOpen={showModalReserve} cssClass='my-custom-class'>
          <TableReserve
            onReserveTable={reserveTable}
            onCloseModal={closeModal}
          />
        </IonModal>

        <IonLoading
          isOpen={showLoading}
          onDidDismiss={() => setShowLoading(false)}
          message={'Loading...'}
        />
      </div>
    );
  }
  return null;
};

export default TableOrderGeneral;
