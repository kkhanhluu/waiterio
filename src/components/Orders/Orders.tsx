import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonSlides,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import OrderArea from './OrderArea/OrderArea';
import './Orders.module.css';

export const Orders: React.FC = () => {
  const [areas, setAreas] = useState([] as any);

  const loadTables = () => {
    axios.get('https://waiterio.firebaseio.com/tables.json').then((res) => {
      const areas = [];
      for (let areaName in res.data) {
        const area = { areaName, tables: [] as any[] };
        for (let table in res.data[areaName]) {
          area.tables.push({ ...res.data[areaName][table], firebaseId: table });
        }
        areas.push(area);
      }

      setAreas(areas);
    });
  };

  useEffect(() => loadTables(), []);

  if (areas && areas.length > 0) {
    return (
      <>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot='start'>
              <IonMenuButton autoHide={false} menu='mainMenu'></IonMenuButton>
            </IonButtons>
            <IonTitle>Orders</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen>
          <IonSlides pager={true}>
            {areas.map((a: any) => (
              <OrderArea key={a.areaName} area={a} />
            ))}
          </IonSlides>
        </IonContent>
      </>
    );
  }
  return null;
};
