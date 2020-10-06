import { IonLabel, IonRouterLink, IonSlide, IonText } from '@ionic/react';
import React from 'react';
import classes from './OrderArea.module.css';

const OrderArea: React.FC<{ area: any }> = (props) => {
  const getStatusColor = (status: any) => {
    switch (status) {
      case 'free':
        return 'success';
      case 'besetzt':
        return 'danger';
      case 'reserviert':
        return 'warning';
    }
  };

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
            <div className={classes.link}>
              <IonLabel style={{ marginRight: '5px', fontWeight: '700' }}>
                Status:{' '}
              </IonLabel>{' '}
              <IonText color={getStatusColor(table.status)}>
                {table.status}
              </IonText>
            </div>
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
