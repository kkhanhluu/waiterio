import {
  IonItem,
  IonLabel,
  IonButtons,
  IonButton,
  IonIcon,
} from '@ionic/react';
import { addOutline, removeOutline } from 'ionicons/icons';
import React, { useEffect, useState } from 'react';

const DishItem: React.FC<{ dish: any; updateOrder: any; preOrders: any[] }> = (
  props
) => {
  const [numberItems, setNumberItems] = useState(0);

  useEffect(() => {
    const index = props.preOrders.findIndex(
      (o: any) => o.title === props.dish.title
    );
    if (index >= 0) {
      setNumberItems(props.preOrders[index].amount);
    }
  }, [props.preOrders, props.dish]);

  const addItem = () => {
    props.updateOrder(props.dish.title, props.dish.price, numberItems + 1);
    setNumberItems(numberItems + 1);
  };

  const removeItem = () => {
    if (numberItems - 1 >= 0) {
      props.updateOrder(props.dish.title, props.dish.price, numberItems - 1);
      setNumberItems(numberItems - 1);
    }
  };

  return (
    <IonItem key={props.dish.number}>
      <IonLabel>
        <h2>
          {props.dish.number}. {props.dish.title}
        </h2>
        <p>{props.dish.price}€</p>
      </IonLabel>
      <IonButtons slot='end'>
        <IonButton onClick={addItem}>
          <IonIcon icon={addOutline} />
        </IonButton>
        <IonButton disabled={numberItems <= 0} onClick={removeItem}>
          <IonIcon icon={removeOutline} color='danger' />
        </IonButton>
        <IonLabel>{numberItems}</IonLabel>
      </IonButtons>
    </IonItem>
  );
};

export default DishItem;
