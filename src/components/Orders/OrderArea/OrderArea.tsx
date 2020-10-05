import {
  IonHeader,
  IonRouterLink,
  IonSlide,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React from 'react';
import classes from './OrderArea.module.css';

const OrderArea: React.FC<{ area: any }> = (props) => {
  const displayTables = () => {
    return (
      <div className={classes.tableContainer}>
        {props.area.tables.map((table: any) => (
          <IonRouterLink
            className={classes.table}
            key={table.id}
            href={`/tables/${props.area.areaName}/${table.firebaseId}/general`}
          >
            {table.id}
          </IonRouterLink>
        ))}
      </div>
    );
  };
  if (props.area) {
    return (
      <IonSlide className={classes.container}>
        <h2 className={classes.title}>{props.area.areaName}</h2>
        {displayTables()}
      </IonSlide>
    );
  }
  return null;
};

export default OrderArea;
