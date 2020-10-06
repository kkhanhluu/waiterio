import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import {
  IonHeader,
  IonToolbar,
  IonButtons,
  IonTitle,
  IonContent,
  IonCard,
  IonButton,
  IonLoading,
  IonTextarea,
  IonItem,
  IonLabel,
  IonBackButton,
} from '@ionic/react';
import SectionItem from './SectionItem/SectionItem';
import classes from './TableOrderCreate.module.css';

const TableOrderCreate: React.FC<{ match: any }> = (props) => {
  const [categories, setCategories] = useState([] as any);
  const [orders, setOrders] = useState([] as any);
  const [note, setNote] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [showLoading, setShowLoading] = useState(false);

  const loadMenu = () => {
    axios.get('https://waiterio.firebaseio.com/menu.json').then((res) => {
      let categories = [];
      for (let key in res.data) {
        const dishes = [];
        for (let keyDish in res.data[key]) {
          dishes.push(res.data[key][keyDish]);
        }
        const cateogry = {
          categoryName: key,
          dishes,
          open: false,
        };
        categories.push(cateogry);
      }

      setCategories(categories);
    });
  };

  const loadOrder = useCallback(() => {
    const firebaseId = props.match.params.id;
    const area = props.match.params.area;
    if (firebaseId) {
      axios
        .get(
          `https://waiterio.firebaseio.com/tables/${area}/${firebaseId}.json`
        )
        .then((res) => {
          console.log(res.data);
          if (res.data.orders) {
            setOrders(res.data.orders);
          }
          if (res.data.note) {
            setNote(res.data.note);
          }
        });
    }
  }, [props.match.params.id, props.match.params.area]);

  useEffect(() => {
    loadMenu();
  }, []);

  useEffect(() => {
    loadOrder();
  }, [loadOrder]);

  useEffect(() => {
    if (orders && orders.length > 0) {
      const totalPrice = orders.reduce(
        (totalSum: any, currentOrder: any) =>
          totalSum + currentOrder.amount * currentOrder.price,
        0
      );
      setTotalPrice(totalPrice);
    }
  }, [orders]);

  const updateOrder = (title: any, price: any, amount: any) => {
    const index = orders.findIndex((o: any) => o.title === title);
    if (index < 0) {
      orders.push({ title, price, amount });
    } else {
      if (amount === 0) {
        const newOrders = [
          ...orders.slice(0, index),
          ...orders.slice(index + 1),
        ];
        setOrders(newOrders);
      } else {
        orders[index].amount = amount;
      }
    }

    const totalPrice = orders.reduce(
      (total: any, order: any) => total + order.price * order.amount,
      0
    );
    console.log(totalPrice);
    setTotalPrice(totalPrice);
  };

  const saveOrder = () => {
    setShowLoading(true);
    axios
      .patch(
        `https://waiterio.firebaseio.com/tables/${props.match.params.area}/${props.match.params.id}.json`,
        {
          orders,
          note,
          status: 'besetzt',
        }
      )
      .then((res) => {
        console.log(res);
        setShowLoading(false);
      });
  };

  const displayOrders = () => {
    if (orders) {
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
    } else return null;
  };
  return (
    <IonContent fullscreen scrollY={true}>
      {categories.map((c: any) => (
        <SectionItem
          updateOrder={updateOrder}
          key={c.categoryName}
          category={c.categoryName}
          dishes={c.dishes}
          preOrders={orders}
        />
      ))}
      {displayOrders()}
      <IonItem>
        <IonLabel position='floating'>Note</IonLabel>
        <IonTextarea
          value={note}
          onIonChange={(e) => setNote(e.detail.value!)}
        ></IonTextarea>
      </IonItem>

      <IonButton
        style={{ marginTop: '1rem' }}
        expand='block'
        onClick={saveOrder}
      >
        Save
      </IonButton>

      <IonLoading
        isOpen={showLoading}
        onDidDismiss={() => setShowLoading(false)}
        message={'Loading...'}
      />
    </IonContent>
  );
};

export default TableOrderCreate;
