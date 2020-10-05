import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MenuCategory from './MenuCategory/MenuCategory';
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonTitle,
  IonToolbar,
} from '@ionic/react';

export const Menu: React.FC = () => {
  const [categories, setCategories] = useState([] as any);

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
        };
        categories.push(cateogry);
      }

      setCategories(categories);
    });
  };

  useEffect(() => {
    loadMenu();
  }, []);

  return (
    <>
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonMenuButton autoHide={false} menu='mainMenu'></IonMenuButton>
          </IonButtons>
          <IonTitle>Menu</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen scrollY={true}>
        {categories.map((c: any) => (
          <MenuCategory
            key={c.categoryName}
            category={c.categoryName}
            dishes={c.dishes}
          />
        ))}
      </IonContent>
    </>
  );
};
