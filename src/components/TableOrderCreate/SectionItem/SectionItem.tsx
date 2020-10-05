import { IonIcon, IonItem, IonLabel, IonList } from '@ionic/react';
import { arrowDownOutline, arrowForwardOutline } from 'ionicons/icons';
import React, { useState } from 'react';
import DishItem from '../DishItem/DishItem';
import classes from './SectionItem.module.css';

const SectionItem: React.FC<{
  category: any;
  dishes: any;
  updateOrder: any;
  preOrders: any[];
}> = (props) => {
  const [open, setOpen] = useState(false);

  const toggleOpen = () => {
    setOpen(!open);
  };

  return (
    <IonList className={classes.container}>
      <IonItem className={classes.title} onClick={toggleOpen} lines='none'>
        <IonLabel>{props.category}</IonLabel>
        {open ? (
          <IonIcon
            slot='end'
            className={classes.arrow}
            icon={arrowDownOutline}
          />
        ) : (
          <IonIcon
            slot='end'
            className={classes.arrow}
            icon={arrowForwardOutline}
          />
        )}
      </IonItem>

      <div className={`${open ? classes.opened : classes.closed}`}>
        {props.dishes.map((dish: any) => (
          <DishItem
            updateOrder={props.updateOrder}
            key={dish.number}
            dish={dish}
            preOrders={props.preOrders}
          />
        ))}
      </div>
    </IonList>
  );
};

export default SectionItem;
